"use client";

import { useCallback, useState } from "react";
/* eslint-disable @next/next/no-img-element */
import SequenceBackground from "@/components/SequenceBackground";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Reveal from "@/components/Reveal";
import ProductsSection from "@/components/ProductsSection";

type Watch = {
  img: string;
  name: string;
  line: string;
  case_: string;
  dial: string;
  strap: string;
};

const WATCHES: Watch[] = [
  {
    img: "/watches/ceramic-blue.jpg",
    name: "Blue Ceramic",
    line: "Classic Fusion · 42 mm",
    case_: "Black ceramic, satin-finished",
    dial: "Sunray blue",
    strap: "Lined blue rubber",
  },
  {
    img: "/watches/king-gold-chrono.jpg",
    name: "Chronograph King Gold",
    line: "Classic Fusion · 45 mm",
    case_: "18K King Gold, polished",
    dial: "Bronze sunray, twin counters",
    strap: "Brown alligator on rubber",
  },
  {
    img: "/watches/titanium.jpg",
    name: "Titanium Black",
    line: "Classic Fusion · 42 mm",
    case_: "Satin-finished titanium",
    dial: "Black lacquered",
    strap: "Lined black rubber",
  },
  {
    img: "/watches/king-gold.jpg",
    name: "King Gold",
    line: "Classic Fusion · 45 mm",
    case_: "18K King Gold, polished",
    dial: "Black sunray",
    strap: "Lined black rubber",
  },
];

const MOVEMENT_SPECS = [
  { label: "Calibre", value: "HUB1112" },
  { label: "Winding", value: "Self-winding" },
  { label: "Power reserve", value: "42 hours" },
  { label: "Frequency", value: "4 Hz · 28,800 vph" },
  { label: "Water resistance", value: "50 m" },
  { label: "Crystal", value: "Sapphire, AR-coated" },
];

const MATERIALS = [
  {
    name: "King Gold",
    text: "An 18-karat alloy enriched with platinum for a warmer, redder tone that resists fading.",
  },
  {
    name: "Black Ceramic",
    text: "Microblasted and satin-finished. Scratch-resistant, feather-light, and impossible to dull.",
  },
  {
    name: "Titanium",
    text: "Grade 5, satin-brushed. Strength without weight — the quiet workhorse of the collection.",
  },
  {
    name: "Natural Rubber",
    text: "The material that broke the rules in 1980, and has been vulcanised to the brand ever since.",
  },
];

const TIMELINE = [
  {
    year: "1980",
    title: "The rubber revolution",
    text: "Carlo Crocco founds Hublot in Nyon and pairs a gold case with a natural rubber strap — luxury watchmaking calls it heresy, then spends decades catching up.",
  },
  {
    year: "2004",
    title: "The Art of Fusion",
    text: "Jean-Claude Biver arrives and names the philosophy: fuse materials that were never meant to meet — gold with rubber, ceramic with denim, tradition with invention.",
  },
  {
    year: "2005",
    title: "Big Bang",
    text: "The Big Bang detonates at Baselworld and rewrites the brand overnight. The Classic Fusion follows as its calmer, dressier counterpoint.",
  },
  {
    year: "Today",
    title: "Nyon manufacture",
    text: "In-house UNICO chronographs, sapphire cases, and Magic Gold — the world's first scratch-resistant gold — all built on the shore of Lake Geneva.",
  },
];

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const onProgress = useCallback((p: number) => setProgress(p), []);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <main id="top" className="relative">
      <Preloader progress={progress} done={ready} />
      <SequenceBackground onProgress={onProgress} onReady={onReady} />
      <Navbar />

      {/* Everything below scrolls over the single fixed background */}
      <div className="relative z-10">
        {/* ============ HERO ============ */}
        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
          <Reveal>
            <p className="eyebrow mb-5">Nyon, Switzerland · Since 1980</p>
            <h1 className="display-hero">
              The Art
              <br />
              of Fusion
            </h1>
            <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-porcelain/80 md:text-base">
              Gold and rubber. Ceramic and light. Three hundred frames of the
              Classic Fusion, turned by your scroll.
            </p>
          </Reveal>
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest2 text-smoke">
              Scroll to wind
            </span>
            <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
          </div>
        </section>

        {/* Breathing room — footage plays uncovered */}
        <div className="h-[70vh]" />

        {/* ============ MANIFESTO ============ */}
        <section id="fusion" className="py-28 w-screen">
          <div className="glass w-[38%] px-10 py-14">
            <Reveal>
              <p className="eyebrow mb-6">The philosophy</p>
              <h2 className="display-section">
                Fuse what was never
                <br />
                meant to <span className="text-gold">meet</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col gap-8 text-sm leading-7 text-porcelain/75">
                <p>
                  In 1980, a gold watch on a rubber strap was a scandal. Hublot
                  made it a signature. The Classic Fusion carries that first
                  provocation forward — a porthole-inspired bezel, six H-shaped
                  titanium screws, and a case slim enough to disappear under a
                  cuff.
                </p>
                <p>
                  Every reference in this collection is an argument between two
                  materials: King Gold against black rubber, ceramic against a
                  sunray dial. The tension is the design. Nothing here is
                  matched — everything is fused.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Breathing room — sequence plays unobstructed */}
        <div className="h-[130vh]" />

        {/* Black pause */}
        <div className="h-[100vh]" />

        <div className="h-[100vh]" />

        {/* ============ MOVEMENT ============ */}
        <section id="movement" className="py-28 w-screen">
          <div className="mx-auto grid px-6 items-start gap-10 lg:grid-cols-2">
            <Reveal from="left">
              <p className="eyebrow mb-5">Inside the case</p>
              <h2 className="display-section">
                Wound by wrist,
                <br />
                driven by <span className="text-gold">HUB1112</span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-porcelain/75">
                Beneath the sapphire, a self-winding calibre turns a tungsten
                rotor with every movement of your arm. Twenty-eight thousand
                eight hundred beats an hour — the quiet metronome behind the
                sweep of the seconds hand you&apos;re scrolling through.
              </p>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-px bg-porcelain/10 hairline">
                {MOVEMENT_SPECS.map((s) => (
                  <div key={s.label} className="bg-noir/70 p-6 backdrop-blur-sm">
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest2 text-smoke">
                      {s.label}
                    </p>
                    <p className="mt-2 font-display text-lg uppercase text-porcelain md:text-xl">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MATERIALS ============ */}
        <section className="py-28 w-screen">
          <div className="mx-auto px-6">
            <Reveal>
              <p className="eyebrow mb-5">The palette</p>
              <h2 className="display-section">Materials in argument</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.1}>
                  <div className="glass h-full p-7">
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest2 text-gold">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-xl uppercase text-porcelain">
                      {m.name}
                    </h3>
                    <p className="mt-4 text-xs leading-6 text-porcelain/70">
                      {m.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="h-[100vh]" />

        {/* Final breathing room — sequence resolves on open footage */}
        <div className="h-[60vh]" />

        {/* ============ PRODUCTS ============ */}
        <ProductsSection watches={WATCHES} />

        {/* ============ FOOTER ============ */}
        <footer className="glass border-x-0 border-b-0 px-6 pb-10 pt-20">
          <div className="mx-auto">
            <Reveal>
              <h2 className="font-display uppercase leading-none text-porcelain/20 [font-size:clamp(3rem,13vw,11rem)]">
                Hublot
              </h2>
            </Reveal>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-porcelain/10 pt-7 font-mono text-[0.6rem] uppercase tracking-widest2 text-smoke">
              <span>Classic Fusion — fan-made scroll experience</span>
              <span>300 frames · GSAP ScrollTrigger · One background</span>
              <a href="#top" className="text-gold hover:text-porcelain">
                Back to the top ↑
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
