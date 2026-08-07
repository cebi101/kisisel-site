---
name: kvkk-senkron
description: Gizlilik/KVKK metninin kodun gerçekte yaptığıyla hizada kalmasını sağlar. Şu cümlelerde devreye gir - "kvkk", "gizlilik", "aydınlatma metni", "kişisel veri", "saklama süresi", "veri tutuyor muyuz", "gizlilik sayfası". Ayrıca yeni bir veritabanı tablosu, yeni bir üçüncü taraf servis ya da saklama süresi değişikliği yapmadan ÖNCE kendiliğinden çalıştır.
---

# Gizlilik metni ile kodu hizada tut

Gizlilik metni saklama sürelerini **beyan eder**, kod da **uygular**. İkisi
ayrışırsa metin yanlış beyan hâline gelir — bu hukuki bir sorundur, kozmetik
değil.

Bu depoda saklama süresi 30 günden **7 güne** çekildi ve üç ayrı yerde
güncellenmesi gerekti. Tek kaynak olmasaydı biri unutulacaktı.

## Tek kaynak kuralı

Saklama süreleri `src/data/retention.ts` içinde tanımlıdır. Hem uçlar hem
gizlilik metni **oradan** okur. Metne elle süre yazma.

```bash
npx vitest run tests/privacy.test.ts
```

Kod tarafında süre değişip metin güncellenmezse bu test **kırmızıya döner**
— kasıtlıdır, sustur ma.

## Yeni veri işleme yolu eklenirse

Yeni bir tablo, yeni bir üçüncü taraf servis (e-posta sağlayıcısı, analitik,
CDN) ya da yeni bir alan eklendiğinde metne **aktarım maddesi** eklenmeden
yayına çıkılmaz.

Kontrol listesi:

- [ ] Hangi veri kategorisi işleniyor
- [ ] Hukuki sebep ne
- [ ] Nereye aktarılıyor (yurt dışı ise ayrıca belirt)
- [ ] Ne kadar saklanıyor, kim siliyor
- [ ] Metinde yazıyor mu

## Hukuki beyanlar uydurulmaz

Veri sorumlusu kimliği, başvuru adresi, VERBİS kararı, yürürlük tarihi —
bunlar **Şeyma'dan gelmeden yazılmaz.** Yer tutucu konur ve derleme kapısı
yer tutucunun üretime sızmasını engeller:

```bash
! grep -rn "ŞEYMA-GİRDİSİ" dist/
```

Cevaplanmamış sorular masaüstündeki `KVKK-SORULARI.md` dosyasında.

## Dürüstlük notu

Temizlik yalnız **yeni bir yazma isteğinde** çalışıyor. Trafik yoksa "en
fazla 1 saat tutulur" sözü kodla garanti edilmiyor. Metinde ya bu koşul
dürüstçe yazılır ya da temizlik başka bir tetiğe de bağlanır — **abartılı
beyan yazılmaz.**

## Kabul

Gizlilik testi yeşil **ve** `dist` içinde yer tutucu yok.
