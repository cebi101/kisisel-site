// Ziyaretçi defteri — Cloudflare Pages Function + D1
// GET  /api/guestbook  → yalnızca ONAYLANMIŞ notları döndürür
// POST /api/guestbook  → yeni not bırakır; onay bekleyen olarak kaydedilir
//
// Gizlilik: ham IP adresi saklanmaz. Hız sınırı için gizli IP_SALT ile
// tuzlanmış SHA-256 özeti tutulur ve bu özet 1 saat sonra silinir (NULL).
// IP_SALT ayarlı değilse özet hiç üretilmez (sabit tuza düşülmez).

import { json, asObject, hashIp, sameOrigin, type BaseEnv } from "./_shared";

type Env = BaseEnv;

const MAX_NAME = 40;
const MAX_MESSAGE = 280;
const MAX_BODY_BYTES = 4096;
const RATE_LIMIT = 3; // aynı ziyaretçiden saatte en fazla
const LIST_LIMIT = 50;

/** Kontrol karakterlerini temizler, boşlukları sadeleştirir, kırpar */
export const clean = (s: unknown, max: number): string =>
  String(s ?? "")
    .slice(0, max * 4) // regex'ler dev metinlerde çalışmasın
    // Kontrol karakterlerini kasten temizliyoruz (görünmez karakterle biçim bozma)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, message, created_at
         FROM guestbook
        WHERE approved = 1
        ORDER BY created_at DESC
        LIMIT ?`,
    )
      .bind(LIST_LIMIT)
      .all();
    return json({ entries: results ?? [] });
  } catch {
    return json({ entries: [], unavailable: true });
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!sameOrigin(request)) return json({ ok: false, error: "bad_request" }, 403);

  // Dev gövdeleri ayrıştırmadan reddet
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "too_long" }, 413);

  const body = asObject(await request.json().catch(() => null));
  if (!body) return json({ ok: false, error: "bad_request" }, 400);

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
    const ip = request.headers.get("cf-connecting-ip") ?? "";
    const ipHash = await hashIp(ip, env.IP_SALT);

    // Gizli tuz yoksa hız sınırı uygulanamaz → defteri açık bırakmak yerine kapat.
    // (Kurulum eksikse burada fark edilir; sessizce zayıf tuza düşülmez.)
    if (!ipHash) return json({ ok: false, error: "unavailable" }, 503);

    const now = new Date();
    const since = new Date(now.getTime() - 3600_000).toISOString();

    // Sayma ve ekleme TEK ifadede: eşzamanlı isteklerde sınır aşılamaz
    const inserted = await env.DB.prepare(
      `INSERT INTO guestbook (name, message, created_at, approved, ip_hash)
       SELECT ?, ?, ?, 0, ?
        WHERE (SELECT COUNT(*) FROM guestbook
                WHERE ip_hash = ? AND created_at > ?) < ?`,
    )
      .bind(name, message, now.toISOString(), ipHash, ipHash, since, RATE_LIMIT)
      .run();

    if ((inserted.meta?.changes ?? 0) === 0) {
      return json({ ok: false, error: "rate_limited" }, 429);
    }

    // Süresi dolan özetleri sil: hız sınırı penceresi geçtikten sonra
    // ip_hash'in saklanması için hiçbir gerekçe kalmaz
    await env.DB.prepare(
      "UPDATE guestbook SET ip_hash = NULL WHERE ip_hash IS NOT NULL AND created_at <= ?",
    )
      .bind(since)
      .run();

    // approved = 0 → Şeyma onaylayana kadar sitede görünmez
    return json({ ok: true, pending: true });
  } catch {
    return json({ ok: false, error: "unavailable" }, 503);
  }
};
