import Image from "next/image";
import { menu } from "@/data/botanica";
import type { MenuCategory } from "@/types";
import RevealOnScroll from "./RevealOnScroll";

const CATEGORY_PHOTOS: Record<string, { src: string; alt: string; caption: string }> = {
  Morning:    { src: "/photos/gallery-espresso.jpg", alt: "Espresso pulled short at the bar",        caption: "06:45 — bar service" },
  Midday:     { src: "/photos/gallery-table.jpg",   alt: "Table two before the midday service",     caption: "Table two, before service" },
  Bakery:     { src: "/photos/gallery-buns.jpg",    alt: "Cardamom buns at 06:45",                  caption: "Baked overnight" },
  Botanicals: { src: "/photos/gallery-herbs.jpg",   alt: "Herbs before harvest",                    caption: "Greenhouse row" },
};

function DotLeader() {
  return (
    <span
      aria-hidden
      className="mx-3 flex-1 overflow-hidden font-mono text-xs text-espresso/40 leading-none self-end pb-0.5"
      style={{ letterSpacing: "0.05em" }}
    >
      {"·".repeat(120)}
    </span>
  );
}

function Row({ name, description, price, tag, isAvailable }: MenuCategory["items"][number]) {
  return (
    <li className={`menu-row py-4 border-b border-[rgba(44,42,41,0.12)] last:border-b-0 ${isAvailable ? "" : "opacity-40"}`}>
      <div className="flex items-baseline">
        <span className="font-display font-bold text-[20px] leading-none shrink-0 tracking-[-0.01em]">{name}</span>
        {tag && (
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta shrink-0">
            {tag}
          </span>
        )}
        {!isAvailable && (
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.16em] text-espresso/60 shrink-0">
            86&apos;d
          </span>
        )}
        <DotLeader />
        <span className="font-mono text-[14px] tabular-nums shrink-0 text-espresso">${price.toFixed(2)}</span>
      </div>
      <p className="mt-2 font-mono text-[13px] tracking-tight leading-relaxed text-espresso/75 max-w-full">
        {description}
      </p>
    </li>
  );
}

function PhotoMount({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mt-7 group photo-mount" style={{ transform: "rotate(-0.6deg)" }}>
      <div className="border border-[rgba(44,42,41,0.28)] p-1.25 bg-linen">
        <div className="border border-[rgba(44,42,41,0.12)] relative overflow-hidden aspect-3/2 md:aspect-4/5">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 80vw, 220px"
            className="object-cover film-frame"
          />
          <span aria-hidden className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[rgba(44,42,41,0.3)] pointer-events-none" />
          <span aria-hidden className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[rgba(44,42,41,0.3)] pointer-events-none" />
        </div>
      </div>
      <figcaption className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-espresso/65 pl-1.5">
        {caption}
      </figcaption>
    </figure>
  );
}

function Category({ name, note, items, index }: MenuCategory & { index: number }) {
  const photo = CATEGORY_PHOTOS[name];
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <section className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-12 pt-10 pb-12 border-t border-[rgba(44,42,41,0.18)]">
      {/* Left column — slides in from left */}
      <RevealOnScroll direction="left" className="md:col-span-3 flex flex-col">
        <span className="font-mono text-[11px] tracking-[0.22em] text-espresso/65 uppercase mb-2.5">
          {indexLabel}
        </span>
        <h3 className="font-display text-[clamp(2rem,8vw,52px)] font-bold leading-[0.95] tracking-[-0.02em]">
          {name}
        </h3>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-espresso/70 leading-[1.6]">
          {note}
        </p>
        {photo && (
          <PhotoMount src={photo.src} alt={photo.alt} caption={photo.caption} />
        )}
      </RevealOnScroll>

      {/* Right column — stagger items */}
      <RevealOnScroll stagger delay={80} className="md:col-span-9 pt-2 md:pt-13">
        <ul>
          {items.map((item) => (
            <Row key={item.name} {...item} />
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}

export default function MenuLedger() {
  return (
    <section id="menu" className="py-2">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Ledger header */}
        <RevealOnScroll direction="fade">
          <div className="flex items-baseline justify-between border-b border-[rgba(44,42,41,0.18)] pb-4 pt-10 md:pt-14 font-mono text-[12px] uppercase tracking-[0.22em] text-espresso/80">
            <span>The Ledger</span>
            <span>Prices in USD</span>
          </div>
        </RevealOnScroll>

        {menu.map((category, i) => (
          <Category key={category.name} {...category} index={i} />
        ))}

        <RevealOnScroll direction="fade" delay={100}>
          <div className="border-t border-[rgba(44,42,41,0.18)] pt-4 pb-14 font-mono text-[12px] uppercase tracking-[0.22em] text-espresso/65 text-right">
            All items seasonal. Menu changes without notice.
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
