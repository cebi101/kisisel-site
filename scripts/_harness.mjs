// Ölçüm betikleri için ortak altyapı.
//
// Chrome yolu ve dist sunucusu üç ayrı betikte kopyalanmıştı; dört yeni
// denetim daha ekleneceği için tek yerde toplandı.

import { execFileSync, spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ADAYLAR = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

let _chrome = null;

/** Kurulu tarayıcının yolunu bulur; bulamazsa anlaşılır hata verir. */
export function chromePath() {
  if (_chrome) return _chrome;
  for (const yol of ADAYLAR) {
    if (yol && existsSync(yol)) {
      _chrome = yol;
      return yol;
    }
  }
  throw new Error(
    "Chrome bulunamadı. CHROME_PATH ortam değişkenini ayarla:\n" +
      "  CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run audit",
  );
}

/** dist/ dizinini yerel bir portta servis eder. */
export function serveDist(port) {
  const srv = spawn("python3", ["-m", "http.server", String(port)], {
    cwd: "dist",
    stdio: "ignore",
    detached: true,
  });
  return {
    port,
    async hazir() {
      await new Promise((r) => setTimeout(r, 1200));
    },
    dur() {
      try {
        process.kill(-srv.pid);
      } catch {
        /* zaten kapanmış */
      }
    },
  };
}

/**
 * Bir sayfayı açar, içine script enjekte eder ve `document.title`e yazılan
 * JSON'u döndürür. Ölçüm script'i sonucu `document.title = JSON.stringify(...)`
 * ile bildirmelidir.
 */
export function evalInPage(
  port,
  rota,
  { width = 1440, height = 900, mode, flags = [], script, bekle = 3000 },
) {
  const dosya = rota === "/" ? "dist/index.html" : `dist${rota.replace(/\/+$/, "")}/index.html`;
  const html = readFileSync(dosya, "utf8");

  const on = [];
  if (mode) on.push(`<script>document.documentElement.dataset.mode="${mode}"</script>`);
  on.push(`<script>${script}</script>`);

  const gecici = `__olcum-${Math.abs(hashKodu(rota + (mode ?? "") + script)).toString(36)}.html`;
  writeFileSync(join("dist", gecici), html.replace("</head>", on.join("") + "</head>"));

  const dom = execFileSync(
    chromePath(),
    [
      "--headless=new",
      "--disable-gpu",
      `--window-size=${width},${height}`,
      `--virtual-time-budget=${bekle}`,
      ...flags,
      "--dump-dom",
      `http://localhost:${port}/${gecici}`,
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 60 * 1024 * 1024 },
  );

  const m = dom.match(/<title>([\s\S]*?)<\/title>/);
  if (!m) return null;
  try {
    return JSON.parse(decodeHtml(m[1]));
  } catch {
    return null;
  }
}

/** Sayfanın ekran görüntüsünü alır (PNG yolu döner). */
export function shot(
  port,
  rota,
  cikti,
  { width = 1440, height = 900, mode, flags = [], onScript = "" } = {},
) {
  const dosya = rota === "/" ? "dist/index.html" : `dist${rota.replace(/\/+$/, "")}/index.html`;
  const html = readFileSync(dosya, "utf8");
  const on = [];
  if (mode) on.push(`<script>document.documentElement.dataset.mode="${mode}"</script>`);
  if (onScript) on.push(`<script>${onScript}</script>`);
  const gecici = `__shot-${Math.abs(hashKodu(rota + (mode ?? "") + onScript)).toString(36)}.html`;
  writeFileSync(join("dist", gecici), html.replace("</head>", on.join("") + "</head>"));

  execFileSync(
    chromePath(),
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=5000",
      ...flags,
      `--screenshot=${cikti}`,
      `http://localhost:${port}/${gecici}`,
    ],
    { stdio: "ignore" },
  );
  return cikti;
}

function decodeHtml(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");
}

function hashKodu(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

/**
 * PNG'nin bir bölgesindeki CIE L* istatistiğini çıkarır.
 * Ölçüm Python (Pillow) ile yapılır — TIFF'i elle ayrıştırmak kırılgandı.
 */
export function dokuIstatistigi(pngYolu, { x = 0, y = 0, w = 300, h = 140 } = {}) {
  const kod = `
import json, sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
x, y, w, h = (int(v) for v in sys.argv[2:6])
x2, y2 = min(x + w, im.width), min(y + h, im.height)
if x >= im.width or y >= im.height:
    print(json.dumps(None)); sys.exit()
px = list(im.crop((x, y, x2, y2)).getdata())

def srgb(v):
    v = v / 255
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4

def f(t):
    return t ** (1/3) if t > 0.008856 else 7.787 * t + 16/116

Ls = []
for r, g, b in px:
    Y = 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
    Ls.append(116 * f(Y) - 16)
ort = sum(Ls) / len(Ls)
sd = (sum((v - ort) ** 2 for v in Ls) / len(Ls)) ** 0.5
print(json.dumps({
    "farkliRenk": len(set(px)),
    "ortalamaL": round(ort, 2),
    "sd": round(sd, 2),
    "yayilim": round(max(Ls) - min(Ls), 2),
}))
`;
  try {
    const cikti = execFileSync(
      "python3",
      ["-c", kod, pngYolu, String(x), String(y), String(w), String(h)],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    return JSON.parse(cikti);
  } catch {
    return null;
  }
}
