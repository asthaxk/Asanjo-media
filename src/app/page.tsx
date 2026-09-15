import Hero from "@/components/Hero";
import Rail from "@/components/Rail";
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
          className="order-1 px-[var(--gutter)] pb-[12vh] pt-[7vh] md:fixed md:bottom-[8vh] md:left-0 md:z-10 md:order-none md:p-0 md:pl-[var(--gutter)]"
        >
          <SplitLines
            text={ABOUT}
            className="max-w-[34ch] text-[clamp(1rem,1.35vw,1.4rem)] uppercase leading-[1.35] tracking-[0.01em] md:max-w-[28ch] md:text-[0.82rem] md:normal-case md:leading-[1.45] md:tracking-normal"
          />
        </section>

        <div id="works" className="order-2 md:order-none">
          <Rail works={WORKS} />
        </div>
      </main>
    </>
  );
}
