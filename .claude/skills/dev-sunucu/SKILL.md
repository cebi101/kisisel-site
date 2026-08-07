---
name: dev-sunucu
description: Yerel geliştirme sunucusunu yönetir ve bayat sunucu tuzağını önler. Şu cümlelerde devreye gir - "localhost", "yerel", "dev sunucu", "sunucuyu başlat", "değişiklik görünmüyor", "eski gösteriyor", "hâlâ eski", "yaptığın görünmüyor", "sayfada yok". Kullanıcı bir değişikliği göremediğini söylediğinde İLK kontrol budur.
---

# Bayat sunucu tuzağı

İki ayrı olayda geliştirme sunucusu günlerdir açıktı ve **dosya
değişikliklerini almıyordu.** Şeyma değişiklikleri göremediği için "olmadı"
dedi; saatler kayboldu. Bir keresinde sunucu **2,8 gündür** açıktı.

## Şeyma "değişiklik görünmüyor" dediğinde — ilk kontrol

```bash
npx astro dev status
```

Uptime birkaç saati geçtiyse **yeniden başlat**, tartışma:

```bash
npx astro dev stop
npx astro dev --background
```

Sonra servis edilen HTML'de yeni içeriğin **gerçekten** olduğunu kanıtla:

```bash
curl -s --max-time 10 http://localhost:4321/ | grep -c "YENİ_İÇERİK_İMZASI"
```

**1 dönmeden** "düzeldi" deme.

## Sunucuyu başlatma (proje kuralı)

Her zaman arka planda:

```bash
npx astro dev --background
```

Yönetim: `astro dev stop` · `astro dev status` · `astro dev logs`

## Önemli: API uçları dev sunucusunda YOK

`astro dev` yalnız statik sayfaları servis eder. `/api/*` uçlarını denemek
için ayrı komut gerekir:

```bash
npm run db:init:local     # yerel D1 şeması (bir kez)
npm run dev:api           # wrangler pages dev — port 8788
```

Yerelde `/api/health` çağrısı 404 dönüyorsa sunucuyu yanlış komutla
başlatmışsındır.

## Sorun localhost'ta değil canlıdaysa

Bu skill'i bırak, **yayinla** skill'ine geç. Canlı sitede eski sürüm görünme
sebebi başkadır (dağıtım henüz inmemiş ya da tarayıcı önbelleği) ve orada
**önce kendi ölçümünü yapmalısın** — bkz. **hata-teshis**.

## Kabul

Sunucunun servis ettiği HTML'de yeni içerik `curl` ile kanıtlanır; kanıt
olmadan kullanıcıya "bak" denmez.
