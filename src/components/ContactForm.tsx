'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  useEffect(() => {
    if (!submitted) return
    closeBtnRef.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSubmitted(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [submitted])

  const inputClass =
    "w-full bg-transparent border-b border-espresso py-3 font-mono text-body text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta transition-colors duration-150"
  const labelClass =
    "block font-mono text-caption uppercase tracking-[0.18em] text-espresso/65 mb-1 mt-7 first:mt-0"

  return (
    <>
      <form onSubmit={handleSubmit} className="py-2">
        <label className={labelClass} htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Your name"
        />

        <label className={labelClass} htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="your@email.com"
        />

        <label className={labelClass} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="What are you writing about?"
        />

        <div className="mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-espresso text-linen font-mono text-body-sm uppercase tracking-[0.18em] py-4 hover:bg-terracotta transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/70"
          onClick={() => setSubmitted(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-confirm-heading"
            className="bg-linen border border-espresso/20 px-10 py-12 max-w-sm w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta mb-6">
              Message received
            </p>
            <p id="contact-confirm-heading" className="font-display text-[2rem] leading-tight text-espresso mb-4">
              Thank you.
            </p>
            <p className="font-mono text-body-sm leading-[1.8] text-espresso/70 mb-8">
              We will write back within two business days.
            </p>
            <button
              ref={closeBtnRef}
              onClick={() => setSubmitted(false)}
              className="font-mono text-eyebrow uppercase tracking-[0.18em] text-espresso/60 hover:text-espresso border-b border-espresso/30 pb-0.5 transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
