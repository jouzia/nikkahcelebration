import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Doors } from "@/components/invitation/Doors";
import { FlowingLeaves } from "@/components/invitation/FlowingLeaves";
import { HeartParticles } from "@/components/invitation/HeartParticles";
import { WordReveal } from "@/components/invitation/WordReveal";
import { ScratchCard } from "@/components/invitation/ScratchCard";
import { Countdown } from "@/components/invitation/Countdown";
import { CardStack } from "@/components/invitation/CardStack";
import { MusicToggle } from "@/components/invitation/MusicToggle";
import { ScrollIndicator } from "@/components/invitation/ScrollIndicator";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nikkah Invitation" },
      { 
        name: "description", 
        content: "With heartfelt joy, we invite you to the Nikkah of Tayyiba Nasreen and Mohamed Azharudeen — Sunday, 5th July 2026, SPS Mahal, Cuddalore." 
      },
    ],
  }),
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-rose paper-grain overflow-hidden">
      <FlowingLeaves />
      <Doors opened={opened} onOpen={() => setOpened(true)} />
      <MusicToggle active={opened} />
      {opened && <ScrollIndicator />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ delay: opened ? 1.2 : 0, duration: 0.8 }}
        className="relative z-20 max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-32"
      >
        {/* Hero */}
        <header className="text-center space-y-4 mb-12">
          <p className="font-cinzel text-2xl md:text-5xl lg:text-6xl text-[color:var(--gold-deep)] shimmer tracking-[0.2em] text-center leading-relaxed py-4">
  ✦ Wedding Celebration - Nikkah ✦
</p>
        </header>

        {/* Heart */}
        <section className="mb-16">
          <HeartParticles />
        </section>

        {/* Section 1 — Spiritual */}
        <section className="glass-card rounded-3xl p-8 md:p-12 mb-10 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest uppercase">
            ✦ In the Name of Allah ✦
          </p>
          <p className="font-serif-display text-2xl md:text-3xl text-gold mb-5">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <WordReveal
            className="font-cormorant italic text-lg md:text-xl text-[color:var(--ink)]/85 leading-relaxed"
            text="All praise to the Allah, the most beneficent, the most merciful and may Allah's blessings be upon Prophet Mohammed (S.A.W), his family and companions."
          />
        </section>

        {/* Section 2 — The Invitation & Couple */}
        <section className="glass-card rounded-3xl p-8 md:p-12 mb-10 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest uppercase">
            ✦ The Invitation ✦
          </p>
          
          <WordReveal
            className="font-serif-display text-lg md:text-xl text-[color:var(--ink)] leading-relaxed mb-6"
            text="Mrs. & Mr. S. Habeeb Mohiaddin Basha."
          />
          
          <WordReveal
            className="font-serif italic text-base text-[color:var(--ink)]/80 mb-4"
            text="Solicit your esteemed presence and blessings with family on the auspicious occasion of the marriage (Nikkah) of their daughter"
          />

          <div className="h-px w-16 bg-gradient-gold mx-auto my-8" />

          {/* Combined Couple Logic */}
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-8 tracking-widest uppercase">
            ✦ The Couple ✦
          </p>
          
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* BRIDE */}
<div className="flex flex-col items-center">
  <WordReveal
    className="font-serif-display text-4xl md:text-7xl text-[color:var(--rose-deep)] font-bold tracking-tight"
    text="H. TAYYIBA NASREEN"
  />
  <motion.span 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="font-cinzel text-sm md:text-lg tracking-[0.2em] text-[color:var(--rose-deep)]/80 mt-1"
  >
    B.B.M
  </motion.span>
</div>

{/* THE CONNECTOR */}
<motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="font-serif italic text-2xl text-[color:var(--rose-deep)]/60 py-4"
>
  with
</motion.div>

{/* GROOM */}
<div className="flex flex-col items-center">
  <WordReveal
    className="font-serif-display text-4xl md:text-7xl text-[color:var(--rose-deep)] font-bold tracking-tight"
    text="M. MOHAMED AZHARUDEEN"
  />
  <motion.span 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="font-cinzel text-sm md:text-lg tracking-[0.2em] text-[color:var(--rose-deep)]/80 mt-1 text-center"
  >
    M.Sc., P.G.D.A.T
  </motion.span>
</div>

            {/* PARENTAGE */}
            <div className="pt-10">
              <div className="h-[1px] w-24 bg-[color:var(--rose-deep)]/20 mx-auto mb-4" />
              <WordReveal
                className="font-serif text-sm md:text-base text-[color:var(--rose-deep)] opacity-80 max-w-md mx-auto leading-relaxed"
                text="S/o. Late Janab A. Mohamed Moinudeen & Janaba M. Fathima Jan."
              />
            </div>
          </div>
        </section>

        {/* Scratch reveal */}
        <section className="mb-20 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-4 uppercase">
            ✦ A Little Secret ✦
          </p>
          <ScratchCard />
          <p className="font-cormorant italic text-sm text-[color:var(--ink)]/60 mt-4">
            Scratch the gold to unveil the moment.
          </p>
        </section>

        {/* Card stack */}
        <section className="mb-20">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] text-center mb-2 uppercase">
            Explore the Story
          </p>
          <p className="font-serif-display text-2xl text-center mb-8 text-[color:var(--ink)]">
            Tap a card to open
          </p>
          <CardStack />
        </section>

        {/* Countdown */}
        <section className="mb-20 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-4 uppercase">
            Counting the Moments
          </p>
          <Countdown />
        </section>

        {/* Footer */}
        <footer className="text-center pt-8">
          <p className="font-script text-4xl md:text-6xl text-gold leading-tight float-slow">
            Your presence is our blessing
          </p>
          <div className="h-px w-24 bg-gradient-gold mx-auto my-6" />
        </footer>
      </motion.main>
    </div>
  );
}
