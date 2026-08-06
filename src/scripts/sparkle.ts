// İmleç ışıltısı — küçük yıldızlardan iz.
//
// Bu modül AYRI bir parça olarak yüklenir: ölçülen 2.208 bayt (üretilen
// Layout modülünün %38'i) yalnızca gerçek imleçli cihazlarda işe yarıyordu,
// ama mobil ziyaretçiler de indirip ayrıştırıyordu.
//
// Yükleme koşulu çağıran tarafta: (hover: hover) and (pointer: fine)
// ve prefers-reduced-motion kapalı.

let sparkleCanvas: HTMLCanvasElement | null = null;

/** View Transitions gezinmesinden sonra canvas'ı yeniden bağlar. */
export function reattach(): void {
  if (sparkleCanvas && !sparkleCanvas.isConnected) {
    document.body.appendChild(sparkleCanvas);
  }
}

export function init(): void {
  if (sparkleCanvas) return; // zaten kurulu

  const cvs = document.createElement("canvas");
  sparkleCanvas = cvs;
  cvs.className = "sparkle-canvas";
  cvs.setAttribute("aria-hidden", "true");
  // kritik stiller doğrudan öğede: stil dosyası değişse de efekt bozulmasın
  cvs.style.cssText = "position:fixed;inset:0;z-index:30;pointer-events:none;";
  document.body.appendChild(cvs);
  const ctx = cvs.getContext("2d")!;
  let dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    cvs.width = innerWidth * dpr;
    cvs.height = innerHeight * dpr;
    cvs.style.width = innerWidth + "px";
    cvs.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener("resize", resize);

  // yıldız tonları temaya göre: kâğıt zeminde görünür kalsın, gecede parlasın
  const TINTS_LIGHT = ["#c7cf8e", "#aeb977", "#d9dd9a", "#9fae6b", "#e4e6a8"];
  const TINTS_DARK = ["#fefd4d", "#f3f28a", "#e8e86a", "#fbfab0", "#d6dc7e"];
  const tints = () => (document.documentElement.dataset.mode === "dark" ? TINTS_DARK : TINTS_LIGHT);
  type P = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    r: number;
    c: string;
    spin: number;
  };
  const parts: P[] = [];
  let raf = 0;
  let lastX = 0,
    lastY = 0;

  const spawn = (x: number, y: number, n: number) => {
    for (let i = 0; i < n && parts.length < 140; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 0.25 + Math.random() * 1.5;
      const max = 480 + Math.random() * 520;
      parts.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 0.25, // hafifçe yukarı süzülsün
        life: 0,
        max,
        r: 1.5 + Math.random() * 3.2,
        c: (() => {
          const T = tints();
          return T[(Math.random() * T.length) | 0];
        })(),
        spin: Math.random() * Math.PI,
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  };

  let prev = 0;
  const tick = (now: number) => {
    const dt = prev ? Math.min(now - prev, 48) : 16;
    prev = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      if (p.life >= p.max) {
        parts.splice(i, 1);
        continue;
      }
      const k = p.life / p.max;
      p.x += p.vx * (dt / 16);
      p.y += p.vy * (dt / 16);
      p.vy += 0.006 * (dt / 16); // yumuşak yerçekimi
      p.vx *= 0.99;
      const alpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85; // belir → sön
      const size = p.r * (1 - k * 0.45);
      ctx.globalAlpha = Math.max(alpha, 0) * 0.72; // yumuşak ton
      ctx.fillStyle = p.c;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = size * 3.5; // yumuşak hale
      // küçük beş uçlu yıldız
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin + k * 0.9);
      ctx.beginPath();
      const R = size * 1.9;
      for (let s2 = 0; s2 < 10; s2++) {
        const rad = s2 % 2 === 0 ? R : R * 0.42;
        const ang = (s2 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(ang) * rad;
        const py = Math.sin(ang) * rad;
        if (s2 === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    if (parts.length) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
      prev = 0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  };

  addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const d = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;
      // hız arttıkça biraz daha çok parçacık, ama üst sınırlı
      spawn(e.clientX, e.clientY, d > 40 ? 3 : d > 8 ? 2 : 1);
    },
    { passive: true },
  );

  // sekme arkaplana geçince biriktirme
  addEventListener("blur", () => {
    parts.length = 0;
  });
}
