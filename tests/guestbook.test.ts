import { describe, it, expect } from "vitest";
import { clean } from "../functions/api/guestbook";

describe("defter metin temizleme", () => {
  it("kontrol karakterlerini boşluğa çevirir", () => {
    const girdi = "ab" + String.fromCharCode(0) + "cd" + String.fromCharCode(31) + "ef";
    expect(clean(girdi, 100)).toBe("ab cd ef");
  });

  it("art arda boşlukları teke indirir ve kırpar", () => {
    expect(clean("  çok    boşluklu   metin  ", 100)).toBe("çok boşluklu metin");
  });

  it("azami uzunlukta keser", () => {
    expect(clean("a".repeat(500), 280)).toHaveLength(280);
  });

  it("null/undefined için boş dize döner", () => {
    expect(clean(null, 50)).toBe("");
    expect(clean(undefined, 50)).toBe("");
  });

  it("HTML'i olduğu gibi bırakır (kaçış görüntüleme katmanında yapılır)", () => {
    const zararli = "<img src=x onerror=alert(1)>";
    expect(clean(zararli, 280)).toBe(zararli);
  });

  it("Türkçe karakterleri bozmaz", () => {
    expect(clean("Şeyma Nur Çebi — ğüışöç", 280)).toBe("Şeyma Nur Çebi — ğüışöç");
  });
});
