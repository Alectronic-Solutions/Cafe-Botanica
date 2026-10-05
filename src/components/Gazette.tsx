import RevealOnScroll from "./RevealOnScroll";

const notices = [
  { label: "Bakery", text: "Cardamom buns land at 07:30. First come." },
  { label: "Midday", text: "The lentil bowl stays the default plate through November." },
  { label: "Hours",  text: "Closed the last Sunday of every month for staff." },
];

export default function Gazette() {
  const monthYear = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <section
      id="gazette"
      className="bg-espresso text-linen"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header bar */}
        <RevealOnScroll direction="fade">
          <div className="label-bar border-b border-linen/20 py-4 font-mono text-caption uppercase tracking-[0.18em]">
            <h2 className="font-mono text-caption uppercase tracking-[0.18em]">Gazette</h2>
            <span className="text-linen/70">{monthYear}</span>
          </div>
        </RevealOnScroll>

        {/* Notice grid - staggered, asymmetric widths */}
        <div className="grid grid-cols-1 gap-0 py-10 md:grid-cols-[1.3fr_1fr_1fr] md:py-20 [&>*:first-child>div]:border-t-0 md:[&>*:first-child>div]:border-l-0 md:[&>*:first-child>div]:pl-0 md:[&>*:last-child>div]:pr-0">
          {notices.map((n, i) => (
            <RevealOnScroll key={n.label} direction="up" delay={i * 110}>
              <div className="border-t border-linen/25 pt-7 pb-8 text-center md:h-full md:border-l md:border-t-0 md:px-10 md:text-left">
                <h3 className="block font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light mb-4">
                  {n.label}
                </h3>
                <p className="font-mono text-body leading-[1.75] text-linen/90">
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
