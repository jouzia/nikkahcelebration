import { useEffect, useRef } from "react";

interface P { tx: number; ty: number; x: number; y: number; vx: number; vy: number; size: number; color: string; }

export function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    
    // Increased Canvas dimensions to accommodate a larger heart
    const W = 800, H = 750;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cx = W / 2, cy = H / 2;
    const heart = (t: number, scale: number) => {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      // Increased the multiplier to 18 to make the heart significantly larger
      return { x: cx + x * scale * 1.5, y: cy - y * scale * 1.5 };
    };

    // Palette: Gold, Pink, and Green
    const palette = ["#D4AF37", "#FFB6C1", "#4ADE80", "#FFD700", "#FF69B4", "#22C55E"];
    const particles: P[] = [];
    for (let i = 0; i < 900; i++) {
      const t = (i / 900) * Math.PI * 2;
      const jitter = 0.85 + Math.random() * 0.3;
      const p = heart(t, 12 * jitter);
      particles.push({
        tx: p.x, ty: p.y,
        x: cx + (Math.random() - 0.5) * 300,
        y: cy + (Math.random() - 0.5) * 300,
        vx: 0, vy: 0,
        size: 1.2 + Math.random() * 2.2,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const beat = elapsed % 1.2;
      let scale = 1;
      if (beat < 0.12) scale = 1 + Math.sin((beat / 0.12) * Math.PI) * 0.08;
      else if (beat > 0.2 && beat < 0.36) scale = 1 + Math.sin(((beat - 0.2) / 0.16) * Math.PI) * 0.05;

      ctx.fillStyle = "rgba(255,252,248,0.18)";
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        const tx = cx + (p.tx - cx) * scale;
        const ty = cy + (p.ty - cy) * scale;
        let dx = tx - p.x;
        let dy = ty - p.y;
        
        const mx = p.x - mouse.current.x;
        const my = p.y - mouse.current.y;
        const md = Math.hypot(mx, my);
        if (md < 80 && md > 0) {
          const f = (80 - md) / 80;
          p.vx += (mx / md) * f * 0.8;
          p.vy += (my / md) * f * 0.8;
        }
        p.vx = (p.vx + dx * 0.05) * 0.85;
        p.vy = (p.vy + dy * 0.05) * 0.85;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const leave = () => { mouse.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="relative flex w-full items-center justify-center min-h-[750px]">
      <div className="relative w-full max-w-[800px]">
        <canvas
          ref={canvasRef}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }}
        />
        <div
          className="pointer-events-none absolute w-full text-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* TEXT COLOR: Light Blue (#ADD8E6) */}
          <p className="font-script text-5xl leading-tight text-[#ADD8E6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] md:text-6xl">
            Tayyiba Nasreen
          </p>
          <p className="my-2 font-cinzel text-sm tracking-widest text-[#ADD8E6] md:text-lg">&amp;</p>
          <p className="font-script text-5xl leading-tight text-[#ADD8E6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] md:text-6xl">
            Mohamed Azharudeen
          </p>
        </div>
      </div>
    </div>
  );
}
