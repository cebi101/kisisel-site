---
name: dogrula
description: Kod değişikliğinden sonra deponun tüm doğrulama kapılarını doğru sırayla çalıştırır. Şu cümlelerde devreye gir - "doğrula", "kapıları çalıştır", "test et", "hazır mı", "commit öncesi kontrol", "bozdum mu", "her şey yolunda mı", "kontrol et", "verify", "check everything". Ayrıca herhangi bir kaynak dosyayı düzenledikten SONRA, commit önerisinden ÖNCE kendiliğinden çalıştır.
---

# Doğrulama kapısı

Bu depoda dokuz ayrı kontrol var. Elle, farklı sıralarla çalıştırmak eksik
doğrulamaya yol açtı; bir keresinde boyut bütçesi **aylarca hiçbir şeyi
ölçmedi** çünkü dosya yolu yanlıştı ve komut sessizce "can't find files"
deyip geçti.

## Sıra — atlanmaz

```bash
npm run check          # astro check + tsc -p functions
npm run lint           # eslint + stylelint
npm run format:check   # prettier
npm test               # vitest
npm run build          # 15 sayfa üretir
npm run size           # 5 bütçe
node scripts/check-links.mjs   # kırık iç bağlantı
node scripts/contrast.mjs      # WCAG jeton çiftleri
node scripts/a11y.mjs          # dokunma hedefi + scrim
```

Görsel ya da düzen değişikliği yapıldıysa **ek olarak**:

```bash
npm run audit -- --nav --motion --texture
```

Backend (`functions/`) değiştiyse **ek olarak**:

```bash
npm run db:init:local && npm run dev:api
```

## Sessiz başarısızlık uyarısı

`npm run size` çıktısında **`can't find files`** geçiyorsa o bütçe
ölçülmüyordur. Komut yeşil görünür ama koruma yoktur. Bu bir **hatadır**,
raporla ve `.size-limit.json` yolunu düzelt.

Aynı mantık `scripts/*.mjs` için de geçerli: bir denetim "0 sonuç" diyorsa
gerçekten temiz mi, yoksa hiçbir şeyi mi ölçmüyor — bir kez elle kontrol et.

## CV'ye dokunulduysa

`src/layouts/CvLayout.astro` ya da `src/i18n/translations.ts` içindeki CV
metni değiştiyse **cv-tek-sayfa** skill'ini çalıştır. Bu şart pazarlıksız.

## Kabul

- Dokuz kontrolün hepsi çalıştırılır
- Herhangi biri kırmızıysa **hangi komutun ne çıktı verdiği birebir** raporlanır
- Çıktı yapıştırılmadan "düzeltildi" denmez
