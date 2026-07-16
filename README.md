# Hublot Classic Fusion — The Art of Fusion

Next.js (App Router) + **TypeScript** + **Tailwind CSS** + **GSAP ScrollTrigger**.

One background for every section: a fixed, full-viewport canvas scrubs
through all **300 frames** of the watch footage as you scroll the entire
page, while every content section glides over it in glass panels.

## Assets

| Asset                          | Location                | Count |
| ------------------------------ | ----------------------- | ----- |
| Frame sequence (from the zip)  | `public/frames/`        | 300   |
| Blue Ceramic product shot      | `public/watches/ceramic-blue.jpg` | — |
| King Gold Chronograph shot     | `public/watches/king-gold-chrono.jpg` | — |
| Titanium shot                  | `public/watches/titanium.jpg` | — |
| King Gold shot                 | `public/watches/king-gold.jpg` | — |

Total page scroll progress 0 → 1 maps onto frame 1 → 300, so every frame
is used exactly once per full scroll.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production: `npm run build && npm start`

## Structure

- **`components/SequenceBackground.tsx`** — the shared background. Fixed
  canvas at `z-0`, DPR-aware cover-fit drawing, one GSAP tween
  (`snap: "frame"`) driven by a ScrollTrigger spanning the whole document
  (`start: 0, end: "max"`). Also renders the gold progress rail with a
  live `FRAME 042 / 300` readout, updated imperatively (no React state at
  scrub speed).
- **`components/Reveal.tsx`** — every content block is wired to
  ScrollTrigger through this wrapper: fade + slide on enter, reverse on
  leave, with `up / left / right` directions and stagger delays.
- **`components/Navbar.tsx`** — fixed navbar that turns to glass after
  40px of scroll; anchor links to Collection / The Fusion / Movement /
  Heritage; hamburger menu on mobile.
- **`components/Preloader.tsx`** — gates the page until all 300 frames
  are decoded, with a live percentage.

## Sections

Hero → open-footage breathing room → Fusion manifesto → Collection (your
4 product images as spec cards) → Movement (HUB1112 spec grid) →
Materials (King Gold / ceramic / titanium / rubber) → Heritage timeline
(1980 → today) → Footer.

## Quality floor

- `prefers-reduced-motion: reduce` — reveals render statically and the
  rail is hidden; the first frame stays as a still background.
- Responsive to mobile (cards collapse to one column, hamburger nav).
- Legibility wash (gradient overlays) keeps text readable over any frame.

## Tuning

- Scrub smoothing: `scrub: 0.6` in `SequenceBackground.tsx`.
- Playback pacing: add or shrink the `h-[60vh]` / `h-[70vh]` spacer divs
  in `app/page.tsx` — more page height = slower footage.
- Reveal timing: `start: "top 82%"` in `Reveal.tsx`.
