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
    
    // Maintain the larger canvas size to prevent drifting
    const W = 800, H = 750; 
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cx = W / 2, cy = H / 2;
    const heart = (t: number, scale: number) => {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      return { x: cx + x * scale * 1.5, y: cy - y * scale * 1.5 };
    };

    // Palette: Gold, Pink, and Green (as requested)
    const palette = ["#D4AF37", "#FFD700", "#FFB6C1", "#FF69B4", "#4ADE80", "#22C55E"];
    const particles: P[] = [];
    for (let i = 0; i < 900; i++) {
      const t = (i / 900) * Math.PI * 2;
      const jitter = 0.85 + Math.random() * 0.4;
      const p = heart(t, 12 * jitter);
      particles.push({
        tx: p.x, ty: p.y,
        x: cx + (Math.random() - 0.5) * 400,
        y: cy + (Math.random() - 0.5) * 400,
        vx: 0, vy: 0,
        size: 1.2 + Math.random() * 2.5,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;
        
        const mx = p.x - mouse.current.x;
        const my = p.y - mouse.current.y;
        const md = Math.hypot(mx, my);
        if (md < 100 && md > 0) {
          const f = (100 - md) / 100;
          p.vx += (mx / md) * f * 1.5;
          p.vy += (my / md) * f * 1.5;
        }
        
        p.vx = (p.vx + dx * 0.05) * 0.85;
        p.vy = (p.vy + dy * 0.05) * 0.85;
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
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
    <div className="relative flex w-full min-h-[750px] items-center justify-center">
      <div className="relative flex items-center justify-center w-full">
        <canvas
          ref={canvasRef}
          className="mx-auto block max-w-full"
        />
        <div
          className="pointer-events-none absolute w-full text-center flex flex-col items-center justify-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Names are now in Royal Blue (#4169E1) */}
          <p className="font-script text-5xl leading-tight text-[#4169E1] drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] md:text-6xl">
            Tayyiba Nasreen
          </p>
          <p className="my-3 font-cinzel text-lg tracking-widest text-[#4169E1] md:text-xl">&amp;</p>
          <p className="font-script text-5xl leading-tight text-[#4169E1] drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] md:text-6xl">
            Mohamed Azharudeen
          </p>
        </div>
      </div>
    </div>
  );
}
