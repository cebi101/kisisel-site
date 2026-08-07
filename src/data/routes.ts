// TEK ROTA MANİFESTOSU.
//
// Rota bilgisi eskiden üç ayrı yerde yazılıydı (translations.ts'te iki kez,
// Layout.astro'da bir eşleme tablosu, Sidebar.astro'da sabit numaralar) ve
// birbirinden sürüklendi. İki gerçek hata üretti:
//   1) /defter ile /en/guestbook hreflang'de eşleşmiyordu (ikisi de ana
//      sayfayı gösteriyordu) — arama motorları çeviri çifti kuramıyordu.
//   2) Menü "03 Projeler" derken sayfa başlığı "02" diyordu.
// Artık numara ve rota TEK yerden gelir; ikinci bir tanım eklenirse
// tests/routes.test.ts kırmızıya döner.

export const PAGES = [
  { key: "home", num: "01", tr: "/", en: "/en" },
  { key: "about", num: "02", tr: "/hakkimda", en: "/en/about" },
  { key: "projects", num: "03", tr: "/projeler", en: "/en/projects" },
  { key: "contact", num: "04", tr: "/iletisim", en: "/en/contact" },
  { key: "guestbook", num: "05", tr: "/defter", en: "/en/guestbook" },
] as const;

/** Menüde görünmeyen ama iki dilde karşılığı olan sayfalar. */
export const EXTRA_PAGES = [
  { key: "cv", tr: "/cv", en: "/en/cv" },
  { key: "privacy", tr: "/gizlilik", en: "/en/privacy" },
] as const;

export type PageKey = (typeof PAGES)[number]["key"];

/** Menüde görünmeyen sayfalar dahil tüm rota anahtarları. */
export type NavKey = PageKey | (typeof EXTRA_PAGES)[number]["key"];

/** Sayfa numarası — menüde ve sayfa başlığında aynı değer kullanılır. */
export const PAGE_NUM: Record<PageKey, string> = Object.fromEntries(
  PAGES.map((p) => [p.key, p.num]),
) as Record<PageKey, string>;

/** Bir yolun öbür dildeki karşılığı; eşi yoksa o dilin ana sayfası. */
export function otherLangPath(path: string, from: "tr" | "en"): string {
  const norm = path.replace(/\/+$/, "") || "/";
  const all = [...PAGES, ...EXTRA_PAGES];
  const hit = all.find((p) => (from === "tr" ? p.tr : p.en) === norm);
  if (hit) return from === "tr" ? hit.en : hit.tr;
  return from === "tr" ? "/en" : "/";
}
