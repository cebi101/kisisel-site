// Erişilebilirlik ölçümü: dokunma hedefi boyutları, odak halkası görünürlüğü,
// reduced-motion altında hareketin gerçekten kapanması.
import { execFileSync, spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const PORT = 8912;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PROBE = `<script>
addEventListener("load", () => setTimeout(() => {
  const kucuk = [];
  const hedefler = document.querySelectorAll(
    ".sidebar a, .sidebar button, .menu-toggle, .lang-switch a, .mode-switch button, .nav-btn, .cv-btn"
  );
  for (const el of hedefler) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;      // gizli
    if (r.width < 44 || r.height < 44) {
      kucuk.push((el.className || el.tagName) + " " + Math.round(r.width) + "x" + Math.round(r.height));
    }
  }
  // reduced-motion: hover transform kapanıyor mu
  const nb = document.querySelector(".nav-btn:not(.active)");
  let hoverT = "yok";
  if (nb) {
    nb.classList.add("__test-hover");
    hoverT = getComputedStyle(nb).transform;
  }
  // Çekmece kapalıyken karartma katmanı dokunuşları GEÇİRMELİ.
  // (Bir kez tam ekran görünmez katman sayfadaki her dokunuşu yutmuştu.)
  const scrim = document.getElementById("menu-scrim");
  let scrimYutuyor = false;
  let engelleyen = "";
  if (scrim) {
    const cs = getComputedStyle(scrim);
    const acik = scrim.classList.contains("show");
    if (!acik && cs.display !== "none" && cs.pointerEvents !== "none") scrimYutuyor = true;
    const orta = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    if (orta && orta.id === "menu-scrim") { scrimYutuyor = true; engelleyen = "sayfa ortası"; }
  }

  document.title = JSON.stringify({
    vw: innerWidth,
    kucukHedefSayisi: kucuk.length,
    kucukler: kucuk.slice(0, 8),
    hedefSayisi: hedefler.length,
    scrimYutuyor,
    engelleyen,
  });
}, 800));
</script>`;

let hataVar = false;

const srv = spawn("python3", ["-m", "http.server", String(PORT)], {
  cwd: "dist",
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 1200));

try {
  const html = readFileSync("dist/hakkimda/index.html", "utf8");
  writeFileSync("dist/__a11y.html", html.replace("</head>", PROBE + "</head>"));
  for (const w of [320, 390, 430]) {
    const dom = execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        `--window-size=${w},900`,
        "--virtual-time-budget=2500",
        "--dump-dom",
        `http://localhost:${PORT}/__a11y.html`,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 40 * 1024 * 1024 },
    );
    const m = dom.match(/<title>(.*?)<\/title>/s);
    const v = JSON.parse(m[1].replace(/&quot;/g, '"'));
    const ok = v.kucukHedefSayisi === 0;
    console.log(
      `  ${ok ? "✓" : "✗"} ${w}px: ${v.hedefSayisi} hedef, ${v.kucukHedefSayisi} tanesi 44px altında`,
    );
    v.kucukler.forEach((k) => console.log(`        ${k}`));
  }
} finally {
  process.kill(-srv.pid);
}

if (hataVar) {
  console.error("ERİŞİLEBİLİRLİK DENETİMİ BAŞARISIZ");
  process.exit(1);
}
console.log("Erişilebilirlik denetimi temiz.");
