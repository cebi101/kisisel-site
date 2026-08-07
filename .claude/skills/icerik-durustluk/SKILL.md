---
name: icerik-durustluk
description: Siteye giren her metin ve iddiayı Şeyma'nın gerçek bilgisiyle sınırlar; onun adına hiçbir şey uydurulmasını engeller. Şu cümlelerde devreye gir - "metin ekle", "içerik", "şunu yaz", "cv metni", "hakkımda", "proje açıklaması", "yetenek ekle", "başarı", "sertifika", "şunu da ekle", "güncelle", "bunu bilmiyorum", "bilmediğim", "sil", "kaldır", "yazma", "çıkar". Ayrıca translations.ts, src/data/ veya herhangi bir görünür metni düzenlemeden ÖNCE kendiliğinden çalıştır.
---

# Şeyma adına hiçbir şey uydurma

Bu kural bu depoda **iki kez sınandı**:

1. Şeyma siteden PyTorch, Scikit-learn, XGBoost, Docker ve Linux
   etiketlerini _"bunları bilmiyorum"_ diyerek kaldırttı.
2. Akademik veriyi "uydurulmuş" sanıp sildim — **veri gerçekti**, Şeyma
   düzeltti ve transkriptini paylaştı.

İkincisi daha öğreticidir: **silmek de bir içerik kararıdır** ve o da
sorulmadan yapılmamalıdır.

## Kurallar

- Siteye giren **hiçbir** iddia — başarı, teknoloji, tarih, sayı,
  sertifika, unvan, süre — Şeyma'dan gelmeden yazılmaz.
- Mevcut metni yeniden yazmak **serbest** (dilbilgisi, akış, ton).
  **Yeni iddia eklemek yasak.**
- Sayılar kaynağa dayanmalı. Not ortalaması `src/data/site.ts` içindeki
  `SEMESTERS` dizisinden **hesaplanır**, elle yazılmaz.
- Bir şeyin uydurma olduğunu düşünüyorsan **silmeden önce sor.**
- Boşluk varsa yer tutucu koy ve Şeyma'ya sor; sahte veriyle doldurma.
- Ölçülemeyen sıfat kullanma: "yüksek performanslı", "ölçeklenebilir",
  "kurumsal seviye", "modern mimari", "3 yıl deneyim".
- Şeyma'nın **kaldırttığı** bir şeyi geri ekleme. Bilinen liste:
  PyTorch/Scikit-learn/XGBoost/Docker/Linux (yetenek olarak), not
  ortalaması (**yalnız CV'de** — sitede durur), kahve konsepti, slogan.

## Doğrulama

```bash
npx vitest run tests/i18n.test.ts   # TR ve EN aynı anahtarlar, aynı dizi uzunlukları
```

Metin iki dilde de güncellenmezse bu test **kırmızıya döner** — kasıtlıdır.

Zaman duyarlı ifadelerde kip doğru olmalı: Şeyma bir şeye _kabul edildiyse_
"başladım" yazma, "kabul edildim, yakında başlıyorum" yaz. (FPV drone
eğitimi böyle yazıldı.)

## Kabul

- Parite testi yeşil
- Eklenen her iddianın kaynağı belirtilmiş: Şeyma'nın hangi mesajı ya da
  `src/data/` içindeki hangi dosya
- Kaynağı olmayan tek bir cümle bile yayına çıkmaz
