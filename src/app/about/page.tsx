import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cafe Botanica has been an espresso bar and bakery on Greenhouse Row since 1974. The story behind the space, the sourcing, and the room.",
};

export default function About() {
  return (
    <div>
      {/* Label bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
          <span>The Story</span>
          <span>Est. 1974</span>
        </div>
      </div>

      {/* Founding — asymmetric 7/5 grid */}
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-y-12 py-24 md:grid-cols-12 md:gap-x-10 md:py-32">
            <div className="col-span-1 md:col-span-7">
              <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
                A place that does<br />
                not hurry.
              </h1>
              <div className="mt-10 space-y-5 font-mono text-[14px] leading-[1.85] text-espresso/85" style={{ maxWidth: "480px" }}>
                <p>
                  Margaret Hollis opened the doors on Greenhouse Row in the autumn of 1974.
                  The neighborhood was quiet then. A few artists, a print shop, the
                  botanical society two blocks north. She pulled espresso on a second-hand
                  La Pavoni and sold bread she baked in a rented kitchen before dawn.
                </p>
                <p>
                  The space has changed hands twice since then, each time to someone who
                  understood what it was trying to be. Not a concept. Not a brand. A room
                  where the morning moves slowly and the coffee is worth paying attention to.
                </p>
                <p>
                  We grow herbs and a few flowers in the greenhouse attached to the rear
                  of the building. Some end up in the drinks. Some end up on the plates.
                  Most are just there to look at.
                </p>
              </div>
            </div>

            {/* Photograph */}
            <div className="col-span-1 md:col-span-5">
              <div className="border border-espresso overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/about-interior.jpg"
                  alt="118 Greenhouse Row interior, 1974"
                  className="h-full w-full object-cover"
                  style={{ filter: "sepia(20%) contrast(105%) saturate(110%)" }}
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-espresso/60 mt-3">
                118 Greenhouse Row · 1974
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Three pillars */}
      <RevealOnScroll>
        <div className="border-t border-espresso">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll stagger>
              <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
                {[
                  {
                    label: "Sourcing",
                    body: "The coffee comes from three farms we have bought from for more than a decade. Ethiopia, Guatemala, Colombia. We visit once a year. The bread flour is stone-milled sixty miles north. The produce arrives twice a week from a farm in Decatur that has been supplying us since 1991.",
                  },
                  {
                    label: "The Greenhouse",
                    body: "The glass structure at the back of the building predates us by thirty years. We use it to grow the herbs and flowers that go into the Botanicals section of the menu. Nettle, chamomile, mint, lemon verbena. In winter, paperwhites and forced bulbs. Nothing is wasted.",
                  },
                  {
                    label: "The Room",
                    body: "Fourteen tables. A long counter with six stools. No music after nine in the morning. The room is designed for people who want to sit and think, read, or talk quietly. We have never installed speakers. We do not intend to.",
                  },
                ].map(({ label, body }) => (
                  <div key={label} className="border-t border-espresso pt-8 pb-10 md:border-l md:border-t-0 md:px-8 first:md:pl-0 last:md:pr-0">
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-4">
                      {label}
                    </p>
                    <p className="font-mono text-[14px] leading-[1.85] text-espresso/85">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </RevealOnScroll>

      {/* Pull quote */}
      <RevealOnScroll>
        <div className="border-t border-b border-espresso my-0">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <blockquote className="font-display text-[clamp(1.8rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] italic max-w-4xl">
              We are not a third wave coffee concept. We are a place.
            </blockquote>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.18em] text-espresso/60">
              Margaret Hollis, 1974
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
