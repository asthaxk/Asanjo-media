import Hero from "@/components/Hero";
import Rail from "@/components/Rail";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import { WORKS } from "@/lib/works";

const ABOUT =
  "We are Asanjo Media. An award-winning creative agency where beauty meets meaning. We create brands and digital experiences that connect people, culture and business through strategy, storytelling, design and technology.";

/**
 * Desktop is a single fold: nothing scrolls vertically. Once the wordmark
 * settles into its corners the rail is the only thing that moves, so the copy
 * and the rail are pinned into the fold with `fixed`. A phone keeps an ordinary
 * scrolling page, where those same elements sit in normal flow.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <main className="js-page flex flex-col opacity-0">
        <section
          id="studio"
          className="order-1 px-[var(--gutter)] pb-[12vh] pt-[12vh] md:fixed md:bottom-[8vh] md:left-0 md:z-10 md:order-none md:p-0 md:pl-[var(--gutter)]"
        >
          <SplitLines
            text={ABOUT}
            className="max-w-[34ch] text-[clamp(1rem,1.35vw,1.4rem)] uppercase leading-[1.35] tracking-[0.01em] md:max-w-[28ch] md:text-[0.82rem] md:normal-case md:leading-[1.45] md:tracking-normal"
          />
        </section>

        <div id="works" className="order-2 md:order-none">
          <Rail works={WORKS} />
        </div>

        {/* Contact lives in the nav on desktop; the phone gets a real footer. */}
        <footer
          id="contact"
          className="order-3 border-t border-ink/10 px-[var(--gutter)] pb-[6vh] pt-[16vh] md:hidden"
        >
          <Reveal>
            <a
              href="mailto:hello@asanjo.media"
              className="inline-block text-[clamp(1.6rem,7vw,6.5rem)] leading-none tracking-[-0.03em] transition-opacity hover:opacity-55"
            >
              hello@asanjo.media
            </a>
          </Reveal>
          <div className="eyebrow mt-[8vh] flex flex-col gap-2 text-muted">
            <span>© 2026 Asanjo Media</span>
            <span>All rights reserved</span>
          </div>
        </footer>
      </main>
    </>
  );
}
