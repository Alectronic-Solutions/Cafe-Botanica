import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32">
      <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
        <span>404</span>
        <span>Page not found</span>
      </div>

      <div className="grid grid-cols-1 py-24 md:grid-cols-12">
        <h1 className="col-span-1 font-display text-[clamp(4rem,12vw,9rem)] font-light leading-[0.9] tracking-[-0.02em] md:col-span-7">
          Not here.
        </h1>
        <div className="col-span-1 flex items-end md:col-span-5">
          <p className="font-mono text-[13px] leading-[1.8]" style={{ maxWidth: "280px" }}>
            This page does not exist. The coffee, however, does.
          </p>
        </div>
      </div>

      <div className="border-t border-espresso/20 pt-6">
        <Link
          href="/"
          className="nav-link font-mono text-[12px] uppercase tracking-[0.16em] text-espresso"
        >
          Back to the counter
        </Link>
      </div>
    </div>
  );
}
