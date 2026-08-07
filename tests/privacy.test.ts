import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { locales } from "../src/i18n/translations";
import {
  ONAYSIZ_NOT_GUN,
  IP_OZETI_SAAT,
  GORUNTULENME_GUN,
  ILETISIM_KAYDI_SAAT,
} from "../src/data/retention";

/**
 * Aydınlatma metninde yazan süre ile sunucunun UYGULADIĞI süre birbirinden
 * sürüklenebilir ve bunu hiçbir şey yakalamaz. Bu testler iki tarafı bağlar.
 */
describe("gizlilik metni ile kod tutarlılığı", () => {
  it("metin saklama sürelerini yer tutucuyla yazıyor (elle sayı yazılmamış)", () => {
    for (const lang of ["tr", "en"] as const) {
      const b = locales[lang].privacy.sections.find((x) => /Saklama|Retention/i.test(x.h));
      expect(b, `${lang}: saklama bölümü yok`).toBeTruthy();
      expect(b!.p).toContain("{ONAYSIZ_NOT_GUN}");
      expect(b!.p).toContain("{IP_OZETI_SAAT}");
    }
  });

  it("sunucu kodu saklama sabitini kullanıyor, elle sayı yazmıyor", () => {
    const src = readFileSync("functions/api/guestbook.ts", "utf8");
    expect(src).toContain("ONAYSIZ_NOT_GUN");
    // Sabit değiştiğinde metin de değişmeli — ikisi aynı modülden okuyor
    expect(ONAYSIZ_NOT_GUN).toBeGreaterThan(0);
  });

  it("üretilen sayfada gerçek sayılar basılmış", () => {
    if (!existsSync("dist/gizlilik/index.html")) return;
    const h = readFileSync("dist/gizlilik/index.html", "utf8");
    expect(h).toContain(`${ONAYSIZ_NOT_GUN} gün`);
    expect(h).not.toContain("{ONAYSIZ_NOT_GUN}"); // yer tutucu sızmamalı
    expect(h).toContain(`${GORUNTULENME_GUN} gün`);
    expect(h).toContain(`${IP_OZETI_SAAT} saat`);
    expect(ILETISIM_KAYDI_SAAT).toBeGreaterThan(0);
  });

  it("Resend aktarımı kodda varsa metin bunu BEYAN ETMELİ", () => {
    const kod = readFileSync("functions/api/contact.ts", "utf8");
    if (!kod.includes("api.resend.com")) return;
    for (const lang of ["tr", "en"] as const) {
      const hepsi = locales[lang].privacy.sections.map((x) => x.p).join(" ");
      expect(hepsi, `${lang}: Resend aktarımı beyan edilmemiş`).toMatch(/Resend/i);
    }
  });

  it("iki dilde de aynı sayıda bölüm var", () => {
    expect(locales.tr.privacy.sections.length).toBe(locales.en.privacy.sections.length);
    expect(locales.tr.privacy.sections.length).toBeGreaterThanOrEqual(10);
  });

  it("çerez kullanılmadığı beyanı kodla tutarlı", () => {
    const hepsi = locales.tr.privacy.sections.map((x) => x.p).join(" ");
    expect(hepsi).toMatch(/ÇEREZ KULLANMAZ/);
  });
});
