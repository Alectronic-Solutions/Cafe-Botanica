import Link from "next/link";
import { menu } from "@/data/botanica";

const picks = menu.map((cat) => ({ category: cat.name, item: cat.items[0] }));

export default function HomeMenuPreview() {
  return (
    <section className="border-t border-espresso/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-12 py-16 md:grid-cols-12 md:gap-x-10 md:py-24">
          {/* Editorial label - leads on phones, sits beside the list on desktop */}
          <div className="flex items-center justify-center text-center md:order-last md:col-span-4 md:col-start-9 md:justify-start md:text-left">
            <p className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] italic text-espresso/60">
              What we make.<br />
              What we bake.<br />
              What we grow.
            </p>
          </div>

          {/* Item list - a receipt keeps its columns, even on a phone */}
          <div className="md:col-span-7">
            <div className="label-bar border-b border-espresso py-4 font-mono text-caption uppercase tracking-[0.18em]">
              <h2 className="font-mono text-caption uppercase tracking-[0.18em]">From the menu</h2>
              <Link
                href="/menu"
                className="text-terracotta hover:underline underline-offset-4"
              >
                Full menu
              </Link>
            </div>
            <ul>
              {picks.map(({ category, item }) => (
                <li key={item.name} className="border-b border-espresso/20 py-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="font-mono text-eyebrow uppercase tracking-[0.14em] text-espresso/60 sm:basis-28 sm:shrink-0">
                      {category}
                    </span>
                    <div className="flex flex-1 items-baseline justify-between gap-3">
                      <span className="font-mono text-body font-bold text-espresso">{item.name}</span>
                      <span className="font-mono text-body-lg tabular-nums text-espresso">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 font-mono text-body-sm leading-relaxed text-espresso/80 sm:pl-31">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
