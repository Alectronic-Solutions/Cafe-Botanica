import MenuLedger from "@/components/MenuLedger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description: "Espresso, drip, bakery, and seasonal plates at Cafe Botanica.",
};

export default function MenuPage() {
  return (
    <div className="pt-12 pb-24">
      <MenuLedger />
    </div>
  );
}
