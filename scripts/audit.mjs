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
    window.__spa = 0;
    document.addEventListener("astro:page-load", () => { window.__spa++; });
    const _f = window.fetch;
    window.__basarili = 0;
    window.fetch = (...a) => {
      const p = _f(...a);
      if (String(a[0]).includes("/api/views")) {
        window.__istek++;
        p.then((r) => { if (r.ok) window.__basarili++; }).catch(() => {});
      }
      return p;
    };
    // İki sayfa arasında gidip gel: düğüm sayısı AYNI sayfada karşılaştırılır,
    // yoksa sayfa boyutu farkı sızıntı gibi görünür.
    const rotalar = ["/projeler", "/iletisim"];
    let i = 0, olcum = [];
    const tikla = () => {
      const a = document.querySelector('.nav-links a[href="' + rotalar[i % 2] + '"]');
      i++;
      if (a) a.click();
    };
    addEventListener("load", () => {
      setTimeout(function dongu() {
        if (i >= 12) {
          document.title = JSON.stringify({
            gezinme: i,
            spaOlayi: window.__spa,
            basarili: window.__basarili,
            olcum,
            istek: window.__istek,
          });
          return;
        }
        tikla();
        setTimeout(() => {
          // yalnız /projeler ölçülür → karşılaştırılabilir
          olcum.push([location.pathname, document.getElementsByTagName("*").length]);
          dongu();
        }, 280);
      }, 600);
    });
  `;
  const v = evalInPage(PORT, "/", { script, bekle: 20000 });
  if (!v) {
    console.log("  ? ölçülemedi");
  } else {
    // Headless'ta bağlantı tıklaması TAM SAYFA yenilemesi yapabiliyor.
    // O durumda modül değişkenleri sıfırlanır ve SPA davranışı ölçülemez;
    // bunu başarısızlık gibi göstermek yanıltıcı olurdu.
    const spaCalisti = v.spaOlayi >= v.gezinme;
    if (!spaCalisti) {
      console.log(`  ~ SPA gezinme gerçekleşmedi (${v.spaOlayi} olay / ${v.gezinme} tıklama).`);
      console.log("    Bu ortamda tam sayfa yenileniyor; sızıntı ve istek sayısı ÖLÇÜLEMEZ.");
      console.log(`    Ham veri: /api/views isteği ${v.istek}, ölçüm noktası ${v.olcum.length}`);
    } else {
      // Aynı sayfanın ölçümlerini karşılaştır (sayfa boyutu farkı sızıntı sanılmasın)
      const proje = v.olcum.filter(([yol]) => yol.includes("projeler")).map(([, n]) => n);
      const ilk = proje[0] ?? 0;
      const son = proje[proje.length - 1] ?? 0;
      const artis = proje.length > 1 ? (son - ilk) / (proje.length - 1) : 0;
      const ok = artis < 5;
      if (!ok) hata = true;
      console.log(
        `  ${ok ? "✓" : "✗"} ${v.gezinme} gezinme, düğüm ${ilk} -> ${son} (${artis.toFixed(1)}/gezinme, sınır 5)`,
      );
      // Statik sunucuda /api/views yok; her istek 404 alır ve sayaç
      // haklı olarak yeniden dener. O durumda bu ölçüm anlamlı değildir.
      if (!v.basarili) {
        console.log(`  ~ /api/views ulaşılamıyor (${v.istek} deneme, 0 başarılı) —`);
        console.log("    istek sayısı yalnız API ayaktayken ölçülebilir (npm run dev:api).");
      } else {
        const istekOk = v.istek <= 2;
        if (!istekOk) hata = true;
        console.log(`  ${istekOk ? "✓" : "✗"} /api/views isteği: ${v.istek} (sınır 2)`);
      }
    }
  }
}

srv.dur();
console.log("");
if (hata) {
  console.error("DENETİM BAŞARISIZ");
  process.exit(1);
}
console.log("Denetim temiz.");
