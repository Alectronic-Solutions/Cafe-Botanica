import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import MapEmbed from './MapEmbed'
import {
  cafeName,
  cafeAddress,
  cafeCity,
  cafeRegion,
  cafePostal,
  cafePhone,
  established,
  hours,
} from '@/data/botanica'

export default function SiteFooter() {
  return (
    <footer className="bg-espresso text-linen mt-auto text-center md:text-left">
      <div className="mx-auto max-w-6xl px-6">

        {/* Wordmark band */}
        <div className="border-b border-linen/15 py-12 md:py-16">
          <p className="font-display text-display font-light leading-none tracking-[-0.02em] text-linen/90">
            {cafeName}
          </p>
          <p className="mt-3 font-mono text-eyebrow uppercase tracking-[0.18em] text-balance text-linen/70">
            {cafeAddress} · Est. {established}
          </p>
        </div>

        {/* Map + newsletter row */}
        <div className="grid grid-cols-1 gap-12 border-b border-linen/15 py-10 md:grid-cols-2 md:gap-10 md:py-14">
          {/* Embedded map */}
          <div>
            <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light">
              Find us
            </p>
            <div className="aspect-video overflow-hidden border border-linen/15 md:aspect-16/7">
              <MapEmbed
                title="Cafe Botanica map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.0!2d-84.3879!3d33.7623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s118+Greenhouse+Row+Atlanta+GA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                label={`${cafeAddress}, ${cafeCity}`}
              />
            </div>
            <a
              href="https://maps.google.com/?q=118+Greenhouse+Row+Atlanta+GA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-eyebrow uppercase tracking-[0.16em] text-linen/70 hover:text-terracotta-light transition-colors duration-150"
            >
              Open in Maps
            </a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-between">
            <div className="mx-auto w-full max-w-md md:mx-0 md:max-w-none">
              <p className="mb-4 font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light">
                The weekly post
              </p>
              <p className="mx-auto mb-6 max-w-[340px] font-mono text-body leading-[1.85] text-linen/75 md:mx-0">
                New gatherings, seasonal menu changes, and the occasional note
                from the counter. One email a week, never more.
              </p>
              <NewsletterForm />
              <p className="mt-3 font-mono text-eyebrow text-linen/70">
                No spam. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>

        {/* Info grid - 12 col asymmetric */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:gap-0 md:py-14">

          {/* Contact - 4 cols */}
          <div className="md:col-span-4">
            <p className="mb-5 font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light">
              Contact
            </p>
            <address className="font-mono text-body leading-loose not-italic text-balance text-linen/75">
              {cafeAddress}<br />
              {cafeCity}, {cafeRegion} {cafePostal}
            </address>
            <a
              href={`tel:${cafePhone}`}
              className="mt-2 block font-mono text-body text-linen/75 hover:text-terracotta-light transition-colors duration-150"
            >
              (404) 555-0174
            </a>
            <a
              href="mailto:hello@cafebotanica.com"
              className="mt-1 block font-mono text-body text-linen/75 hover:text-terracotta-light transition-colors duration-150"
            >
              hello@cafebotanica.com
            </a>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
              {[
                { label: 'Instagram' },
                { label: 'Twitter' },
              ].map(({ label }) => (
                <span
                  key={label}
                  className="font-mono text-eyebrow uppercase tracking-[0.16em] text-linen/60 cursor-default select-none"
                  title={`${label} · coming soon`}
                >
                  {label} <span className="text-linen/45">(soon)</span>
                </span>
              ))}
            </div>
          </div>

          {/* Hours - 4 cols */}
          <div className="md:col-span-4">
            <p className="mb-5 font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light">
              Hours
            </p>
            <dl className="mx-auto max-w-xs text-left font-mono text-body md:mx-0 md:max-w-none">
              {hours.schedule.map((d) => (
                <div key={d.day} className="flex justify-between border-b border-linen/15 py-2.5 last:border-b-0">
                  <dt className="text-linen/65">{d.day}</dt>
                  <dd className="tabular-nums text-linen/85">
                    {d.open && d.close
                      ? `${d.open} – ${d.close}`
                      : <span className="text-linen/70">Closed</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-mono text-caption text-linen/70 leading-snug">
              {hours.note}
            </p>
          </div>

          {/* Explore - 3 cols, offset */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="mb-5 font-mono text-eyebrow uppercase tracking-[0.2em] text-terracotta-light">
              Explore
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-body md:block md:space-y-3">
              {[
                { label: 'Menu',       href: '/menu' },
                { label: 'About',      href: '/about' },
                { label: 'Gatherings', href: '/gatherings' },
                { label: 'Gallery',    href: '/gallery' },
                { label: 'Contact',    href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-linen/75 hover:text-linen transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar - legal */}
        <div className="flex flex-col items-center gap-4 border-t border-linen/10 py-6 md:flex-row md:justify-between">
          {/* Phones: copyright, then legal links, then back to top - stacked and centred */}
          <div className="contents">
            <span className="font-mono text-eyebrow text-linen/70">
              &copy; {new Date().getFullYear()} {cafeName}. All rights reserved.
            </span>
            <a
              href="#main-content"
              className="order-last font-mono text-eyebrow uppercase tracking-[0.16em] text-linen/70 hover:text-linen transition-colors duration-150 md:border-l md:border-linen/20 md:pl-6 md:normal-case md:tracking-normal"
            >
              Back to top
            </a>
          </div>
          {/* Row 2 on mobile: legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Privacy Policy',    href: '/privacy' },
              { label: 'Terms of Use',      href: '/terms' },
              { label: 'Accessibility',     href: '/accessibility' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-eyebrow text-linen/70 hover:text-linen/80 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
