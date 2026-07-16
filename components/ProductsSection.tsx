"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Watch = {
  img: string;
  name: string;
  line: string;
  case_: string;
  dial: string;
  strap: string;
};

export default function ProductsSection({ watches }: { watches: Watch[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // Start fading at 20% scroll progress, fully gone by 30%
        const progress = Math.max(0, (self.progress - 0.2) / 0.1);
        gsap.set(inner, { opacity: 1 - progress, y: progress * -60 });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-28 w-screen">
      <div ref={innerRef} className="px-6">
        <Reveal>
          <p className="eyebrow mb-5">Select your fusion</p>
          <h2 className="display-section mb-16">Own the tension</h2>
        </Reveal>

        <div className="grid gap-px bg-porcelain/10 sm:grid-cols-2 xl:grid-cols-4">
          {watches.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.1}>
              <div className="group relative flex flex-col overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={w.img}
                    alt={`Hublot Classic Fusion ${w.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>

                <div className="p-7 border-t border-porcelain/10">
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest2 text-gold">
                    {w.line}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase text-porcelain">
                    {w.name}
                  </h3>
                  <dl className="mt-5 space-y-2 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-smoke">Case</dt>
                      <dd className="text-porcelain/80 text-right">{w.case_}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-smoke">Dial</dt>
                      <dd className="text-porcelain/80 text-right">{w.dial}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-smoke">Strap</dt>
                      <dd className="text-porcelain/80 text-right">{w.strap}</dd>
                    </div>
                  </dl>
                  <button className="mt-7 w-full border border-porcelain/20 py-3 font-mono text-[0.6rem] uppercase tracking-widest2 text-porcelain/60 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                    Discover
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
