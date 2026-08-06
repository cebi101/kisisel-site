# seymanurcebi.dev

Şeyma Nur Çebi'nin kişisel sitesi — Türkçe ve İngilizce, çerçevesiz, kendi sunucusunda fontlarla.

**Yayında:** https://seymanurcebi.dev

## Mimari

| Katman     | Ne kullanılıyor                                              |
| ---------- | ------------------------------------------------------------ |
| Site       | Astro 7, statik çıktı — React/Vue/Svelte **yok**             |
| Stil       | Saf CSS + özel değişkenler; Tailwind veya UI kütüphanesi yok |
| Tipografi  | Fraunces 900, Sora 400/500/600, DM Mono — `public/fonts/`    |
| Sunucu     | Cloudflare Pages Functions (`functions/api/*`)               |
| Veritabanı | Cloudflare D1 (SQLite) — ziyaret sayacı ve ziyaretçi defteri |
| Dağıtım    | `main`'e push → Cloudflare Pages otomatik yayımlar           |

Tarayıcıya inen kendi JavaScript'imiz ~2,4 KB (gzip). İmleç ışıltısı ayrı bir
parça olarak yalnızca gerçek imleçli cihazlarda indirilir.

## Dizinler

```
src/
  components/     Astro bileşenleri (sections/ altında sayfa bölümleri)
  data/           routes.ts (tek rota manifestosu), site.ts, contact.ts
  i18n/           translations.ts — TÜM metinler, TR + EN
  layouts/        Layout (head + istemci JS), PageLayout, CvLayout
  scripts/        Ayrı yüklenen istemci modülleri (sparkle.ts)
  styles/         global.css, fonts.css
  types/          api.ts — sunucu/istemci paylaşılan sözleşme
functions/api/    Cloudflare Functions: views, guestbook, admin, health
db/schema.sql     D1 şeması
scripts/          Ölçüm ve denetim araçları (measure, contrast, a11y, shots)
tests/            Vitest — veri, i18n paritesi, rota, API sözleşmesi
```

## Betikler

| Komut                   | Ne yapar                                                 |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Geliştirme sunucusu (API uçları **çalışmaz**)            |
| `npm run dev:api`       | Wrangler ile derleme + API uçları (`localhost:8788`)     |
| `npm run db:init:local` | Yerel D1'e şemayı uygular                                |
| `npm run check`         | Astro + TypeScript tip denetimi (functions dahil)        |
| `npm run lint`          | ESLint + Stylelint                                       |
| `npm run format`        | Prettier                                                 |
| `npm test`              | Vitest — birim + API sözleşme testleri                   |
| `npm run build`         | Üretim derlemesi (`dist/`)                               |
| `npm run size`          | Boyut bütçeleri                                          |
| `npm run measure`       | Sayfa × genişlik ölçümü (taşma, iç boşluk, okuma ölçüsü) |

Ek denetimler: `node scripts/contrast.mjs` (WCAG kontrast), `node scripts/a11y.mjs`
(dokunma hedefleri), `node scripts/check-links.mjs` (kırık iç bağlantı).

## Ortam değişkenleri

Değerler **depoda tutulmaz**. Üretimde Cloudflare secret, yerelde `.dev.vars`
(gitignore'lu — örnek için `.dev.vars.example`).

| Ad            | Ne için                                                   |
| ------------- | --------------------------------------------------------- |
| `DB`          | D1 bağlaması (`wrangler.toml`)                            |
| `IP_SALT`     | IP özetleme tuzu, en az 24 karakter. Yoksa uçlar kapanır. |
| `ADMIN_TOKEN` | Ziyaretçi defteri moderasyonu (Bearer)                    |

Kurulum ve moderasyon adımları: [`docs/BACKEND-KURULUM.md`](docs/BACKEND-KURULUM.md)

## Geliştirme

```sh
npm ci
npm run dev          # arayüz
npm run dev:api      # API uçları da gerekiyorsa
```

Commit öncesi altı kapı da yeşil olmalı:

```sh
npm run check && npm run lint && npm run format:check && npm test && npm run build && npm run size
```
