// Ölçüm: 13 sayfa × 7 genişlikte yatay taşma, .page iç boşluğu, okuma ölçüsü
// ve dosya boyutları. Çıktı JSON — "önce/sonra" kanıtı için.
// Kullanım: node scripts/measure.mjs [çıktı.json]
import { execFileSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const OUT = process.argv[2] || "scratchpad/baseline.json";
const PORT = 8907;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WIDTHS = [320, 360, 390, 768, 1200, 1512, 1920];
const ROUTES = [
  "/",
  "/hakkimda",
  "/projeler",
  "/iletisim",
  "/defter",
  "/cv",
  "/en",
  "/en/about",
  "/en/projects",
  "/en/contact",
  "/en/guestbook",
  "/en/cv",
];

const PROBE = `<script>
addEventListener("load", () => setTimeout(() => {
  const d = document.documentElement;
  const page = document.querySelector(".page");
  const cs = page ? getComputedStyle(page) : null;
  const measures = [...document.querySelectorAll(".about-p1,.about-p2,.tl-item p,.pr-desc,.hl-desc,.cert-card p")]
    .map(el => {
      const r = el.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(el).fontSize) || 16;
      return +(r.width / fs).toFixed(1);   // ~karakter/satır ölçüsü (x2 ≈ karakter)
    });
  document.title = JSON.stringify({
    vw: innerWidth,
    scrollWidth: d.scrollWidth,
    overflow: d.scrollWidth - d.clientWidth,
    pagePadLeft: cs ? cs.paddingLeft : null,
    pagePadTop: cs ? cs.paddingTop : null,
    maxMeasure: measures.length ? Math.max(...measures) : null,
  });
}, 900));
</script>`;

function gz(p) {
  try {
    return gzipSync(readFileSync(p)).length;
  } catch {
    return null;
  }
}
function dirSize(dir) {
  let total = 0,
    files = 0;
  try {
    for (const f of readdirSync(dir)) {
      const st = statSync(join(dir, f));
      if (st.isFile()) {
        total += st.size;
        files++;
      }
    }
  } catch {
    /* dizin yok */
  }
  return { bytes: total, files };
}

const astroFiles = existsSync("dist/_astro") ? readdirSync("dist/_astro") : [];
const cssFiles = astroFiles.filter((f) => f.endsWith(".css"));
const jsFiles = astroFiles.filter((f) => f.endsWith(".js"));

const sizes = {
  anaSayfaHtml: { raw: statSync("dist/index.html").size, gzip: gz("dist/index.html") },
  css: cssFiles.map((f) => ({
    ad: f,
    raw: statSync(`dist/_astro/${f}`).size,
    gzip: gz(`dist/_astro/${f}`),
  })),
  cssToplam: {
    raw: cssFiles.reduce((t, f) => t + statSync(`dist/_astro/${f}`).size, 0),
    gzip: cssFiles.reduce((t, f) => t + gz(`dist/_astro/${f}`), 0),
  },
  js: jsFiles.map((f) => ({
    ad: f,
    raw: statSync(`dist/_astro/${f}`).size,
    gzip: gz(`dist/_astro/${f}`),
  })),
  ogPng: existsSync("public/og.png") ? statSync("public/og.png").size : null,
  fontlar: dirSize("public/fonts"),
};

const srv = spawn("python3", ["-m", "http.server", String(PORT)], {
  cwd: "dist",
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 1200));

const sayfalar = {};
try {
  for (const route of ROUTES) {
    const file = join(
      "dist",
      route === "/" ? "index.html" : route.replace(/^\//, "") + "/index.html",
    );
    if (!existsSync(file)) {
      console.warn(`  ! yok: ${route}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const tmpName = `__probe${route.replace(/\//g, "_") || "_root"}.html`;
    writeFileSync(join("dist", tmpName), html.replace("</head>", PROBE + "</head>"));
    sayfalar[route] = {};
    for (const w of WIDTHS) {
      const dom = execFileSync(
        CHROME,
        [
          "--headless=new",
          "--disable-gpu",
          `--window-size=${w},900`,
          "--virtual-time-budget=2500",
          "--dump-dom",
          `http://localhost:${PORT}/${tmpName}`,
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 40 * 1024 * 1024 },
      );
      const m = dom.match(/<title>(.*?)<\/title>/s);
      try {
        sayfalar[route][w] = JSON.parse(m[1].replace(/&quot;/g, '"'));
      } catch {
        sayfalar[route][w] = { hata: "okunamadı" };
      }
    }
  }
} finally {
  process.kill(-srv.pid);
}

const rapor = { tarih: new Date().toISOString(), sizes, sayfalar };
writeFileSync(OUT, JSON.stringify(rapor, null, 2));

// Özet
const tasanlar = [];
let maxOlcu = 0,
  sifirPad = [];
for (const [route, byW] of Object.entries(sayfalar)) {
  for (const [w, v] of Object.entries(byW)) {
    if (v.overflow > 1) tasanlar.push(`${route} @${w}px: +${v.overflow}px`);
    if (v.maxMeasure) maxOlcu = Math.max(maxOlcu, v.maxMeasure);
    if (v.pagePadLeft === "0px") sifirPad.push(`${route} @${w}px`);
  }
}
console.log(`\nÖLÇÜM ÖZETİ (${OUT})`);
console.log(`  yatay taşma:        ${tasanlar.length} vaka`);
tasanlar.slice(0, 12).forEach((t) => console.log(`      ${t}`));
console.log(`  .page iç boşluk 0:  ${sifirPad.length} vaka`);
sifirPad.slice(0, 8).forEach((t) => console.log(`      ${t}`));
console.log(`  en geniş metin:     ~${(maxOlcu * 2).toFixed(0)} karakter/satır`);
console.log(`  ana sayfa HTML:     ${sizes.anaSayfaHtml.raw} B (gz ${sizes.anaSayfaHtml.gzip})`);
console.log(
  `  CSS toplam:         ${sizes.cssToplam.raw} B (gz ${sizes.cssToplam.gzip}) / ${sizes.css.length} dosya`,
);
sizes.js.forEach((j) => console.log(`  JS ${j.ad}: ${j.raw} B (gz ${j.gzip})`));
console.log(`  og.png:             ${sizes.ogPng} B`);
console.log(
  `  fontlar:            ${(sizes.fontlar.bytes / 1024).toFixed(0)} KB / ${sizes.fontlar.files} dosya`,
);
