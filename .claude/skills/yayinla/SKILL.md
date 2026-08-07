---
name: yayinla
description: Değişikliği yayına alır ve canlı sitede gerçekten göründüğünü kanıtlar. Şu cümlelerde devreye gir - "yayınla", "push et", "canlıya al", "deploy et", "yayına gitsin", "link ver", "bana link ver", "site güncellendi mi", "canlıda mı", "bakabilir miyim". Kullanıcıya bir bağlantı vermeden ÖNCE her zaman çalıştır.
---

# Yayına alma ve canlı doğrulama

**Push etmek yayına girmek değildir.** Şeyma bu depoda en az beş kez eski
sürüme baktı ve "olmamış" dedi; iki kez de dağıtımın tam ortasına denk
gelip **stilsiz sayfa** gördü (beyaz zemin, mavi bağlantılar) — o an yeni
HTML inmiş ama yeni stil dosyası henüz yayılmamıştı.

## Sıra

1. **Önce `dogrula`** — kapılar yeşil değilse push etme
2. `git add -A && git commit` (bkz. **commit-kurali** skill'i) → `git push origin main`
3. **Dağıtımın indiğini kanıtla.** Sürüm numarasına bakma; yeni eklediğin
   somut bir içerik imzası ara:

```bash
for i in $(seq 1 25); do
  if curl -s --max-time 15 https://seymanurcebi.dev/ | grep -q "YENİ_İÇERİK_İMZASI"; then
    echo "canlıda"; break
  fi
  sleep 15
done
```

4. İnince kontrol et:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://seymanurcebi.dev/
curl -s https://seymanurcebi.dev/api/health
```

## Şeyma'ya söylerken

- **Dağıtım inmeden "bak" deme.** İnene kadar bekle.
- Link verirken **her zaman ekle:** "Cmd+Shift+R ile yenile" — normal
  yenileme yetmiyor.
- Dağıtım sürüyorsa **önceden uyar:** "şu an iniyor, 2-3 dakika; bu sırada
  sayfa stilsiz görünebilir."
- "Sende önbellek var" demeden önce **kendi ölçümünü yap** (bkz.
  **hata-teshis**). Bu cümle bu depoda iki kez haksız yere kuruldu.

## Kabul

Canlı sitede yeni içeriğin varlığı `curl` ile **kanıtlanmadan** "yayında"
denmez.
