import { useEffect, useRef } from "react";

interface Leaf {
  x: number; y: number; vx: number; vy: number;
  rot: number; vr: number; size: number; color: string; opacity: number;
}

export function FlowingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = ["#ffb3c7", "#ff9bb3", "#f7c5d1", "#ffd1dc", "#f5d3a8", "#d4a857", "#e8a9b8"];
    const leaves: Leaf[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.2 + Math.random() * 0.5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      size: 6 + Math.random() * 10,
      color: palette[Math.floor(Math.random() * palette.length)],
      opacity: 0.3 + Math.random() * 0.4,
    }));

    const drawLeaf = (l: Leaf) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.opacity;
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(80,50,20,0.3)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-l.size, 0); ctx.lineTo(l.size, 0); ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach((l) => {
        const dx = l.x - mouse.current.x;
        const dy = l.y - mouse.current.y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          const f = (120 - d) / 120;
          l.vx += (dx / d) * f * 0.3;
          l.vy += (dy / d) * f * 0.3;
        }
        l.vx *= 0.98; l.vy = l.vy * 0.98 + 0.005;
        l.x += l.vx; l.y += l.vy;
        l.rot += l.vr;
        if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width; }
        if (l.x > canvas.width + 20) l.x = -20;
        if (l.x < -20) l.x = canvas.width + 20;
        drawLeaf(l);
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const move = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
}