import MenuLedger from "@/components/MenuLedger";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/menu` },
  title: "Menu",
  description: "Espresso, drip, bakery, and seasonal plates at Cafe Botanica.",
};

export default function MenuPage() {
  return (
    <div className="pb-24">
      <RevealOnScroll direction="fade">
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-6 text-center md:px-10 md:pt-24 md:text-left">
          <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-light leading-[0.92] tracking-tight">
            Poured, baked,
            <br />
            <span className="italic">steeped.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-sm font-mono text-body-sm leading-[1.8] text-espresso/75 md:mx-0">
            Four sections, from the first shot of the morning to the last
            cordial of the afternoon.
          </p>
        </div>
      </RevealOnScroll>
      <MenuLedger />
    </div>
  );
}
