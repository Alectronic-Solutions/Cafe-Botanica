import type { Metadata } from "next";
import { cafeName } from "@/data/botanica";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for Cafe Botanica.",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span>Accessibility</span>
        <span className="text-espresso/40">Last updated June 2026</span>
      </div>

      <div className="py-16 space-y-10 font-mono text-[13px] leading-[1.9] text-espresso/80">
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Our commitment</h2>
          <p>
            {cafeName} is committed to making this website accessible to all
            visitors. We aim to conform to the Web Content Accessibility
            Guidelines (WCAG) 2.1 at Level AA.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">What we do</h2>
          <p>
            This site uses semantic HTML, sufficient color contrast, keyboard
            navigation, and descriptive alt text on all images. It respects the
            prefers-reduced-motion system preference.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Known issues</h2>
          <p>
            Some embedded third-party content (such as the Google Maps iframe)
            may not meet full accessibility standards. We are working to provide
            text alternatives wherever possible.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Feedback</h2>
          <p>
            If you encounter a barrier on this site, please email
            hello@cafebotanica.com. We will respond within five business days.
          </p>
        </section>
      </div>
    </div>
  );
}
