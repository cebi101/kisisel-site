import { describe, it, expect } from "vitest";
import { locales, SKILL_GROUPS } from "../src/i18n/translations";

/** Nesneyi özyinelemeli gezip "a.b.c" biçiminde yol listesi üretir. */
function paths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[]`];
  if (obj && typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      paths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

/** Dizi uzunluklarını "a.b" -> uzunluk olarak toplar. */
function arrayLengths(obj: unknown, prefix = "", out: Record<string, number> = {}) {
  if (Array.isArray(obj)) {
    out[prefix] = obj.length;
    obj.forEach((v, i) => arrayLengths(v, `${prefix}[${i}]`, out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      arrayLengths(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

describe("TR/EN içerik paritesi", () => {
  it("iki dilde de aynı anahtar yolları var", () => {
    const tr = new Set(paths(locales.tr));
    const en = new Set(paths(locales.en));
    const trFazla = [...tr].filter((p) => !en.has(p));
    const enFazla = [...en].filter((p) => !tr.has(p));
    expect(trFazla, `EN'de eksik anahtarlar: ${trFazla.join(", ")}`).toEqual([]);
    expect(enFazla, `TR'de eksik anahtarlar: ${enFazla.join(", ")}`).toEqual([]);
  });

  it("her dizi alanı iki dilde EŞİT uzunlukta", () => {
    const a = arrayLengths(locales.tr);
    const b = arrayLengths(locales.en);
    const uyusmaz: string[] = [];
    for (const k of Object.keys(a)) {
      if (b[k] !== a[k]) uyusmaz.push(`${k} uzunluk uyuşmazlığı: tr=${a[k]} en=${b[k]}`);
    }
    expect(uyusmaz, uyusmaz.join(" | ")).toEqual([]);
  });

  it("akademik dönem etiketleri gerçek dönem sayısıyla eşleşir", async () => {
    const { SEMESTERS } = await import("../src/data/site");
    for (const lang of ["tr", "en"] as const) {
      expect(locales[lang].about.academic.terms.length).toBe(SEMESTERS.length);
      expect(locales[lang].about.academic.termsShort.length).toBe(SEMESTERS.length);
    }
  });

  it("yetenek grupları iki dilde de etiketli", () => {
    for (const g of SKILL_GROUPS) {
      expect(locales.tr.about.skillGroups[g.key], `tr.${g.key}`).toBeTruthy();
      expect(locales.en.about.skillGroups[g.key], `en.${g.key}`).toBeTruthy();
      expect(g.items.length).toBeGreaterThan(0);
    }
  });

  it("her sayfanın kendi başlık ve açıklaması var, kopya değil", () => {
    for (const lang of ["tr", "en"] as const) {
      const t = locales[lang];
      expect(t.title.length).toBeGreaterThan(10);
      expect(t.description.length).toBeGreaterThan(40);
    }
    expect(locales.tr.title).not.toBe(locales.en.title);
    expect(locales.tr.description).not.toBe(locales.en.description);
  });
});
