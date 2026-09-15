"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Page-level smooth scroll, for the phone layout only — desktop is a single
 * fold with no vertical scroll at all, where the work rail runs its own
 * horizontal Lenis instead (see Rail.tsx).
 *
 * Lenis is driven by GSAP's ticker so scroll-linked animations and
 * ScrollTrigger stay on one RAF loop (no jitter, no double rAF).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const teardown = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };

    const sync = () => {
      teardown();
      if (mq.matches) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    };

    gsap.ticker.lagSmoothing(0);
    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
