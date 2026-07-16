"use client";

type Props = { progress: number; done: boolean };

export default function Preloader({ progress, done }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-noir transition-[opacity,visibility] duration-700 ${
        done ? "pointer-events-none invisible opacity-0" : ""
      }`}
      aria-hidden={done}
    >
      <div className="font-display text-3xl uppercase tracking-[0.3em] text-porcelain md:text-5xl">
        Hublot<span className="text-gold">.</span>
      </div>
      <div className="relative h-px w-64 overflow-hidden bg-porcelain/10">
        <div
          className="absolute inset-0 origin-left bg-gold"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <div className="font-mono text-[0.65rem] uppercase tracking-widest2 text-smoke">
        Assembling {String(Math.round(progress * 100)).padStart(3, "0")}%
      </div>
    </div>
  );
}
