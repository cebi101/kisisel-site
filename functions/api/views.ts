// Ziyaretçi (görüntülenme) sayacı — Cloudflare Pages Function + D1
// GET  /api/views  → mevcut sayıyı döndürür (artırmaz)
// POST /api/views  → bir artırır ve yeni sayıyı döndürür
//
// Kişisel veri saklanmaz: yalnızca tek bir tam sayı tutulur.

interface Env {
  DB: D1Database;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const row = await env.DB.prepare("SELECT n FROM counters WHERE key = 'views'").first<{
      n: number;
    }>();
    return json({ views: row?.n ?? 0 });
  } catch {
    // Veritabanı henüz bağlanmadıysa site çalışmaya devam etsin
    return json({ views: null }, 200);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ env }) => {
  try {
    await env.DB.prepare(
      `INSERT INTO counters (key, n) VALUES ('views', 1)
       ON CONFLICT(key) DO UPDATE SET n = n + 1`
    ).run();
    const row = await env.DB.prepare("SELECT n FROM counters WHERE key = 'views'").first<{
      n: number;
    }>();
    return json({ views: row?.n ?? 0 });
  } catch {
    return json({ views: null }, 200);
  }
};
