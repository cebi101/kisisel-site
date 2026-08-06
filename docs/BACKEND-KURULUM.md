# Ziyaretçi sayacı ve defteri — Cloudflare kurulumu

Kod hazır ve yayında. Çalışması için Cloudflare panelinde **bir kereye mahsus**
şu ayarların yapılması gerekiyor. Tahmini süre: 5 dakika.

> Bu adımlar tamamlanana kadar site normal çalışır: sayaç görünmez,
> defter sayfası "henüz not yok" der. Hiçbir şey bozulmaz.

---

## 1. Veritabanını oluştur (D1)

Cloudflare paneli → sol menü **Storage & Databases → D1 SQL Database → Create**

- **Database name:** `kisisel-site`
- **Create** de.

## 2. Tabloları kur

Oluşturduğun veritabanına gir → **Console** sekmesi.
Depodaki [`db/schema.sql`](../db/schema.sql) dosyasının **tamamını** yapıştır ve çalıştır.

Şu üç şeyi oluşturur:

- `counters` → görüntülenme sayısı (tek satır, kişisel veri yok)
- `guestbook` → ziyaretçi notları (onaysızlar gizli)
- İki indeks (hızlı listeleme ve hız sınırı için)

## 3. Veritabanını siteye bağla

**Workers & Pages → kisisel-site → Settings → Bindings → Add → D1 database**

| Alan          | Değer          |
| ------------- | -------------- |
| Variable name | `DB`           |
| D1 database   | `kisisel-site` |

> Değişken adı **tam olarak `DB`** olmalı, kod bu adı arıyor.

## 4. İki gizli değer ekle

Aynı **Settings → Variables and Secrets** bölümünde, **Type: Secret** seçerek:

| İsim          | Ne işe yarar                        | Nasıl üretilir                          |
| ------------- | ----------------------------------- | --------------------------------------- |
| `IP_SALT`     | IP özetlerini tahmin edilemez kılar | Uzun, rastgele bir metin (32+ karakter) |
| `ADMIN_TOKEN` | Not onaylama yetkisi                | Uzun, rastgele bir metin (32+ karakter) |

Terminalde üretmek için: `openssl rand -base64 32`

**ADMIN_TOKEN'ı kimseyle paylaşma** — bu, defteri yönetme anahtarın.

## 5. Yeniden yayınla

**Deployments → en üstteki dağıtım → ⋯ → Retry deployment**
(veya repoya herhangi bir commit push et; otomatik yayınlanır.)

---

## Nasıl çalışıyor?

**Sayaç:** Ziyaretçi siteye girdiğinde tarayıcı `/api/views` ucuna bir istek atar,
sayı bir artar ve alt bilgide görünür. Aynı ziyaretçi sekmesini kapatana kadar
tekrar sayılmaz (oturum başına bir kez). Hiçbir kişisel veri tutulmaz.

**Defter:** Ziyaretçi not bırakır → not `approved = 0` olarak kaydedilir ve
**sen onaylayana kadar sitede görünmez**. Koruma katmanları:

- Bal küpü alanı (botlar doldurur, insanlar göremez)
- Saatte en fazla 3 not (aynı ziyaretçiden)
- Ad 40, not 280 karakterle sınırlı
- Kontrol karakterleri temizlenir
- Notlar `textContent` ile basılır → HTML/script enjeksiyonu imkânsız
- Ham IP **saklanmaz**; yalnızca `IP_SALT` ile tuzlanmış SHA-256 özeti tutulur ve
  hız sınırı penceresi (1 saat) dolunca otomatik silinir
- `IP_SALT` ayarlanmadan defter **kapalı** kalır (503) — sessizce zayıf tuza düşmez

---

## Not onaylama

Bekleyen notları görmek için (terminalden):

```bash
curl -H "Authorization: Bearer ADMIN_TOKEN_BURAYA" \
  https://seymanurcebi.dev/api/admin/guestbook
```

Bir notu yayımlamak:

```bash
curl -X POST -H "Authorization: Bearer ADMIN_TOKEN_BURAYA" \
  -H "content-type: application/json" \
  -d '{"id": 1, "action": "approve"}' \
  https://seymanurcebi.dev/api/admin/guestbook
```

Silmek için `"action": "delete"` kullan.

> İleride istersen bunun için şifreli küçük bir yönetim sayfası da yapabiliriz.

---

## KVKK notu

Defter, ziyaretçinin **yazdığı ad ve notu** saklar — bu kişisel veridir.
Defter sayfasında bunu açıkça belirten bir bilgilendirme metni var.
Bir ziyaretçi notunun silinmesini isterse yukarıdaki `delete` komutuyla kaldırabilirsin.
