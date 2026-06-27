"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        className="flex-1 border border-linen/25 bg-linen/5 px-4 py-3 font-mono text-[14px] text-linen placeholder:text-linen/45 focus:border-linen/60 focus:outline-none transition-colors duration-150"
      />
      <button
        type="submit"
        className="border border-linen/25 bg-transparent px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-linen/80 hover:bg-linen/10 hover:text-linen transition-all duration-150 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
