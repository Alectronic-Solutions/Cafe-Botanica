'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gatherings', href: '/gatherings' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function NavMobileToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-espresso w-8 h-8 flex items-center justify-center -mr-1"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {/* 1px structural rules, per the receipt aesthetic. SVG (not a glyph)
            so it renders regardless of monospace font coverage. */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          {open ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="2" y1="6" x2="20" y2="6" />
              <line x1="2" y1="11" x2="20" y2="11" />
              <line x1="2" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" className="absolute left-0 right-0 top-full z-40 bg-linen border-b border-espresso">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block font-mono text-body uppercase tracking-[0.14em] px-6 py-5 border-b border-espresso/20 text-espresso hover:text-terracotta"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
