import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  cafeAddress,
  cafeCity,
  cafeRegion,
  cafePostal,
  cafePhone,
  hours,
} from "@/data/botanica";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cafe Botanica. 118 Greenhouse Row, Old Fourth Ward, Atlanta.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Label bar */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
          <span>Contact</span>
          <span>Atlanta, GA</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-16 py-20 md:grid-cols-12 md:gap-x-10 md:py-28">

          {/* Left — form */}
          <RevealOnScroll className="md:col-span-7">
            <div>
              <h1 className="font-display text-[clamp(2rem,6vw,4rem)] font-light leading-[0.95] tracking-[-0.02em] mb-10">
                Write to us.
              </h1>
              <ContactForm />
            </div>
          </RevealOnScroll>

          {/* Right — info */}
          <RevealOnScroll className="md:col-span-4 md:col-start-9" delay={150}>
            <div className="space-y-10">
              {/* Address */}
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-3">
                  Find us
                </p>
                <address className="font-mono text-[14px] leading-[1.9] not-italic text-espresso/85">
                  {cafeAddress}<br />
                  {cafeCity}, {cafeRegion} {cafePostal}
                </address>
                <a
                  href={`tel:${cafePhone}`}
                  className="block mt-2 font-mono text-[14px] text-espresso/85 hover:text-terracotta transition-colors duration-150"
                >
                  (404) 555-0174
                </a>
                <a
                  href="https://maps.google.com/?q=118+Greenhouse+Row+Atlanta+GA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-espresso/60 hover:text-terracotta transition-colors duration-150"
                >
                  Open in Maps
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-3">
                  Hours
                </p>
                <dl className="font-mono text-[14px] leading-[1.9]">
                  {hours.schedule.map((d) => (
                    <div key={d.day} className="flex justify-between gap-4 border-b border-espresso/15 py-2 last:border-b-0">
                      <dt className="text-espresso/70">{d.day}</dt>
                      <dd className="tabular-nums text-espresso/90">
                        {d.open && d.close
                          ? `${d.open} – ${d.close}`
                          : <span className="text-espresso/45">Closed</span>
                        }
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 font-mono text-[12px] text-espresso/60 leading-snug">
                  {hours.note}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-terracotta mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@cafebotanica.com"
                  className="font-mono text-[14px] text-espresso/85 hover:text-terracotta transition-colors duration-150"
                >
                  hello@cafebotanica.com
                </a>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </div>
  );
}
