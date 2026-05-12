import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio("/background-music.mp3");
    a.loop = true;
    a.volume = 0.45;
    audioRef.current = a;
    return () => { a.pause(); audioRef.current = null; };
  }, []);

  useEffect(() => {
    if (!active || !audioRef.current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [active]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().then(() => setPlaying(true)).catch(() => {}); }
    else { a.pause(); setPlaying(false); }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed top-4 right-4 z-50 glass-card rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
    >
      {playing ? <Volume2 className="w-5 h-5 text-[color:var(--gold-deep)]" /> : <VolumeX className="w-5 h-5 text-[color:var(--gold-deep)]" />}
    </button>
  );
}