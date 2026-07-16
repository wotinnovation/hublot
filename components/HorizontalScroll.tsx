"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRACK_A = [
  { label: "Calibre HUB1112", sub: "Self-winding · 42 h reserve" },
  { label: "King Gold", sub: "18K · Platinum-enriched alloy" },
  { label: "Sapphire Crystal", sub: "AR-coated both sides" },
  { label: "Magic Gold", sub: "Scratch-resistant · One of a kind" },
  { label: "50 m Water Resist.", sub: "Screw-down crown" },
  { label: "Skeleton Dial", sub: "Open-worked · Architectural" },
];

const TRACK_B = [
  { label: "Black Ceramic", sub: "Microblasted · Feather-light" },
  { label: "Natural Rubber", sub: "Vulcanised strap · Since 1980" },
  { label: "28,800 vph", sub: "4 Hz · Tungsten micro-rotor" },
  { label: "Titanium Grade 5", sub: "Satin-brushed · Lightweight" },
  { label: "Porthole Bezel", sub: "6 H-shaped titanium screws" },
  { label: "Lake Geneva", sub: "Nyon manufacture · Switzerland" },
];

function Card({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="glass flex-shrink-0 px-8 py-5" style={{ minWidth: 240 }}>
      <p className="font-display text-base uppercase tracking-wide text-porcelain">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-widest2 text-smoke">
        {sub}
      </p>
    </div>
  );
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const btmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const top = topRef.current;
    const btm = btmRef.current;
    if (!section || !top || !btm) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(top, { x: "0%" }, { x: "-30%", ease: "none" }, 0);
    tl.fromTo(btm, { x: "-30%" }, { x: "0%", ease: "none" }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const doubled_a = [...TRACK_A, ...TRACK_A];
  const doubled_b = [...TRACK_B, ...TRACK_B];

  return (
    <section ref={sectionRef} className="relative h-screen">
      {/* Top track — slides left as you scroll */}
      <div className="absolute top-[16%] w-full">
        <div
          ref={topRef}
          className="flex gap-5 will-change-transform"
          style={{ width: "200%" }}
        >
          {doubled_a.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Center — completely clear, background animation shows through */}

      {/* Bottom track — slides right as you scroll */}
      <div className="absolute bottom-[16%] w-full">
        <div
          ref={btmRef}
          className="flex gap-5 will-change-transform"
          style={{ width: "200%", transform: "translateX(-30%)" }}
        >
          {doubled_b.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
