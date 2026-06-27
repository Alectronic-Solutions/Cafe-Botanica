import Link from "next/link";
import { menu } from "@/data/botanica";

const picks = menu.map((cat) => ({ category: cat.name, item: cat.items[0] }));

export default function HomeMenuPreview() {
  return (
    <section className="border-t border-espresso/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-12 py-16 md:grid-cols-12 md:gap-x-10 md:py-24">
          {/* Item list */}
          <div className="md:col-span-7">
            <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
              <span>From the menu</span>
              <Link
                href="/menu"
                className="text-terracotta hover:underline transition-colors duration-150"
              >
                Full menu
              </Link>
            </div>
            <ul>
              {picks.map(({ category, item }) => (
                <li key={item.name} className="border-b border-espresso/20 py-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta w-20 shrink-0">
                      {category}
                    </span>
                    <span className="font-mono text-[16px] font-bold flex-1 text-espresso">{item.name}</span>
                    <span className="font-mono text-[15px] tabular-nums text-espresso">
                      ${item.price}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[14px] leading-relaxed text-espresso/80">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial label */}
          <div className="flex items-center md:col-span-4 md:col-start-9">
            <p className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] italic text-espresso/60">
              What we make.<br />
              What we bake.<br />
              What we grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
