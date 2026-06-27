'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gatherings', href: '/gatherings' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="hidden md:flex items-center gap-8">
      {links.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname === href
        return (
          <li key={href}>
            <Link
              href={href}
              className="nav-link font-mono text-[11px] uppercase tracking-[0.16em] text-espresso"
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
