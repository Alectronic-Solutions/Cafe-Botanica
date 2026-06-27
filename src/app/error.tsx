'use client'

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32">
      <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
        <span>Error</span>
        <span>Something went wrong</span>
      </div>

      <div className="grid grid-cols-1 py-24 md:grid-cols-12">
        <h1 className="col-span-1 font-display text-[clamp(4rem,12vw,9rem)] font-light leading-[0.9] tracking-[-0.02em] md:col-span-7">
          Something broke.
        </h1>
        <div className="col-span-1 flex items-end md:col-span-5">
          <p className="font-mono text-[13px] leading-[1.8]" style={{ maxWidth: "280px" }}>
            An error occurred on this page. Try reloading, or head back to the counter.
          </p>
        </div>
      </div>

      <div className="border-t border-espresso/20 pt-6 flex gap-8">
        <button
          onClick={reset}
          className="nav-link font-mono text-[12px] uppercase tracking-[0.16em] text-espresso"
        >
          Try again
        </button>
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
