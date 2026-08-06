// Görsel regresyon: belirlenen sayfaların ekran görüntülerini alır.
// Kullanım: node scripts/shots.mjs <çıktı-dizini> [port]
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2];
const port = Number(process.argv[3] || 8899);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PAGES = [
  ["ana", "/"],
  ["hakkimda", "/hakkimda"],
  ["projeler", "/projeler"],
  ["iletisim", "/iletisim"],
  ["defter", "/defter"],
  ["cv", "/cv"],
  ["en-ana", "/en"],
];
const WIDTHS = [390, 1512];
const MODES = ["light", "dark"];

mkdirSync(outDir, { recursive: true });

// Hareketi durdurup sabit kare almak için her sayfaya enjekte edilen stil
const FREEZE =
  "<style>*,*::before,*::after{transition:none!important;animation:none!important}" +
  ".reveal{opacity:1!important;transform:none!important}</style>";

const srv = spawn("python3", ["-m", "http.server", String(port)], {
  cwd: "dist",
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 1200));

try {
  for (const [name, route] of PAGES) {
    const file = join(
      "dist",
      route === "/" ? "index.html" : route.replace(/^\//, "") + "/index.html",
    );
    let html;
    try {
      html = readFileSync(file, "utf8");
    } catch {
      console.warn(`  ! atlandı (dosya yok): ${route}`);
      continue;
    }
    for (const mode of MODES) {
      const tmp = join("dist", `__shot-${name}-${mode}.html`);
      writeFileSync(
        tmp,
        html.replace(
          "</head>",
          `<script>document.documentElement.dataset.mode="${mode}"</script>${FREEZE}</head>`,
        ),
      );
      for (const w of WIDTHS) {
        const out = join(outDir, `${name}-${mode}-${w}.png`);
        execFileSync(
          CHROME,
          [
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            `--window-size=${w},900`,
            "--virtual-time-budget=5000",
            `--screenshot=${out}`,
            `http://localhost:${port}/__shot-${name}-${mode}.html`,
          ],
          { stdio: "ignore" },
        );
      }
    }
  }
} finally {
  process.kill(-srv.pid);
}
console.log(`ekran görüntüleri: ${outDir}`);
