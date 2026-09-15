import Clip from "@/components/Clip";
import type { Work } from "@/lib/works";

export default function WorkCard({
  work,
  index,
  sizes,
  priority = false,
}: {
  work: Work;
  index: number;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className="m-0">
      <figcaption className="eyebrow mb-4 flex gap-6 text-ink md:hidden">
        <span className="text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>{work.title.toUpperCase()}</span>
      </figcaption>
      <Clip
        poster={work.poster}
        alt={work.alt}
        webm={work.webm}
        mp4={work.mp4}
        sizes={sizes}
        priority={priority}
      />
      <figcaption className="eyebrow mt-4 hidden text-muted md:block">
        {work.title} — {work.discipline}
      </figcaption>
    </figure>
  );
}
