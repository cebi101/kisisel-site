// İletişim formu mesajları — yönetim ucu.
//
// GET  /api/admin/messages            → gelen mesajları listeler
// POST /api/admin/messages  {id, action:"read"|"delete"}
//
// Form artık e-posta sağlayıcısına BAĞIMLI DEĞİL: mesajlar veritabanına
// kaydedilir ve buradan okunur. Sağlayıcı tanımlıysa e-posta da gider.

import { json, asObject, logError, type BaseEnv } from "../_shared";

interface Env extends BaseEnv {
  ADMIN_TOKEN?: string;
}

/** Sabit süreli karşılaştırma — zamanlama sızıntısı olmasın. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function authorized(request: Request, env: Env): boolean {
  const expected = env.ADMIN_TOKEN;
  if (!expected || expected.length < 16) return false;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return safeEqual(token, expected);
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!authorized(request, env)) return json({ error: "unauthorized" }, 401);
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, email, message, created_at, okundu
         FROM contact_messages
        ORDER BY okundu ASC, created_at DESC
        LIMIT 200`,
    ).all();
    return json({ messages: results ?? [] });
  } catch (err) {
    logError("admin.messages", err, request);
    return json({ error: "unavailable" }, 503);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!authorized(request, env)) return json({ error: "unauthorized" }, 401);

  const body = asObject(await request.json().catch(() => null));
  const id = Number(body?.id);
  const action = String(body?.action ?? "");
  if (!Number.isInteger(id) || id <= 0) return json({ error: "bad_request" }, 400);

  try {
    if (action === "read") {
      await env.DB.prepare("UPDATE contact_messages SET okundu = 1 WHERE id = ?").bind(id).run();
      return json({ ok: true, id, okundu: true });
    }
    if (action === "delete") {
      await env.DB.prepare("DELETE FROM contact_messages WHERE id = ?").bind(id).run();
      return json({ ok: true, id, deleted: true });
    }
    return json({ error: "bad_request" }, 400);
  } catch (err) {
    logError("admin.messages", err, request);
    return json({ error: "unavailable" }, 503);
  }
};
