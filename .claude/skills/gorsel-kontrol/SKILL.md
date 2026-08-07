---
name: gorsel-kontrol
description: Görünümü etkileyen bir değişikliğin bir şeyi bozup bozmadığını önce/sonra ekran görüntüsü karşılaştırmasıyla ölçer. Şu cümlelerde devreye gir - "görünüm bozuldu mu", "bir şey bozuldu mu", "önce sonra karşılaştır", "görsel regresyon", "CSS değiştirdim", "renk değişti", "tasarım kontrolü", "aynı duruyor mu". Ayrıca global.css veya herhangi bir scoped style bloğunda toplu değişiklik yapmadan ÖNCE kendiliğinden çalıştır.
---

# Görsel regresyon ölçümü

CSS'te 12 mükerrer seçici birleştirildiğinde görünümün bozulup bozulmadığı
ancak 28 ekran görüntüsünün karşılaştırılmasıyla anlaşıldı: **27'si birebir
aynıydı**, biri 4 milyon baytta 3 bayt farklıydı — yani gürültü. Bu ölçüm
olmasaydı değişiklik ya korkudan yapılmayacak ya körlemesine yapılacaktı.

## Sıra

**Değişiklikten ÖNCE:**

```bash
npm run build && node scripts/shots.mjs scratchpad/once
```

**Değişiklikten SONRA:**

```bash
npm run build && node scripts/shots.mjs scratchpad/sonra
```

**Karşılaştır** — hash eşitliği yetmez, farklı çıkanın **yüzdesini** ölç:

```bash
python3 - <<'PY'
import hashlib, os, subprocess
a, b = "scratchpad/once", "scratchpad/sonra"
ayni = 0
for f in sorted(x for x in os.listdir(a) if x.endswith(".png")):
    pa, pb = os.path.join(a, f), os.path.join(b, f)
    if not os.path.exists(pb):
        print(f"  {f}: SONRA yok"); continue
    if hashlib.sha256(open(pa, "rb").read()).hexdigest() == \
       hashlib.sha256(open(pb, "rb").read()).hexdigest():
        ayni += 1; continue
    out = subprocess.run(["python3", "-c", """
import sys
from PIL import Image, ImageChops
i1, i2 = Image.open(sys.argv[1]).convert("RGB"), Image.open(sys.argv[2]).convert("RGB")
if i1.size != i2.size:
    print("boyut farkli"); raise SystemExit
d = ImageChops.difference(i1, i2)
n = sum(1 for p in d.getdata() if p != (0, 0, 0))
print(f"%{100 * n / (i1.size[0] * i1.size[1]):.4f}")
""", pa, pb], capture_output=True, text=True)
    print(f"  {f}: {out.stdout.strip()}")
print(f"  aynı: {ayni}")
PY
```

## Eşik

| Fark                                | Karar                                            |
| ----------------------------------- | ------------------------------------------------ |
| %0,01 altı                          | Kenar yumuşatma gürültüsü — yok say              |
| %0,01 üstü, **beklenen** sayfada    | Normal; raporla ve gözle bir kez bak             |
| %0,01 üstü, **beklenmedik** sayfada | **DUR.** Ne değişti, neden — çözmeden devam etme |

## Kabul

Rapor şunları içerir: kaç görüntüden kaçı aynı · farklı olanların yüzdesi ·
beklenmedik fark varsa görüntü yolu ve gözle inceleme sonucu.
