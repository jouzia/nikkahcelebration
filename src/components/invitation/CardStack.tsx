import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { WordReveal } from "./WordReveal";

interface CardDef { title: string; subtitle: string; render: () => React.ReactNode; }

const cards: CardDef[] = [
  {
    title: "Bismillah",
    subtitle: "In the name of Allah",
    render: () => (
      <div className="text-center space-y-4">
        <p className="font-serif-display text-3xl text-gold">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <WordReveal
          className="font-cormorant text-lg text-[color:var(--ink)]/80 italic leading-relaxed"
          text="In the name of Allah, the most beneficent, the most merciful. May His blessings be upon Prophet Mohammed (S.A.W), his family and companions."
        />
      </div>
    ),
  },
  {
    title: "Hosts",
    subtitle: "With heartfelt invitation",
    render: () => (
      <div className="text-center space-y-3">
        <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">REQUEST THE PLEASURE OF YOUR COMPANY</p>
        <p className="font-serif-display text-2xl">Mrs. &amp; Mr. S. Habeeb Mohiaddin Basha</p>
        <p className="font-cormorant text-base text-[color:var(--ink)]/70">MCA., M.Com., A.O, BSNL, Cuddalore</p>
        <div className="h-px w-20 bg-gradient-gold mx-auto" />
        <p className="font-cormorant italic text-[color:var(--ink)]/80">on the marriage of their beloved daughter</p>
      </div>
    ),
  },
  {
    title: "Bride & Groom",
    subtitle: "Two souls, one heart",
    render: () => (
      <div className="text-center space-y-5">
        <div>
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">THE BRIDE</p>
          <p className="font-script text-4xl text-gold mt-1">Tayyiba Nasreen</p>
          <p className="font-cormorant text-sm text-[color:var(--ink)]/70">B.B.M</p>
        </div>
        <p className="font-script text-2xl text-[color:var(--rose-deep)]">with</p>
        <div>
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">THE GROOM</p>
          <p className="font-script text-4xl text-gold mt-1">Mohamed Azharudeen</p>
          <p className="font-cormorant text-sm text-[color:var(--ink)]/70">M.Sc., P.G.D.A.T · Prop. of S.A. Rajak Timber Tipco, K.M.Koil</p>
          <p className="font-cormorant text-xs text-[color:var(--ink)]/60 mt-1">S/o. Late Janab A. Mohamed Moinudeen &amp; Janaba M. Fathima Jan</p>
        </div>
      </div>
    ),
  },
  {
    title: "Schedule",
    subtitle: "The order of the day",
    render: () => (
      <div className="space-y-4">
        {[
          { time: "Sun · 5 Jul 2026", title: "Nikkah Ceremony", detail: "10:30 AM – 11:30 AM · SPS Mahal, Cuddalore" },
          { time: "Sun · 5 Jul 2026", title: "Lunch", detail: "Thereafter, with family & friends" },
          { time: "Thu · 9 Jul 2026", title: "Walima Reception", detail: "12:00 PM onwards · Sri Krishna Mahal, Kattumannarkoil" },
        ].map((s) => (
          <div key={s.title} className="flex gap-4 items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-gradient-gold shrink-0" />
            <div>
              <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">{s.time}</p>
              <p className="font-serif-display text-lg">{s.title}</p>
              <p className="font-cormorant text-sm text-[color:var(--ink)]/70">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Venue",
    subtitle: "Where it all happens",
    render: () => (
      <div className="space-y-4 text-center">
        <p className="font-serif-display text-2xl text-gold">SPS Mahal</p>
        <p className="font-cormorant text-base text-[color:var(--ink)]/80">Periya Kanganakuppam,<br/>Cuddalore District, Tamil Nadu</p>
        <div className="aspect-video rounded-xl overflow-hidden border border-[color:var(--gold)]/30">
          <iframe
            title="Venue map"
            src="https://www.google.com/maps?q=SPS+Mahal+Cuddalore&output=embed"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <a
          href="https://www.google.com/maps?q=SPS+Mahal+Cuddalore"
          target="_blank" rel="noreferrer"
          className="inline-block px-5 py-2 rounded-full bg-gradient-gold text-white font-cinzel text-xs"
        >Open in Maps</a>
      </div>
    ),
  },
  {
    title: "Save the Day",
    subtitle: "Scan to keep close",
    render: () => (
      <div className="text-center space-y-4">
        <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">SCAN TO SAVE THE LOCATION</p>
        <div className="inline-block p-4 bg-white rounded-2xl shadow-md">
          <QRCodeSVG
            value="https://www.google.com/maps?q=SPS+Mahal+Cuddalore"
            size={180}
            fgColor="#7a5224"
            bgColor="#ffffff"
            level="M"
          />
        </div>
        <p className="font-cormorant italic text-[color:var(--ink)]/80">
          With heartfelt gratitude — your blessings mean the world to us.
        </p>
      </div>
    ),
  },
];

export function CardStack() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div className="relative h-[260px] md:h-[300px] flex items-end justify-center">
        {cards.map((c, i) => {
          const total = cards.length;
          const offset = i - (total - 1) / 2;
          const rot = offset * 7;
          const tx = offset * 60;
          return (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              className="absolute glass-card rounded-2xl w-44 md:w-52 h-60 md:h-72 cursor-pointer p-5 flex flex-col justify-between text-left"
              style={{ zIndex: 10 + i }}
              initial={{ y: 200, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: rot, x: tx }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 80, damping: 14 }}
              whileHover={{ y: -16, rotate: rot * 0.6, transition: { type: "spring", stiffness: 200 } }}
              whileTap={{ scale: 0.97 }}
            >
              <div>
                <p className="font-cinzel text-[9px] text-[color:var(--gold-deep)]">No. 0{i + 1}</p>
                <p className="font-serif-display text-xl mt-2 text-[color:var(--ink)]">{c.title}</p>
                <p className="font-cormorant italic text-xs text-[color:var(--ink)]/60 mt-1">{c.subtitle}</p>
              </div>
              <div className="self-end h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center text-white text-xs">↗</div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[color:var(--ink)]/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={open}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-lg w-full p-8 md:p-10 max-h-[85vh] overflow-y-auto relative"
              initial={{ scale: 0.85, y: 40, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-[color:var(--ink)] text-lg"
                aria-label="Close"
              >×</button>
              <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-1">No. 0{open + 1} · {cards[open].title.toUpperCase()}</p>
              <div className="h-px w-12 bg-gradient-gold mb-5" />
              {cards[open].render()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}