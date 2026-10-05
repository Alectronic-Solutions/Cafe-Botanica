import Link from "next/link";
import { gatherings, hours } from "@/data/botanica";
import RevealOnScroll from "./RevealOnScroll";

function formatDate(iso: string): { day: string; month: string; weekday: string } {
  const d = new Date(`${iso}T00:00:00`);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const weekday = d
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  return { day, month, weekday };
}

interface GatheringsProps {
  /** Header bar title. The Gatherings page passes its own so the page H1 is not repeated. */
  heading?: string;
}

export default function Gatherings({ heading = "Gatherings" }: GatheringsProps) {
  // The site is a static export: this runs at build time, so dated events drop
  // off on the next deploy after they pass.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = gatherings.filter((g) => g.date >= today);

  return (
    <section id="gatherings" className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-y-12 py-14 md:grid-cols-12 md:gap-x-10 md:py-28">
        {/* Gatherings list */}
        <div className="md:col-span-7">
          <RevealOnScroll direction="fade">
            <div className="label-bar border-b border-espresso py-4 font-mono text-body-sm uppercase tracking-[0.18em]">
              <h2 className="font-mono text-body-sm uppercase tracking-[0.18em]">{heading}</h2>
              <span className="text-espresso/70">By reservation</span>
            </div>
          </RevealOnScroll>

          {upcoming.length > 0 ? (
            <ul>
              {upcoming.map((g, i) => {
                const { day, month, weekday } = formatDate(g.date);
                return (
                  <RevealOnScroll
                    as="li"
                    key={g.title}
                    direction="up"
                    delay={i * 100}
                    threshold={0.1}
                    className="flex gap-5 border-b border-espresso/20 py-6"
                  >
                    <div className="w-16 shrink-0 border-r border-espresso/20 pr-4 text-center">
                      <div className="font-display text-4xl font-light leading-none">
                        {day}
                      </div>
                      <div className="mt-1.5 font-mono text-eyebrow leading-snug tracking-[0.12em] text-espresso/75">
                        {month}
                        <br />
                        {weekday}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-mono text-body font-bold">{g.title}</h3>
                      <p className="mt-1 font-mono text-caption uppercase tracking-[0.12em] text-espresso/70 tabular-nums">
                        {g.time} · {g.seats} seats
                      </p>
                      <p className="mt-2 font-mono text-body-sm leading-relaxed text-espresso/80">
                        {g.detail}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </ul>
          ) : (
            <p className="border-b border-espresso/20 py-8 text-center font-mono text-body leading-relaxed text-espresso/80 md:text-left">
              Nothing on the calendar yet.{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-terracotta">
                Write to us
              </Link>{" "}
              and we will hold you a seat at the next one.
            </p>
          )}
        </div>

        {/* Hours panel */}
        <RevealOnScroll className="md:col-span-5 md:col-start-9" direction="right" delay={180}>
          <aside aria-labelledby="hours-heading" className="mx-auto max-w-sm border border-espresso md:max-w-none">
            <h2 id="hours-heading" className="border-b border-espresso px-5 py-4 text-center font-mono text-body-sm uppercase tracking-[0.18em] md:text-left">
              Hours
            </h2>
            <dl className="px-5 py-2">
              {hours.schedule.map((d) => (
                <div
                  key={d.day}
                  className="flex justify-between border-b border-espresso/20 py-2.5 font-mono text-body last:border-b-0"
                >
                  <dt>{d.day}</dt>
                  <dd className="tabular-nums">
                    {d.open && d.close ? (
                      `${d.open} – ${d.close}`
                    ) : (
                      <span className="text-espresso/60">Closed</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-espresso px-5 py-4 text-center font-mono text-body-sm leading-snug text-espresso/75 md:text-left">
              {hours.note}
            </p>
          </aside>
        </RevealOnScroll>
      </div>
    </section>
  );
}
