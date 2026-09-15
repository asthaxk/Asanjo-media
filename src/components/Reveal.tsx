"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Extra offset in px before the element settles. */
  y?: number;
  delay?: number;
};

/**
 * One ScrollTrigger per element, `once: true` so it unregisters after firing —
 * cheaper than keeping observers alive for the life of the page.
 */
export default function Reveal({ children, className, y = 34, delay = 0 }: Props) {
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el.current, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={el} className={`reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
