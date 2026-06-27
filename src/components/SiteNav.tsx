import Link from 'next/link'
import Image from 'next/image'
import NavLinks from './NavLinks'
import NavMobileToggle from './NavMobileToggle'

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-linen border-b border-espresso">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-3 relative">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.svg`}
              alt="Cafe Botanica mark"
              width={32}
              height={32}
              className="shrink-0"
            />
            <span className="font-display font-light text-[18px] tracking-[-0.01em] text-espresso leading-none">
              Cafe Botanica
            </span>
          </Link>
          <NavLinks />
          <NavMobileToggle />
        </div>
      </div>
    </nav>
  )
}
