import { gatherings, hours } from "@/data/botanica";
import RevealOnScroll from "./RevealOnScroll";

function formatDate(iso: string): { day: string; rest: string } {
  const d = new Date(`${iso}T00:00:00`);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const weekday = d
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  return { day, rest: `${month} · ${weekday}` };
}

export default function Gatherings() {
  return (
    <section id="gatherings" className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-y-10 py-14 md:grid-cols-12 md:gap-x-10 md:py-28">
        {/* Gatherings list */}
        <div className="md:col-span-7">
          <RevealOnScroll direction="fade">
            <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[13px] uppercase tracking-[0.18em]">
              <span>Gatherings</span>
              <span>By reservation</span>
            </div>
          </RevealOnScroll>

          <ul>
            {gatherings.map((g, i) => {
              const { day, rest } = formatDate(g.date);
              return (
                <RevealOnScroll key={g.title} direction="up" delay={i * 100} threshold={0.1}>
                  <li className="flex gap-5 border-b border-espresso/20 py-6">
                    <div className="w-16 shrink-0 text-center">
                      <div className="font-display text-4xl font-light leading-none">
                        {day}
                      </div>
                      <div className="mt-1 font-mono text-[11px] tracking-[0.12em] text-espresso/75">
                        {rest}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h3 className="font-mono text-[16px]">{g.title}</h3>
                        <span className="font-mono text-[12px] text-espresso/70 tabular-nums shrink-0">
                          {g.time} · {g.seats} seats
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-[14px] leading-relaxed text-espresso/75">
                        {g.detail}
                      </p>
                    </div>
                  </li>
                </RevealOnScroll>
              );
            })}
          </ul>
        </div>

        {/* Hours panel — slides in from right */}
        <RevealOnScroll className="md:col-span-5 md:col-start-9" direction="right" delay={180}>
          <aside>
            <div className="border border-espresso">
              <div className="border-b border-espresso px-5 py-4 font-mono text-[13px] uppercase tracking-[0.18em]">
                Hours
              </div>
              <dl className="px-5 py-2">
                {hours.schedule.map((d) => (
                  <div
                    key={d.day}
                    className="flex justify-between border-b border-espresso/20 py-2.5 font-mono text-[14px] last:border-b-0"
                  >
                    <dt>{d.day}</dt>
                    <dd className="tabular-nums">
                      {d.open && d.close ? (
                        `${d.open} – ${d.close}`
                      ) : (
                        <span className="text-terracotta">Closed</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-espresso px-5 py-4 font-mono text-[13px] leading-snug text-espresso/75">
                {hours.note}
              </p>
            </div>
          </aside>
        </RevealOnScroll>
      </div>
    </section>
  );
}
