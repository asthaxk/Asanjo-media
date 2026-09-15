"use client";

import { useRef } from "react";
import Lenis from "lenis";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import WorkCard from "@/components/WorkCard";
import type { Work } from "@/lib/works";

const DESKTOP = "(min-width: 768px)";

/**
 * The work rail.
 *
 * On desktop the page itself does not scroll — this is the only thing that
 * moves — so a horizontal Lenis is mounted on the rail with
 * `gestureOrientation: "both"`, which maps an ordinary vertical wheel or
 * trackpad swipe onto horizontal travel. On a phone the page scrolls normally
 * and the rail is left to native touch scrolling.
 */
export default function Rail({ works }: { works: Work[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      if (!mq.matches || reduced || !wrapper.current || !content.current) return;

      lenis = new Lenis({
        wrapper: wrapper.current,
        content: content.current,
        orientation: "horizontal",
        gestureOrientation: "both",
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      gsap.ticker.add(tick);
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      teardown();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className="rail overflow-x-auto overflow-y-hidden px-[var(--gutter)] pb-[14vh] md:fixed md:inset-x-0 md:top-[28vh] md:z-10 md:pb-0"
    >
      <div
        ref={content}
        className="grid snap-x snap-mandatory grid-flow-col auto-cols-[78vw] gap-[6vw] md:auto-cols-[27vh] md:gap-[3vh]"
      >
        {works.map((work, i) => (
          <WorkCard
            key={work.slug}
            work={work}
            index={i}
            priority={i === 0}
            sizes="(max-width: 767px) 78vw, 24vw"
          />
        ))}
      </div>
    </div>
  );
}
