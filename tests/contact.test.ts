import { describe, it, expect } from "vitest";
import { temizle, epostaGecerli, postaGovdesi } from "../functions/api/contact";

describe("iletişim ucu — saf mantık", () => {
  it("kontrol karakterlerini temizler", () => {
    const girdi = "ab" + String.fromCharCode(0) + "cd" + String.fromCharCode(31) + "ef";
    expect(temizle(girdi, 100)).toBe("ab cd ef");
  });

  it("azami uzunlukta keser", () => {
    expect(temizle("a".repeat(5000), 2000)).toHaveLength(2000);
  });

  it("null/undefined için boş dize döner", () => {
    expect(temizle(null, 50)).toBe("");
    expect(temizle(undefined, 50)).toBe("");
  });

  it("geçerli e-postaları kabul eder", () => {
    for (const e of ["a@b.co", "seyma.nur+etiket@ornek.com.tr", "x_y-z@alt.ornek.org"]) {
      expect(epostaGecerli(e), e).toBe(true);
    }
  });

  it("geçersiz e-postaları reddeder", () => {
    for (const e of ["", "duz-metin", "a@b", "a@b.c", "@yok.com", "bosluk var@x.com"]) {
      expect(epostaGecerli(e), e).toBe(false);
    }
  });

  it("MAIL_FROM yoksa sandbox adresini kullanır (DNS doğrulaması gerekmez)", () => {
    const g = postaGovdesi({}, { ad: "Test", eposta: "a@b.com", mesaj: "merhaba dunya" });
    expect(g.from).toContain("onboarding@resend.dev");
  });

  it("MAIL_FROM verilince onu kullanır — koda dokunmadan alan adına geçilebilir", () => {
    const g = postaGovdesi(
      { MAIL_FROM: "Site <site@seymanurcebi.dev>" },
      { ad: "Test", eposta: "a@b.com", mesaj: "merhaba dunya" },
    );
    expect(g.from).toBe("Site <site@seymanurcebi.dev>");
  });

  it("yanıt adresi ZİYARETÇİNİN adresidir (yanıtla dediğinde ona gitsin)", () => {
    const g = postaGovdesi({}, { ad: "Ayse", eposta: "ayse@ornek.com", mesaj: "merhaba dunya" });
    expect(g.reply_to).toBe("ayse@ornek.com");
    expect(g.subject).toContain("Ayse");
    expect(g.text).toContain("ayse@ornek.com");
  });

  it("CONTACT_TO verilmezse varsayılan alıcıya gider", () => {
    const g = postaGovdesi({}, { ad: "T", eposta: "a@b.com", mesaj: "merhaba dunya" });
    expect(g.to).toEqual(["seymanurcebi6@gmail.com"]);
  });
});
