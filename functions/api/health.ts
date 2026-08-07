// Sağlık ucu — /api/health
// Dış izleme servisi (UptimeRobot vb.) buraya bakar. D1 erişimi kopmuşsa
// 503 döner, böylece sorun ziyaretçiden önce fark edilir.
//
// SIR DEĞERİ ASLA BASILMAZ — yalnızca "tanımlı mı" bilgisi döner.

import { json, logError, type BaseEnv } from "./_shared";

interface Env extends BaseEnv {
  ADMIN_TOKEN?: string;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const govde = {
    db: "hata" as "ok" | "hata",
    salt: Boolean(env.IP_SALT && env.IP_SALT.length >= 24),
    admin: Boolean(env.ADMIN_TOKEN && env.ADMIN_TOKEN.length >= 24),
    // Şeyma kurulumun tuttuğunu TEST MESAJI ATMADAN görebilsin.
    // Yalnız boolean — sır değeri asla basılmaz.
    mail: Boolean(env.RESEND_API_KEY),
    mailFrom: Boolean(env.MAIL_FROM),
  };

  try {
    await env.DB.prepare("SELECT n FROM counters WHERE key = 'views'").first<{ n: number }>();
    govde.db = "ok";
  } catch (err) {
    logError("health.db", err, request);
    return json(govde, 503);
  }

  return json(govde, 200);
};
