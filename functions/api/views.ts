// Ziyaretçi (görüntülenme) sayacı — Cloudflare Pages Function + D1
// GET  /api/views  → mevcut sayıyı döndürür (artırmaz)
// POST /api/views  → aynı ziyaretçi için GÜNDE BİR kez artırır
//
// Tekilleştirme sunucuda yapılır: istemcinin sessionStorage'ı yalnızca
// gereksiz istek atmamak içindir, sayının doğruluğunu o belirlemez.
// Kişisel veri saklanmaz: ham IP değil, gizli tuzla özetlenmiş değeri
// ve yalnızca 2 gün tutulur.

import { json, hashIp, sameOrigin, type BaseEnv } from "./_shared";

type Env = BaseEnv;

async function currentViews(env: Env): Promise<number | null> {
  const row = await env.DB.prepare("SELECT n FROM counters WHERE key = 'views'").first<{
    n: number;
  }>();
  return row?.n ?? 0;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    return json({ views: await currentViews(env) });
  } catch {
    // Veritabanı bağlı değilse site çalışmaya devam etsin, sayaç gizlensin
    return json({ views: null });
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    // Başka sitelerden tetiklenen tarayıcı isteklerini sayma
    if (!sameOrigin(request)) return json({ views: await currentViews(env) });

    const ip = request.headers.get("cf-connecting-ip") ?? "";
    const ipHash = await hashIp(ip, env.IP_SALT);

    // IP_SALT ayarlanmamışsa tekilleştirme yapılamaz → artırmadan mevcut değeri dön.
    // (Zayıf/sabit bir tuza düşmek gizlilik vaadini bozacağı için tercih edilmez.)
    if (!ipHash) return json({ views: await currentViews(env) });

    const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Aynı ziyaretçi + aynı gün → yalnızca ilk kayıt eklenir
    const hit = await env.DB.prepare(
      "INSERT OR IGNORE INTO view_hits (ip_hash, day) VALUES (?, ?)"
    )
      .bind(ipHash, day)
      .run();

    const isNew = (hit.meta?.changes ?? 0) === 1;
    if (isNew) {
      await env.DB.prepare(
        `INSERT INTO counters (key, n) VALUES ('views', 1)
         ON CONFLICT(key) DO UPDATE SET n = n + 1`
      ).run();

      // Eski tekilleştirme kayıtlarını temizle (tablo şişmesin, veri birikmesin)
      const cutoff = new Date(Date.now() - 2 * 86400_000).toISOString().slice(0, 10);
      await env.DB.prepare("DELETE FROM view_hits WHERE day < ?").bind(cutoff).run();
    }

    return json({ views: await currentViews(env) });
  } catch {
    return json({ views: null });
  }
};
