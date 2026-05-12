import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import card1 from "@/assets/card-1-cover.jpg";
import card2 from "@/assets/card-2-tamil-front.jpg";
import card3 from "@/assets/card-3-tamil-inside.jpg";
import card4 from "@/assets/card-4-english.jpg";
import card5 from "@/assets/card-5-walima.jpg";

interface CardDef {
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  custom?: () => React.ReactNode;
}

const MAP_URL = "https://www.google.com/maps?q=SPS+Mahal+Periya+Kanganakuppam+Cuddalore";

const cards: CardDef[] = [
  { title: "Bismillah", subtitle: "The blessed cover", image: card1, imageAlt: "Embossed Bismillah cover of the invitation card" },
  { title: "Hosts & Welcome", subtitle: "Tamil invitation · front", image: card2, imageAlt: "Tamil Nikkah invitation front page" },
  { title: "The Families", subtitle: "Tamil invitation · inside", image: card3, imageAlt: "Tamil invitation inside spread with family details" },
  { title: "Bride & Groom", subtitle: "English invitation", image: card4, imageAlt: "English Nikkah invitation with bride and groom details" },
  { title: "Walima Reception", subtitle: "9th July 2026", image: card5, imageAlt: "Walima reception invitation" },
  {
    title: "Venue & Map",
    subtitle: "SPS Mahal · Cuddalore",
    custom: () => (
      <div className="space-y-5 text-center">
        <div>
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">VENUE</p>
          <p className="font-serif-display text-2xl text-gold mt-1">SPS Mahal</p>
          <p className="font-cormorant text-base text-[color:var(--ink)]/80">
            Periya Kanganakuppam,<br />Cuddalore District, Tamil Nadu
          </p>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden border border-[color:var(--rose-deep)]/30">
          <iframe
            title="SPS Mahal location"
            src="https://www.google.com/maps?q=SPS+Mahal+Periya+Kanganakuppam+Cuddalore&output=embed"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-md">
            <QRCodeSVG value={MAP_URL} size={140} fgColor="#a8385a" bgColor="#ffffff" level="M" />
          </div>
          <p className="font-cormorant italic text-xs text-[color:var(--ink)]/70">Scan to open in Google Maps</p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-2 rounded-full text-white font-cinzel text-xs"
            style={{ background: "var(--gradient-pink-gold)" }}
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    ),
  },
];

export function CardStack() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div className="relative h-[300px] md:h-[340px] flex items-end justify-center">
        {cards.map((c, i) => {
          const total = cards.length;
          const offset = i - (total - 1) / 2;
          const rot = offset * 7;
          const tx = offset * 46;
          return (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              className="absolute rounded-2xl w-44 md:w-52 h-64 md:h-80 cursor-pointer overflow-hidden text-left group"
              style={{
                zIndex: 10 + i,
                boxShadow: "0 18px 40px -12px rgba(180,80,110,0.35), 0 0 0 1px rgba(212,168,87,0.4)",
              }}
              initial={{ y: 200, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: rot, x: tx }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 80, damping: 14 }}
              whileHover={{ y: -18, rotate: rot * 0.5, scale: 1.04, transition: { type: "spring", stiffness: 200 } }}
              whileTap={{ scale: 0.97 }}
            >
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.imageAlt ?? c.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0" style={{ background: "var(--gradient-rose)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <span className="self-start px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm font-cinzel text-[8px] text-[color:var(--rose-deep)]">
                  No. 0{i + 1}
                </span>
                <div>
                  <p className="font-serif-display text-base md:text-lg text-white drop-shadow">{c.title}</p>
                  <p className="font-cormorant italic text-[11px] text-white/85">{c.subtitle}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[color:var(--ink)]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={open}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-2xl w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.85, y: 40, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[color:var(--ink)] text-lg shadow-md"
                aria-label="Close"
              >
                ×
              </button>
              <p className="font-cinzel text-[10px] text-[color:var(--rose-deep)] mb-1 px-2">
                No. 0{open + 1} · {cards[open].title.toUpperCase()}
              </p>
              <div className="h-px w-12 bg-gradient-gold mb-4 ml-2" />

              {cards[open].image ? (
                <img
                  src={cards[open].image}
                  alt={cards[open].imageAlt ?? cards[open].title}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              ) : (
                <div className="p-2 md:p-4">{cards[open].custom?.()}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}