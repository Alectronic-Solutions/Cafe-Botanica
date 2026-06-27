import type { Metadata } from "next";
import { cafeName, cafeAddress, cafeCity, cafeRegion, cafePostal } from "@/data/botanica";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Cafe Botanica.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span>Privacy Policy</span>
        <span className="text-espresso/40">Last updated June 2026</span>
      </div>

      <div className="py-16 space-y-10 font-mono text-[13px] leading-[1.9] text-espresso/80">
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Who we are</h2>
          <p>
            {cafeName} operates the website cafebotanica.com. Our address is{" "}
            {cafeAddress}, {cafeCity}, {cafeRegion} {cafePostal}.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">What we collect</h2>
          <p>
            When you subscribe to our newsletter or submit a contact form, we
            collect your email address and any message you write. We do not
            collect browsing data, run advertising trackers, or sell your
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">How we use it</h2>
          <p>
            Your email is used only to send the newsletter you requested and to
            respond to contact form messages. We do not share it with anyone.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Cookies</h2>
          <p>
            This site uses no tracking cookies. A session cookie may be set for
            technical reasons only, and it expires when you close your browser.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Your rights</h2>
          <p>
            You may request deletion of your data at any time by emailing
            hello@cafebotanica.com. We will comply within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Contact</h2>
          <p>
            Questions about this policy: hello@cafebotanica.com
          </p>
        </section>
      </div>
    </div>
  );
}
