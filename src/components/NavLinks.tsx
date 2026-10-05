'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/botanica'

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className="nav-link font-mono text-eyebrow uppercase tracking-[0.16em] text-espresso"
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
