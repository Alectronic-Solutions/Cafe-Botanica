import MenuLedger from "@/components/MenuLedger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/menu` },
  title: "Menu",
  description: "Espresso, drip, bakery, and seasonal plates at Cafe Botanica.",
};

export default function MenuPage() {
  return (
    <div className="pt-12 pb-24">
      <h1 className="sr-only">Menu</h1>
      <MenuLedger />
    </div>
  );
}
