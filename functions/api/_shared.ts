// Uçlar arasında paylaşılan yardımcılar (Cloudflare Pages Functions)

export interface BaseEnv {
  DB: D1Database;
  /** Zorunlu gizli değer. Yoksa IP özeti ÜRETİLMEZ — sessizce zayıf tuza düşülmez. */
  IP_SALT?: string;
}

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

/** Gövde nesne mi? (`null`, dizi ve ilkel değerler geçersizdir) */
export function asObject(raw: unknown): Record<string, unknown> | null {
  return raw && typeof raw === "object" && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : null;
}

/**
 * IP'yi gizli tuzla özetler.
 * Tuz yoksa veya kısaysa `null` döner — çağıran taraf buna göre kapalı arızalanır.
 * (Depoda yazılı sabit bir tuza ASLA düşülmez: kod herkese açık.)
 */
export async function hashIp(ip: string, salt: string | undefined): Promise<string | null> {
  if (!salt || salt.length < 24) return null;
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Sitenin kendi sayfalarından gelmeyen tarayıcı isteklerini eler */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // tarayıcı dışı istemciler (curl) — CORS zaten yok
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
