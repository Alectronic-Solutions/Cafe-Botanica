import type { Metadata } from "next";
import Gatherings from "@/components/Gatherings";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Gatherings",
  description:
    "Upcoming events at Cafe Botanica: tastings, suppers, and workshops. Small groups, by reservation.",
};

export default function GatheringsPage() {
  return (
    <div>
      {/* Label bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
          <span>Gatherings</span>
          <span>By reservation only</span>
        </div>
      </div>

      {/* Reuse the existing Gatherings component */}
      <Gatherings />

      {/* How to reserve */}
      <RevealOnScroll>
        <div className="border-t border-espresso">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-y-10 py-20 md:grid-cols-12 md:gap-x-10">
              <div className="md:col-span-7">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-5">
                  How to reserve
                </p>
                <div className="space-y-4 font-mono text-[14px] leading-[1.85] text-espresso/85" style={{ maxWidth: "480px" }}>
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
                    className="inline-block font-mono text-[13px] uppercase tracking-[0.18em] border border-espresso px-6 py-4 hover:bg-espresso hover:text-linen transition-colors duration-200"
                  >
                    Write to reserve a seat
                  </a>
                </div>
              </div>

              <div className="md:col-span-5 md:col-start-9">
                <div className="border border-espresso p-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-4">
                    What to expect
                  </p>
                  <ul className="font-mono text-[14px] leading-[1.9] text-espresso/85 space-y-2">
                    {[
                      "Small groups — 10 to 16 seats",
                      "Doors open fifteen minutes before start",
                      "Duration: two to three hours",
                      "Drinks and food included in cost",
                      "Wheelchair accessible",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-terracotta shrink-0">—</span>
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
