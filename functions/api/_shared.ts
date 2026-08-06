// Uçlar arasında paylaşılan yardımcılar (Cloudflare Pages Functions)

export interface BaseEnv {
  DB: D1Database;
  /** Zorunlu gizli değer. Yoksa IP özeti ÜRETİLMEZ — sessizce zayıf tuza düşülmez. */
  IP_SALT?: string;
}

/**
 * Her Function yanıtına giden güvenlik başlıkları.
 *
 * `public/_headers` dosyasındaki `/*` kuralı Cloudflare Pages'te YALNIZCA
 * statik varlıklara uygulanır; Function yanıtları o kuralı hiç görmez.
 * Bu yüzden başlıklar `json()` yardımcısına gömülüdür — çağıran taraf
 * unutamaz.
 */
const GUVENLIK_BASLIKLARI: Record<string, string> = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-robots-tag": "noindex",
  "cross-origin-resource-policy": "same-origin",
  vary: "Origin",
};

export const json = (data: unknown, status = 200, ekBaslik?: Record<string, string>): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...GUVENLIK_BASLIKLARI,
      ...ekBaslik,
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

/**
 * Yapısal hata kaydı.
 *
 * Her `catch` bloğu sessizdi; D1 bağlaması koparsa, kota dolarsa veya SQL
 * bozulursa site sessizce "henüz not yok" der, sayaç kaybolurdu — Şeyma bunu
 * ancak bir ziyaretçi söylerse öğrenirdi.
 *
 * KİŞİSEL VERİ LOGLANMAZ: ziyaretçi adı, not metni ve IP asla yazılmaz.
 * Yalnızca kapsam, hata adı/mesajı, Cloudflare ray kimliği ve rota.
 */
export function logError(scope: string, err: unknown, request?: Request): void {
  const e = err instanceof Error ? err : new Error(String(err));
  let route: string;
  try {
    route = request ? new URL(request.url).pathname : "";
  } catch {
    route = "";
  }
  console.error(
    JSON.stringify({
      scope,
      name: e.name,
      message: e.message,
      ray: request?.headers.get("cf-ray") ?? null,
      route,
    }),
  );
}

/**
 * Kenar önbelleği yardımcıları.
 *
 * Her iki GET de `no-store` ile dönüyordu; ölçülen TTFB 0,28-0,61 sn.
 * İstemci her `astro:page-load` olayında sayaç istiyordu — 6 sayfalık bir
 * gezintide 6 D1 okuması. Okuma uçları artık kenarda önbelleklenir; yazma
 * uçları ilgili anahtarı düşürür.
 */
const ONBELLEK_SANIYE = 60;

export async function onbellektenAl(request: Request): Promise<Response | null> {
  try {
    const hit = await caches.default.match(request);
    if (!hit) return null;
    const r = new Response(hit.body, hit);
    r.headers.set("x-cache", "HIT");
    return r;
  } catch {
    return null; // önbellek yoksa (yerel geliştirme) sessizce atla
  }
}

export function onbellegeYaz(
  request: Request,
  response: Response,
  ctx: { waitUntil(p: Promise<unknown>): void },
): Response {
  const kopya = new Response(response.body, response);
  kopya.headers.set(
    "cache-control",
    `public, max-age=${ONBELLEK_SANIYE}, stale-while-revalidate=300`,
  );
  kopya.headers.set("x-cache", "MISS");
  try {
    ctx.waitUntil(caches.default.put(request, kopya.clone()));
  } catch {
    /* yerel geliştirmede caches yok — önbelleksiz devam */
  }
  return kopya;
}

/** Yazma işleminden sonra ilgili okuma önbelleğini düşürür. */
export function onbellegiDusur(
  request: Request,
  yollar: string[],
  ctx: { waitUntil(p: Promise<unknown>): void },
): void {
  try {
    const kok = new URL(request.url).origin;
    for (const y of yollar) {
      ctx.waitUntil(caches.default.delete(new Request(kok + y)));
    }
  } catch {
    /* önbellek yoksa yapacak bir şey yok */
  }
}
