import RevealOnScroll from "./RevealOnScroll";

const notices = [
  { label: "Bakery", text: "Cardamom buns land at 07:30. First come." },
  { label: "Midday", text: "The lentil bowl runs as the default plate through July." },
  { label: "Hours",  text: "Closed the last Sunday of every month for staff." },
];

export default function Gazette() {
  return (
    <section
      id="gazette"
      className="bg-espresso text-linen"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header bar */}
        <RevealOnScroll direction="fade">
          <div className="flex items-baseline justify-between border-b border-linen/20 py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
            <span>Gazette</span>
            <span className="text-linen/60">July 2026</span>
          </div>
        </RevealOnScroll>

        {/* Notice grid — staggered */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 py-10 md:py-20">
          {notices.map((n, i) => (
            <RevealOnScroll key={n.label} direction="up" delay={i * 110}>
              <div className="border-t border-linen/25 pt-7 pb-8 md:border-l md:border-t-0 md:px-10 first:md:pl-0 last:md:pr-0">
                <span className="block font-mono text-[12px] uppercase tracking-[0.2em] text-terracotta mb-4">
                  {n.label}
                </span>
                <p className="font-mono text-[16px] leading-[1.75] text-linen/90">
                  {n.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
