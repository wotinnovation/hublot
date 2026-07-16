"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#fusion", label: "The Fusion" },
  { href: "#movement", label: "Movement" },
  { href: "#heritage", label: "Heritage" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a
          href="#top"
          className="font-display text-lg uppercase tracking-[0.28em] text-porcelain"
        >
          Hublot<span className="text-gold">.</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#collection"
              className="hairline px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-widest2 text-gold transition-colors duration-300 hover:bg-gold hover:text-noir"
            >
              Discover
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-porcelain transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-porcelain transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="glass mt-3 flex flex-col gap-5 px-6 py-6 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
