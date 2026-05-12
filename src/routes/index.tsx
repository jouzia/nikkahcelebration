import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Doors } from "@/components/invitation/Doors";
import { FlowingLeaves } from "@/components/invitation/FlowingLeaves";
import { HeartParticles } from "@/components/invitation/HeartParticles";
import { WordReveal } from "@/components/invitation/WordReveal";
import { ScratchCard } from "@/components/invitation/ScratchCard";
import { Countdown } from "@/components/invitation/Countdown";
import { CardStack } from "@/components/invitation/CardStack";
import { MusicToggle } from "@/components/invitation/MusicToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tayyiba & Mohamed · Nikkah Invitation · 5 July 2026" },
      { name: "description", content: "With heartfelt joy, we invite you to the Nikkah of Tayyiba Nasreen and Mohamed Azharudeen — Sunday, 5th July 2026, SPS Mahal, Cuddalore." },
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

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ delay: opened ? 1.2 : 0, duration: 0.8 }}
        className="relative z-20 max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-32"
      >
        {/* Hero */}
        <header className="text-center space-y-4 mb-12">
          <p className="font-cinzel text-[10px] md:text-xs text-[color:var(--gold-deep)] shimmer">✦ TOGETHER WITH OUR FAMILIES ✦</p>
          <p className="font-serif-display text-3xl md:text-4xl text-gold">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="font-cormorant italic text-base md:text-lg text-[color:var(--ink)]/70">
            We joyfully invite you to celebrate the<br/>blessed union of two souls
          </p>
        </header>

        {/* Heart */}
        <section className="mb-16">
          <HeartParticles />
        </section>

        {/* Section 1 — Spiritual */}
        <section className="glass-card rounded-3xl p-8 md:p-12 mb-10 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest">✦ IN THE NAME OF ALLAH ✦</p>
          <p className="font-serif-display text-2xl md:text-3xl text-gold mb-5">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <WordReveal
            className="font-cormorant italic text-lg md:text-xl text-[color:var(--ink)]/85 leading-relaxed"
            text="All praise to the Allah, the most beneficent, the most merciful and may Allah's blessings be upon Prophet Mohammed (S.A.W), his family and companions."
          />
        </section>

        {/* Section 2 — The Invitation */}
        <section className="glass-card rounded-3xl p-8 md:p-12 mb-10 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest">✦ THE INVITATION ✦</p>
          <WordReveal
            className="font-serif-display text-lg md:text-xl text-[color:var(--ink)] leading-relaxed mb-4"
            text="Mrs. & Mr. S. Habeeb Mohiaddin Basha, MCA., M.Com., A.O, BSNL, Cuddalore."
          />
          <div className="h-px w-16 bg-gradient-gold mx-auto my-4" />
          <WordReveal
            className="font-cormorant italic text-lg md:text-xl text-[color:var(--ink)]/85 leading-relaxed"
            text="Solicit your esteemed presence and blessings with family on the auspicious occasion of the marriage (Nikkah) of their daughter."
          />
        </section>

        {/* Section 3 — The Couple */}
        <section className="glass-card rounded-3xl p-8 md:p-12 mb-16 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest">✦ THE COUPLE ✦</p>
          <WordReveal
            className="font-serif-display text-xl md:text-2xl text-[color:var(--rose-deep)] leading-relaxed"
            text="H. TAYYIBA NASREEN, B.B.M with M. MOHAMED AZHARUDEEN, M.Sc., P.G.D.A.T, S/o. Late Janab A. Mohamed Moinudeen & Janaba M. Fathima Jan."
          />
        </section>

        {/* Scratch reveal */}
        <section className="mb-20 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-4">✦ A LITTLE SECRET ✦</p>
          <ScratchCard />
          <p className="font-cormorant italic text-sm text-[color:var(--ink)]/60 mt-4">Scratch the gold to unveil the moment.</p>
        </section>

        {/* Card stack */}
        <section className="mb-20">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] text-center mb-2">EXPLORE THE STORY</p>
          <p className="font-serif-display text-2xl text-center mb-8 text-[color:var(--ink)]">Tap a card to open</p>
          <CardStack />
        </section>

        {/* Countdown */}
        <section className="mb-20 text-center">
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-4">COUNTING THE MOMENTS</p>
          <Countdown />
        </section>

        {/* Footer */}
        <footer className="text-center pt-8">
          <p className="font-script text-4xl md:text-6xl text-gold leading-tight float-slow">Your presence is our blessing</p>
          <div className="h-px w-24 bg-gradient-gold mx-auto my-6" />
          <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)]">TAYYIBA &amp; MOHAMED · CUDDALORE · 2026</p>
        </footer>
      </motion.main>
    </div>
  );
}
