// Ziyaretçi defteri — Cloudflare Pages Function + D1
// GET  /api/guestbook  → yalnızca ONAYLANMIŞ notları döndürür
// POST /api/guestbook  → yeni not bırakır; onay bekleyen olarak kaydedilir
//
// Gizlilik: ham IP adresi SAKLANMAZ. Yalnızca hız sınırı için
// tuzlanmış SHA-256 özeti tutulur (geri döndürülemez).

interface Env {
  DB: D1Database;
  IP_SALT?: string; // Cloudflare panelinden ayarlanır (rastgele uzun bir metin)
}

const MAX_NAME = 40;
const MAX_MESSAGE = 280;
const RATE_LIMIT = 3; // aynı ziyaretçiden saatte en fazla
const LIST_LIMIT = 50;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

/** Görünmez kontrol karakterlerini temizler, boşlukları sadeleştirir */
const clean = (s: unknown, max: number): string =>
  String(s ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, message, created_at
         FROM guestbook
        WHERE approved = 1
        ORDER BY created_at DESC
        LIMIT ?`
    )
      .bind(LIST_LIMIT)
      .all();
    return json({ entries: results ?? [] });
  } catch {
    return json({ entries: [], unavailable: true });
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Bal küpü: gerçek kullanıcı bu gizli alanı doldurmaz, botlar doldurur
  if (clean(body.website, 10) !== "") {
    return json({ ok: true, pending: true }); // bota başarılı gibi görün
  }

  const name = clean(body.name, MAX_NAME);
  const message = clean(body.message, MAX_MESSAGE);

  if (name.length < 2 || message.length < 3) {
    return json({ ok: false, error: "too_short" }, 422);
  }

  try {
    const ip = request.headers.get("cf-connecting-ip") ?? "0.0.0.0";
    const ipHash = await hashIp(ip, env.IP_SALT ?? "kisisel-site");

    // Hız sınırı: son 1 saatte kaç kayıt bırakılmış
    const since = new Date(Date.now() - 3600_000).toISOString();
    const recent = await env.DB.prepare(
      "SELECT COUNT(*) AS c FROM guestbook WHERE ip_hash = ? AND created_at > ?"
    )
      .bind(ipHash, since)
      .first<{ c: number }>();

    if ((recent?.c ?? 0) >= RATE_LIMIT) {
      return json({ ok: false, error: "rate_limited" }, 429);
    }

    await env.DB.prepare(
      `INSERT INTO guestbook (name, message, created_at, approved, ip_hash)
       VALUES (?, ?, ?, 0, ?)`
    )
      .bind(name, message, new Date().toISOString(), ipHash)
      .run();

    // approved = 0 → Şeyma onaylayana kadar sitede görünmez
    return json({ ok: true, pending: true });
  } catch {
    return json({ ok: false, error: "unavailable" }, 503);
  }
};
