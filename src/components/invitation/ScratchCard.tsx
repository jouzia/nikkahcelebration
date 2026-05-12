import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDown = useRef(false);
  const fired = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4a857");
    grad.addColorStop(0.5, "#f5e0a8");
    grad.addColorStop(1, "#b8862f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "600 18px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  SCRATCH TO REVEAL  ✦", w / 2, h / 2);
    ctx.globalCompositeOperation = "destination-out";

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      checkProgress();
    };
    const checkProgress = () => {
      if (fired.current) return;
      const data = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
      if (cleared / (data.length / 40) > 0.5) {
        fired.current = true;
        setRevealed(true);
        confetti({
          particleCount: 160, spread: 90, origin: { y: 0.6 },
          colors: ["#d4a857", "#ffc0cb", "#f5e0a8", "#ff9bb0", "#b8862f"],
          shapes: ["circle", "square"],
        });
        setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 70, origin: { x: 0 }, colors: ["#d4a857", "#ffc0cb"] }), 200);
        setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 70, origin: { x: 1 }, colors: ["#d4a857", "#ffc0cb"] }), 400);
      }
    };

    const pos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = "touches" in e ? e.touches[0] : (e as MouseEvent);
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const down = (e: MouseEvent | TouchEvent) => { isDown.current = true; const p = pos(e); scratch(p.x, p.y); };
    const move = (e: MouseEvent | TouchEvent) => { if (!isDown.current) return; e.preventDefault(); const p = pos(e); scratch(p.x, p.y); };
    const up = () => { isDown.current = false; };

    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    canvas.addEventListener("touchstart", down, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      canvas.removeEventListener("mousedown", down);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      canvas.removeEventListener("touchstart", down);
      canvas.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-56 rounded-2xl overflow-hidden glass-card">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <p className="font-cinzel text-xs text-[color:var(--gold-deep)] mb-3">THE BIG DAY</p>
        <p className="font-serif-display text-2xl text-[color:var(--ink)]">Sunday, 5th July 2026</p>
        <p className="font-cormorant text-lg text-[color:var(--ink)]/80 mt-1">10:30 AM – 11:30 AM</p>
        <div className="my-2 h-px w-16 bg-gradient-gold" />
        <p className="font-cinzel text-xs text-[color:var(--gold-deep)]">SPS MAHAL · CUDDALORE</p>
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-grab transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      />
    </div>
  );
}