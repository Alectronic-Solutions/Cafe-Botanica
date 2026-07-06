"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="font-mono text-body text-linen/90 border border-linen/25 px-4 py-3">
        On the list. Watch for Sunday&apos;s post.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={submitting}
        className="flex-1 border border-linen/25 bg-linen/5 px-4 py-3 font-mono text-body text-linen placeholder:text-linen/45 focus:border-linen/60 focus:outline-none transition-colors duration-150 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={submitting}
        className="border border-linen/25 bg-transparent px-6 py-3 font-mono text-eyebrow uppercase tracking-[0.16em] text-linen/80 hover:bg-linen/10 hover:text-linen transition-all duration-150 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Subscribe"}
      </button>
    </form>
  );
}
