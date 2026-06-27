import type { Metadata } from "next";
import { cafeName } from "@/data/botanica";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Cafe Botanica.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span>Terms of Use</span>
        <span className="text-espresso/40">Last updated June 2026</span>
      </div>

      <div className="py-16 space-y-10 font-mono text-[13px] leading-[1.9] text-espresso/80">
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Use of this site</h2>
          <p>
            This website is operated by {cafeName}. By using it, you agree to
            these terms. The content is for informational purposes only. Menu
            items, prices, and hours are subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Intellectual property</h2>
          <p>
            All photographs, copy, and design on this site are owned by{" "}
            {cafeName} or licensed for our use. Do not reproduce them without
            written permission.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Limitation of liability</h2>
          <p>
            We make no warranties about the accuracy of information on this
            site. {cafeName} is not liable for any damages arising from its
            use.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Georgia,
            United States, without regard to conflict-of-law provisions.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-terracotta mb-4">Contact</h2>
          <p>
            Questions: hello@cafebotanica.com
          </p>
        </section>
      </div>
    </div>
  );
}
