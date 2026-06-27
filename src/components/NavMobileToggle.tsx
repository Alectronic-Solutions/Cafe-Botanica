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
        className="font-mono text-[18px] text-espresso leading-none w-8 h-8 flex items-center justify-center"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? '×' : '≡'}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 bg-linen border-b border-espresso">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block font-mono text-[14px] uppercase tracking-[0.14em] px-6 py-5 border-b border-espresso/20 text-espresso hover:text-terracotta"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
