import { describe, it, expect, beforeAll } from "vitest";

/**
 * API sözleşme testleri — gerçek uçlara HTTP isteği atar.
 *
 * `npm run dev:api` ile yerel sunucu ayakta değilse testler ATLANIR
 * (CI'da bu dosya çalışmaz; yerelde backend'e dokunulduğunda çalıştırılır).
 * Honeypot, saatlik hız sınırı, IP_SALT yokken kapalı arızalanma ve admin
 * yetkilendirmesi bugüne kadar yalnızca kod okunarak doğru kabul ediliyordu.
 */
const TABAN = "http://localhost:8788";
let ayakta = false;

beforeAll(async () => {
  try {
    const r = await fetch(`${TABAN}/api/health`, { signal: AbortSignal.timeout(2000) });
    ayakta = r.status === 200 || r.status === 503;
  } catch {
    ayakta = false;
  }
});

const koy = (ad: string, fn: () => Promise<void>) =>
  it(ad, async () => {
    if (!ayakta) return; // sunucu yok — atla
    await fn();
  });

async function gonder(govde: Record<string, unknown>) {
  return fetch(`${TABAN}/api/guestbook`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(govde),
  });
}

describe("API sözleşmesi", () => {
  koy("sağlık ucu db durumunu bildiriyor", async () => {
    const r = await fetch(`${TABAN}/api/health`);
    const d = await r.json();
    expect(["ok", "hata"]).toContain(d.db);
    expect(typeof d.salt).toBe("boolean");
    // SIR DEĞERİ SIZMAMALI
    expect(JSON.stringify(d)).not.toMatch(/[A-Za-z0-9]{24,}/);
  });

  koy("her yanıt güvenlik başlıklarını taşıyor", async () => {
    const r = await fetch(`${TABAN}/api/views`);
    expect(r.headers.get("x-content-type-options")).toBe("nosniff");
    expect(r.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(r.headers.get("x-robots-tag")).toBe("noindex");
    expect(r.headers.get("cross-origin-resource-policy")).toBe("same-origin");
  });

  koy("honeypot dolu -> 200 döner ama satır EKLENMEZ", async () => {
    const oncekiler = await (await fetch(`${TABAN}/api/guestbook`)).json();
    const r = await gonder({
      name: "bot",
      message: "spam mesaji buraya yaziliyor",
      website: "http://spam.example",
    });
    expect(r.status).toBe(200);
    const sonrakiler = await (await fetch(`${TABAN}/api/guestbook`)).json();
    expect(sonrakiler.entries.length).toBe(oncekiler.entries.length);
  });

  koy("çok kısa mesaj reddedilir", async () => {
    const r = await gonder({ name: "a", message: "b" });
    expect(r.status).toBeGreaterThanOrEqual(400);
  });

  koy("admin token'sız -> 401", async () => {
    const r = await fetch(`${TABAN}/api/admin/guestbook`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "list" }),
    });
    expect(r.status).toBe(401);
  });

  koy("yanlış uzunlukta token -> 401", async () => {
    const r = await fetch(`${TABAN}/api/admin/guestbook`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer kisa" },
      body: JSON.stringify({ action: "list" }),
    });
    expect(r.status).toBe(401);
  });

  koy("onaylanmamış kayıt GET listesinde GÖRÜNMEZ", async () => {
    const benzersiz = "gizli-not-" + Math.floor(performance.now());
    await gonder({ name: "Deneme", message: benzersiz + " icerik" }); // 429 olsa da sorun değil
    const d = await (await fetch(`${TABAN}/api/guestbook`)).json();
    const bulundu = d.entries.some((e: { message: string }) => e.message.includes(benzersiz));
    expect(bulundu).toBe(false);
  });

  koy("aynı ziyaretçi aynı gün sayacı bir kez artırır", async () => {
    const a = await (await fetch(`${TABAN}/api/views`, { method: "POST" })).json();
    const b = await (await fetch(`${TABAN}/api/views`, { method: "POST" })).json();
    expect(b.views).toBe(a.views);
  });

  koy("XSS denemesi sunucuyu çökertmez ve listede görünmez", async () => {
    const zararli = "<img src=x onerror=alert(1)> deneme notu";
    const r = await gonder({ name: "XSS", message: zararli });
    // 200 (kabul, onay bekliyor) veya 429 (saatlik sınır) — ikisi de sağlıklı.
    // Sunucu hatası (5xx) OLMAMALI.
    expect(r.status).toBeLessThan(500);
    const d = await (await fetch(`${TABAN}/api/guestbook`)).json();
    const gorunur = d.entries.some((e: { message: string }) => e.message.includes("onerror"));
    expect(gorunur, "onaylanmamış XSS notu listede görünmemeli").toBe(false);
  });

  koy("saatlik gönderim sınırı 429 + Retry-After ile devreye girer", async () => {
    let sonYanit: Response | null = null;
    // Sınır 3/saat; 5 deneme kesin aşar.
    for (let i = 0; i < 5; i++) {
      sonYanit = await gonder({ name: "Sinir", message: `sinir testi mesaji ${i}` });
      if (sonYanit.status === 429) break;
    }
    expect(sonYanit?.status, "beşinci denemeye kadar sınır devreye girmeliydi").toBe(429);
    expect(sonYanit?.headers.get("retry-after")).toBe("3600");
  });
});
