'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cafeAddress, cafePhone, navLinks } from '@/data/botanica'
import { useOpenStatus } from '@/lib/openStatus'

export default function NavMobileToggle() {
  const pathname = usePathname()
  // The sheet remembers which page it was opened on. Any navigation changes
  // the pathname, which closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const status = useOpenStatus()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        buttonRef.current?.focus()
      }
    }
    // Rotating to a desktop-width layout hides the toggle; drop the sheet too.
    const mq = window.matchMedia('(width >= 48rem)')
    const onWide = () => mq.matches && setOpenOn(null)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => {
      root.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="text-espresso w-11 h-11 flex items-center justify-center -mr-2.5"
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
              <line x1="8" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="menu-sheet fixed inset-x-0 top-(--nav-h) bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-linen"
        >
          <ul className="flex flex-1 flex-col justify-center px-6 py-8">
            {navLinks.map(({ label, href }, i) => {
              const current = pathname === href
              return (
                <li
                  key={href}
                  className="menu-sheet-item border-b border-espresso/20 first:border-t"
                  style={{ animationDelay: `${60 + i * 45}ms` }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpenOn(null)}
                    aria-current={current ? 'page' : undefined}
                    className="flex items-baseline justify-center gap-4 py-3.5 text-espresso"
                  >
                    <span className="w-6 text-right font-mono text-eyebrow tabular-nums text-espresso/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-[clamp(2rem,9vw,2.75rem)] leading-none tracking-[-0.015em] ${
                        current ? 'italic text-terracotta' : 'font-light'
                      }`}
                    >
                      {label}
                    </span>
                    {/* Mirror of the index so the word sits on the true centre line. */}
                    <span aria-hidden className="w-6" />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className="menu-sheet-item border-t border-espresso px-6 py-5 text-center font-mono text-eyebrow uppercase tracking-[0.16em] text-espresso/75"
            style={{ animationDelay: '360ms' }}
          >
            <p className="text-balance">{cafeAddress}</p>
            <p className="mt-2">
              <a href={`tel:${cafePhone}`} className="underline-offset-4 hover:underline">
                (404) 555-0174
              </a>
              {status && <span> · {status.label}</span>}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
