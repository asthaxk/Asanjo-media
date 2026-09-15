# Asanjo Media

Site for Asanjo Media. Deployed on Vercel at
[asanjo-media.vercel.app](https://asanjo-media.vercel.app/).

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Static-rendered page, `next/image` for automatic AVIF/WebP + responsive sizes |
| Styling | Tailwind CSS v4 | No runtime, no CSS-in-JS cost |
| Animation | GSAP core + ScrollTrigger | One timeline engine for the intro, micro-animations, and scroll triggers — ~40 KB gzipped and the only animation runtime in the bundle |
| Smooth scroll | Lenis | ~3 KB, driven off GSAP's ticker so everything shares a single rAF loop |
| Motion video | `<video>` (WebM + MP4), never GIF | See below |

Deliberately **not** included: Framer Motion / Motion One (a second animation
runtime doing what GSAP already does), Locomotive Scroll (heavier than Lenis),
and any Lottie player (only worth it for vector UI motion, not footage).

### Motion, not GIFs

A 3-second GIF is typically 5–10 MB and decodes frame-by-frame on the main
thread, which is what makes GIF-heavy sites stutter. The same clip as a muted
WebM/MP4 is roughly 200–400 KB and decodes on the GPU.

`src/components/Clip.tsx` renders a portrait still as the poster and only
fetches + plays the video while it is on screen (`preload="none"` plus an
IntersectionObserver), then cross-fades it in. Clips honour
`prefers-reduced-motion` by never starting.

To attach real footage, put files in `public/clips` (or upload to Vercel Blob)
and set `webm` / `mp4` on the entry in `src/lib/works.ts`:

```bash
ffmpeg -i in.mov -vf "scale=-2:1080" -an -c:v libsvtav1 -crf 38 out.webm
ffmpeg -i in.mov -vf "scale=-2:1080" -an -c:v libx264 -crf 24 -movflags +faststart out.mp4
```

### Type

The brief called for **NeueMontreal-Regular**, which is a commercial Pangram
Pangram face and is not redistributable. The site currently loads **Switzer**
(Fontshare, free) — the closest equivalent: same neo-grotesque skeleton, nearly
identical `a`, `g`, `R` and `J`. To swap in the licensed face, drop
`PPNeueMontreal-Regular.woff2` into `src/app/fonts/`, load it with
`next/font/local`, and remove the Fontshare `<link>` in `src/app/layout.tsx`.

### Images

Placeholder portrait (2:3) crops from Unsplash, listed in `src/lib/works.ts`.
Replace the `poster` URLs with real work.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

## Animation map

- `src/components/Hero.tsx` — intro: small wordmark fades up → scales to full
  width → splits, ASANJO to the top-left and MEDIA to the bottom-right. Corner
  offsets are measured from live rects *after* the scale completes.
- `src/components/SplitLines.tsx` — word-by-word masked rise for body copy.
- `src/components/Reveal.tsx` — one `once: true` ScrollTrigger per element.
- `src/components/SmoothScroll.tsx` — Lenis wired into the GSAP ticker.
