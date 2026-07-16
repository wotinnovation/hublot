"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 300; // matches the uploaded zip exactly
const frameSrc = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

type Props = {
  onProgress?: (p: number) => void;
  onReady?: () => void;
};

/**
 * One background for every section: a fixed, full-viewport canvas that
 * scrubs through all 300 frames as the user scrolls the entire page.
 * Content sections scroll over it on higher z-index layers.
 */
export default function SequenceBackground({ onProgress, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const railPctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const state = { frame: 0 };
    let loaded = 0;
    let killed = false;

    const draw = () => {
      const img = images[Math.min(FRAME_COUNT - 1, Math.round(state.frame))];
      if (!img || !img.complete || !img.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        loaded += 1;
        onProgress?.(loaded / FRAME_COUNT);
        if (i === 0) draw();
        if (loaded === FRAME_COUNT && !killed) onReady?.();
      };
      images[i] = img;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tween: gsap.core.Tween | undefined;
    if (!reduced) {
      tween = gsap.to(state, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (railFillRef.current)
              railFillRef.current.style.transform = `scaleY(${self.progress})`;
            if (railPctRef.current)
              railPctRef.current.textContent = `FRAME ${String(
                Math.round(state.frame) + 1
              ).padStart(3, "0")} / ${FRAME_COUNT}`;
          },
        },
        onUpdate: draw,
      });
    }

    const onResize = () => draw();
    window.addEventListener("resize", onResize);

    return () => {
      killed = true;
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      images.forEach((img) => {
        if (img) img.onload = img.onerror = null;
      });
    };
  }, [onProgress, onReady]);

  return (
    <>
      {/* The single shared background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="h-full w-full" />
        {/* Legibility wash — keeps one bg while content stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/25 to-noir/85" />
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_45%,transparent_50%,rgba(11,10,8,0.65))]" />
      </div>

      {/* Gold progress rail — live frame readout */}
      <div className="rail" aria-hidden="true">
        <span ref={railFillRef} className="rail__fill" />
        <span ref={railPctRef} className="rail__label">
          FRAME 001 / 300
        </span>
      </div>
    </>
  );
}
