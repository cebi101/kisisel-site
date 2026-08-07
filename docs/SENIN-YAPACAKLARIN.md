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

**İyi haber:** Alan adı doğrulaması (DNS kayıtları) **gerekmiyor**. Resend'in
sandbox adresi yeterli, çünkü mesajlar zaten yalnızca **senin** adresine
gidiyor.

### Adımlar (~5 dakika)

1. https://resend.com adresinden ücretsiz hesap aç.
   **ÖNEMLİ:** Kaydolurken **`seymanurcebi6@gmail.com`** adresini kullan.
   Başka bir adresle kaydolursan her gönderim sessizce reddedilir — sandbox
   yalnızca hesabın kendi adresine göndermeye izin verir.
2. **API Keys** → **Create API Key** → adını `site-formu` koy → kopyala.
3. Cloudflare paneli → **Workers & Pages** → `kisisel-site` → **Settings** →
   **Variables and Secrets**. Şunları ekle:

   | Ad               | Değer                                | Tür                         |
   | ---------------- | ------------------------------------ | --------------------------- |
   | `RESEND_API_KEY` | kopyaladığın anahtar                 | **Secret**                  |
   | `MAIL_FROM`      | `Site formu <onboarding@resend.dev>` | düz değişken                |
   | `CONTACT_TO`     | `seymanurcebi6@gmail.com`            | düz değişken (isteğe bağlı) |

4. **Deployments** sekmesine git → **en üstteki dağıtım** → sağdaki **⋯** →
   **Retry deployment**.

   > ⚠️ **Bu adım şart.** Cloudflare'de eklenen anahtarlar mevcut dağıtıma
   > uygulanmaz; yeniden dağıtım yapılmazsa hiçbir şey değişmez.
   > (Bu belgede daha önce "yeniden dağıtım gerekmez" yazıyordu, yanlıştı.)

**Doğrulama — test mesajı atmadan:**
`https://seymanurcebi.dev/api/health` adresini aç. Çıktıda **`"mail":true`**
görmelisin. Görüyorsan kurulum tamam.

Sonra `seymanurcebi.dev/iletisim` sayfasından kendine bir test mesajı gönder;
iki dakika içinde gelen kutuna düşmeli ve **Yanıtla** dediğinde gönderenin
adresine gitmeli.

> Not: Dal (önizleme) dağıtımlarının 503 dönmeye devam etmesi **normaldir** —
> anahtarı yalnız Production'a ekledin.

> Sonradan `site@seymanurcebi.dev` gibi kendi adresinden göndermek istersen
> Resend'de alan adını doğrulaman yeter; **kod değişikliği gerekmez**, sadece
> `MAIL_FROM` değerini güncellersin.

## 2. Deftere yeni not gelince e-posta

**Kod hazır** — 1. adımdaki anahtar eklendiği anda kendiliğinden çalışmaya
başlar. Ayrı bir kurulum yok.

Not düştüğünde sana kısa bir e-posta gelir: kim yazmış, ne yazmış ve
onaylamak için `seymanurcebi.dev/yonetim` bağlantısı.

> Bu önemli: onaylanmayan notlar **7 gün sonra otomatik siliniyor**.
> Bildirim gelmezse ve `/yonetim`'e bakmazsan not kalıcı olarak gider.

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

Analitik şu an **kapalı** — canlı sayfada betik yok (ölçüldü). Açmak için:

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
