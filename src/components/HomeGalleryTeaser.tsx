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
          <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-eyebrow uppercase tracking-[0.18em]">
            <span>Gallery</span>
            <Link
              href="/gallery"
              className="text-terracotta hover:underline transition-colors duration-150"
            >
              All photographs
            </Link>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 gap-2 py-8 md:grid-cols-12 md:gap-4 md:py-12">
          {frames.map((f, i) => (
            <RevealOnScroll
              key={f.src}
              direction="scale"
              delay={i * 90}
              className="md:col-span-4"
            >
              <Link
                href="/gallery"
                className="gallery-card block h-55 border border-espresso/20 md:h-75"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${f.src}`}
                  alt={f.alt}
                  className="h-full w-full object-cover"
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll direction="fade" delay={200}>
          <p className="pb-8 font-mono text-caption text-espresso/60">
            Photographs from fifty years on Greenhouse Row.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
