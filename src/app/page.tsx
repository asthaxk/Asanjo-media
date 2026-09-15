import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import WorkCard from "@/components/WorkCard";
import { WORKS } from "@/lib/works";

const ABOUT =
  "We are Asanjo Media. An award-winning creative agency where beauty meets meaning. We create brands and digital experiences that connect people, culture and business through strategy, storytelling, design and technology.";

export default function Home() {
  const [a, b, c, d, e] = WORKS;

  return (
    <>
      <Hero />

      <main className="js-page flex flex-col opacity-0">
        {/* Copy leads on a phone; on desktop the work strip comes first. */}
        <section
          id="studio"
          className="order-1 grid grid-cols-1 items-end md:order-2 gap-[8vh] px-[var(--gutter)] pb-[12vh] pt-[12vh] md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] md:gap-[var(--gutter)] md:pt-0"
        >
          <SplitLines
            text={ABOUT}
            className="max-w-[34ch] text-[clamp(1rem,1.35vw,1.4rem)] uppercase leading-[1.35] tracking-[0.01em] md:normal-case md:tracking-normal"
          />
          <Reveal className="hidden md:block md:justify-self-end">
            <h2 className="display text-[15vw]">MEDIA</h2>
          </Reveal>
        </section>

        {/* Phone: one horizontal, snapping rail. Desktop: a three-up grid. */}
        <section
          id="works"
          className="rail order-2 grid snap-x snap-mandatory grid-flow-col auto-cols-[78vw] gap-[6vw] overflow-x-auto overflow-y-hidden px-[var(--gutter)] pb-[14vh] md:order-1 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:gap-[var(--gutter)] md:overflow-visible md:snap-none"
        >
          {[a, b, c].map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08} className="snap-start">
              <WorkCard
                work={w}
                index={i}
                priority={i === 0}
                sizes="(max-width: 767px) 78vw, 31vw"
              />
            </Reveal>
          ))}
        </section>

        <section className="order-3 grid grid-cols-1 gap-[10vh] px-[var(--gutter)] pb-[14vh] md:grid-cols-2 md:gap-[var(--gutter)]">
          <Reveal>
            <WorkCard work={d} index={3} sizes="(max-width: 767px) 94vw, 47vw" />
          </Reveal>
          <Reveal className="md:mt-[18vh]">
            <WorkCard work={e} index={4} sizes="(max-width: 767px) 94vw, 47vw" />
          </Reveal>
        </section>

        <footer
          id="contact"
          className="order-4 border-t border-ink/10 px-[var(--gutter)] pb-[6vh] pt-[16vh]"
        >
          <Reveal>
            <a
              href="mailto:hello@asanjo.media"
              className="inline-block text-[clamp(1.6rem,7vw,6.5rem)] leading-none tracking-[-0.03em] transition-opacity hover:opacity-55"
            >
              hello@asanjo.media
            </a>
          </Reveal>
          <div className="eyebrow mt-[8vh] flex flex-col gap-2 text-muted md:flex-row md:justify-between">
            <span>© 2026 Asanjo Media</span>
            <span>All rights reserved</span>
          </div>
        </footer>
      </main>
    </>
  );
}
