/**
 * Placeholder work. Posters are portrait Unsplash crops (2:3).
 *
 * To attach real footage: drop `name.webm` + `name.mp4` in /public/clips and set
 * `webm` / `mp4` below — or upload to Vercel Blob and paste the returned URLs.
 * Encode short, muted, ~1080px tall loops:
 *   ffmpeg -i in.mov -vf "scale=-2:1080" -an -c:v libsvtav1 -crf 38 out.webm
 *   ffmpeg -i in.mov -vf "scale=-2:1080" -an -c:v libx264 -crf 24 -movflags +faststart out.mp4
 */

export type Work = {
  slug: string;
  title: string;
  discipline: string;
  poster: string;
  alt: string;
  webm?: string;
  mp4?: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=1350&q=80`;

export const WORKS: Work[] = [
  {
    slug: "northbound",
    title: "Northbound",
    discipline: "Brand & Film",
    poster: unsplash("1506905925346-21bda4d32df4"),
    alt: "Still water below a low mountain ridge at dusk",
  },
  {
    slug: "evergreen",
    title: "Evergreen",
    discipline: "Identity",
    poster: unsplash("1441974231531-c6227db76b6e"),
    alt: "Sunlight falling through a dense forest canopy",
  },
  {
    slug: "meridian",
    title: "Meridian",
    discipline: "Digital Experience",
    poster: unsplash("1519681393784-d120267933ba"),
    alt: "Night sky over a dark mountain range",
  },
  {
    slug: "halcyon",
    title: "Halcyon",
    discipline: "Art Direction",
    poster: unsplash("1470071459604-3b5ec3a7fe05"),
    alt: "Mist settling in a forested valley",
  },
  {
    slug: "quiet-season",
    title: "Quiet Season",
    discipline: "Campaign",
    poster: unsplash("1439066615861-d1af74d74000"),
    alt: "Bare trees in winter light",
  },
];
