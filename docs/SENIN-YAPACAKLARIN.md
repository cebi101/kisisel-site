# Senin yapacakların

Kodun tamamı hazır ve yayında. Aşağıdaki dört şey **hesap işlemi** olduğu için
senin yapman gerekiyor. Sırası önemli değil, istediğinden başla.

Her adımın sonunda **nasıl doğrulayacağın** yazılı — "oldu mu?" diye tahmin
etmene gerek yok.

---

## 1. İletişim formunun gerçekten çalışması

**Şu an ne oluyor:** Form sunucuya gidiyor, sunucu "e-posta anahtarım yok"
diyor ve site eski davranışına düşüp e-posta uygulamanı açıyor. Yani şu an
Gmail'i tarayıcıdan kullanan biri sana hâlâ ulaşamıyor.

**Yapman gereken:**

1. https://resend.com adresinden ücretsiz hesap aç (ayda 3.000 e-posta, kart
   istemiyor).
2. **Domains** → **Add Domain** → `seymanurcebi.dev` yaz.
3. Sana 3 tane DNS kaydı verecek. Bunları Cloudflare'de ekle:
   - Cloudflare paneli → `seymanurcebi.dev` → **DNS** → **Add record**
   - Resend'in verdiği her kaydı aynen gir (tür, ad, değer)
   - **Proxy durumu: kapalı (gri bulut)** olmalı
4. Resend'e dön, **Verify** de. Birkaç dakika sürebilir.
5. **API Keys** → **Create API Key** → adını `site-formu` koy → kopyala.
6. Cloudflare paneli → **Workers & Pages** → `kisisel-site` → **Settings** →
   **Variables and Secrets** → **Add**:
   - Ad: `RESEND_API_KEY` — Değer: kopyaladığın anahtar — **Type: Secret**
   - Ad: `CONTACT_TO` — Değer: `seymanurcebi6@gmail.com` — Type: Secret
7. **Save** de. Yeniden dağıtım gerekmez, birkaç saniyede aktif olur.

**Doğrulama:** `seymanurcebi.dev/iletisim` adresine git, kendine bir test
mesajı gönder. İki dakika içinde gelen kutuna düşmeli ve **Yanıtla** dediğinde
gönderenin adresine gitmeli.

> Bu adımı yapmazsan hiçbir şey bozulmaz — form bugünkü gibi e-posta
> uygulamasını açmaya devam eder.

---

## 2. Deftere yeni not gelince e-posta ile haber almak

Bu, 1. adımdaki Resend hesabını kullanır. Önce onu yap.

Anahtar eklendikten sonra bana söyle, bildirim kodunu ekleyeyim — sunucu
tarafında birkaç satır. (Şu an yok, çünkü e-posta sağlayıcısı olmadan
çalışamıyordu.)

**Bu arada:** Notları zaten `seymanurcebi.dev/yonetim` adresinden telefondan
onaylayabilirsin. Yönetim anahtarın `.admin-token.local` dosyasında.

---

## 3. Site çökerse haber veren izleme (UptimeRobot)

1. https://uptimerobot.com → ücretsiz hesap aç.
2. **Add New Monitor**:
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `seymanurcebi.dev sağlık`
   - URL: `https://seymanurcebi.dev/api/health`
   - Monitoring Interval: **5 minutes**
3. **Alert Contacts**: e-posta adresini seç.
4. **Create Monitor**.

**Neden bu adres:** `/api/health` yalnızca sayfanın açılıp açılmadığına değil,
**veritabanına erişilip erişilemediğine** de bakıyor. Veritabanı koparsa site
açılmaya devam eder ama sayaç ve defter sessizce kaybolurdu — bu izleme onu
yakalar.

**Doğrulama:** Tarayıcıda `https://seymanurcebi.dev/api/health` adresini aç.
`{"db":"ok","salt":true,"admin":true}` görmelisin. UptimeRobot panelinde
monitör birkaç dakika içinde yeşile döner.

---

## 4. Haftalık veritabanı yedeği

Ziyaretçi notların ve sayacın (şu an 77) **yeniden üretilemez** veri. Yanlış
bir silme kalıcı kayıp demek. İş akışı hazır ve commit'li — sadece iki anahtar
eksik.

1. Cloudflare paneli → sağ üst profil → **API Tokens** → **Create Token**
2. **Custom token** seç:
   - Token name: `github-yedek`
   - Permissions: **Account** → **D1** → **Edit**
   - Account Resources: **Include** → hesabın
3. **Continue** → **Create** → token'ı **kopyala** (bir daha gösterilmez).
4. Account ID'yi al: Cloudflare paneli → **Workers & Pages** → sağ sütunda
   **Account ID** yazıyor, kopyala.
5. GitHub → `cebi101/kisisel-site` → **Settings** → **Secrets and variables**
   → **Actions** → **New repository secret**. İkisini ekle:
   - `CLOUDFLARE_API_TOKEN` = kopyaladığın token
   - `CLOUDFLARE_ACCOUNT_ID` = Account ID
6. **Actions** sekmesi → **D1 Yedeği** → **Run workflow** ile hemen bir kez
   çalıştır.

**Doğrulama:** İş yeşile dönmeli ve altında `d1-yedek` adlı bir dosya
(artefakt) görünmeli. İndirip içinde `CREATE TABLE` satırlarını görebilirsin.

> Yedek dosyası **depoya girmez**, yalnızca 90 gün saklanan bir iş çıktısı
> olarak durur. Ziyaretçi notları git geçmişine asla yazılmaz.

---

## 5. Analitiği açmak (istemiştin)

Cloudflare zaten betiği enjekte ediyor, sadece panelden açık değil:

1. Cloudflare paneli → **Workers & Pages** → `kisisel-site`
2. **Metrics** veya **Analytics** sekmesi → **Web Analytics** → **Enable**

Çerez kullanmıyor, ziyaretçi takip etmiyor — KVKK açısından güvenli.

**Doğrulama:** Bir gün sonra panelde ziyaret sayıları görünmeye başlar.
LinkedIn paylaşımının kaç tıklama getirdiğini oradan ölçebilirsin.

---

## Sonra istersen

Bunlar acil değil, aklında bulunsun:

- **Proje görselleri** — kartlarda şu an sadece metin var. Elinde VARIANT-GNN
  mimari şeması, LIME çıktısı veya foundry-local-rag ekran görüntüsü olursa
  gönder; kartlara eklerim. En ikna edici kanıt görsel oluyor.
- **İngilizce metinler** — `/en` ve `/en/cv` sayfalarını bir kez okuman iyi
  olur. Cümleler Türkçenin birebir karşılığı ama ifadelerin sana ait olması
  daha doğru.
- **Google Search Console** — sitenin Google'da çıkması için doğrulama
  gerekiyor, o da senin Google hesabınla yapılıyor. İstersen adımlarını
  yazarım.
