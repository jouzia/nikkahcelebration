import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-05T10:30:00+05:30").getTime();

export function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const items = [
    { label: "Days", v: d },
    { label: "Hours", v: h },
    { label: "Minutes", v: m },
    { label: "Seconds", v: s },
  ];
  return (
    <div className="flex justify-center gap-3 md:gap-6">
      {items.map((it) => (
        <div key={it.label} className="glass-card rounded-xl px-4 md:px-6 py-3 md:py-4 min-w-[72px] md:min-w-[96px] text-center">
          <div className="font-serif-display text-2xl md:text-4xl text-gold tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="font-cinzel text-[9px] md:text-[10px] text-[color:var(--gold-deep)] mt-1">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}