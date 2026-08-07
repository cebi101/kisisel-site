---
name: commit-kurali
description: Bu deponun commit dilini ve kurallarını uygular. Şu cümlelerde devreye gir - "commit", "commitle", "commit et", "kaydet", "git", "push", "yayınla", "gönder", "benim adıma", "sadece benim adıma at", "claude ekleme". Herhangi bir commit oluşturmadan ÖNCE her zaman çalıştır — özellikle imza kuralı yüzünden.
---

# Commit kuralı

## Değişmez: yazar yalnız Şeyma

**`Co-Authored-By` satırı ASLA eklenmez.** Bu, Şeyma'nın bu depodaki ilk ve
tekrarlanan talebiydi: _"commitde sadece benim adıma at, Claude'u ekleme."_

Depo geçmişinde bugüne kadar **0** adet `Co-Authored-By` var — kural
tutmuş, bozma.

```bash
git log --all --format='%b' | grep -c "Co-Authored-By"   # 0 olmalı
```

## Mesaj biçimi

- **Türkçe**, emir kipi ya da bildirme kipi
- İlk satır ≤ 72 karakter, nokta ile bitmez
- Gövde şu üçünü içerir:
  1. **Ne bozuktu** (belirti)
  2. **Kök neden** (neden bozuktu)
  3. **Önce/sonra ölçümü** (sayı)

## İyi örnek

```
Kart hover'ı 700ms'den 200ms'ye indi

.js .reveal transition kısayolu .project-row ve .cert-card'ın kendi
0.2s geçişini eziyordu (computed: "opacity, transform | 0.7s, 0.7s").
Keyframe'e çevrildi.

ÖLÇÜM: audit --motion ile doğrulandı. CSS 6284 -> 6301 B gzip.
Testler 46/46 yeşil.
```

## Kötü örnek

```
iyileştirmeler ve düzeltmeler        <- ne bozuktu belli değil
                                      <- ölçüm yok
Co-Authored-By: ...                   <- YASAK
```

## Kapsam

- Her görev **kendi commit'i.** 30 dosyayı aynı anda değiştiren
  "iyileştirme" commit'i yasak — bozulunca geri almak imkânsız olur.
- Bütçe yükseltmek, jeton yeniden adlandırmak gibi mekanik işler **ayrı**
  commit olur, bir özelliğin yan etkisi olarak gizlenmez.
- `main` dalına doğrudan push serbest — Şeyma dal koruması istemedi.

## Sıra

1. **`dogrula`** skill'ini çalıştır — kapılar yeşil değilse commit yok
2. `git add -A && git commit`
3. Push gerekiyorsa **`yayinla`** skill'ine geç

## Kabul

`git log -1` çıktısında `Co-Authored-By` geçmez **ve** gövdede en az bir
ölçüm sayısı vardır.
