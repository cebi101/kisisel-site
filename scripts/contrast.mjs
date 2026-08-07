// WCAG 2.1 kontrast oranı denetimi — global.css'teki jetonlardan okur.
// Gövde metni >= 4.5:1, büyük tipografi ve arayüz sınırları >= 3:1.
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/global.css", "utf8");

function jetonlar(blokDeseni) {
  const m = css.match(blokDeseni);
  if (!m) return {};
  const out = {};
  for (const d of m[1].matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,8})/g)) out[d[1]] = d[2];
  return out;
}

const acik = jetonlar(/:root,\s*:root\[data-mode="light"\]\s*\{([\s\S]*?)\n\}/);
const koyu = jetonlar(/:root\[data-mode="dark"\]\s*\{([\s\S]*?)\n\}/);

const srgb = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
function lum(hex) {
  const h = hex.replace("#", "");
  const tam = h.length === 3 ? [...h].map((c) => c + c).join("") : h.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(tam.slice(i, i + 2), 16) / 255);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}
function oran(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// [önplan, arkaplan, en az, açıklama]
const KURALLAR = [
  ["--body", "--bg", 4.5, "gövde metni"],
  ["--ink", "--bg", 4.5, "başlıklar"],
  ["--muted", "--bg", 4.5, "ikincil metin"],
  ["--muted2", "--panel", 4.5, "panel içi ikincil metin"],
  ["--faint", "--bg", 4.5, "küçük etiketler (zemin)"],
  ["--faint", "--panel", 4.5, "küçük etiketler (panel)"],
  ["--accent", "--bg", 4.5, "vurgu metni"],
  ["--accent2", "--bg", 3.0, "vurgu-2 (yalnız BÜYÜK tipografi)"],
  ["--accent-text", "--bg", 4.5, "bilgi taşıyan vurgu metni"],
  ["--accent-text", "--panel", 4.5, "panel içi vurgu metni"],
  ["--onaccent", "--accent", 4.5, "vurgu üstü metin"],
  ["--onhighlight", "--highlight", 4.5, "limon üstü metin"],
  ["--faint2", "--field", 3.0, "form yer tutucu (büyük/dekoratif)"],
  ["--border", "--bg", 1.2, "kenarlık (görünürlük)"],
  ["--latte", "--bg", 3.0, "latte orta ton — YALNIZ çizgi/dolgu"],
  ["--latte-koyu", "--bg", 4.5, "espresso metin (zemin)"],
  ["--latte-koyu", "--panel", 4.5, "espresso metin (panel)"],
  ["--latte-koyu", "--latte-yuzey", 4.5, "espresso, latte yüzeyde"],
  ["--ink", "--latte-yuzey", 4.5, "başlık, latte yüzeyde"],
  ["--muted2", "--latte-yuzey", 4.5, "gövde, latte yüzeyde"],
  ["--faint", "--latte-yuzey", 4.5, "tarih etiketi, latte yüzeyde"],
];

let hata = 0;
for (const [ad, tema] of [
  ["AÇIK TEMA", acik],
  ["KOYU TEMA", koyu],
]) {
  console.log(`\n${ad}`);
  for (const [fg, bg, min, aciklama] of KURALLAR) {
    const f = tema[fg] ?? acik[fg];
    const b = tema[bg] ?? acik[bg];
    if (!f || !b) {
      console.log(`  ?  ${fg} / ${bg} — jeton tanımsız (${aciklama})`);
      continue;
    }
    const r = oran(f, b);
    const ok = r >= min;
    if (!ok) hata++;
    console.log(
      `  ${ok ? "✓" : "✗"}  ${fg} / ${bg} = ${r.toFixed(2)}:1 (en az ${min}) — ${aciklama}`,
    );
  }
}
console.log("");
if (hata) {
  console.error(`KONTRAST HATASI: ${hata} kural eşiğin altında`);
  process.exit(1);
}
console.log("Tüm kontrast kuralları geçti.");
