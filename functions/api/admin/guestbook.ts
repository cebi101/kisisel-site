// Ziyaretçi defteri yönetimi — yalnızca Şeyma içindir.
// Kimlik doğrulama: Authorization: Bearer <ADMIN_TOKEN>
// ADMIN_TOKEN, Cloudflare panelinden ortam değişkeni olarak ayarlanır (Secret).
//
// GET    /api/admin/guestbook            → onay bekleyenleri listeler
// POST   /api/admin/guestbook  {id, action:"approve"|"delete"}

import { json, asObject, logError, onbellegiDusur } from "../_shared";

interface Env {
  DB: D1Database;
  ADMIN_TOKEN?: string;
}

/** Sabit süreli karşılaştırma — token'ı harf harf sızdırmamak için */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function authorized(request: Request, env: Env): boolean {
  const expected = env.ADMIN_TOKEN;
  if (!expected || expected.length < 16) return false; // token yoksa kapalı
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return safeEqual(token, expected);
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!authorized(request, env)) return json({ error: "unauthorized" }, 401);
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, message, created_at, approved
         FROM guestbook
        ORDER BY approved ASC, created_at DESC
        LIMIT 200`,
    ).all();
    return json({ entries: results ?? [] });
  } catch (err) {
    logError("admin.guestbook", err, request);
    return json({ error: "unavailable" }, 503);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!authorized(request, env)) return json({ error: "unauthorized" }, 401);

  const body = asObject(await request.json().catch(() => null));
  if (!body) return json({ error: "bad_request" }, 400);

  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) return json({ error: "bad_id" }, 400);

  try {
    if (body.action === "approve") {
      await env.DB.prepare("UPDATE guestbook SET approved = 1 WHERE id = ?").bind(id).run();
      // Onaylanan not defterde görünmeli — okuma önbelleğini düşür
      onbellegiDusur(request, ["/api/guestbook"], { waitUntil });
      return json({ ok: true, id, approved: true });
    }
    if (body.action === "delete") {
      await env.DB.prepare("DELETE FROM guestbook WHERE id = ?").bind(id).run();
      onbellegiDusur(request, ["/api/guestbook"], { waitUntil });
      return json({ ok: true, id, deleted: true });
    }
    return json({ error: "bad_action" }, 400);
  } catch (err) {
    logError("admin.guestbook", err, request);
    return json({ error: "unavailable" }, 503);
  }
};
