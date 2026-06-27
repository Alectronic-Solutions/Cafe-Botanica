import type { Metadata } from "next";
import FilmGallery, { type FilmFrame } from "@/components/FilmGallery";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Cafe Botanica — the counter, the greenhouse, the room.",
};

const frames: FilmFrame[] = [
  { src: "/photos/gallery-counter.jpg",     alt: "The counter, early morning",   caption: "The counter, early morning" },
  { src: "/photos/gallery-window.jpg",      alt: "South window, July",           caption: "South window, July" },
  { src: "/photos/gallery-greenhouse.jpg",  alt: "Greenhouse row, late spring",  caption: "Greenhouse row, late spring" },
  { src: "/photos/gallery-table.jpg",       alt: "Table two, before service",    caption: "Table two, before service" },
  { src: "/photos/gallery-espresso.jpg",    alt: "Espresso, pulled short",       caption: "Espresso, pulled short" },
  { src: "/photos/gallery-back-window.jpg", alt: "The back window, February",    caption: "The back window, February" },
  { src: "/photos/gallery-herbs.jpg",       alt: "Herbs before harvest",         caption: "Herbs before harvest" },
  { src: "/photos/gallery-buns.jpg",        alt: "Cardamom buns, 06:45",         caption: "Cardamom buns, 06:45" },
  { src: "/photos/gallery-rush.jpg",        alt: "Morning rush, Thursday",       caption: "Morning rush, Thursday" },
  { src: "/photos/gallery-east-wall.jpg",   alt: "East wall, summer light",      caption: "East wall, summer light" },
  { src: "/photos/gallery-autumn.jpg",      alt: "The greenhouse in autumn",     caption: "The greenhouse in autumn" },
  { src: "/photos/gallery-closing.jpg",     alt: "Closing time, Saturday",       caption: "Closing time, Saturday" },
]

export default function GalleryPage() {
  return (
    <div>
      {/* Label bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
          <span>Gallery</span>
          <span>118 Greenhouse Row</span>
        </div>
      </div>

      {/* Intro */}
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7">
              <h1 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
                The room,<br />the counter,<br />the light.
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end pt-8 md:pt-0">
              <p className="font-mono text-[14px] leading-[1.8] text-espresso/80" style={{ maxWidth: "260px" }}>
                Film stills from fifty years on Greenhouse Row. The space does not change quickly. Neither do we.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Gallery grid */}
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <FilmGallery frames={frames} />
        </div>
      </RevealOnScroll>
    </div>
  );
}
