"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type Props = {
  /** Portrait still. Always rendered — it is also the video poster. */
  poster: string;
  alt: string;
  /** Optional short loop. Give the .webm first; .mp4 is the Safari fallback. */
  webm?: string;
  mp4?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Never a GIF. A 3s GIF is 5-10MB and decodes on the main thread; the same clip
 * as muted WebM/MP4 is ~200-400KB and decodes on the GPU. The poster carries
 * the first frame so nothing pops in, and the video is only fetched and played
 * while it is actually on screen.
 */
export default function Clip({
  poster,
  alt,
  webm,
  mp4,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 31vw",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const hasClip = Boolean(webm || mp4);

  useIsomorphicLayoutEffect(() => {
    if (!hasClip || !wrap.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const v = video.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    io.observe(wrap.current);
    return () => io.disconnect();
  }, [hasClip]);

  return (
    <div ref={wrap} className="frame">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {hasClip && (
        <video
          ref={video}
          data-ready={ready}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setReady(true)}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
