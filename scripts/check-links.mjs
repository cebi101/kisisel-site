// dist içindeki tüm iç bağlantıların gerçek bir dosyaya çözüldüğünü doğrular.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = walk("dist");
const kirik = [];

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith("//")) continue;
    const aday = [
      join("dist", href),
      join("dist", href, "index.html"),
      join("dist", href.replace(/\/$/, "") + ".html"),
    ];
    if (!aday.some((p) => existsSync(p))) kirik.push(`${page} -> ${href}`);
  }
}

if (kirik.length) {
  console.error(`KIRIK BAĞLANTI: ${kirik.length}`);
  kirik.slice(0, 30).forEach((k) => console.error("  " + k));
  process.exit(1);
}
console.log(`Bağlantı denetimi temiz: ${pages.length} sayfa, 0 kırık iç bağlantı`);
