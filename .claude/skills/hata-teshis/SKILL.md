---
name: hata-teshis
description: Bir şeyin çalışmadığı bildirildiğinde tahmin yürütmeden tarayıcıda ölçerek kök nedeni bulur. Şu cümlelerde devreye gir - "çalışmıyor", "bozuk", "olmuyor", "olmadı", "hata var", "neden böyle", "garip", "tıklanmıyor", "görünmüyor", "açılmıyor", "kapanmıyor", "hâlâ öyle", "yine aynı". Kullanıcı bir sorun bildirdiğinde İLK yapılacak iş budur — sebep hakkında hiçbir tahmin yürütmeden önce.
---

# Tahmin etme, ölç

Bu deponun **en pahalı dersi**. Menü kapanmama hatasında sırasıyla önbellek
sanıldı, CSS sırası sanıldı, sonra kullanıcıya _"sende eski sürüm var"_
denildi — **üçü de yanlıştı.** Gerçek sebep ancak tarayıcıya
`document.elementFromPoint()` sorulduğunda çıktı: görünmez bir katman tüm
dokunuşları yutuyordu.

Aynı şey tema kaymasında da yaşandı: sebep, sayfa geçişinde `<html>`
özniteliklerinin silinmesiydi ve bu da yalnız ölçerek bulundu.

## Zorunlu sıra

### 1. Önce üret

Şikayeti headless tarayıcıda tekrarla. **Üretemiyorsan bunu açıkça söyle**
ve hangi senaryoları denediğini listele. Üretmeden düzeltme yazma.

### 2. Ölç, bakma

Koda bakıp "şu olmalı" deme. Tarayıcıya sor:

| Soru                      | Araç                                       |
| ------------------------- | ------------------------------------------ |
| Hangi kural kazanıyor?    | `getComputedStyle(el)`                     |
| Öğe nerede, görünür mü?   | `getBoundingClientRect()`                  |
| Dokunuşu kim yakalıyor?   | `document.elementFromPoint(x, y)`          |
| Hangi kurallar eşleşiyor? | `document.styleSheets` + `el.matches(sel)` |
| Animasyon takılı mı?      | `el.getAnimations()`                       |
| Dinleyici birikiyor mu?   | `npm run audit -- --leak`                  |

### 3. Geçiş tuzağı

Headless tarayıcıda `--virtual-time-budget` ile CSS geçişleri **başlangıç
değerinde donabilir.** Ölçüm "kural hiç uygulanmamış" gösteriyorsa önce
`*{transition:none!important}` enjekte edip **tekrar ölç**. Bu tuzağa bu
depoda iki kez düşüldü ve iki kez yanlış teşhis kondu.

### 4. Kök nedeni söyle

Semptomu bastırma: `overflow: hidden`, `!important` yağmuru,
`z-index: 9999`, sabit yükseklikle kırpma — hepsi yasak.

### 5. Regresyon kapısı ekle

Bulunan hata bir denetime bağlanır (`scripts/a11y.mjs`, `scripts/audit.mjs`,
`tests/`) ki sessizce geri gelemesin. Kapı eklenmeden iş bitmiş sayılmaz.

### 6. Kullanıcıyı suçlamadan önce ölç

**"Sende önbellek var" / "eski sürüme bakıyorsun" demeden önce** kendi
ölçümünü yap: canlı HTML'i çek, CSS'i çek, temiz profille ekran görüntüsü al.
Bu cümle bu depoda iki kez haksız yere kuruldu ve kullanıcıyı boşuna yordu.

## Kabul

Rapor şu üçünü içerir:
**(a)** hatayı üreten ölçüm çıktısı · **(b)** kök neden · **(c)** eklenen
regresyon kapısı.
