import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { PAGES, EXTRA_PAGES, PAGE_NUM, otherLangPath } from "../src/data/routes";
import { locales } from "../src/i18n/translations";

describe("rota manifestosu", () => {
  it("her sayfanın iki dilde de üretilmiş bir HTML'i var", () => {
    for (const p of [...PAGES, ...EXTRA_PAGES]) {
      for (const route of [p.tr, p.en]) {
        const file =
          route === "/" ? "dist/index.html" : `dist${route.replace(/\/+$/, "")}/index.html`;
        expect(existsSync(file), `${p.key}: ${route} -> ${file} yok`).toBe(true);
      }
    }
  });

  it("hreflang çiftleri simetrik: her sayfa öbür dildeki KENDİ karşılığını gösterir", () => {
    for (const p of [...PAGES, ...EXTRA_PAGES]) {
      expect(otherLangPath(p.tr, "tr"), `${p.key} tr->en`).toBe(p.en);
      expect(otherLangPath(p.en, "en"), `${p.key} en->tr`).toBe(p.tr);
    }
  });

  it("üretilen HTML'de hreflang doğru sayfayı gösteriyor", () => {
    const cases: [string, string, string][] = [
      ["dist/defter/index.html", "en", "/en/guestbook"],
      ["dist/en/guestbook/index.html", "tr", "/defter"],
      ["dist/projeler/index.html", "en", "/en/projects"],
      ["dist/iletisim/index.html", "en", "/en/contact"],
    ];
    for (const [file, lang, beklenen] of cases) {
      if (!existsSync(file)) continue;
      const html = readFileSync(file, "utf8");
      const m = html.match(new RegExp(`hreflang="${lang}" href="([^"]+)"`));
      expect(m, `${file} icinde hreflang=${lang} yok`).toBeTruthy();
      expect(new URL(m![1]).pathname.replace(/\/+$/, "") || "/", file).toBe(beklenen);
    }
  });

  it("çeviri dosyasındaki rotalar manifestoyla aynı", () => {
    for (const p of PAGES) {
      expect(locales.tr.routes[p.key].replace(/\/+$/, "") || "/", `tr.${p.key}`).toBe(p.tr);
      expect(locales.en.routes[p.key].replace(/\/+$/, "") || "/", `en.${p.key}`).toBe(p.en);
    }
  });

  it("sayfa numaraları benzersiz ve sıralı", () => {
    const nums = PAGES.map((p) => p.num);
    expect(new Set(nums).size).toBe(nums.length);
    expect(nums).toEqual(["01", "02", "03", "04", "05"]);
    expect(PAGE_NUM.projects).toBe("03");
  });

  it("menüdeki numara ile sayfa başlığındaki numara aynı (HTML kanıtı)", () => {
    const kontrol: [string, string][] = [
      ["dist/projeler/index.html", "03"],
      ["dist/hakkimda/index.html", "02"],
      ["dist/iletisim/index.html", "04"],
      ["dist/defter/index.html", "05"],
    ];
    for (const [file, num] of kontrol) {
      if (!existsSync(file)) continue;
      const html = readFileSync(file, "utf8");
      const m = html.match(/class="page-no"[^>]*>(\d+)</);
      expect(m, `${file}: page-no yok`).toBeTruthy();
      expect(m![1], `${file}: sayfa numarası`).toBe(num);
    }
  });
});
