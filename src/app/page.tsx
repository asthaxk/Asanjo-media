import Hero from "@/components/Hero";
import Clip from "@/components/Clip";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import { WORKS } from "@/lib/works";

export default function Home() {
  const [a, b, c, d, e] = WORKS;

  return (
    <>
      <Hero />

      <main className="js-page opacity-0">
        <section
          id="works"
          className="grid grid-cols-1 items-start gap-[10vh] px-[var(--gutter)] pb-[14vh] md:grid-cols-3 md:gap-[var(--gutter)]"
        >
          {[a, b, c].map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.08}>
              <figure className="m-0">
                <Clip poster={w.poster} alt={w.alt} webm={w.webm} mp4={w.mp4} />
                <figcaption className="eyebrow mt-4 text-muted">
                  {w.title} — {w.discipline}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </section>

        <section
          id="studio"
          className="grid grid-cols-1 items-end gap-[8vh] px-[var(--gutter)] pb-[12vh] md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] md:gap-[var(--gutter)]"
        >
          <SplitLines
            text="We are Asanjo Media. An award-winning creative agency where beauty meets meaning. We create brands and digital experiences that connect people, culture and business through strategy, storytelling, design and technology."
            className="max-w-[34ch] text-[clamp(1rem,1.35vw,1.4rem)] leading-[1.35]"
          />
          <Reveal className="md:justify-self-end">
            <h2 className="display text-[26vw] md:text-[15vw]">MEDIA</h2>
          </Reveal>
        </section>

        <section className="grid grid-cols-1 gap-[10vh] px-[var(--gutter)] pb-[14vh] pt-[6vh] md:grid-cols-2 md:gap-[var(--gutter)]">
          <Reveal>
            <figure className="m-0">
              <Clip
                poster={d.poster}
                alt={d.alt}
                webm={d.webm}
                mp4={d.mp4}
                sizes="(max-width: 760px) 100vw, 47vw"
              />
              <figcaption className="eyebrow mt-4 text-muted">
                {d.title} — {d.discipline}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="md:mt-[18vh]">
            <figure className="m-0">
              <Clip
                poster={e.poster}
                alt={e.alt}
                webm={e.webm}
                mp4={e.mp4}
                sizes="(max-width: 760px) 100vw, 47vw"
              />
              <figcaption className="eyebrow mt-4 text-muted">
                {e.title} — {e.discipline}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <footer
          id="contact"
          className="border-t border-ink/10 px-[var(--gutter)] pb-[4vh] pt-[16vh]"
        >
          <Reveal>
            <a
              href="mailto:hello@asanjo.media"
              className="inline-block text-[clamp(2rem,7vw,6.5rem)] leading-none tracking-[-0.03em] transition-opacity hover:opacity-55"
            >
              hello@asanjo.media
            </a>
          </Reveal>
          <div className="eyebrow mt-[8vh] flex justify-between text-muted">
            <span>© 2026 Asanjo Media</span>
            <span>All rights reserved</span>
          </div>
        </footer>
      </main>
    </>
  );
}
