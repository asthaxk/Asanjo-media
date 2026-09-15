"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

/**
 * Word-by-word rise, masked by overflow-hidden rows. Words (not characters)
 * keeps the node count low and the text selectable/readable to screen readers
 * via the sr-only source string.
 */
export default function SplitLines({
  text,
  className,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const el = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useIsomorphicLayoutEffect(() => {
    // Desktop is a single fold with no page scroll, so there is no scroll
    // position that could ever trigger this — play it off the intro instead.
    const pinned = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const rise = () =>
        gsap.fromTo(
          ".js-word",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger,
            ...(pinned
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el.current,
                    start: "top 85%",
                    once: true,
                  },
                }),
          }
        );

      if (!pinned) {
        rise();
        return;
      }

      if (document.body.dataset.intro === "done") rise();
      else window.addEventListener("intro:done", rise, { once: true });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <p ref={el} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <span className="js-word inline-block will-change-transform">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
