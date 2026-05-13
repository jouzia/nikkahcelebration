import { useEffect, useRef } from "react";

interface P { 
  x: number; y: number; 
  tx: number; ty: number; 
  vx: number; vy: number; 
  size: number; color: string; 
}

export function HeartParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    
    // Large centered canvas
    const W = 800, H = 750; 
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cx = W / 2, cy = H / 2;
    
    // Updated heart math for the organic "Heart-Beat" look
    const heartPoint = (t: number) => {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      return { x, y };
    };

    // Palette: Gold, Pink, and Green
    const palette = ["#D4AF37", "#FFB6C1", "#4ADE80", "#FFD700", "#FF69B4", "#22C55E"];
    const particles: P[] = [];
    const numParticles = 1200; // Increased for a denser look

    for (let i = 0; i < numParticles; i++) {
      const t = (i / numParticles) * Math.PI * 2;
      const point = heartPoint(t);
      const scale = 16; // Base scale for the heart
      
      particles.push({
        x: cx, y: cy,
        tx: cx + point.x * scale,
        ty: cy - point.y * scale,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }

    let raf = 0;
    let time = 0;

    const tick = () => {
      time += 0.02;
      // Pulse logic from the reference repo
      const pulse = 1 + Math.sin(time * 3) * 0.1; 
      
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        // Target position with pulse scaling
        const targetX = cx + (p.tx - cx) * pulse;
        const targetY = cy + (p.ty - cy) * pulse;

        // Mouse interaction
        const dx_mouse = p.x - mouse.current.x;
        const dy_mouse = p.y - mouse.current.y;
        const dist = Math.hypot(dx_mouse, dy_mouse);
        
        if (dist < 80) {
          const force = (80 - dist) / 80;
          p.vx += (dx_mouse / dist) * force * 1.8;
          p.vy += (dy_mouse / dist) * force * 1.8;
        }

        // Spring physics to return to heart shape
        p.vx += (targetX - p.x) * 0.04;
        p.vy += (targetY - p.y) * 0.04;
        
        // Friction
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        // Shadow for "glow" effect
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    tick();

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
    <div className="relative flex w-full min-h-[750px] items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center">
        <canvas ref={canvasRef} className="block mx-auto" />
        <div
          className="pointer-events-none absolute w-full text-center flex flex-col items-center justify-center"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Blue Text for the names */}
          <p className="font-script text-5xl leading-tight text-[#4169E1] drop-shadow-[0_2px_10px_rgba(255,255,255,1)] md:text-6xl">
            Tayyiba Nasreen
          </p>
          <p className="my-2 font-cinzel text-lg tracking-widest text-[#4169E1] md:text-xl">&amp;</p>
          <p className="font-script text-5xl leading-tight text-[#4169E1] drop-shadow-[0_2px_10px_rgba(255,255,255,1)] md:text-6xl">
            Mohamed Azharudeen
          </p>
        </div>
      </div>
    </div>
  );
}
