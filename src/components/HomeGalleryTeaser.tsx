import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

const frames = [
  { src: "/photos/gallery-counter.jpg", alt: "The counter, early morning" },
  { src: "/photos/gallery-espresso.jpg", alt: "Espresso, pulled short" },
  { src: "/photos/gallery-herbs.jpg", alt: "Herbs before harvest" },
];

export default function HomeGalleryTeaser() {
  return (
    <section className="border-t border-espresso/20">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll direction="fade">
          <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span>Gallery</span>
            <Link
              href="/gallery"
              className="text-terracotta hover:underline transition-colors duration-150"
            >
              All photographs
            </Link>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-3 gap-2 py-8 md:gap-4 md:py-12">
          {frames.map((f, i) => (
            <RevealOnScroll key={f.src} direction="scale" delay={i * 90}>
              <Link
                href="/gallery"
                className="gallery-card block border border-espresso/20"
                style={{ aspectRatio: "2/3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.alt}
                  className="h-full w-full object-cover"
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll direction="fade" delay={200}>
          <p className="pb-8 font-mono text-[12px] text-espresso/60">
            Photographs from fifty years on Greenhouse Row.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
