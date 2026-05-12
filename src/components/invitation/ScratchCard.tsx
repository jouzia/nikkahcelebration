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
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!; // Optimization forgetImageData
    
    // Use offset size for crisp rendering
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;

    // 1. Create the Gold Foil Texture
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4a857");
    grad.addColorStop(0.5, "#f5e0a8");
    grad.addColorStop(1, "#b8862f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Add the UI Text on top of the foil
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "600 16px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  SCRATCH TO REVEAL  ✦", w / 2, h / 2 + 6);

    // 3. Set up the "Eraser" mode
    ctx.globalCompositeOperation = "destination-out";

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2); // Slightly larger brush for better UX
      ctx.fill();
      checkProgress();
    };

    const checkProgress = () => {
      if (fired.current) return;
      
      const data = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0;
      
      // Sample every 20th pixel for better accuracy than 40
      for (let i = 3; i < data.length; i += 20) {
        if (data[i] === 0) cleared++;
      }

      const totalSamples = data.length / 20;
      if (cleared / totalSamples > 0.5) {
        fired.current = true;
        setRevealed(true);

        // PARTY POPPERS TRIGGER
        // Center Burst
        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#d4a857", "#ffc0cb", "#f5e0a8", "#ff9bb0", "#b8862f"],
          scalar: 1.2
        });

        // Side Cannons for that "Eye-Opening" moment
        setTimeout(() => {
          confetti({ 
            particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, 
            colors: ["#d4a857", "#ffc0cb"] 
          });
        }, 150);

        setTimeout(() => {
          confetti({ 
            particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, 
            colors: ["#d4a857", "#ffc0cb"] 
          });
        }, 300);
      }
    };

    // Input Handling
    const pos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = "touches" in e ? e.touches[0] : (e as MouseEvent);
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };

    const down = (e: MouseEvent | TouchEvent) => { isDown.current = true; const p = pos(e); scratch(p.x, p.y); };
    const move = (e: MouseEvent | TouchEvent) => { 
        if (!isDown.current) return; 
        if (e.cancelable) e.preventDefault(); 
        const p = pos(e); 
        scratch(p.x, p.y); 
    };
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
    <div className="relative w-full max-w-sm mx-auto h-48 rounded-3xl overflow-hidden glass-card shadow-2xl border-4 border-white">
      {/* THE REVEALED CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#fffcf5]">
        <p className="font-serif-display text-2xl text-[color:var(--rose-deep)] font-bold">SUNDAY 5th JULY 2026</p>
        <div className="my-2 h-[1px] w-12 bg-[#d4af37]/30" />
        <p className="font-serif text-lg text-[color:var(--rose-deep)]/80">10:30 AM – 11:30 AM</p>
      </div>

      {/* THE SCRATCHABLE OVERLAY */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}
