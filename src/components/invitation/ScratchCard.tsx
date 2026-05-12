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
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    
    // Set internal dimensions to match display size
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;

    // Fill with Gold Foil
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4a857");
    grad.addColorStop(0.5, "#f5e0a8");
    grad.addColorStop(1, "#b8862f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Overlay Text
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "600 16px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 + 5);

    ctx.globalCompositeOperation = "destination-out";

    const checkProgress = () => {
      if (fired.current) return;
      
      const imageData = ctx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      let transparentPixels = 0;

      // Sample every 32nd pixel (Alpha channel is the 4th index)
      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) transparentPixels++;
      }

      const percentage = (transparentPixels / (pixels.length / 32)) * 100;

      // TRIGGER AT 50%
      if (percentage >= 50) {
        fired.current = true;
        setRevealed(true);
        triggerPartyPoppers();
      }
    };

    const triggerPartyPoppers = () => {
      // Main Center Burst
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4a857", "#ffc0cb", "#f5e0a8", "#ff9bb0"],
        zIndex: 999,
      });

      // Left Cannon
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ["#d4a857", "#ffc0cb"],
        });
      }, 200);

      // Right Cannon
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ["#d4a857", "#ffc0cb"],
        });
      }, 400);
    };

    const scratch = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2); // Larger brush for easier scratching
      ctx.fill();
      checkProgress();
    };

    // Input Events
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown.current) return;
      if (e.cancelable) e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      scratch(clientX - rect.left, clientY - rect.top);
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDown.current = true;
      handleMove(e);
    };

    const handleUp = () => (isDown.current = false);

    canvas.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    canvas.addEventListener("touchstart", handleDown, { passive: false });
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto h-48 rounded-3xl overflow-hidden glass-card shadow-2xl border-2 border-white/50">
      {/* Revealed Content (Date/Time) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#fffcf5] p-4">
        <p className="font-serif-display text-2xl text-[color:var(--rose-deep)] font-bold">SUNDAY 5th JULY 2026</p>
        <div className="my-2 h-[1px] w-12 bg-gold/30" />
        <p className="font-serif text-lg text-[color:var(--rose-deep)]/80">10:30 AM – 11:30 AM</p>
      </div>

      {/* The Scratch Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}
