---
name: cv-tek-sayfa
description: CV'nin yazdırma çıktısında hâlâ TEK SAYFA olduğunu doğrular. Şu cümlelerde devreye gir - "cv", "özgeçmiş", "cv değişti", "cv sayfası", "cv metni", "yazdırma", "PDF", "indir deyince", "tek sayfaya düşsün", "tek sayfaya sığsın", "cv'de ortalama", "cv'den sil", "cv'ye ekle". Ayrıca CvLayout.astro veya translations.ts içindeki CV metni değiştiğinde kendiliğinden çalıştır — bu şart pazarlıksızdır.
---

# CV tek sayfa şartı

Şeyma'nın açık ve tekrarlanan şartı: **"CV tek sayfaya düşsün."**

Bu şartı bozan her değişiklik (yazı tipi, renk, yeni bölüm, gezinme çubuğu,
uzayan bir cümle) **PDF alınmadan fark edilmez**. Bu depoda CV'ye üç kez
dokunuldu; üçünde de ayrı ayrı ölçmek gerekti.

## Ölçüm

```bash
npm run build
pkill -f "http.server" 2>/dev/null; sleep 1
(cd dist && python3 -m http.server 4977 >/dev/null 2>&1 &)
sleep 2
for r in cv en/cv; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=/tmp/cv.pdf "http://localhost:4977/$r" 2>/dev/null
  echo -n "  /$r → "
  python3 -c "
import re
d = open('/tmp/cv.pdf', 'rb').read()
print(len(re.findall(rb'/Type\s*/Page[^s]', d)), 'sayfa')"
done
pkill -f "http.server 4977" 2>/dev/null
```

**1 değilse başarısız.** Sayfa taşıyorsa ne kısaltılacağını Şeyma'ya sor —
kendi başına içerik silme (bkz. **icerik-durustluk**).

## Ek kontroller

- `.no-print` sınıfı ekran öğelerinde duruyor mu — gezinme çubuğu ve
  düğmeler A4 çıktısına girmemeli
- Yazdırma bloğunda tema jetonları tanımlı mı; eksikse gece modu kullanan
  biri bastığında **renkli zemin** basar
- Şeyma'nın kaldırttığı bilgi geri gelmiş mi:

```bash
grep -c "3,62\|3\.62\|GNO\|GPA\|ortalama" dist/cv/index.html dist/en/cv/index.html
# ikisi de 0 olmalı — not ortalaması CV'de GEÇMEZ
```

## Kabul

`/cv → 1 sayfa` ve `/en/cv → 1 sayfa` çıktısı üretilmeden değişiklik
tamamlanmış sayılmaz.
