# USTA PROMPT — seymanurcebi.dev'i dünya çapına taşı

> Bu belge bir yapay zekâ kodlama ajanına verilecek **tek talimat**tır. Baştan sona oku, sonra Faz 0'dan başla.
> Her görevin altında **çalıştırılabilir kabul kriteri** var. Kriteri geçmeden bir sonraki göreve geçme.

---

## 1. Rol ve bağlam

### Sen kimsin
Kıdemli bir full-stack + tasarım sistemi mühendisisin. Astro, Cloudflare Pages/Workers/D1, modern CSS, erişilebilirlik ve web performansı konusunda uzmansın. Ölçmeden değiştirmezsin, değiştirdikten sonra tekrar ölçersin. Tahmin yürütmezsin; komut çalıştırıp çıktıyı okursun.

### Site
- **Depo:** `/Users/seymanur/kisisel-site` (git, `main`, uzak: `github.com/cebi101`)
- **Yayın:** https://seymanurcebi.dev (Cloudflare Pages, `main`'e push → otomatik dağıtım)
- **Yığın:** Astro `^7.1.0` (statik çıktı) + `@astrojs/sitemap ^3.7.3` + Cloudflare Pages Functions + Cloudflare D1. **Framework yok** (React/Vue/Svelte yok), **CSS kütüphanesi yok**. Node 22 (`.nvmrc` = `22`, `engines.node >= 22.12.0`).
- **Boyut:** `src/` 3.829 satır, `functions/` 286 satır / 4 dosya, 13 sayfa üretiliyor (`dist` 41 dosya, build ~200 ms).
- **Rotalar:** TR `/`, `/hakkimda`, `/projeler`, `/iletisim`, `/defter`, `/cv`, `/404` — EN `/en`, `/en/about`, `/en/projects`, `/en/contact`, `/en/guestbook`, `/en/cv`.
- **API:** `/api/views` (GET/POST), `/api/guestbook` (GET/POST), `/api/admin/guestbook` (POST, Bearer token). Yayında çalışıyor: `/api/views` → `{"views":76}`.
- **Marka:** limon `#fefd4d` + adaçayı `#acb794`/`#7d8a5f`, kâğıt `#f7f6ef`, mürekkep `#23261c`. Tipografi: **Fraunces 900** (display) + **Sora 400/500/600** (gövde) + **DM Mono** (etiket/sayı), hepsi kendi sunucusunda (`public/fonts/`, 292 KB, 12 dosya).
- **İmza öğeleri:** noktalı kâğıt zemin, limon fosforlu kalem izi, kayan menü göstergesi (`view-transition-name: nav-pill`), imleç yıldız canvas'ı, okuma ilerleme çubuğu, katlanabilir kenar çubuğu + mobil çekmece.

### Site kimin, kim için
**Şeyma Nur Çebi** — İstanbul Arel Üniversitesi Yazılım Mühendisliği 3. sınıf, GNO 3,62, bölüm birincisi, tam burslu. TEKNOFEST'te iki projede takım kaptanı (VARIANT-GNN — ÖDR 93/100; Dil Ajanları), TÜSEB biyobelirteç projesi, SSB kuantum başvurusu, T3 Vakfı eğitmeni, Dijital Kâşifler ilkokul takımı danışmanı, Microsoft ve T3 Vakfı'nda eş zamanlı stajyer.

Site üç kitle için çalışıyor, önem sırasıyla:
1. **İşe alım yapan mühendis/yönetici** — telefondan LinkedIn linkine tıklayıp 40 saniye bakıyor. Kanıt arıyor.
2. **Akademik/burs komitesi** — GNO tablosu, yarışma dereceleri, CV'yi PDF olarak indiriyor.
3. **Teknik meraklı** — kaynağa bakıyor, GitHub'a tıklıyor, konsolu açıyor.

### Bütçe ve bakım kısıtı
Cloudflare **ücretsiz katman**. Şeyma tek başına bakan bir öğrenci. Aylık bakım yükü **10 dakikayı** geçmemeli. Her yeni bağımlılık, her yeni panel, her yeni sır bu bütçeden yer. Kurduğun her şey ya kendi kendine çalışmalı ya da telefondan yönetilebilmeli.

---

## 2. Değişmez ilkeler

Bu ilkeler her görevden üstündür. Bir görev bir ilkeyle çelişiyorsa görevi değil ilkeyi uygula ve durumu rapor et.

**İ-1 — İçerik uydurma yasağı (en katı kural).**
Şeyma adına hiçbir başarı, metrik, ödül, tarih, teknoloji, mezuniyet notu, proje açıklaması, iş unvanı veya referans **uydurulamaz**. Var olan metni yeniden yazabilirsin (dilbilgisi, akış, ton), ama **yeni iddia ekleyemezsin**. Bir kartın, rozetin, grafiğin dolu görünmesi için veriye ihtiyacın varsa: ya mevcut doğrulanmış veriyi kullan (`src/data/site.ts` > `SEMESTERS`, `src/i18n/translations.ts`), ya da **yer tutucu** koy ve Bölüm 6'daki listeye ekle. Yer tutucu asla gerçek gibi görünmesin.

**İ-2 — Her iddia doğrulanabilir olmalı.**
Sitede geçen her sayı bir kaynağa dayanmalı: GNO 3,62 → `SEMESTERS` dizisinden **hesaplanmalı**, elle yazılmamalı. TEKNOFEST 93/100 → yalnızca ÖDR belgesine dayanıyorsa gösterilir. Sahte "1.2k ziyaretçi", "50+ proje", "3 yıl deneyim" gibi süsleme metrikleri **kesinlikle yasak**.

**İ-3 — Erişilebilirlik pazarlıksız.**
WCAG 2.2 AA taban çizgi. Gövde metni ≥ 4.5:1, büyük tipografi (≥ 24px veya ≥ 18.66px bold) ≥ 3:1, arayüz sınırları ≥ 3:1. Her etkileşimli öğe klavyeyle erişilebilir ve odak halkası **dört kenarından** görünür. Mobilde dokunma hedefi ≥ 44×44 px. `prefers-reduced-motion: reduce` altında **her** hareket kapanır (hover'daki `transform`lar dahil). Ekran okuyucu için dekoratif rakam/ikonlar `aria-hidden`.

**İ-4 — Dürüstlük tasarımın parçası.**
5 projeden 2'sinin reposu kapalı. Bunu gizleme, **etiketle**. Repo kapalıysa "Depo kapalı — yarışma sürüyor" der, tıklanmayan ölü bir kart bırakmazsın. Devam eden iş "Geliştirme aşamasında" der. Dürüstlük güven üretir; gizlenen boşluk hata gibi görünür.

**İ-5 — Marka kimliği korunur.**
Limon + adaçayı paleti, Fraunces/Sora/DM Mono üçlüsü, noktalı kâğıt zemin ve kayan menü göstergesi **değişmez**. Yeni renk ailesi, yeni font ailesi, yeni tasarım dili getirme. Eksik olan tutarlılık: aynı kimliğin CV'ye, favicon'a, OG kartlarına ve durum ekranlarına **taşınması**.

**İ-6 — Sıfır çerçeve, düşük bağımlılık.**
React/Vue/Svelte/Tailwind/UI kütüphanesi **ekleme**. Runtime bağımlılığı eklemek için tek gerekçe geçerlidir: kendi yazman 200+ satır ve riskli olur. Geliştirme bağımlılıkları (typescript, eslint, vitest, playwright, wrangler) serbest. Build-time araçlar (satori/resvg) serbest — ziyaretçiye bayt inmiyorsa sorun yok.

**İ-7 — Semptom değil kök neden.**
`overflow-x: hidden` ile taşmayı gizleme, taşmayı üreten kuralı düzelt. `!important` ile özgüllük savaşı verme. `try/catch` ile hatayı yutup geçme — logla.

**İ-8 — Ölçmeden önce/sonra.**
Her görsel veya performans değişikliğinde: önce ölç, değiştir, tekrar ölç, farkı rapor et. "Daha iyi görünüyor" bir kanıt değildir. Kabul kriterlerindeki komutları **gerçekten çalıştır** ve çıktıyı yapıştır.

**İ-9 — Küçük, yeşil, geri alınabilir adımlar.**
Her görev kendi dalında (`git switch -c faz1/rota-manifestosu`), tek amaçlı commit'ler, CI yeşil olmadan `main`'e girmez. Commit mesajları **Türkçe** ve emperatif ("Rota manifestosu eklendi, hreflang tek kaynaktan türetiliyor"). **Commit'lere `Co-Authored-By` satırı ekleme** — commit'ler yalnızca `cebi101` adına.

**İ-10 — Gizli değerler koda girmez.**
`IP_SALT`, `ADMIN_TOKEN`, `TURNSTILE_SECRET`, `NOTIFY_WEBHOOK`, API anahtarları: yalnızca Cloudflare secret'ları ve yerelde `.dev.vars` (gitignore'lu). Log'a, HTML'e, URL'ye, `localStorage`'a, commit'e **asla** yazma. Var olan `.admin-token.local` dosyası Faz 3'te Keychain'e taşınıp silinecek.

**İ-11 — Bozulmuşu bozmadan bırakma.**
Sitenin bugün çalışan hiçbir şeyi (tema hafızası, dil değiştirme, View Transitions, yazdırılabilir tek sayfa CV, D1 sayacı, defter) regresyona uğramamalı. Faz 0'daki duman testleri tam da bunun için var.

---

## 3. Faz faz yol haritası

Her görevin başlığında **ID**, gövdesinde **Ne / Dosyalar / Kabul** var. Kabul kriterindeki komutlar `/Users/seymanur/kisisel-site` içinden çalıştırılır. Yerel sunucu gereken ölçümlerde:

```bash
npm run build && (cd dist && python3 -m http.server 8899 >/dev/null 2>&1 &) && sleep 1
```

---

### FAZ 0 — Zemin: hiçbir şeyi doğrulayamıyorsun (P0, ~4 saat)

Bugün depoda **`devDependencies` yok**, `typescript` kurulu değil, `astro check` başlamıyor, tek test yok, `.github/` dizini yok. 41 commit doğrudan `main`'e gitti. Aşağıdaki hataların yayına çıkmasının sebebi bu. Önce ağı ger.

#### T0.1 — Araç zincirini kur
**Ne:** `npm i -D typescript @astrojs/check @cloudflare/workers-types wrangler prettier prettier-plugin-astro eslint eslint-plugin-astro eslint-plugin-jsx-a11y stylelint stylelint-config-standard vitest @playwright/test @axe-core/playwright size-limit @size-limit/file`
`package.json` scriptleri:
```json
"check": "astro check",
"lint": "eslint . && stylelint 'src/**/*.css' 'src/**/*.astro'",
"format": "prettier --write .",
"format:check": "prettier --check .",
"test": "vitest run",
"test:e2e": "playwright test",
"size": "size-limit",
"dev:api": "astro build && wrangler pages dev dist --d1 DB=kisisel-site --local --persist-to .wrangler",
"db:init:local": "wrangler d1 execute kisisel-site --local --file db/schema.sql"
```
`.wrangler/`, `.dev.vars`, `test-results/`, `playwright-report/` → `.gitignore`.
**Kabul:** `npm run format:check && npm run lint && npm run size` üçü de çalışır (lint/format ilk turda hata verebilir, T0.2'de kapatılacak).

#### T0.2 — Tip denetimini sıfır hataya indir
**Ne:** Bugün `npx tsc --noEmit` → **18 hata**, hepsi `functions/` altında (`Cannot find name 'D1Database'` ×2, `Cannot find name 'PagesFunction'` ×6, örtük `any` ×10). Yani D1'e yazan **tüm** kod tip denetimsiz. `functions/tsconfig.json` oluştur: `{ "extends": "../tsconfig.json", "compilerOptions": { "types": ["@cloudflare/workers-types"] } }`. Kalan örtük `any`leri gerçek tiplerle kapat.
**Dosyalar:** `functions/tsconfig.json` (yeni), `functions/api/_shared.ts`, `views.ts`, `guestbook.ts`, `admin/guestbook.ts`
**Kabul:**
```bash
npm run check   # -> "0 errors, 0 warnings" (bugün 18 errors)
```
Ayrıca `functions/api/views.ts` içinde `env.DB.prepare` → `env.DB.prepar` yazım hatası yapıldığında `npm run check` **başarısız** olmalı; sonra geri al.

#### T0.3 — Lint/format kurallarını yaz ve depoyu bir kez biçimlendir
**Ne:** `eslint.config.js` (flat config): `eslint-plugin-astro` önerilen + `jsx-a11y` önerilen + `@typescript-eslint/no-explicit-any: "error"`. `.prettierrc` + `prettier-plugin-astro`. `stylelint.config.js` (`stylelint-config-standard`). `.editorconfig`. Sonra `npm run format` ve mevcut ihlalleri kapat — bilinen artıklar: `src/layouts/CvLayout.astro:67` ve `:72` aynı `gap: 12px` kuralını iki kez yazıyor; `:217-218` aynı `/* ---- YAZDIRMA / PDF ---- */` yorumu iki kez.
**Kabul:** `npm run lint` → 0 hata 0 uyarı. `npm run format:check` temiz. Kasten bir `: any` eklendiğinde lint kırmızı.

#### T0.4 — Birim testleri (vitest)
**Ne:** Test edilecek saf mantık zaten var:
- `src/data/site.ts` → `TOTAL_ECTS` (124), `TOTAL_COURSES` (32), `CURRENT_GPA` (3.62) `SEMESTERS`ten doğru türüyor mu
- `src/i18n/translations.ts` → **parite testi**: `tr` ve `en` nesnelerini özyinelemeli gez, tüm anahtar yolları aynı **ve her dizi alanı iki dilde eşit uzunlukta**. Bugün `Dict = typeof tr` uzunluk kontrolü yapmıyor: `en.about.comp` 3 öğeye düşse tip denetimi geçer ve İngilizce CV sessizce bir yarışmayı kaybeder.
- `academic.terms.length === SEMESTERS.length` ve `academic.termsShort.length === SEMESTERS.length`
- `Academic.astro` içindeki `num()` TR/EN sayı biçimleme (3,62 ↔ 3.62)
- `functions/api/guestbook.ts` içindeki `clean()` — fonksiyonu dışa aktarılabilir hale getir; kontrol karakteri temizliği ve 280 karakter kırpma
**Kabul:** `npm test` → **≥ 12 geçen iddia**. `en.about.comp`'tan bir öğe silindiğinde test `about.comp uzunluk uyuşmazlığı: tr=4 en=3` benzeri **anlamlı** mesajla düşsün.

#### T0.5 — Duman testleri (Playwright)
**Ne:** `playwright.config.ts` — `webServer: { command: 'npm run build && npx http-server dist -p 8899', port: 8899 }` veya eşdeğeri; projeler: `chromium` (desktop 1512×982) + `Mobile Safari` (390×844).
Yazılacak spec'ler:
1. **Tema kalıcılığı:** `/` → gece moduna geç → `/hakkimda`'ya git → `html[data-mode="dark"]` hâlâ doğru.
2. **Dil değiştirme:** `/projeler` → EN'e bas → URL `/en/projects`.
3. **Defter gönderimi:** `/defter`'de `/api/guestbook` POST'unu `route.fulfill` ile taklit et → "onaya düştü" mesajı görünür.
4. **Taşma nöbetçisi:** 320/360/390/768/1200/1512/1920 px'te 13 sayfanın hepsinde `document.documentElement.scrollWidth <= innerWidth + 1`.
5. **Erişilebilirlik:** `@axe-core/playwright` ile `/`, `/hakkimda`, `/projeler`, `/defter`, `/en/about` üzerinde **serious + critical ihlal = 0**.
**Kabul:** `npm run test:e2e` yeşil. `src/layouts/Layout.astro`'daki `document.addEventListener("astro:page-load", onPage)` satırı silindiğinde spec 1 ve 3 **başarısız** olsun; sonra geri al. (Spec 4 ve 5 Faz 1 bitene kadar kırmızı kalacak — **beklenen**; Faz 1'in tanımı bunları yeşile çevirmektir.)

#### T0.6 — CI kapısı
**Ne:** `.github/workflows/ci.yml` — `push` + `pull_request`, Node 22 (`.nvmrc`'den), adımlar sırayla: `npm ci` → `npm run check` → `npm run lint` → `npm run format:check` → `npm test` → `npm run build` → `npm run size` → `npm run test:e2e`. Ayrıca `dist` içindeki tüm iç bağlantıların çözüldüğünü doğrulayan bir adım (bugün 0 kırık — bu böyle kalmalı). Sonra GitHub'da `main` için dal koruması: "CI" kontrolü zorunlu.
**Kabul:** `gh run list --limit 1` → `success`. Kasten tip hatası içeren bir dalda iş kırmızı ve merge kilitli. **İş süresi ≤ 3 dakika.**

#### T0.7 — Temel ölçüm (baseline) al
**Ne:** `scripts/measure.mjs` yaz: build sonrası `dist`i servis eder, headless Chrome ile 13 sayfa × 7 genişlikte `scrollWidth`, `.page` padding, metin ölçüsü (karakter/satır), CLS ve dosya boyutlarını (gzip) JSON olarak `scratchpad/baseline.json`'a yazar. Bu, Faz 1–5 boyunca "önce/sonra" kanıtın.
**Bugünkü referans değerler (bunları doğrula, tutmuyorsa raporla):**
| Ölçü | Bugün |
|---|---|
| Ana sayfa HTML | 12.722 B (gz 3.794) |
| `Layout.*.css` | 27.545 B (gz 5.743) |
| Kendi modül JS | 5.875 B (gz 2.645) |
| ClientRouter | 16.066 B (gz 5.581) |
| `public/og.png` | 266.002 B |
| `public/fonts/` toplam | 292 KB / 12 dosya |
| `/api/views` GET TTFB | 0,28–0,61 sn |
**Kabul:** `node scripts/measure.mjs` JSON üretir; çıktı commit edilmez (`scratchpad/`), ama rapor olarak sunulur.

---

### FAZ 1 — Yayındaki kırıklar (P0, ~1 gün)

Bunların hepsi **şu anda canlıda** ve bir işverenin gördüğü ilk 40 saniyeyi bozuyor.

#### T1.1 — Tek rota manifestosu (hreflang + numara hatalarının kökü)
**Ne:** Rota bilgisi bugün **üç yerde** ayrı yazılı ve sürüklendi:
- `src/i18n/translations.ts:45` (`tr.routes`) ve `:274` (`en.routes`)
- `src/layouts/Layout.astro:33-35` `PAIRS` — **`/defter` eşlemesi eksik**
- `src/components/Sidebar.astro:17` sabit numaralar

İki gerçek hata üretti:
1. **Yanlış hreflang (canlıda):** `dist/defter/index.html` içinde `hreflang="en"` → `https://seymanurcebi.dev/en` (ana sayfa), `dist/en/guestbook/index.html` içinde `hreflang="tr"` → `https://seymanurcebi.dev/` . Arama motorları bu iki sayfayı çeviri çifti olarak eşleştiremiyor.
2. **Numara çakışması (canlıda):** Sidebar `home:01, about:02, projects:03, contact:04, guestbook:05` derken `translations.ts` `about.no:"01"`, `projects.no:"02"`, `contact.no:"03"`, `guestbook.no:"04"` diyor. Menüde "03 Projeler"e tıklayan ziyaretçi "02 Projeler" başlıklı sayfaya düşüyor. Aynı ekranda aynı sayfa için iki farklı numara.

**Yapılacak:** `src/data/routes.ts` oluştur, tek `PAGES` dizisi dışa aktar:
```ts
export const PAGES = [
  { key: 'home',      num: '01', tr: '/',          en: '/en' },
  { key: 'about',     num: '02', tr: '/hakkimda',  en: '/en/about' },
  { key: 'projects',  num: '03', tr: '/projeler',  en: '/en/projects' },
  { key: 'contact',   num: '04', tr: '/iletisim',  en: '/en/contact' },
  { key: 'guestbook', num: '05', tr: '/defter',    en: '/en/guestbook' },
] as const;
export type PageKey = typeof PAGES[number]['key'];
```
`PageKey` bugün `Sidebar.astro:9` ve `PageLayout.astro:8`'de **iki kez** tanımlı — ikisini de sil, buradan içe aktar. `Layout.astro`'daki `PAIRS`i kaldır, hreflang'i `PAGES`ten türet. Sidebar numaraları ve sayfa başlığı numaraları aynı girdiden okusun; `translations.ts`'teki `no` alanlarını **sil** (numara içerik değil, yapı). `Guestbook.astro:15`'teki `.page-no` span'ine `aria-hidden="true"` ekle (diğer sayfalarda var, burada yok).
**Kabul:**
```bash
grep -rn 'PageKey =' src/ | wc -l          # -> 1
npm run build
grep -o 'hreflang="en"[^>]*' dist/defter/index.html          # -> /en/guestbook içermeli
grep -o 'hreflang="tr"[^>]*' dist/en/guestbook/index.html    # -> /defter içermeli
grep -rn 'no: "' src/i18n/translations.ts | wc -l            # -> 0
```
+ Vitest: `PAGES`teki her anahtarın hem `tr` hem `en` rotası `dist` içinde bir `index.html`e karşılık geliyor.
+ Playwright: 10 rotanın her birinde `.nav-btn.active .num` metni `.page-no` metnine **eşit**.

#### T1.2 — `.page` gutter'ı: 1201 px üstü tüm masaüstlerde iç boşluk 0
**Ne:** `global.css`'te **taban `.page` kuralı yok**. `.page { padding }` yalnızca `@media (max-width:1200px) and (min-width:941px)` (56/40px) ve `@media (max-width:940px)` (44/22px) içinde tanımlı. Ölçüm: 1512 px ve 1920 px'te `.page` computed `padding` = **`0px`**. Yani 1440/1512/1728/1920 — yani işe alım yapan herkesin dizüstü çözünürlüğü — içerik kenar çubuğunun kenarına ve viewport'un sağ kenarına **yapışık**; sayfa başlıkları üstten kırpılıyor.
**Yapılacak:** Medya sorgusundan bağımsız taban kural ekle:
```css
.page { padding-block: clamp(48px, 5vw, 88px); padding-inline: clamp(22px, 4vw, 72px); }
.highlight-band { margin-inline: clamp(22px, 4vw, 72px); margin-bottom: clamp(44px, 5vw, 72px); }
```
İki medya sorgusundaki `.page { padding }` ve `.highlight-band { margin }` **geçersiz kılmalarını sil** — `clamp()` üç kırılımı da kapsıyor. Mobildeki `.content > .page { padding-block-start: 68px }` (hamburger payı) korunur.
**Kabul:** 390/768/1200/1512/1920 px'te her sayfada `getComputedStyle(document.querySelector('.page')).paddingLeft` **hiçbirinde `0px` değil**; 1512'de ≥ 56px, 1920'de ≥ 72px. `.section-title`'ın `getBoundingClientRect().top >= 40`.

#### T1.3 — `/hakkimda` telefonda 252 px yatay taşıyor
**Ne:** 390 px viewport'ta `document.documentElement.scrollWidth = 642` (360 px'te 642). Sitenin **tüm kanıtı** (GNO tablosu, zaman çizelgesi, yetenekler, sertifikalar) bu sayfada ve trafiğin çoğunluğu telefondan geliyor. Kök neden: `.ac-table` hücrelerinde `white-space: nowrap`; `.ac-table-wrap`'in `overflow-x:auto`'su min-content'i durdurmuyor çünkü `.app { grid-template-columns: 1fr }` otomatik minimumu `auto` ve `main.content`'te `min-width: 0` yok.
**Yapılacak:**
```css
.content { min-width: 0; }
.app { grid-template-columns: minmax(0, var(--sidebar-w)) minmax(0, 1fr); }
/* mobil: grid-template-columns: minmax(0, 1fr); */
```
`Academic.astro` > `.ac-table-wrap`'e `min-width: 0` + `overscroll-behavior-x: contain` ekle; tabloyu `<div role="region" aria-label={a.label} tabindex="0">` ile sar (klavyeyle kaydırılabilsin) ve `scrollWidth > clientWidth` iken sağ kenarda **görünür gradyan maske** göster.
**Kabul:** 320/360/390/430 px'te `/hakkimda` ve `/en/about` için `document.documentElement.scrollWidth <= innerWidth + 1`. Tablo klavyeyle (`Tab` → ok tuşları) kaydırılabilir.

#### T1.4 — Ana sayfa 1512 px+ 36 px yatay taşıyor
**Ne:** `scrollWidth - clientWidth = 36`. Kaynak: `.photo-backdrop { inset: -20px; transform: rotate(-4deg) }` — gutter olmadığı için döndürülmüş kutu viewport dışına çıkıyor, hero fotoğrafı sağdan kesik görünüyor. Bu, sitenin **en güçlü görsel imzası**; kesildiğinde imza olmaktan çıkıp hata gibi duruyor.
**Yapılacak:** T1.2'deki gutter'dan sonra `.hero-photo { position: relative; isolation: isolate; }`, `.photo-backdrop { inset: -14px -14px -18px -18px; }` ve hero sütununa `padding-inline-end: 20px`. **`overflow-x: hidden`/`clip` ile bastırma yasak** (İ-7).
**Kabul:** 1440/1512/1728/1920 px'te `scrollWidth - clientWidth === 0`; `.photo-backdrop`'un `getBoundingClientRect().right <= innerWidth - 24`.

#### T1.5 — Okuma ölçüsü: 1920 px'te 130 karakter/satır
**Ne:** Global içerik genişliği sınırı yok. Ölçüm 1512 px: `.about-p1` 892 px (~89 kar/satır), `.about-p2` ~99, `.tl-item p` ~84. 1920 px: `.about-p1` 1300 px (~130 kar/satır), `.project-row` 1656 px, `.pr-title` 1498 px ama `.pr-desc` 62ch'de bittiği için ok işareti **700 px öksüz boşluğun** ardında kalıyor. Okunabilir ölçü 45–75 karakter.
**Yapılacak:** İki katman:
- Konteyner: `--measure-wide: 1120px`; `.page-inner { max-width: var(--measure-wide); margin-inline: auto; }` sarmalayıcısını `PageLayout` / bölüm bileşenlerinde uygula.
- Metin: `--measure: 68ch` jetonu; `.about-p1, .about-p2, .hl-desc, .contact-sub, .tl-item p, .pr-desc, .gb-msg { max-width: var(--measure); }`. Dağınık tek seferlik değerleri (`.tagline` 46ch, `.pr-desc` 62ch, `.hl-desc` 56ch) jetona bağla.
Proje kartındaki ok işaretini `justify-self: end` yerine metnin bittiği yere konumlandır ya da kartı `--measure-wide` ile sınırla.
**Kabul:** 1920 px'te her metin bloğu için `rect.width / parseFloat(fontSize) <= 38` (≈ ≤76 karakter); `.project-row` genişliği ≤ 1120 px (bugün 1656). Kontrol seçicileri: `.about-p1, .about-p2, .tl-item p, .pr-desc, .cert-card p`.

#### T1.6 — API yanıtlarında güvenlik başlığı yok; sitede HSTS yok
**Ne:** `curl -sI https://seymanurcebi.dev/api/views` yalnızca `content-type` + `cache-control: no-store` döndürüyor. `public/_headers`'taki `/*` kuralı Cloudflare Pages'te **yalnızca statik varlıklara** uygulanır, Function yanıtlarına **uygulanmaz** — tam bu tuzağa düşülmüş. Ayrıca `strict-transport-security` = 0 ve HTML `access-control-allow-origin: *` döndürüyor (Pages varsayılanı, kaldırılmamış).
**Yapılacak:** `functions/api/_shared.ts` içindeki `json()` yardımcısını, **her** yanıta şunları ekleyecek biçimde genişlet: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Robots-Tag: noindex`, `Cross-Origin-Resource-Policy: same-origin`, `Vary: Origin`. `public/_headers` > `/*` kuralına ekle: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, `Cross-Origin-Opener-Policy: same-origin` ve `! Access-Control-Allow-Origin` (Pages'in bastığı `*` başlığını kaldırır).
**Kabul (dağıtım sonrası):**
```bash
curl -sI https://seymanurcebi.dev/api/views | grep -ci 'x-content-type-options'   # -> 1 (bugün 0)
curl -sI https://seymanurcebi.dev/ | grep -ci 'strict-transport-security'         # -> 1 (bugün 0)
curl -sI https://seymanurcebi.dev/ | grep -ci 'access-control-allow-origin'       # -> 0 (bugün 1)
```
securityheaders.com notu **≥ A**.

#### T1.7 — Backend'i yerelde çalıştırılabilir yap
**Ne:** `npm run dev` = `astro dev` ve `/api/*` uçlarını **hiç servis etmiyor**. 286 satırlık, D1'e yazan kod yalnızca üretimde denenebiliyor. T0.1'de eklenen `dev:api` ve `db:init:local` scriptlerini çalışır hale getir; `.dev.vars.example` dosyası yaz (`IP_SALT=`, `ADMIN_TOKEN=` — **değerler boş**).
**Kabul:**
```bash
npm run db:init:local && npm run dev:api &
curl -s localhost:8788/api/views                                   # -> {"views":0}
curl -s -X POST localhost:8788/api/guestbook -H 'content-type: application/json' \
  -d '{"name":"test","message":"deneme"}'                           # -> 503 (IP_SALT yok)
# .dev.vars'a IP_SALT (>=24 karakter) yazıldıktan sonra -> {"ok":true,"pending":true}
```

#### T1.8 — D1 yedeği ve **prova edilmiş** geri yükleme
**Ne:** `db/` altında yalnızca `schema.sql` var. `guestbook` notları ve `counters.n` (bugün 76) **yeniden üretilemez** veri; yanlış bir `DELETE` veya bağlamanın silinmesi kalıcı kayıp demek.
**Yapılacak:** `.github/workflows/backup.yml` — haftalık + elle tetiklenebilir; `wrangler d1 export kisisel-site --remote --output backup-$(date +%F).sql`; çıktıyı **90 gün saklanan iş artefaktı** olarak yükle. **Üretim verisini depoya commit etme.** `docs/BACKEND-KURULUM.md`'ye "Geri yükleme" bölümü: `wrangler d1 execute kisisel-site --remote --file <dosya>` + D1 Time Travel komutu. Prosedürü **bir kez gerçekten uygula** ve belgeye "son prova tarihi: YYYY-AA-GG" satırı yaz. Denenmemiş yedek yedek değildir.
**Kabul:** Artefakt üretilir; `grep -c 'CREATE TABLE' backup.sql >= 3` ve `grep -c 'INSERT INTO counters' backup.sql >= 1`. Prova: yedek yerel D1'e yüklenip `wrangler d1 execute kisisel-site --local --command "SELECT n FROM counters"` üretimdeki değeri döndürür.
**⚠️ Kullanıcı verisi gerekli:** GitHub Actions için `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secret'ları (Bölüm 6, S-1).

---

### FAZ 2 — Tasarım sistemi ve arayüz (P1, ~2 gün)

#### T2.1 — Ölçek jetonları
**Ne:** Renkler doğru şekilde tokenize edilmiş (26 renk jetonu, light+dark) ama **ölçek edilmemiş**: 22 farklı `font-size` (9.5 / 11.5 / 12.5 / 13.5 / 14.5 / 16.5 px gibi yarım piksel değerler dahil), 12 farklı `border-radius`, 20 farklı `gap`, 20 farklı `padding`, 14 farklı geçiş süresi — hiçbiri jetona bağlı değil. 14 px ile 14.5 px yan yana duruyor; hiyerarşi gözle değil tesadüfle kuruluyor.
**Yapılacak:** `:root`a ekle ve **tüm px değerlerini taşı**:
```css
--text-2xs:11px; --text-xs:12px; --text-sm:14px; --text-base:16px;
--text-md:18px; --text-lg:20px; --text-xl:23px; --text-2xl:30px;
--display-sm:clamp(30px,3.4vw,40px); --display-md:clamp(38px,5vw,68px); --display-lg:clamp(48px,6vw,92px);
--s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px; --s-7:44px; --s-8:64px; --s-9:88px;
--r-sm:10px; --r-md:14px; --r-lg:18px; --r-pill:100px;
--dur-fast:140ms; --dur-base:240ms; --dur-slow:420ms;
--ease-out:cubic-bezier(0.22,1,0.36,1); --ease-spring:cubic-bezier(0.34,1.3,0.44,1);
```
Yarım piksel font boyutlarının **tamamını** kaldır. Aynı jetonları `Academic.astro` ve `CvLayout.astro` scoped bloklarına da bağla — bunun için paylaşılan bir `src/styles/tokens.css` oluşturup her iki layout'a import et.
**Kabul:**
```bash
grep -rhoE 'font-size: *[0-9.]+px' src/ | sort -u | wc -l      # -> <= 2 (yalnız jeton tanımı)
grep -rn '[0-9]\.[0-9]px' src/styles src/components src/layouts # -> boş
grep -rhoE 'border-radius: *[0-9]+px' src/ | sort -u | wc -l   # -> <= 1
```
Görsel regresyon: 1512 px ana sayfa ekran görüntüsünde algısal fark **< %2**.

#### T2.2 — Hareket sistemi + reduced-motion kapsamı
**Ne:** 14 farklı süre (0.1s–0.7s), 3 farklı easing, birbirine referans vermeyen jestler: `.nav-btn:hover` 0.12s, `.btn:hover` 0.15s, `.chip:hover` 0.2s, `.reveal` 0.7s, kenar çubuğu katlama 0.45s. Ayrıca `prefers-reduced-motion` bloğu reveal ve view-transition'ı kapatıyor ama **hover'daki `translateY/translateX/scale` kurallarını kapatmıyor** — vestibüler duyarlılığı olan kullanıcı için eksik.
**Yapılacak:** T2.1 jetonlarını tüm `transition`/`animation` bildirimlerine uygula, eşlemeyi zorla: renk/kenarlık → `--dur-fast`; konum/ölçek ve kart yükselmesi → `--dur-base`; sayfa/panel girişi ve kenar çubuğu katlaması → `--dur-slow`; menü göstergesi morph'u → `--dur-slow` + `--ease-spring`. Reduced-motion bloğunu genişlet:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms!important; animation-iteration-count:1!important;
    transition-duration:.01ms!important; scroll-behavior:auto!important; }
  .nav-btn:hover,.btn:hover,.cert-card:hover,.project-row:hover,.menu-toggle:hover { transform:none!important; }
}
```
**Kabul:** `grep -rhoE 'transition[^;]*[0-9.]+s' src/ | grep -v 'var(--dur' | wc -l` → 0. `grep -rhoE 'cubic-bezier\([0-9.,\ ]+\)' src/ | sort -u | wc -l` → 0. Reduced-motion emülasyonu açıkken `.nav-btn` üzerine gelindiğinde `getBoundingClientRect().left` **değişmez**.

#### T2.3 — Açık temada kontrast (WCAG AA)
**Ne:** Gece teması özenli (en düşük 4.80:1) ama **gündüz varsayılan** ve ölçülen değerler eşiğin altında:
| Jeton | Zemin | Ölçülen | Etkilenen (font boyutu) |
|---|---|---|---|
| `--accent2 #7d8a5f` | `--bg` | **3.42:1** | `.ac-cum` (13px), `.gb-status` (14px), `.footer-views` (11.5px) |
| `--accent2 #7d8a5f` | `--panel` | **3.12:1** | `.pr-tags` (12px) |
| `--faint #6b6f5e` | `--panel` | **4.36:1** | `.side-label` (10px), `.ac-kpi-label` (10px), `.gb-date` (11px) |
Bunlar dekoratif değil, **bilgi taşıyan** metinler.
**Yapılacak:** Yalnızca açık tema bloğunda: yeni `--accent2-text: #4f5a38` jetonu tanımla, `.pr-tags, .ac-table .ac-cum, .gb-status, .footer-views, .hl-label` bunu kullansın. `--faint`'i `#6b6f5e` → `#5d6152` çek; `.side-label, .ac-kpi-label, .gb-date, .now-label, .tl-when, .cert-org` bunu kullansın. Büyük tipografi (`.hl-score-num` 38px, `.pr-num` 30px, `.ac-kpi-num` 30px) 3:1 eşiğiyle mevcut `--accent2`'de kalabilir. **Gece temasına dokunma.**
**Kabul:** `scripts/contrast.mjs` (WCAG 2.1 relative luminance) yaz ve doğrula: `--accent2-text`/`--bg` ≥ 4.5, `--accent2-text`/`--panel` ≥ 4.5, `--faint`/`--panel` ≥ 4.5, `--faint`/`--bg` ≥ 4.5, `--faint2`/`--field` ≥ 3.0. Axe taramasında `color-contrast` ihlali **0**.

#### T2.4 — Mobil dokunma hedefleri
**Ne:** 390 px'te ölçüldü: `.lang-switch a` **33×32**, `.social-row a` 265×**34**, `.mode-switch button` 126×**37**, `.menu-toggle` 128×**40**. Hepsi 44 px altında. Dil düğmeleri sitenin iki dilli olmasının **tek görünür kanıtı**; ıskalanan hedef olmayan özelliğe eşittir.
**Yapılacak:** **Yalnızca** `@media (max-width: 940px)` içinde: `.lang-switch a { min-height:44px; min-width:56px; display:inline-flex; align-items:center; justify-content:center; }`, `.social-row a { height:48px; }`, `.mode-switch button { min-height:44px; }`, `.menu-toggle { min-height:46px; padding-block:12px; }`. Masaüstü ölçüleri **değişmesin** (kenar çubuğu dikey bütçesi dar). Çekmece açıkken arka planın kaymaması için `body { overscroll-behavior: contain }`.
**Kabul:** 390 px ve 320 px'te `document.querySelectorAll('.sidebar a, .sidebar button, .menu-toggle')` üzerinde döngü: her öğenin `getBoundingClientRect()` en/boy **≥ 44**. `.lang-switch` sarmalanmıyor.

#### T2.5 — Odak ve basılı durumları
**Ne:** Yalnızca global `:focus-visible` halkası var ve `global.css:1102`'deki `.sidebar { overflow-x: hidden }` yüzünden **yanlardan kırpılıyor**. Hiçbir düğmede `:active` geri bildirimi yok — dokunmatikte basıldığında hiçbir şey olmuyor hissi. Oysa hover durumları özenle tasarlanmış (`.nav-btn` 4px kayma, `.cert-card` yükselme, `.chip` limon dolgu); odak bu özenden pay almamış.
**Yapılacak:** (a) Kırpılmayı çöz: iç sarmalayıcı kullan ya da `outline-offset: -2px` ile içeriden çizilen halka; `overflow-x: hidden` yalnızca katlama geçişi sürerken uygulansın (`transitionend`de kaldır). (b) Bileşene özgü odak: `.nav-btn:focus-visible` → 2px `--accentD` halka + `.num` kutusu limona döner (hover ile aynı jest); `.btn:focus-visible` → halka + `translateY(-2px)`; `.chip:focus-visible`, `.social-link:focus-visible` → kenarlık `--accent`. (c) Her tıklanabilir öğeye `:active { transform: scale(0.985); transition-duration: var(--dur-fast); }` — reduced-motion altında kapalı.
**Kabul:** Klavyeyle 5 menü + CV + 3 sosyal + 2 tema + 2 dil düğmesinde dolaş; her odak halkası **dört kenarından** görünür (ekran görüntüsü + `getBoundingClientRect()` ile sidebar clip alanı içinde kalma kontrolü).

#### T2.6 — Durum tasarımı: yükleniyor / boş / hata
**Ne:** Defterde üç durumun üçü de aynı düz gri cümle (`Guestbook.astro:154-160`) — iskelet yok, "tekrar dene" yok, ikon yok. İletişim formunun **hiç** geri bildirimi yok (mailto'ya yönlendirip susuyor). Ziyaret sayacı `hidden`'dan görünüre geçerken footer'ı **sıçratıyor**.
**Yapılacak:**
- **Yükleniyor:** `.gb-list` içinde gerçek `.gb-entry` yüksekliğinde 3 `.gb-skeleton`; 1.4 s `--ease-out` shimmer; reduced-motion altında shimmer yerine sabit %60 opaklık.
- **Boş:** ortalanmış blok — adaçayı dairede ✎, `.gb-empty-title` (18px, `--ink`) "Henüz not yok", `.gb-empty-sub` (14px, `--muted`) "İlk yazan sen ol.", formu odaklayan `.btn-line` düğme.
- **Hata:** `role="alert"`, sol kenarında 3px limon şerit olan kart; başlık + açıklama + `fetch`i yeniden çalıştıran "Tekrar dene" düğmesi.
- **İletişim formu:** gönderim sonrası `role="status"` onay satırı ("E-posta uygulaman açılıyor…" → 3 sn sonra sönümlenir); `input:user-invalid` için 1px `--accentD` kenarlık + 12px yardımcı metin.
- **Sayaç:** `#site-views`e `min-width: 9ch; visibility: hidden` başlangıcı — sayı gelince footer kaymaz.
**Kabul:** (1) `/api/guestbook` bloklanınca hata kartı + çalışan "Tekrar dene". (2) İstek 3 sn geciktirilince 3 iskelet ve **CLS < 0,02**. (3) Boş dizi → boş durum bloğu. (4) Boş e-posta ile gönderim → görsel hata + yardımcı metin. (5) `/defter` Lighthouse **CLS < 0,05**.

#### T2.7 — Proje durum rozetleri
**Ne:** 5 projenin 2'si tıklanamıyor (`PROJECT_HREFS`te `null`) ve neden tıklanamadığı **görünmüyor** — yalnızca `cursor: default`. Kullanıcı tıklar, hiçbir şey olmaz, site bozuk sanır. Oysa gerçek sebep dürüst: yarışma sürüyor, repo açık değil.
**Yapılacak:** `src/data/site.ts`'te `PROJECT_HREFS: (string|null)[]`i `PROJECTS` nesnesine çevir: `{ href: string | null, state: 'public' | 'private' | 'wip' }`. `translations.ts`'e `projects.stateLabels = { private: "Depo kapalı — yarışma sürüyor", wip: "Geliştirme aşamasında" }` (+ EN). `Projects.astro`'da `href` yoksa ok yerine `.pr-state` rozeti: 11px DM Mono, `--panel` zemin, 1px `--border`, başında 2px adaçayı nokta. `.project-row.no-link`'te **opaklık düşürme** (içerik değerli). **Rozet metnini uydurma** — yalnızca bu iki etiket. ⚠️ Etiketlerin doğruluğunu Şeyma teyit etmeli (S-4).
**Kabul:** `document.querySelectorAll('.project-row.no-link .pr-state').length === 2` (TR ve EN). Tıklanamayan kartlar `Tab` ile odak **almıyor**.

#### T2.8 — CV'yi marka kimliğine getir
**Ne:** `CvLayout.astro` **kendi paletini** kuruyor: `--accent #a15c50` (kiremit), `--chip #f4ece7`, `body background #efe7e2`. Bu, projeden silinmiş eski "pudra gül" temasının **temizlenmemiş kalıntısı** — kasıtlı bir tercih değil. Oysa CV, işverenin indirip sakladığı ve e-postayla ilettiği **tek dosya**; marka tutarlılığının en çok işe yaradığı yer.
**Yapılacak:** `CvLayout.astro`'daki `:root` değerlerini site jetonlarıyla değiştir: kâğıt `#f7f6ef`, sayfa `#ffffff`, vurgu `#5f6b45` (derin adaçayı), ikincil `#7d8a5f`, çip `#e6e9d4`, `.cv-head` alt çizgisi 2px `#5f6b45`, "PDF olarak kaydet" düğmesi limon `#fefd4d` üzerine `#23261c`. `.item-badge`'i sitedeki `.tl-badge` gibi limon dolgu + koyu metin yap. Renkleri **kopyalama** — T2.1'deki `tokens.css`ten import et. Baskıda limonun griye düşmemesi için `.item-badge, .bar button { print-color-adjust: exact }`.
**Kabul:** `grep -rn 'a15c50\|efe7e2\|f4ece7\|854a3f\|B98A82' src/` **boş**. `/cv` ve `/en/cv` ekran görüntüsünde vurgu `#5f6b45` ±%3. Chrome `--print-to-pdf` çıktısı **hâlâ tek sayfa** (`pdfinfo cv.pdf | grep Pages` → 1).

#### T2.9 — Marka işareti: favicon, apple-touch-icon, manifest
**Ne:** `public/favicon.svg` = SVG içine gömülü `<text>💻</text>`. Emoji-SVG favicon Safari ve bazı paylaşım istemcilerinde **hiç render edilmez**; sekmede emoji "şablon" sinyali verir. Oysa `og.png` marka paletiyle profesyonelce tasarlanmış — kimlik dili zaten var, en çok görülen 16×16 karede kullanılmamış.
**Yapılacak:** Limon `#fefd4d` zemin + koyu adaçayı `#23261c` "ŞÇ" monogramı (ya da Fraunces 900 "Ş"), `viewBox="0 0 64 64"`, yuvarlatılmış kare, harf **`<path>` olarak gömülü** (sistem fontuna bağımlı `<text>` **yasak**). `prefers-color-scheme: dark` medya sorgusunu SVG'nin içine göm (koyu zemin + limon harf). 180×180 `apple-touch-icon.png` ve `site.webmanifest` (`short_name: "Ş. Çebi"`, `theme_color/background_color: #f7f6ef`, 192/512 ikon) üret; `Layout.astro` `<head>`ine `<link rel="apple-touch-icon">` + `<link rel="manifest">`. `public/_headers`'a manifest için 1 günlük cache. ⚠️ Monogram tercihi (S-5).
**Kabul:** `ls public/favicon.svg public/apple-touch-icon.png public/site.webmanifest` üçü de var; `grep -c '<text' public/favicon.svg` → **0**. Sekme ikonu hem gündüz hem gece görünür; 16×16'ya küçültüldüğünde okunabilir.

#### T2.10 — Kısa sayfalarda dikey ritim
**Ne:** `/iletisim` ve `/defter`'de içerik 520 px'te bitiyor, `.content { min-height: 100vh }` yüzünden altta 400–500 px ölü boşluk kalıyor; footer ekranın çok altına düşüyor ve ziyaret sayacı **hiç görülmüyor**. Ekran görüntüsünde iletişim sayfasının alt %55'i boş noktalı zemin.
**Yapılacak:** `.page--short` varyantı: `min-height: calc(100dvh - var(--footer-h)); display: grid; align-content: center;` (mobil hamburger payı korunur). İletişim sayfasının sağ sütununa, kenar çubuğundaki **ŞU AN kartının mevcut içeriğini yeniden kullanan** bir "şu an ne yapıyorum" kartı ekle — veri `translations.ts > now`dan okunur, **yeni içerik uydurulmaz**. Footer'ı `position: sticky` **yapma**.
**Kabul:** 1512×982'de `/iletisim` ve `/defter` için `document.querySelector('footer').getBoundingClientRect().bottom <= innerHeight + 120`; son içerik ile footer arası ≤ 160 px. `/hakkimda` davranışı **değişmez**.

---

### FAZ 3 — Backend sağlamlaştırma (P1, ~1,5 gün)

#### T3.1 — Gözlemlenebilirlik + sağlık ucu
**Ne:** 4 dosyadaki **her** `catch` bloğu sessiz (`catch { return json(...) }`) — tek bir `console.error` yok. `Layout.astro:312`'de istemci tarafı da `catch(() => {})`. D1 bağlaması koparsa, kota dolarsa veya SQL bozulursa site sessizce "henüz not yok" der ve sayaç kaybolur; Şeyma bunu ancak bir ziyaretçi söylerse öğrenir.
**Yapılacak:** `_shared.ts`'e `logError(scope, err, request)` ekle — tek satırlık JSON `console.error`: `{scope, name, message, ray: cf-ray, route}`. **Ziyaretçi adı, not metni ve IP asla loglanmaz.** Dört dosyadaki her boş `catch`i doldur. `functions/api/health.ts` ekle: `SELECT n FROM counters WHERE key='views'` → başarılıysa 200 `{"db":"ok","salt":<bool>,"admin":<bool>}`, aksi 503; `cache-control: no-store` + `X-Robots-Tag: noindex`. **Sır değeri asla basma, yalnızca varlık bilgisi.** `robots.txt`'e `Disallow: /api/health`. Cloudflare panelinde Workers Logs/observability'yi aç; `/api/health`i 5 dakikada bir yoklayan ücretsiz izleyici tanımla (S-2).
**Kabul:** `curl -s -o /dev/null -w '%{http_code}' https://seymanurcebi.dev/api/health` → **200**; gövde `{"db":"ok","salt":true,"admin":true}`. DB bağlaması olmayan önizlemede → **503**. `npx wrangler pages deployment tail` açıkken hatalı istekte tek satırlık JSON log görünür ve içinde **ad/mesaj/IP geçmez**.

#### T3.2 — Kenar önbelleği: her gezinme bir D1 okuması
**Ne:** Her iki GET de `cache-control: no-store`. `/api/views` GET TTFB ölçüldü: **0,614 / 0,309 / 0,281 sn**. `Layout.astro:370`'te `countVisit()` **her** `astro:page-load`da çalışıyor — yani View Transitions ile her iç gezinmede. 6 sayfalık bir gezinti = 6 D1 okuması, ~1,8 sn toplam bekleme.
**Yapılacak:** `/api/views` GET ve `/api/guestbook` GET'i `caches.default` ile önbellekle: anahtar = istek URL'si, yanıt `Cache-Control: public, max-age=60, stale-while-revalidate=300` + zayıf `ETag`, önbellekten gelene `X-Cache: HIT`; yazma `ctx.waitUntil()` ile. `/api/views` POST ve admin approve/delete başarılı olduğunda ilgili anahtarları `caches.default.delete()` ile düşür. `countVisit()`i, sayı bir kez gösterildikten sonra **aynı oturumda tekrar GET atmayacak** biçimde düzelt.
**Kabul:** Arka arkaya iki `curl -s -o /dev/null -w '%{time_starttransfer}\n' https://seymanurcebi.dev/api/views` çağrısında ikincisi **< 0,10 sn** ve yanıt `x-cache: HIT`. Tarayıcıda 5 sayfa gezildiğinde ağ panelinde **en fazla 1** `/api/views` isteği. Onaylanan bir not `/defter`de en geç 60 sn içinde görünür.

#### T3.3 — Kötüye kullanım koruması
**Ne:** Hız sınırı yalnızca defter POST'unda (3/saat/ip_hash) ve uygulama katmanında. `/api/views` POST ve `/api/admin/*` **sınırsız**. Admin ucu sınırsız 401 denemesine açık (token sabit süreli karşılaştırılıyor ama kaba kuvvete engel yok). 429 yanıtında `Retry-After` yok. `_shared.ts:40`'ta `sameOrigin()` **Origin başlığı yoksa `true` dönüyor** → curl ile doğrudan POST serbest.
**Yapılacak:** Cloudflare panelinde iki ücretsiz WAF Rate Limiting kuralı: (1) `/api/*` → IP başına 30 istek/dakika → Managed Challenge; (2) `/api/admin/*` → IP başına 5 istek/10 dakika → Block. Kodda: 429'lara `Retry-After: 3600`; `/api/views` POST'unda başarısız denemelerde D1'e **hiç yazma**; `/api/admin/guestbook` başarısız yetkilendirmede yanıtı 300 ms geciktir ve `logError` ile kaydet.
**Kabul:** Önizlemede `for i in $(seq 1 40); do curl -s -o /dev/null -w '%{http_code} ' <preview>/api/views; done` çıktısında **en az bir 429/403**. 4. defter gönderimi → `HTTP/2 429` + `retry-after: 3600`. Hatalı token ile 6 ardışık admin isteğinin 6.'sı bloklanır.

#### T3.4 — Önizleme veritabanını üretimden ayır
**Ne:** `wrangler.toml` tek bir `[[d1_databases]]` bloğu içeriyor (`database_id = abfc1fc2-…`) ve `[env.preview]` **yok** → herhangi bir dal dağıtımı **üretimdeki** `guestbook`/`counters` tablosuna yazar. Bir dalda defter kodunu denemek gerçek notları ve 76'lık sayacı kirletir.
**Yapılacak:** `wrangler d1 create kisisel-site-preview`; `db/schema.sql`i orada da çalıştır; `wrangler.toml`u `[env.production]` / `[env.preview]` bloklarına ayır. Önizleme ortamındaki tüm yanıtlara `X-Robots-Tag: noindex`.
**Kabul:** Bir dal dağıtımına test notu gönderildikten sonra `wrangler d1 execute kisisel-site --remote --command "SELECT COUNT(*) FROM guestbook"` **değişmez**; preview sayısı 1 artar. `curl -sI <preview>.pages.dev/ | grep -i x-robots-tag` → `noindex`.

#### T3.5 — Yeni not bildirimi
**Ne:** Defter tasarım gereği `approved=0` kaydediyor; şu an yayında **hiç onaylı not yok** (`/api/guestbook` → `{"entries":[]}`) ve bekleyeni görmenin tek yolu elle curl. Bir ziyaretçi not bırakıp haftalarca yanıt görmezse defter işlevsiz kalır.
**Yapılacak:** Başarılı eklemeden sonra `ctx.waitUntil(fetch(env.NOTIFY_WEBHOOK, {...}))`; gövde **yalnızca** not id'si, ilk 60 karakterlik önizleme ve onay komutu. Bildirim başarısız olsa da ziyaretçiye 200 dön; `NOTIFY_WEBHOOK` tanımsızsa adım **sessizce atlansın**. ⚠️ Webhook tercihi (S-3).
**Kabul:** Önizlemeye test notu → bildirim 60 sn içinde ulaşır, içinde not id'si var. `NOTIFY_WEBHOOK` silindiğinde aynı POST hâlâ `{"ok":true,"pending":true}` döner.

#### T3.6 — Saklama süresi (KVKK)
**Ne:** `view_hits` için 2 günlük ve `ip_hash` için 1 saatlik otomatik temizlik yazılmış — ama `guestbook`taki **onaysız notlar sonsuza kadar** duruyor. Bunlar ad + serbest metin, yani kişisel veri. Belgede yalnızca elle silme komutu var, tanımlı saklama süresi yok.
**Yapılacak:** Şeyma'nın onaylayacağı süreyi uygula (öneri: **onaylanmayan notlar 30 gün sonra silinir** — S-6). `functions/api/guestbook.ts` POST'una mevcut `ip_hash` temizliğinin yanına aynı desende `DELETE FROM guestbook WHERE approved = 0 AND created_at < ?` bakımını ekle. Süreyi `/defter` ve `/en/guestbook` bilgilendirme metnine ve `docs/BACKEND-KURULUM.md`'nin KVKK bölümüne yaz; silme talebi için başvuru adresini belirt.
**Kabul:** Yerel D1'e 40 gün önce tarihli onaysız satır eklenip yeni not gönderildikten sonra `SELECT COUNT(*) FROM guestbook WHERE approved=0 AND created_at < datetime('now','-30 days')` → **0**. `/defter` kaynağında saklama metni geçer. **Onaylı notlar silinmez.**

#### T3.7 — API sözleşme testleri
**Ne:** Honeypot, saatlik hız sınırı, `IP_SALT` yoksa kapanma, admin yetkilendirmesi, günlük tekilleştirme — hepsi yalnızca **kod okunarak** doğru kabul ediliyor.
**Yapılacak:** `@cloudflare/vitest-pool-workers` ile yerel D1 üzerinde **en az 8** sözleşme testi:
1. Honeypot (`website`) dolu → 200 ama tabloya satır **eklenmez**
2. 4. gönderim → 429
3. `IP_SALT` yok → 503, satır eklenmez
4. Admin token'sız → 401
5. Yanlış uzunlukta token → 401
6. Aynı `ip_hash` aynı gün iki POST → sayaç **1** artar
7. `approved=0` kayıt GET listesinde **görünmez**
8. `<img src=x onerror=...>` içeren mesaj DB'ye birebir yazılır ve HTML olarak **yorumlanmaz**
**Kabul:** `npm test` → 8/8. `RATE_LIMIT` sabiti elle 999 yapıldığında test **kırmızı**.

#### T3.8 — Paylaşılan API sözleşme tipleri
**Ne:** `Guestbook.astro:123` → `const render = (entries: any[])`; `:120` → `JSON.parse(form.dataset.strings || "{}")` tipsiz; `Layout.astro`'da `showViews(d.views)` içindeki `d` tipsiz. Sunucu `{id, name, message, created_at}` döndürüyor, istemci `any` okuyor — alan adı değişirse (`created_at` → `createdAt`) build geçer, sayfa sessizce "Invalid Date" basar.
**Yapılacak:** `src/types/api.ts`: `GuestbookEntry`, `GuestbookListResponse`, `GuestbookPostResponse`, `ViewsResponse`, `GuestbookStrings`. Function dönüşlerini bu tiplerle işaretle; istemci script'lerinde içe aktar ve `any`leri kaldır.
**Kabul:** `grep -rn ': any' src/ functions/` → **0 sonuç**. `npm run check` → 0 hata. `created_at` → `createdAt` yeniden adlandırıldığında `npm run check` **istemci dosyasında** hata verir.

#### T3.9 — Gizli değer yönetimi
**Ne:** `.admin-token.local` (57 bayt) çalışma dizininde **düz metin** duruyor. `.gitignore`'da olması commit'i engeller ama diski, yedeği veya paylaşılan ekranı korumaz — bu anahtar defterin tam yönetim yetkisi. Ayrıca `IP_SALT` döndürülürse görüntülenme tekilleştirmesi sıfırlanır ve o gün mükerrer sayım olur; bu yan etki hiçbir yerde yazılı değil.
**Yapılacak:** `security add-generic-password -s kisisel-site-admin -a cebi101 -w '<token>'` ile Keychain'e taşı, `.admin-token.local`i **sil**. `scripts/admin.sh` yaz: token'ı Keychain'den okur, moderasyon komutlarını çalıştırır, token asla `history`ye/loga düşmez. `docs/BACKEND-KURULUM.md`'ye rotasyon bölümü: `ADMIN_TOKEN` 90 günde bir yenilenir; `IP_SALT` rotasyonu tekilleştirmeyi sıfırladığı için **yalnız sızıntı şüphesinde** yapılır.
**Kabul:** `test ! -f .admin-token.local` başarılı; `security find-generic-password -s kisisel-site-admin -w` token'ı döndürür; `git log -p --all -S "$TOKEN" | wc -l` → **0**; `bash scripts/admin.sh list` bekleyenleri listeler ve `history` çıktısında token görünmez.

---

### FAZ 4 — Kod mimarisi, performans ve içerik modeli (P1, ~1,5 gün)

#### T4.1 — `Layout.astro` tanrı dosyasını parçala
**Ne:** `Layout.astro:100-389` arası **tek `<script>`** 7 ilgisiz işi barındırıyor: ilerleme çubuğu, ışıltı canvas, tema, IntersectionObserver reveal, iletişim formu, ziyaret sayacı, mobil çekmece. `onPage()` (satır 365-376) bunları **try/catch olmadan** sırayla çağırıyor: `bindTheme()` istisna fırlatırsa `observeReveals`, `bindForm`, `setProgress`, `countVisit`, `bindDrawer` **hiç çalışmaz** — tek hata tüm `.reveal` içeriğini görünmez bırakır (CSS `.js` sınıfı zaten uygulanmıştır) ve menü açılmaz.
**Yapılacak:** `src/scripts/` altına ayır: `theme.ts`, `drawer.ts`, `progress.ts`, `reveal.ts`, `contact-form.ts`, `views.ts`, `sparkle.ts` — her biri `export function init(): void`. `src/scripts/runner.ts` her `init()`i **ayrı try/catch** içinde çağırsın, hatada `console.warn` ile modül adını bassın. `Layout.astro` yalnızca runner'ı import etsin.
**Kabul:** `wc -l src/layouts/Layout.astro` → **≤ 130** (bugün 391). Herhangi bir modülün `init()`ine geçici `throw new Error('x')` eklendiğinde Playwright dumanı **diğer akışları hâlâ geçer**.

#### T4.2 — Işıltı efektini ayrı parçaya al
**Ne:** Üretilen Layout modülü 5.875 B ham / 2.645 B gzip; **ışıltı canvas bloğu bunun 2.208 B'si (%38, ~1,19 KB gzip)**. Çalışma zamanında `matchMedia("(hover: hover) and (pointer: fine)")` ile korunuyor ama JS **zaten indirildi ve ayrıştırıldı**. Ziyaretçilerin çoğunluğu mobilden geliyor; bu bayt onlar için tamamen ölü.
**Yapılacak:** `if (finePointer && !lessMotion) import('./sparkle.js').then(m => m.init())` — Rollup ayrı parça üretsin.
**Kabul:** `dist/_astro/` altında ayrı `sparkle*.js`; `grep -c 'sparkle' dist/index.html` → **0**. Ana sayfanın istekli yüklenen kendi modül JS'i **≤ 1.700 B gzip** (bugün 2.645). Masaüstünde efekt çalışmaya devam eder (Playwright: `canvas.sparkle-canvas` var).

#### T4.3 — Türkçe fontlar preload edilmiyor (LCP kaybı)
**Ne:** `<head>`de yalnızca `sora-400-normal-latin.woff2` ve `fraunces-900-normal-latin.woff2` preload ediliyor. Ama `latin` alt kümesi **Türkçe harfleri içermiyor**: ş (U+015F), ğ (U+011F), İ (U+0130) `latin-ext` aralığında (U+0100-02BA). Sitenin **varsayılan dili Türkçe** ve LCP öğesi olan hero başlığı **"Şeyma Nur Çebi"** — ilk harfi `fraunces-900-normal-ext.woff2` (31.824 B) gerektiriyor ve o dosya preload edilmiyor. Sonuç: Türkçe karakterlerde FOUT ve LCP gecikmesi.
**Yapılacak:** TR sayfalarda `fraunces-900-normal-ext.woff2` + `sora-400-normal-ext.woff2` preload et (dil koşullu). Daha iyisi: fontları site metnine göre yeniden alt kümele (`pyftsubset`) — Fraunces 900 yalnızca hero ve başlıklarda kullanılıyor, tam Latin setine gerek yok. Sora'nın 3 ağırlığı 6 dosyada 112 KB tutuyor; **değişken font** (weight ekseni 400–600, alt kümelenmiş) tek dosyaya indirebilir.
**Kabul:** `public/fonts/` toplamı **≤ 180 KB** (bugün 292 KB); hiçbir Türkçe karakter yedek fontla çizilmez (Playwright: `document.fonts.check('900 40px Fraunces')` → true ve hero metninde görsel FOUT yok); mobil LCP **≤ 2,0 sn** (Lighthouse, Moto G Power emülasyonu).

#### T4.4 — Görseller ve bütçe
**Ne:** `public/og.png` **266.002 B** (1200×630 bir paylaşım kartı için ~3 kat fazla). `src/assets/foto.jpg` 87 KB, `<Image width={680} loading="eager" fetchpriority="high">` ile veriliyor — iyi, ama tek format. Ayrıca hiçbir bütçe **hiçbir yerde zorlanmıyor**; bugünkü hafiflik tesadüf, politika değil.
**Yapılacak:** `og.png`i 1200×630'da yeniden sıkıştır (pngquant/oxipng) → **< 100 KB**. Hero fotoğrafını `<Picture>` ile AVIF + WebP + JPEG olarak ver, `width`/`height` sabit (CLS 0), `sizes` doğru. `.size-limit.json`: ana sayfa kendi modül JS ≤ **1,8 KB gzip**, Layout CSS ≤ **6 KB gzip**, sayfa HTML ≤ **7 KB gzip**. `npm run size` CI'da.
**Kabul:** `wc -c public/og.png` < **102400** (bugün 266.002). `npx size-limit` tüm girdilerde geçer. Bütçe kasten 100 B düşürüldüğünde CI kırmızıya döner (bir kez doğrula).

#### T4.5 — Projeleri içerik koleksiyonuna taşı
**Ne:** 490 satırlık `translations.ts` hem arayüz metnini hem içeriği barındırıyor. Yeni proje eklemek **üç ayrı düzenleme** gerektiriyor: `tr` bloğu, `en` bloğu ve `src/data/site.ts`'teki `PROJECT_HREFS` dizisinin **doğru indeksi**. Dizi indeksle eşleşiyor (`PROJECT_HREFS[i]`) — projeler yeniden sıralanırsa her kart **yanlış repoya** bağlanır ve hiçbir şey uyarmaz.
**Yapılacak:** `src/content.config.ts` — `projects` koleksiyonu, `glob` yükleyici, şema:
```ts
{ title: z.string(), summary: z.string(), tags: z.array(z.string()).min(1),
  repo: z.string().url().nullable(), state: z.enum(['public','private','wip']),
  year: z.number(), order: z.number(), lang: z.enum(['tr','en']) }
```
5 projeyi `src/content/projects/{tr,en}/*.md`'ye taşı (**metinleri birebir taşı, yeniden yazma**). `Projects.astro`yu `getCollection('projects', p => p.data.lang === t.lang)` ile `order`a göre besle. `PROJECT_HREFS`i ve `translations.ts > projects.items`i sil.
**Kabul:** `grep -rn 'PROJECT_HREFS' src/` → 0. Bir md'den `tags` silindiğinde veya `repo`ya geçersiz URL yazıldığında `npm run build` **şema hatasıyla durur**. `/projeler` ve `/en/projects` Playwright ekran görüntüsü geçiş öncesiyle **piksel olarak eşleşir** (5 kart, 3'ü linkli).

#### T4.6 — Temizlik paketi (tek commit)
**Ne (hepsi doğrulandı):**
- `public/fonts-cv.css`, `src/styles/fonts.css` ile **bayt bayt aynı** (ikisi de 5.218 B) ve CV sayfası Astro paketlemesini atlayıp bu kopyayı `<link>` ile çekiyor → önbellek kırma yok, ikisini senkron tutma yükü var. **Sil**, `CvLayout.astro`'da `import '../styles/fonts.css'`.
- `CvLayout.astro:15-17` `GITHUB`/`LINKEDIN`/`EMAIL`i `src/data/site.ts`'te varken **yeniden tanımlıyor**; e-posta depoda 3 yerde geçiyor. Sabitten import et; görünen metinleri de sabitten türet.
- `[dir="rtl"]` kuralları (`global.css:1045`, `:1189` + CvLayout'ta 2 tane) **ulaşılamaz** — `dir` her zaman `"ltr"`. Sil. `Layout.astro`'daki `dir` prop'unu ve `Dict.dir` alanını kaldır, `<html>`de sabit `dir="ltr"` bırak.
- `global.css` başlığı hâlâ **silinmiş "pudra gül" temasını ve "RTL (Arapça) desteği"ni** anlatıyor; satır 260 ve 624'te Arapça gerekçeli yorumlar; satır 933'te "uzun DE/RU kelimeleri" için `hyphens: auto`. Hepsini güncel gerçekle değiştir.
- `--sage` jetonu **0 kez** kullanılıyor → ya sil ya gerçek role bağla (öneri: `.pr-state` rozeti).
- `index.astro`'daki `.page-tight` sınıfının **hiç kuralı yok** → ya kaldır ya kural yaz.
- `Layout.astro:384-386` konsol imzası **eski gül rengi `#B98A82`** kullanıyor → `#fefd4d` zemin + `#23261c` metin, alt satır `#7d8a5f`; metni `EMAIL`/`GITHUB` sabitlerinden kur.
- `sitemap` URL'leri sonda eğik çizgili (`/defter/`), `canonical` eğik çizgisiz (`/defter`) → birleştir (`trailingSlash: 'ignore'` ile tutarlı olan: eğik çizgisiz).
**Kabul:**
```bash
grep -rln 'seymanurcebi6@gmail.com' src/ public/   # -> yalnız src/data/site.ts
ls public/fonts-cv.css                              # -> dosya yok
grep -rc 'dir="rtl"' src/                           # -> 0
grep -rci 'gül\|RTL\|Arapça\|pudra\|B98A82' src/    # -> 0
```
`/cv` Fraunces + Sora ile render olur (`document.fonts.check('900 40px Fraunces')` → true) ve CV CSS'i içerik özetli `_astro/*.css`ten gelir. Layout CSS gzip **≤ 5.743 B**. `/` ve `/hakkimda` ekran görüntüleri **değişmez**.

#### T4.7 — README'yi baştan yaz
**Ne:** `README.md` hâlâ kelimesi kelimesine **"Astro Starter Kit: Portfolio"** — StackBlitz/CodeSandbox/Codespaces rozetleri ve Astro'nun stok ekran görüntüsüyle. Oysa `Layout.astro:384-385`'teki konsol mesajı ziyaretçilere "Bu siteyi hazır şablonla değil, satır satır kendim yazdım" diyor ve `github.com/cebi101`i veriyor. Bağlantıya tıklayan işveren **ilk olarak şablon README'sini** görüyor.
**Yapılacak:** Bir cümlelik ne olduğu + canlı adres + mimari özeti (Astro 7 statik + Pages Functions + D1, TR/EN, kendi sunucusunda font, sıfır çerçeve JS) + dizin haritası + betik tablosu (`dev`/`dev:api`/`check`/`lint`/`test`/`test:e2e`/`build`/`size`) + gerekli ortam değişkenleri (**yalnız adlar**: `DB` bağlaması, `IP_SALT`, `ADMIN_TOKEN`) + dağıtım akışı + `docs/BACKEND-KURULUM.md` bağlantısı. Şablon metnini, rozetleri, stok görseli **tamamen** kaldır.
**Kabul:** `grep -ci 'Astro Starter Kit\|stackblitz\|codesandbox' README.md` → **0**. Betiklerin dördü de geçer. Depoyu ilk kez klonlayan biri yalnızca README'yi izleyerek `npm ci && npm run build` çalıştırabilir.

---

### FAZ 5 — Ayırt edicilik ve yeni yüzeyler (P2, ~2 gün)

#### T5.1 — CSP (Content-Security-Policy)
**Ne:** `curl -sI https://seymanurcebi.dev/hakkimda | grep -ci content-security-policy` → **0**. Defter, ziyaretçi metnini kabul eden bir yüzey; bugün `textContent` ile basıldığı için güvenli, ama tek bir gelecekteki `innerHTML` hatası doğrudan XSS'e dönüşür. Uygulaması ucuz: yayındaki HTML'de yalnız 1 satır içi `<script>` + 1 JSON-LD var ve Astro 7.1.0'da `security.csp` desteği kurulu (`node_modules/astro/dist/core/config/schemas/base.js:63,307`).
**Yapılacak:** `astro.config.mjs`'ye `security: { csp: true }`. `public/_headers` `/*` kuralına:
`Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'; upgrade-insecure-requests`
**Kabul:** `curl -sI https://seymanurcebi.dev/ | grep -ci content-security-policy` → 1. 13 sayfanın **hiçbirinde** konsolda `Refused to …` ihlali yok; ışıltı efekti, tema değiştirme, sayaç ve defter gönderimi çalışmaya devam eder. csp-evaluator'da `unsafe-inline` yalnız `style-src`de kalır.

#### T5.2 — `/yonetim` moderasyon ekranı
**Ne:** Onay yalnızca `curl -H "Authorization: Bearer …"` ile yapılabiliyor. Telefondan not onaylanamıyor; pratikte notlar birikir ve defter ölü görünür. Backend uçları **zaten hazır** — eksik olan ince bir arayüz. "Bakım yükü düşük olmalı" kısıtı tam burada ihlal ediliyor.
**Yapılacak:** `/yonetim` — `<meta name="robots" content="noindex,nofollow">`, `astro.config.mjs` sitemap `filter`'ına eklenmiş, `robots.txt`te `Disallow: /yonetim`. Token bir kez girilir, **`sessionStorage`** (localStorage **değil**), `Authorization` başlığında gönderilir. Bekleyen notlar listelenir, her satırda Onayla/Sil. 401'de token temizlenip yeniden sorulur. Token asla URL'ye, DOM'a, log'a yazılmaz; sayfa **statik** (sunucuda token bulunmaz).
**Kabul:** Telefondan açılır, token girilir, test notu onaylanır ve ≤ 60 sn içinde `/defter`de görünür. `grep -rn 'ADMIN_TOKEN' src/` → 0. `curl -s https://seymanurcebi.dev/sitemap-0.xml | grep -c yonetim` → 0. 375 px'te yatay kaydırma yok. Sekme kapatılınca token unutulur.

#### T5.3 — Sayfa başına OG görseli
**Ne:** Tek statik `og.png` tüm sayfalar ve **iki dil** için kullanılıyor — LinkedIn'de İngilizce bir gönderiyle paylaşılan link "YAZILIM MÜHENDİSLİĞİ · İSTANBUL" yazan Türkçe kart gösteriyor. Tasarım güçlü, sorun **kapsam**.
**Yapılacak:** Mevcut kompozisyonu (sol: etiket + Fraunces 900 isim + limon fosforlu soyad + alt satır + iki rozet; sağ: eğik portre) bir Astro endpoint'ine taşı: `src/pages/og/[...route].png.ts`, satori + resvg-js, 1200×630, başlık/rozetler `translations.ts`ten. **Build zamanında** üretilsin (Pages Functions çalıştırmasın), fontlar `public/fonts`tan (dış istek yok). En az 4 varyant: TR ana sayfa, EN ana sayfa, projeler, hakkımda. Rozet metinleri **yalnız doğrulanmış veriden** (TEKNOFEST 93/100, GNO 3,62). `og:image:alt` her sayfada dolu. `Cache-Control: public, max-age=31536000, immutable`.
**Kabul:** `ls dist/og/*.png | wc -l` ≥ 4; her biri 1200×630 (`file dist/og/*.png`). `grep -h 'og:image" content' dist/*/index.html dist/en/*/index.html | sort -u | wc -l` ≥ 4. EN kartındaki metinlerin **tamamı İngilizce**.

#### T5.4 — İmza etkileşimi
**Ne:** Ayırt edicilik tek öğeye (imleç yıldızları) yaslanmış; hero girişi statik, sayfa geçişi tüm rotalarda aynı. Kayan menü göstergesi gerçekten iyi ve nadir; Fraunces 900 güçlü bir tipografik ses — ama ona bir **giriş performansı** verilmemiş. Ödüllü kişisel sitelerin ortak paydası, sahibinin işini anlatan **tek** bir imza jestidir; Şeyma'da bu jest hazır: GNN grafiği.
**Yapılacak (CSS + Web Animations, **yeni kütüphane yok**, JS bütçesi **+8 KB**'yi geçmesin):**
1. **Hero girişi:** "Şeyma Nur" ve "Çebi." satırları `clip-path: inset(0 0 100% 0)` ile alttan yukarı, 60 ms kademeli; limon fosforlu kalem izi (`.home h1 em` gradyanı) isim belirdikten 220 ms sonra soldan sağa `background-size` animasyonuyla çizilir (300 ms, `--ease-out`).
2. **İmza motifi:** Hero arka planındaki noktalı ızgarayı, imleç yakınında (120 px yarıçap) düğümleri ince adaçayı çizgilerle birleştiren bir **graf**a dönüştür — mevcut sparkle canvas'ının içinde, **max 40 düğüm**, 60 fps üst sınırı. Bu doğrudan VARIANT-GNN'in konusu; dekoratif değil **anlatısal**.
3. **Sayfa geçişi:** `view-transition-name: portrait` ile hero portresini `/hakkimda`daki portreye morphla.
Üçü de `prefers-reduced-motion: reduce` altında **tamamen kapalı**; 2. madde `matchMedia('(pointer: fine)')` ile dokunmatikte devre dışı.
**Kabul:** (1) Reduced-motion ile yüklendiğinde hiçbir giriş animasyonu çalışmaz, içerik **ilk karede tam görünür**. (2) Ana sayfada ilk 3 sn'de **uzun görev (>50 ms) yok**; graf efekti çalışırken **FPS ≥ 55**. (3) `dist/_astro/*.js` toplamı mevcut + **8 KB**'yi geçmez. (4) Mobil Lighthouse Performance **≥ 95** kalır. (5) `/` → `/hakkimda` portre morph'u görsel olarak doğrulanır.

#### T5.5 — Proje görselleri (⚠️ kullanıcı verisi gerekli)
**Ne:** 5 projenin hiçbirinde görsel kanıt yok — yalnız başlık + paragraf + etiket. Oysa akademik bölüm (KPI kutuları + çubuk grafik + tablo) tam olarak "kanıtı göster" prensibiyle yapılmış ve sitenin en ikna edici parçası. TEKNOFEST 93/100 yalnızca bir cümlenin içinde geçiyor.
**Yapılacak:** Her karta 16:10 `.pr-media` yuvası (`--panel` zemin, `--r-md`, `loading="lazy"`, `astro:assets` `<Picture>` ile AVIF/WebP). **Görsel yoksa kartı bozma:** Fraunces 900 ile proje baş harfini taşıyan, `--peach` zeminli, ince nokta desenli yer tutucu (yalnız CSS + inline SVG, dış istek yok). VARIANT-GNN kartında 93/100'ü ana sayfadaki `.hl-score` bileşenini yeniden kullanarak göster. Masaüstünde `grid-template-columns: 260px 1fr auto`, mobilde görsel üstte tam genişlik. **Hiçbir görsel, metrik veya ekran görüntüsü uydurma.**
**Kabul:** `.project-row` başına 1 `.pr-media`; gerçek görseli olmayanlarda `.pr-media--placeholder` sınıfı ve **hiç 404 isteği yok**. 1512 px'te kart yüksekliği ≤ 240 px; 390 px'te `aspect-ratio: 16/10` korunur; **CLS katkısı 0**.

#### T5.6 — Gerçek iletişim ucu (⚠️ karar gerekli)
**Ne:** `Contact.astro:17` formu sunucuya **hiç istek atmıyor**, kullanıcının e-posta istemcisini açıyor. Webmail kullanan veya kurumsal cihazdaki bir işe alım uzmanı için bu genelde boş bir pencere ve mesaj hiç ulaşmaz. Ayrıca `seymanurcebi6@gmail.com` HTML'de düz metin olarak taranabiliyor.
**Yapılacak:** `functions/api/contact.ts` — Turnstile doğrulaması + seçilen sağlayıcının API'siyle iletim; **mesaj içeriği veritabanına kaydedilmez**; mevcut `hashIp` ile saatte 3 gönderim sınırı; API anahtarı tanımsızsa 503 ve arayüz otomatik **mailto'ya düşer**. Başarı/başarısızlık ekranda, sayfa yenilenmez.
**Kabul:** Test mesajı 2 dk içinde gelen kutusuna düşer, `Reply-To` gönderenin adresi. Turnstile jetonsuz `curl -X POST` → 403. Anahtar silinince 503 + mailto yedeği. 4. gönderim → 429.

#### T5.7 — Defterde Turnstile
**Ne:** Bot koruması yalnız honeypot; başlıksız tarayıcı kullanan spam araçları alanı boş bırakmayı öğrenmiştir. Geriye yalnız saatte 3 not sınırı kalır; IP havuzu kullanan bir kampanya moderasyon kuyruğunu doldurabilir. Turnstile ücretsiz, görünmez ve zaten kullanılan platformun parçası.
**Yapılacak:** Görünmez Turnstile widget'ı; POST'ta jetonu `challenges.cloudflare.com/turnstile/v0/siteverify` ile doğrula, doğrulanmayanı 403. **Honeypot ve saatlik sınır kaldırılmaz** — üç katman birlikte. `TURNSTILE_SECRET` tanımsızsa uç **eski davranışına döner** (kapanmaz).
**Kabul:** Jetonsuz `curl -X POST .../api/guestbook` → 403 ve satır eklenmez. Tarayıcıdan normal gönderim → `{"ok":true,"pending":true}`. `/defter` Lighthouse performans notu **5 puandan fazla düşmez**.

#### T5.8 — Arama indeksi (isteğe bağlı ⌘K'nın önkoşulu)
**Ne:** Site 13 sayfaya ve yoğun içeriğe ulaştı; site içi arama için veri kaynağı yok.
**Yapılacak:** Build zamanında `/search-index.json` üret: her sayfa ve her proje kartı için `{url, lang, title, section, text}`, metin ≤ 300 karakter özet. Dosya ≤ 40 KB. **Arayüzü (⌘K paleti) ancak indeks hazır ve ölçüldükten sonra, ayrı bir görevde** yap — ve yalnızca Şeyma isterse (S-7).
**Kabul:** `npm run build && wc -c dist/search-index.json` < 40960; JSON geçerli; her kaydın `url`i `dist` içinde var olan bir sayfaya çözülüyor.

---

## 4. Alan alan gereksinimler

### 4.1 Frontend mühendisliği
- **Tek kaynak ilkesi:** rota, numara, sabit, tip — her biri **bir** yerde tanımlı. `grep` ile ikinci tanım bulunuyorsa hata.
- `: any` yasak (`no-explicit-any: error`). Sunucu ve istemci **aynı** tip dosyasını paylaşır.
- Her istemci davranışı kendi modülünde `export function init()`; runner her birini **yalıtarak** çağırır. Bir modülün çökmesi diğerlerini durduramaz.
- View Transitions ile **yeniden bağlanma**: her `init()` idempotent olmalı (aynı dinleyiciyi iki kez eklememeli).
- İçerik (projeler, ileride yazılar) içerik koleksiyonunda + zod şeması; arayüz metni `translations.ts`te. İkisi karışmaz.
- `astro dev --background` ile çalış (proje kuralı); `astro dev stop|status|logs` ile yönet.

### 4.2 Tasarım
- **Jeton hiyerarşisi:** `tokens.css` (renk + ölçek + hareket) → `global.css` → bileşen scoped stilleri. Bileşen scoped blokta ham px **yok**.
- Kırılımlar: 320 / 360 / 390 / 430 / 768 / 940 / 1200 / 1512 / 1920. **Hiçbirinde yatay kaydırma yok.**
- Ölçü: gövde metni **≤ 76 karakter/satır** her genişlikte; konteyner ≤ 1120 px.
- Durum tasarımı zorunlu: her veri çeken yüzeyin **yükleniyor / boş / hata** hâli ayrı tasarlanır.
- Marka tutarlılığı sitenin **dışına** taşar: CV, favicon, OG kartı, `manifest`, konsol imzası — hepsi limon + adaçayı.
- Hover'ı olan her öğenin **odak** ve **basılı** hâli de vardır.

### 4.3 Backend
- Her Function yanıtı güvenlik başlığı taşır (T1.6) — `json()` yardımcısı bunu **zorunlu** kılar, çağıran unutamaz.
- Her `catch` yapısal log üretir; **kişisel veri loglanmaz** (ad, mesaj, IP yok — yalnız scope/name/message/ray/route).
- Okuma uçları kenarda önbelleklenir; yazma uçları önbelleği düşürür.
- Önizleme ≠ üretim veritabanı. Önizleme `noindex`.
- Koruma katmanları **birikimlidir**: honeypot + saatlik sınır + Turnstile + WAF. Yenisi eskisini kaldırmaz.
- Saklama süresi ilan edilir ve **otomatik** uygulanır.
- Yedek haftalık alınır ve **geri yükleme prova edilir**; prova tarihi belgelenir.

### 4.4 Performans (ölçülebilir eşikler)
| Ölçü | Bugün | Hedef |
|---|---|---|
| Lighthouse Performance (mobil, Moto G Power) | ölç | **≥ 95** |
| Lighthouse Performance (masaüstü) | ölç | **≥ 98** |
| Lighthouse Accessibility | ölç | **100** |
| Lighthouse Best Practices / SEO | ölç | **100 / 100** |
| LCP (mobil, 4G kısıtlı) | ölç | **< 2,0 sn** |
| CLS (tüm sayfalar) | ölç | **< 0,02** |
| TBT | ölç | **< 100 ms** |
| INP (etkileşim) | ölç | **< 200 ms** |
| Ana sayfa istekli modül JS (gzip) | 2.645 B | **≤ 1.700 B** |
| Layout CSS (gzip) | 5.743 B | **≤ 5.743 B** (artmasın) |
| Sayfa HTML (gzip) | 3.794 B | **≤ 7.000 B** |
| `public/og.png` | 266.002 B | **< 102.400 B** |
| `public/fonts/` toplam | 292 KB | **≤ 180 KB** |
| `/api/views` GET TTFB (2. istek) | 0,28–0,61 sn | **< 0,10 sn** |
| CI süresi | — | **≤ 3 dk** |
| Build süresi | ~200 ms | **≤ 3 sn** (OG üretimi dahil) |

### 4.5 İçerik ve SEO
- `hreflang` çiftleri **tam ve simetrik** (T1.1). `canonical` ve `sitemap` URL biçimi **aynı** (eğik çizgisiz).
- Her sayfanın kendi `title` + `description`ı var ve **kopya değil**; `og:image` sayfaya özel (T5.3), `og:image:alt` dolu.
- `Person` JSON-LD'yi doğrula: yalnız doğrulanabilir alanlar (`name`, `url`, `sameAs`, `alumniOf`, `knowsLanguage`). **`award` alanına doğrulanamayan hiçbir şey yazma.**
- `/cv`, `/yonetim`, `/api/health` indekslenmez; `robots.txt` ve sitemap `filter`ı birbiriyle **tutarlı**.
- TR ve EN içerik **paritesi testle** korunur (T0.4).
- 404 sayfası her iki dilde anlamlı ve ana rotalara yönlendiriyor.
- **Blog açma** — Bölüm 7'ye bak.

---

## 5. Doğrulama protokolü

### 5.1 Her commit'ten önce (yerel)
```bash
npm run check && npm run lint && npm run format:check && npm test && npm run build && npm run size
```
Altısı da yeşil değilse commit yok.

### 5.2 Her görsel/düzen değişikliğinden sonra
```bash
npm run build && (cd dist && python3 -m http.server 8899 >/dev/null 2>&1 &) && sleep 1
node scripts/measure.mjs            # 13 sayfa × 7 genişlik: scrollWidth, padding, ölçü, CLS
npm run test:e2e                    # taşma nöbetçisi + axe + duman
```
**Geçme koşulu:** hiçbir sayfa-genişlik çiftinde `scrollWidth > innerWidth + 1`; axe'te serious/critical **0**; ekran görüntüsü farkı beklenmedik yerde **yok**.

### 5.3 Her performans değişikliğinden sonra
```bash
npx lighthouse http://localhost:8899/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --quiet
npx lighthouse http://localhost:8899/hakkimda --form-factor=mobile --throttling-method=simulate --quiet
npx size-limit
```
Bölüm 4.4'teki eşiklerin **altına düşen olursa değişiklik geri alınır.**

### 5.4 Her backend değişikliğinden sonra
```bash
npm run db:init:local && npm run dev:api &
npm test                                     # 8 sözleşme testi dahil
curl -s localhost:8788/api/health            # -> {"db":"ok",...}
curl -sI localhost:8788/api/views | grep -i 'x-content-type-options\|referrer-policy'
```
Dağıtımdan sonra üretimde:
```bash
curl -sI https://seymanurcebi.dev/ | grep -Ei 'strict-transport|content-security|access-control'
curl -s https://seymanurcebi.dev/api/views
curl -s -o /dev/null -w '%{time_starttransfer}\n' https://seymanurcebi.dev/api/views  # iki kez
```

### 5.5 Gerçek tarayıcı kontrolü (otomasyonun yakalayamadığı)
Her fazın sonunda **elle** doğrula ve ekran görüntüsü sun:
1. Chrome + Safari, gündüz **ve** gece modu, 390 px **ve** 1512 px.
2. Klavyeyle tüm siteyi gez — odak halkası hiçbir yerde kaybolmuyor/kırpılmıyor.
3. `prefers-reduced-motion: reduce` emülasyonu — hiçbir hareket yok, içerik ilk karede görünür.
4. JavaScript kapalı — sayfa okunabilir, menü çalışıyor (`.js` sınıfı yoksa zarif düşüş).
5. `/cv` → `Cmd+P` → **hâlâ tek sayfa**, renkler doğru.
6. Bir gerçek telefonda `/hakkimda`yı aç ve GNO tablosunu kaydır.

### 5.6 Kanıt sunma biçimi
Her görev raporunda: **(a)** çalıştırılan komut, **(b)** çıktının ilgili satırları, **(c)** önce/sonra sayı, **(d)** varsa ekran görüntüsü yolu. "Düzeltildi" tek başına rapor değildir.

### 5.7 Dağıtım
`main`'e merge → Cloudflare Pages otomatik dağıtır. Dağıtımdan sonra **her zaman**: 5.4'teki üretim curl'leri + `/`, `/hakkimda`, `/defter` sayfalarını gerçek tarayıcıda aç. Bir şey bozulduysa **hemen** `git revert` ve raporla.

---

## 6. Şeyma'dan istenecekler

Bu veriler **uydurulamaz**. Her biri bir görevi bloke ediyor; ilgili göreve gelindiğinde sor, gelmeden **bekletme** — bloke olmayan işe devam et ve eksiği raporda listele.

| # | Ne gerekiyor | Hangi görev | Neden uydurulamaz |
|---|---|---|---|
| S-1 | GitHub Actions için `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secret'ları | T1.8 (yedek) | Hesap kimlik bilgisi |
| S-2 | İzleme servisi tercihi (UptimeRobot / Better Stack) + uyarı gidecek e-posta | T3.1 | Hesap ve adres |
| S-3 | Yeni not bildirimi kanalı (e-posta / Telegram / Discord webhook) + adres | T3.5 | Kişisel kanal |
| S-4 | Kapalı repolu 2 projenin gerçek durumu ve rozet metninin doğruluğu | T2.7 | Yarışma kuralı bilgisi |
| S-5 | Favicon monogramı: "ŞÇ" mi tek "Ş" mi | T2.9 | Kişisel tercih |
| S-6 | Onaysız notların saklama süresi onayı (öneri: 30 gün) | T3.6 | KVKK kararı |
| S-7 | İletişim: mailto kalsın mı, gerçek uç mu kurulsun? Gerçekse sağlayıcı + API anahtarı | T5.6 | Bütçe/hesap kararı |
| S-8 | Turnstile site key + secret oluşturulsun mu | T5.7 | Cloudflare hesabı |
| S-9 | Önizleme için ikinci D1 veritabanı oluşturma onayı | T3.4 | Hesap işlemi |
| S-10 | `main` dalına branch protection açma onayı (tek geliştirici için sürtünme yaratır) | T0.6 | İş akışı tercihi |
| S-11 | Proje görselleri: VARIANT-GNN mimari/LIME çıktısı, foundry-local-rag arayüz ekranı, YemekStes konsol çıktısı, Dijital Kâşifler atölye fotoğrafı (yüz görünmeyen), TEKNOFEST ÖDR belge görseli | T5.5 | Şeyma'nın dosyaları |
| S-12 | TEKNOFEST 93/100 puanının ve ÖDR belgesinin **kamuya açık** paylaşılabilirliği | T5.3, T5.5 | Yarışma gizlilik kuralı |
| S-13 | Atölye fotoğraflarında görünen kişiler için kullanım izni var mı | T5.5 | Kişilik hakkı |
| S-14 | Proje listesi ve sırası kesin mi; eklenecek/çıkarılacak var mı | T4.5 | İçerik kararı |
| S-15 | Güncel transkript: 5. dönem verisi geldi mi (`SEMESTERS` dizisine eklenecek) | T0.4, akademik bölüm | Resmî belge |
| S-16 | İngilizce CV ve site metinlerini bir kez okuyup onaylaması | Faz 4 sonu | İçerik sahipliği |
| S-17 | Blog/yazı yazmayı gerçekten planlıyor mu (planlamıyorsa altyapı kurulmayacak) | Kapsam kararı | Bkz. Bölüm 7 |
| S-18 | Gizlilik dostu analitik istiyor mu (Cloudflare Web Analytics ücretsiz), yoksa sayaç yeterli mi | Kapsam kararı | Tercih |

---

## 7. Yapılmayacaklar

**Y-1 — Boş blog / yazı bölümü açma.** İki yazılık bir "Yazılar" sekmesi, hiç olmamasından **kötüdür**; son yazının tarihi eskidikçe site terk edilmiş görünür. S-17 "evet" değilse içerik koleksiyonu altyapısını projeler için kur, **blog için kurma**.

**Y-2 — Sahte metrik, sahte sosyal kanıt.** "1.2k okuyucu", "50+ proje", "%99 memnuniyet", uydurma referans yorumu, doldurulmuş ziyaretçi defteri notu. Boş bir defter, sahte bir defterden **sonsuz kez** iyidir (İ-1).

**Y-3 — İçerik uydurma.** Yeni proje açıklaması, yeni yetenek, yeni sertifika, yeni tarih, "tahmini" GNO. Boşluk varsa yer tutucu + Bölüm 6'ya satır ekle.

**Y-4 — Ağır bağımlılık.** React/Vue/Svelte, Tailwind, UI kütüphanesi, GSAP/Framer Motion/Three.js/Lenis, animasyon motoru, ikon paketi (gerekli ikonu inline SVG çiz), analitik SDK'sı, font CDN'i (fontlar kendi sunucumuzda kalır), jQuery. Build-time araçlar (satori/resvg/pngquant) serbest.

**Y-5 — Ölçüsüz animasyon.** Kaydırmaya bağlı ağır efekt, parallax, `scroll-jacking`, otomatik oynayan video, 60 fps'i düşüren canvas, sayfa girişinde 1 sn'den uzun bekleten "yükleniyor" perdesi. Her hareket `prefers-reduced-motion` altında kapanır ve FPS ≥ 55 kanıtlanır.

**Y-6 — Semptom bastırma.** `overflow-x: hidden` ile taşmayı gizleme, `!important` yağmuru, `z-index: 9999`, sabit piksel yükseklikle içerik kırpma, `try/catch {}` ile hata yutma.

**Y-7 — Marka değiştirme.** Yeni renk ailesi, yeni font, "daha modern" bir tasarım dili, gradyan cam efektleri, koyu mor SaaS estetiği. Görev **kimliği tutarlı hale getirmek**, kimliği değiştirmek değil.

**Y-8 — Gizli değeri koda/HTML'e/log'a yazma.** `.dev.vars` commit etme, token'ı `localStorage`a koyma, URL'ye query parametresi olarak taşıma, hata mesajında sır sızdırma.

**Y-9 — Üretim verisini repoya koyma.** D1 export'u artefakt olur, commit olmaz. Ziyaretçi notları ve ip_hash'ler git geçmişine **asla** girmez.

**Y-10 — Doğrulanmamış "düzeltme" bildirme.** Kabul kriterindeki komutu çalıştırmadan "tamamlandı" deme. Komut çalışmıyorsa bunu **söyle**, sessizce atlama.

**Y-11 — Büyük bir tek commit.** 30 dosyayı aynı anda değiştiren "iyileştirme" commit'i; bozulduğunda geri almak imkânsız olur. Her görev kendi dalı, kendi commit'i.

**Y-12 — Kapsam kayması.** Bu belgede olmayan bir özelliği (⌘K paleti, RSS, çok dilli üçüncü dil, tema seçici, 3D hero) kendi başına ekleme. Fikrin varsa raporda **öner**, uygulama.

**Y-13 — Erişilebilirlikten ödün.** "Tasarım için" kontrast düşürme, odak halkasını kaldırma (`outline: none` yalnız yerine bir alternatif konduysa), `aria-hidden`ı etkileşimli öğeye koyma, klavyeyle ulaşılamayan kontrol.

**Y-14 — Çalışanı bozma.** Tema hafızası, dil değiştirme, View Transitions, tek sayfalık CV, D1 sayacı, defter akışı, JS'siz zarif düşüş — bunların hepsi bugün çalışıyor ve **her fazın sonunda hâlâ çalışıyor olmalı** (5.5'teki elle kontrol).

---

## Başlangıç emri

1. Bu belgeyi baştan sona oku.
2. `git switch -c faz0/zemin` ile başla.
3. **Faz 0**'ı tamamla — hiçbir şeyi doğrulayamadan hiçbir şeyi değiştirme.
4. Faz 0 bittiğinde `scripts/measure.mjs` çıktısını ve Bölüm 4.4 tablosunun "bugün" sütununu **gerçek ölçümlerle doldurup** rapor et.
5. Sonra Faz 1'e geç. Her fazın sonunda: 5.1–5.5 protokolü + kanıt raporu + Bölüm 6'dan hangi soruların cevabına ihtiyacın olduğu.
6. Emin olmadığın her yerde **dur ve sor** — özellikle içerikle ilgili herhangi bir şeyde (İ-1).
