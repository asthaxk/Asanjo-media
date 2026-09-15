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

    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    /**
     * Desktop keeps both words: they travel apart to opposite corners at the
     * size they already are.
     *
     * Measured live, so they must only be read once the wordmark is full size —
     * GSAP resolves function-based values at tween init, which is too early.
     */
    const restA = () => {
      const r = w1.current!.getBoundingClientRect();
      return {
        x: gutter() - r.left,
        y: window.innerHeight * 0.1 - r.top,
        transformOrigin: "left top",
      };
    };
    const restB = () => {
      const r = w2.current!.getBoundingClientRect();
      return {
        x: window.innerWidth - gutter() - r.right,
        y: window.innerHeight * 0.9 - r.bottom,
        transformOrigin: "right bottom",
      };
    };

    /**
     * Phone: the lockup zooms as a single unit, anchored to the first word's
     * top-left corner, until ASANJO fills the column. MEDIA rides along and
     * leaves past the right edge, so the zoomed state is one word — the way the
     * reference resolves to a lone ET.
     */
    const restZoom = () => {
      const rl = line.current!.getBoundingClientRect();
      const rw = w1.current!.getBoundingClientRect();
      return {
        x: gutter() - rl.left,
        y: window.innerHeight * 0.1 - rl.top,
        scale: rw.width ? (window.innerWidth - gutter() * 2) / rw.width : 1,
        transformOrigin: "left top",
      };
    };

    const ctx = gsap.context(() => {
      gsap.set(line.current, { xPercent: -50, yPercent: -50, scale: SMALL });

      const done = () => {
        document.body.dataset.intro = "done";
        // Desktop has no page scroll, so anything that would normally wait for
        // a ScrollTrigger keys off this instead.
        window.dispatchEvent(new Event("intro:done"));
      };

      if (reduced) {
        gsap.set(line.current, { scale: 1, opacity: 1 });
        if (isDesktop()) {
          gsap.set(w1.current, restA());
          gsap.set(w2.current, restB());
        } else {
          gsap.set(line.current, restZoom());
        }
        gsap.set([nav.current, cue.current, cueLabel.current, page], { opacity: 1 });
        done();
        return;
      }

      document.body.dataset.intro = "running";

      // 3 — desktop splits to opposite corners; phone zooms into the first word
      const split = () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: done,
        });

        if (isDesktop()) {
          tl.to(w1.current, { ...restA(), duration: 1.4 }).to(
            w2.current,
            { ...restB(), duration: 1.4 },
            "<"
          );
        } else {
          tl.to(line.current, { ...restZoom(), duration: 1.6 });
        }

        tl.to(cueLabel.current, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.8").to(
          [nav.current, page],
          { opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
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
        <span className="eyebrow hidden text-white md:block">ASANJO</span>
        <nav className="flex w-full justify-between md:w-auto md:justify-end md:gap-[clamp(2rem,12vw,16rem)]">
          {[
            ["STUDIO", "#studio"],
            ["WORKS", "#works"],
            ["CONTACT", "mailto:hello@asanjo.media"],
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
        className="display absolute left-1/2 top-1/2 flex gap-[0.1em] whitespace-nowrap text-[11.6vw] opacity-0 will-change-transform md:gap-[0.22em]"
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
        className="absolute left-1/2 top-[22%] hidden -translate-x-1/2 items-center gap-3 opacity-0 md:flex"
        aria-hidden="true"
      >
        <span className="block h-[7px] w-[7px] rounded-full bg-ink" />
        <span ref={cueLabel} className="eyebrow opacity-0">
          SCROLL&nbsp;&rarr;
        </span>
      </div>
    </section>
  );
}
