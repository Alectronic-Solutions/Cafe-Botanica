import type { Metadata } from "next";
import Gatherings from "@/components/Gatherings";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/gatherings` },
  title: "Gatherings",
  description:
    "Upcoming events at Cafe Botanica: tastings, suppers, and workshops. Small groups, by reservation.",
};

export default function GatheringsPage() {
  return (
    <div>
      {/* Label bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="label-bar border-b border-espresso py-4 font-mono text-caption uppercase tracking-[0.18em]">
          <span>Gatherings</span>
          <span>By reservation only</span>
        </div>
      </div>

      <RevealOnScroll direction="fade">
        <div className="mx-auto max-w-6xl px-6 pt-14 text-center md:pt-24 md:text-left">
          <h1 className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
            Small tables,
            <br />
            <span className="italic">long evenings.</span>
          </h1>
        </div>
      </RevealOnScroll>

      <Gatherings heading="On the calendar" />

      {/* How to reserve */}
      <RevealOnScroll>
        <div className="border-t border-espresso">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-y-12 py-14 md:grid-cols-12 md:gap-x-10 md:py-20">
              <div className="text-center md:col-span-7 md:text-left">
                <h2 className="font-mono text-caption uppercase tracking-[0.14em] text-terracotta mb-5">
                  How to reserve
                </h2>
                <div className="mx-auto max-w-[480px] space-y-4 font-mono text-body leading-[1.85] text-espresso/85 md:mx-0">
                  <p>
                    All gatherings are small. The largest table seats sixteen. Write us
                    with your name, how many seats you need, and which event. We will
                    confirm within two business days.
                  </p>
                  <p>
                    There is no ticketing system. No deposit. If something comes up,
                    let us know as early as you can so someone on the waitlist can take
                    your place.
                  </p>
                </div>
                <div className="mt-10">
                  <a
                    href="mailto:hello@cafebotanica.com"
                    className="inline-block border border-espresso px-6 py-4 font-mono text-body-sm uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-espresso hover:text-linen"
                  >
                    Write to reserve a seat
                  </a>
                </div>
              </div>

              <div className="md:col-span-5 md:col-start-9">
                <div className="mx-auto max-w-sm border border-espresso p-6 md:max-w-none">
                  <h2 className="font-mono text-caption uppercase tracking-[0.14em] text-terracotta mb-4">
                    What to expect
                  </h2>
                  <ul className="font-mono text-body leading-[1.9] text-espresso/85 space-y-2">
                    {[
                      "Small groups of 10 to 16 seats",
                      "Doors open fifteen minutes before start",
                      "Duration: two to three hours",
                      "Drinks and food included in cost",
                      "Wheelchair accessible",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-terracotta shrink-0" aria-hidden>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
