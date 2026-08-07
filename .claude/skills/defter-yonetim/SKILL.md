---
name: defter-yonetim
description: Ziyaretçi defteri notlarını ve iletişim mesajlarını yönetmek için yönetim anahtarını hazırlar ve bekleyen kayıtları bildirir. Şu cümlelerde devreye gir - "yönetim", "yonetim", "defter", "mesajlar", "gelen mesaj var mı", "anahtar", "şifre", "şifre ne", "onayla", "not geldi mi", "kim yazmış".
---

# Defter ve mesaj yönetimi

Şeyma `/yonetim` ekranına girmeye çalıştığında ne yazacağını bilemedi.
Anahtar `.admin-token.local` içinde **`ADMIN_TOKEN=xxxxx` biçiminde**
duruyordu ve bir kez **etiketiyle birlikte** kopyalanıp geçersiz oldu —
sunucu haklı olarak reddetti, teşhis için tur harcandı.

## Anahtarı hazırla — önek ayıklaması ŞART

```bash
cd /Users/seymanur/kisisel-site
TOK=$(tr -d '\n\r ' < .admin-token.local | sed 's/^ADMIN_TOKEN=//')
```

`sed` kısmı olmadan anahtar **yanlıştır.** Uzunluk 44 karakter olmalı.

## Kopyalamadan ÖNCE canlıda doğrula

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-time 20 \
  https://seymanurcebi.dev/api/admin/messages -H "authorization: Bearer $TOK"
# 200 değilse Şeyma'ya "hazır" DEME
```

## Sonra

```bash
printf '%s' "$TOK" | pbcopy      # panoya
```

Masaüstündeki `defter-anahtarim.txt` yedeğini de güncelle — Şeyma telefondan
girecekse panoyu kullanamaz.

## Bekleyen kayıtları bildir

```bash
curl -s https://seymanurcebi.dev/api/health
```

## Şeyma'ya söylerken

- Adres: `https://seymanurcebi.dev/yonetim`
- "Kutuya tıkla → **Cmd+V** → **Aç**" — üç adım, fazlası değil
- **Uyar:** onaylanmayan notlar **7 gün** sonra otomatik siliniyor; bakmazsa
  veri kalıcı olarak gider
- Anahtar yalnız o sekmede tutulur, sekme kapanınca unutulur — bilerek böyle
- Anahtarı sohbete düz metin yazmadan önce düşün; **pano + masaüstü dosyası**
  tercih edilir

## Kabul

`curl` **200** döndürmeden Şeyma'ya "anahtar hazır" denmez.
