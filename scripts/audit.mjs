// Birleşik denetim aracı.
//
//   npm run audit -- --nav       gezinme: her sayfada kenar çubuğu DIŞINDA bağlantı var mı
//   npm run audit -- --motion    hareket: hangi yüzey hareketsiz, geçişler çakışıyor mu
//   npm run audit -- --texture   zemin dokusu: L* yayılımı ve farklı renk sayısı
//   npm run audit -- --leak      SPA yeniden bağlama: dinleyici/düğüm sızıntısı, istek sayısı
//
// Her denetim başarısızsa çıkış kodu 1 döner.

import { serveDist, evalInPage, dokuIstatistigi, chromePath } from "./_harness.mjs";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const arg = process.argv.slice(2);
const istenen = {
  nav: arg.includes("--nav"),
  motion: arg.includes("--motion"),
  texture: arg.includes("--texture"),
  leak: arg.includes("--leak"),
};
if (arg.includes("--help") || !Object.values(istenen).some(Boolean)) {
  console.log(`Kullanım: npm run audit -- [seçenek...]

  --nav        Gezinme keşfedilebilirliği (kenar çubuğu dışı bağlantılar)
  --motion     Hareket envanteri ve geçiş çakışmaları
  --texture    Zemin dokusu ölçümü (L* yayılımı, farklı renk)
  --leak       SPA yeniden bağlama sızıntısı ve istek sayısı
  --help       Bu yardım`);
  process.exit(0);
}

const PORT = 8965;
mkdirSync("scratchpad", { recursive: true });
let hata = false;
const srv = serveDist(PORT);
await srv.hazir();

// ---------------------------------------------------------------- --nav
if (istenen.nav) {
  console.log("\nGEZİNME (--nav)");
  const ROTALAR = ["/", "/hakkimda", "/projeler", "/iletisim", "/defter", "/cv", "/en", "/404"];
  const script = `
    addEventListener("load", () => setTimeout(() => {
      const sb = document.getElementById("sidebar");
      const hepsi = [...document.querySelectorAll('a[href^="/"]')];
      const disarida = hepsi.filter((a) => !sb || !sb.contains(a));
      document.title = JSON.stringify({
        toplam: hepsi.length,
        sidebarDisi: disarida.length,
        ornek: disarida.slice(0, 6).map((a) => a.getAttribute("href")),
      });
    }, 500));
  `;
  for (const r of ROTALAR) {
    const dosya = r === "/" ? "dist/index.html" : `dist${r}/index.html`;
    if (!existsSync(dosya)) continue;
    const v = evalInPage(PORT, r, { script });
    if (!v) {
      console.log(`  ? ${r}: okunamadı`);
      continue;
    }
    const ok = v.sidebarDisi >= 5;
    if (!ok) hata = true;
    console.log(
      `  ${ok ? "✓" : "✗"} ${r.padEnd(11)} kenar çubuğu dışı bağlantı: ${v.sidebarDisi} (toplam ${v.toplam})`,
    );
  }
}

// ------------------------------------------------------------- --motion
if (istenen.motion) {
  console.log("\nHAREKET (--motion)");
  const SECICILER = [
    ".arr",
    ".btn",
    ".project-row",
    ".cert-card",
    ".tl-item",
    ".gb-entry",
    ".footer-views",
    ".skip-link",
    ".section-title",
    ".home h1",
    ".tagline",
    ".cta-row",
    ".hello",
    ".page-head",
  ];
  const script = `
    addEventListener("load", () => setTimeout(() => {
      const out = {};
      for (const s of ${JSON.stringify(SECICILER)}) {
        const el = document.querySelector(s);
        if (!el) continue;
        const cs = getComputedStyle(el);
        out[s] = {
          tp: cs.transitionProperty, td: cs.transitionDuration,
          an: cs.animationName, ad: cs.animationDuration,
        };
      }
      document.title = JSON.stringify(out);
    }, 700));
  `;
  const normal = evalInPage(PORT, "/projeler", { script });
  const az = evalInPage(PORT, "/projeler", { script, flags: ["--force-prefers-reduced-motion"] });

  if (normal) {
    for (const [sel, v] of Object.entries(normal)) {
      // Çakışma: kart kendi geçişini tanımlıyorsa reveal onu ezmemeli
      const cakisma =
        /project-row|cert-card/.test(sel) && /opacity/.test(v.tp) && parseFloat(v.td) > 0.4;
      if (cakisma) hata = true;
      console.log(
        `  ${cakisma ? "✗" : " "} ${sel.padEnd(16)} geçiş=${v.tp.slice(0, 34)} | ${v.td}  animasyon=${v.an}`,
      );
    }
  }
  if (az) {
    const uzun = Object.entries(az).filter(
      ([, v]) =>
        v.td.split(",").some((d) => parseFloat(d) > 0.02) ||
        (v.an !== "none" && v.ad.split(",").some((d) => parseFloat(d) > 0.02)),
    );
    if (uzun.length) {
      hata = true;
      console.log(`  ✗ reduced-motion altında hâlâ süreli: ${uzun.map(([s]) => s).join(", ")}`);
    } else {
      console.log("  ✓ reduced-motion: tüm süreler <= 0.01s");
    }
  }
}

// ------------------------------------------------------------ --texture
if (istenen.texture) {
  console.log("\nZEMİN DOKUSU (--texture)");
  const ESIK = { yayilim: 6.5, farkliRenk: 8 };

  // İçeriğe denk gelmemek için YALNIZ gövde zeminini taşıyan boş bir sayfa
  // üretilir; böylece ölçüm kart/metin pikselleriyle kirlenmez.
  const ornek = readFileSync("dist/index.html", "utf8");
  const css = [...ornek.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(
    (m) => m[1],
  );
  for (const mode of ["light", "dark"]) {
    writeFileSync(
      `dist/__doku-${mode}.html`,
      `<!doctype html><html lang="tr" data-mode="${mode}"><head><meta charset="utf-8">
       ${css.map((h) => `<link rel="stylesheet" href="${h}">`).join("")}
       </head><body></body></html>`,
    );
    const png = `scratchpad/doku-${mode}.png`;
    execFileSync(
      chromePath(),
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=600,400",
        "--virtual-time-budget=4000",
        `--screenshot=${png}`,
        `http://localhost:${PORT}/__doku-${mode}.html`,
      ],
      { stdio: "ignore" },
    );
    const st = dokuIstatistigi(png, { x: 150, y: 100, w: 300, h: 140 });
    if (!st) {
      console.log(`  ? ${mode}: ölçülemedi`);
      continue;
    }
    const ok = st.yayilim <= ESIK.yayilim && st.farkliRenk >= ESIK.farkliRenk;
    if (!ok) hata = true;
    console.log(
      `  ${ok ? "✓" : "✗"} ${mode.padEnd(6)} yayılım=${st.yayilim} (<=${ESIK.yayilim})  farklı_renk=${st.farkliRenk} (>=${ESIK.farkliRenk})  sd=${st.sd}`,
    );
  }
}

// --------------------------------------------------------------- --leak
if (istenen.leak) {
  console.log("\nSPA SIZINTISI (--leak)");
  const script = `
    window.__istek = 0;
    const _f = window.fetch;
    window.fetch = (...a) => { if (String(a[0]).includes("/api/views")) window.__istek++; return _f(...a); };
    const rotalar = ["/hakkimda", "/projeler", "/iletisim", "/defter", "/"];
    let i = 0, olcum = [];
    const tikla = () => {
      const a = document.querySelector('.nav-links a[href="' + rotalar[i % rotalar.length] + '"]');
      i++;
      if (a) a.click();
    };
    addEventListener("load", () => {
      setTimeout(function dongu() {
        if (i >= 12) {
          document.title = JSON.stringify({
            gezinme: i,
            dugum: document.getElementsByTagName("*").length,
            olcum,
            istek: window.__istek,
          });
          return;
        }
        tikla();
        setTimeout(() => {
          olcum.push(document.getElementsByTagName("*").length);
          dongu();
        }, 260);
      }, 600);
    });
  `;
  const v = evalInPage(PORT, "/", { script, bekle: 20000 });
  if (!v) {
    console.log("  ? ölçülemedi");
  } else {
    const ilk = v.olcum[2] ?? v.olcum[0];
    const son = v.olcum[v.olcum.length - 1];
    const artis = v.olcum.length > 3 ? (son - ilk) / (v.olcum.length - 3) : 0;
    const ok = artis < 5;
    if (!ok) hata = true;
    console.log(
      `  ${ok ? "✓" : "✗"} ${v.gezinme} gezinme, düğüm ${ilk} -> ${son} (${artis.toFixed(1)}/gezinme, sınır 5)`,
    );
    console.log(`    /api/views isteği: ${v.istek}`);
  }
}

srv.dur();
console.log("");
if (hata) {
  console.error("DENETİM BAŞARISIZ");
  process.exit(1);
}
console.log("Denetim temiz.");
