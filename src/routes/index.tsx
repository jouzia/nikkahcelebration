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
      { title: "Nikkah Invitation" },
      { name: "description", content: "With heartfelt joy, we invite you to the Nikkah of Tayyiba Nasreen and Mohamed Azharudeen — Sunday, 5th July 2026, SPS Mahal, Cuddalore." },
    ],
  }),
});

      
        {/* Hero */}
        <header className="text-center space-y-4 mb-12">
          <p className="font-cinzel text-[10px] md:text-xs text-[color:var(--gold-deep)] shimmer">✦ Wedding Invitation - Nikkah ✦</p>
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

        {/* {/* Section 2 — The Invitation */}
<section className="glass-card rounded-3xl p-8 md:p-12 mb-10 text-center">
  <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-5 tracking-widest">✦ THE INVITATION ✦</p>
  
  <WordReveal
    className="font-serif-display text-lg md:text-xl text-[color:var(--ink)] leading-relaxed mb-6"
    text="Mrs. & Mr. S. Habeeb Mohiaddin Basha, MCA., M.Com., A.O, BSNL, Cuddalore."
  />
  
  <WordReveal
    className="font-serif italic text-base text-[color:var(--ink)]/80 mb-4"
    text="Solicit your esteemed presence and blessings with family on the auspicious occasion of the marriage (Nikkah) of their daughter"
  />

  <div className="h-px w-16 bg-gradient-gold mx-auto my-8" />

  {/* THE COUPLE BURIED INSIDE FOR BETTER FLOW */}
  <p className="font-cinzel text-[10px] text-[color:var(--gold-deep)] mb-8 tracking-widest uppercase">✦ The Couple ✦</p>
  
  <div className="flex flex-col items-center space-y-6 text-center">
    {/* BRIDE */}
    <WordReveal
      className="font-serif-display text-4xl md:text-6xl text-[color:var(--rose-deep)] font-bold tracking-tight"
      text="H. TAYYIBA NASREEN, B.B.M"
    />

    {/* THE CONNECTOR */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="font-serif italic text-2xl text-[color:var(--rose-deep)]/60 py-2"
    >
      with
    </motion.div>

    {/* GROOM */}
    <WordReveal
      className="font-serif-display text-4xl md:text-6xl text-[color:var(--rose-deep)] font-bold tracking-tight"
      text="M. MOHAMED AZHARUDEEN, M.Sc., P.G.D.A.T"
    />

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

{/* DELETE THE OLD SECTION 3 ENTIRELY TO AVOID REPETITION */}

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
        <footerclassName="text-center pt-8">
          <p className="font-script text-4xl md:text-6xl text-gold leading-tight float-slow">Your presence is our blessing</p>
          <div className="h-px w-24 bg-gradient-gold mx-auto my-6" />
          </footer>
      </motion.main>
    </div>
  );
}
