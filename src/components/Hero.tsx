"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const SMALL = 0.14;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLHeadingElement>(null);
  const w1 = useRef<HTMLSpanElement>(null);
  const w2 = useRef<HTMLSpanElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const cueLabel = useRef<HTMLSpanElement>(null);
  const nav = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const page = document.querySelector<HTMLElement>(".js-page");
    const gutter = () => window.innerWidth * 0.03;

    // Final resting places: first word top-left, second word bottom-right.
    // Measured live, so they must only be read once the wordmark is full size —
    // GSAP resolves function-based values at tween init, which is too early.
    const restA = () => {
      const r = w1.current!.getBoundingClientRect();
      return { x: gutter() - r.left, y: window.innerHeight * 0.1 - r.top };
    };
    const restB = () => {
      const r = w2.current!.getBoundingClientRect();
      return {
        x: window.innerWidth - gutter() - r.right,
        y: window.innerHeight * 0.9 - r.bottom,
      };
    };

    const ctx = gsap.context(() => {
      gsap.set(line.current, { xPercent: -50, yPercent: -50, scale: SMALL });

      const done = () => {
        document.body.dataset.intro = "done";
      };

      if (reduced) {
        gsap.set(line.current, { scale: 1, opacity: 1 });
        gsap.set(w1.current, restA());
        gsap.set(w2.current, restB());
        gsap.set([nav.current, cue.current, cueLabel.current, page], { opacity: 1 });
        done();
        return;
      }

      document.body.dataset.intro = "running";

      // 3 — words split to the top-left and bottom-right corners
      const split = () => {
        gsap
          .timeline({ defaults: { ease: "power4.inOut" }, onComplete: done })
          .to(w1.current, { ...restA(), duration: 1.4 })
          .to(w2.current, { ...restB(), duration: 1.4 }, "<")
          .to(cueLabel.current, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.8")
          .to([nav.current, page], { opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");
      };

      gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete: split })
        // 1 — small wordmark fades up
        .fromTo(
          line.current,
          { opacity: 0, yPercent: -46 },
          { opacity: 1, yPercent: -50, duration: 0.9 }
        )
        // 2 — grows to full width
        .to(line.current, { scale: 1, duration: 1.5, ease: "power4.inOut" }, "+=0.4")
        .to(cue.current, { opacity: 1, duration: 0.7 }, "<")
        .to({}, { duration: 0.25 });
    }, root);

    return () => {
      ctx.revert();
      delete document.body.dataset.intro;
    };
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden">
      <header
        ref={nav}
        className="fixed inset-x-0 top-0 z-20 flex items-baseline justify-between px-[var(--gutter)] pt-9 opacity-0 mix-blend-difference"
        aria-label="Primary"
      >
        <span className="eyebrow text-white">ASANJO</span>
        <nav className="flex gap-[clamp(2rem,12vw,16rem)]">
          {[
            ["STUDIO", "#studio"],
            ["WORKS", "#works"],
            ["CONTACT", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="eyebrow text-white/90 transition-opacity hover:opacity-50"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <h1
        ref={line}
        className="display absolute left-1/2 top-1/2 flex flex-col items-start gap-0 whitespace-nowrap text-[17vw] opacity-0 will-change-transform md:flex-row md:gap-[0.22em] md:text-[11.6vw]"
      >
        <span ref={w1} className="block will-change-transform">
          ASANJO
        </span>
        <span ref={w2} className="block will-change-transform">
          MEDIA
        </span>
      </h1>

      <div
        ref={cue}
        className="absolute left-1/2 top-[42%] flex -translate-x-1/2 items-center gap-3 opacity-0"
        aria-hidden="true"
      >
        <span className="block h-[7px] w-[7px] rounded-full bg-ink" />
        <span ref={cueLabel} className="eyebrow opacity-0">
          SCROLL
        </span>
      </div>
    </section>
  );
}
