import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

export default function HomeAbout() {
  return (
    <section className="border-t border-espresso/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-10 py-16 md:grid-cols-12 md:gap-x-12 md:py-24">
          {/* Photo — slides in from left */}
          <RevealOnScroll direction="left" className="md:col-span-5">
            <div className="border border-espresso/30 overflow-hidden photo-mount" style={{ aspectRatio: "4/5", transform: "rotate(-0.4deg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/about-interior.jpg"
                alt="118 Greenhouse Row interior"
                className="h-full w-full object-cover transition-transform duration-700"
                style={{ filter: "sepia(20%) contrast(105%) saturate(110%)" }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-espresso/60 mt-3">
              118 Greenhouse Row · Est. 1974
            </p>
          </RevealOnScroll>

          {/* Text — slides in from right, delayed */}
          <RevealOnScroll direction="right" delay={120} className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <blockquote className="font-display text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.08] tracking-[-0.01em] italic text-espresso mb-8">
              We are not a third wave coffee concept. We are a place.
            </blockquote>
            <p className="font-mono text-[14px] leading-[1.9] text-espresso/85 mb-8" style={{ maxWidth: "380px" }}>
              Margaret Hollis opened the doors in the autumn of 1974. The space
              has changed hands twice since then, each time to someone who
              understood what it was trying to be.
            </p>
            <Link
              href="/about"
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-terracotta hover:underline transition-colors duration-150 self-start"
            >
              Read the story
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
