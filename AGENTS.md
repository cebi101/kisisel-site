# seymanurcebi.dev

Şeyma Nur Çebi'nin kişisel sitesi. **Yayında:** https://seymanurcebi.dev

Astro 7 statik + Cloudflare Pages Functions + D1 · **çerçeve yok**
(React/Vue/Tailwind kullanılmaz) · üretim bağımlılığı yalnız `astro` ve
`@astrojs/sitemap`.

---

## Değişmez kurallar

Bunlar tercih değil, şarttır. Bir görev bunlardan biriyle çelişiyorsa görevi
değil kuralı uygula ve durumu bildir.

1. **Şeyma adına hiçbir şey uydurulmaz.** Başarı, teknoloji, tarih, sayı,
   sertifika, unvan — hepsi ondan gelmelidir. Silmek de bir içerik kararıdır;
   sormadan silinmez. → `icerik-durustluk` skill'i
2. **Commit'lere `Co-Authored-By` eklenmez.** Commit yalnız `cebi101` adına.
   → `commit-kurali` skill'i
3. **CV tek sayfada kalır.** CV'ye dokunan her değişiklikten sonra PDF alınıp
   sayfa sayısı ölçülür. → `cv-tek-sayfa` skill'i
4. **Marka kimliği korunur.** Limon `#fefd4d` + adaçayı + latte skalası;
   Fraunces / Sora / DM Mono (kendi sunucusunda). Yeni renk ailesi ya da font
   getirilmez.
5. **Erişilebilirlik gerilemez.** WCAG 2.2 AA; dokunma hedefi ≥ 44px;
   `prefers-reduced-motion` altında her hareket kapanır.
6. **Ölçmeden değiştirilmez.** "Daha iyi görünüyor" kanıt değildir. Önce ölç,
   değiştir, tekrar ölç, iki sayıyı commit mesajına yaz.
7. **Semptom bastırılmaz.** `overflow: hidden`, `!important` yağmuru,
   `z-index: 9999` ile örtme yok — kök neden bulunur.
8. **Yeni üretim bağımlılığı eklenmez.** Geliştirme bağımlılığı gerekçeli
   olabilir.

---

## Dizin haritası

```
src/
  pages/          rotalar (TR kök, EN /en altında) + /yonetim + /404
  layouts/        Layout (head+JS) · PageLayout (kenar çubuğu+altbilgi) · CvLayout
  components/     Sidebar + sections/ (Hero, About, Projects, Contact, Guestbook, Academic)
  data/           routes.ts (TEK rota manifestosu) · site.ts (sabitler, transkript) · retention.ts
  i18n/           translations.ts — TÜM görünür metin burada, TR+EN
  styles/         global.css (~1.900 satır, jeton tabanlı)
  scripts/        sparkle.ts (imleç efekti, ayrı parça)
  types/          api.ts — istemci/sunucu paylaşılan sözleşme
functions/api/    views · guestbook · contact · health · admin/ · _shared.ts
db/schema.sql     5 tablo (counters, view_hits, guestbook, contact_hits, contact_messages)
tests/            46 test — veri türetimi, i18n paritesi, rotalar, gizlilik, defter
scripts/          measure · contrast · a11y · shots · audit · check-links · _harness
```

**Tek kaynak ilkesi:** rota ve sayfa numarası `src/data/routes.ts`'te, metin
`translations.ts`'te, saklama süreleri `retention.ts`'te. İkinci bir tanım
eklenirse test kırmızıya döner.

---

## Komutlar

| Komut                                              | Ne yapar                                              |
| -------------------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                                      | Astro dev sunucusu (**`/api/*` servis etmez**)        |
| `npm run dev:api`                                  | wrangler pages dev — uçları yerelde dener (port 8788) |
| `npm run db:init:local`                            | Yerel D1 şeması                                       |
| `npm run check`                                    | `astro check` + `tsc -p functions`                    |
| `npm run lint`                                     | eslint + stylelint                                    |
| `npm test`                                         | vitest (46 test)                                      |
| `npm run build`                                    | 15 sayfa üretir                                       |
| `npm run size`                                     | 5 boyut bütçesi                                       |
| `npm run measure`                                  | 12 sayfa × 7 genişlik: taşma, iç boşluk, okuma ölçüsü |
| `npm run audit -- --nav --motion --texture --leak` | dört denetim                                          |
| `node scripts/contrast.mjs`                        | WCAG jeton çiftleri                                   |
| `node scripts/a11y.mjs`                            | dokunma hedefi + scrim tuzağı                         |
| `node scripts/shots.mjs <dizin>`                   | 28 görüntü, görsel regresyon                          |
| `node scripts/check-links.mjs`                     | kırık iç bağlantı                                     |

**Dev sunucusu her zaman arka planda:** `astro dev --background`
Yönetim: `astro dev stop` · `astro dev status` · `astro dev logs`
Sunucu saatlerdir açıksa **bayatlar ve değişiklikleri almaz** —
`dev-sunucu` skill'ine bak.

---

## Skill'ler

`.claude/skills/` altında on tanesi var; her biri bu depoda **fiilen
yaşanmış** bir tekrardan ya da hatadan doğdu.

| Skill              | Ne zaman                                   |
| ------------------ | ------------------------------------------ |
| `dogrula`          | Her değişiklikten sonra, commit'ten önce   |
| `yayinla`          | Yayına alırken ve link vermeden önce       |
| `gorsel-kontrol`   | Görünümü etkileyen değişikliklerde         |
| `cv-tek-sayfa`     | CV'ye dokunulduğunda                       |
| `hata-teshis`      | "Çalışmıyor" denildiğinde — **ilk iş**     |
| `icerik-durustluk` | Görünür metne dokunulduğunda               |
| `commit-kurali`    | Her commit'te                              |
| `defter-yonetim`   | Mesaj/not moderasyonunda                   |
| `kvkk-senkron`     | Gizlilik metni ya da veri işleme değişince |
| `dev-sunucu`       | "Değişiklik görünmüyor" denildiğinde       |

---

## Ortam ve dağıtım

- `main`'e push → Cloudflare Pages **otomatik dağıtır** (2-3 dakika)
- Gizli değerler Cloudflare panelinde **Secret** olarak: `IP_SALT`,
  `ADMIN_TOKEN`, `RESEND_API_KEY`
- Düz değişkenler `wrangler.toml` `[vars]` altında (`MAIL_FROM`,
  `CONTACT_TO`) — `wrangler.toml` varken panel düz değişken kabul etmez
- Önizleme dağıtımları ayrı D1 veritabanı kullanır; üretim verisi kirlenmez
- Panelde secret eklendikten sonra **Retry deployment** şart — mevcut
  dağıtım yeni secret'ı görmez

---

## Kullanıcıyla iletişim

Şeyma Türkçe yazıyor ve teknik jargon istemiyor. Yanıtlar Türkçe, sade ve
kısa olsun; ne yapıldığı değil **ne değiştiği** anlatılsın.

Bir şey çalışmıyorsa **önce ölç, sonra konuş.** "Sende önbellek var" ya da
"eski sürüme bakıyorsun" demeden önce kendi kanıtını topla — bu cümle bu
depoda iki kez haksız yere kuruldu.

Astro belgeleri: https://docs.astro.build
