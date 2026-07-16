"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  /** Seconds to delay after the trigger fires (for stagger effects) */
  delay?: number;
  /** Slide direction */
  from?: "up" | "left" | "right";
  className?: string;
};

/**
 * Fades + slides its children in when they enter the viewport,
 * and reverses when they leave — every content block on the page
 * is wired to ScrollTrigger through this wrapper.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const offset =
      from === "up"
        ? { y: 48, x: 0 }
        : from === "left"
          ? { y: 0, x: -56 }
          : { y: 0, x: 56 };

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, ...offset },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, from]);

  return (
    <div ref={ref} className={`will-reveal ${className}`}>
      {children}
    </div>
  );
}
