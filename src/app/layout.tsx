import type { Metadata } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import {
  cafeName,
  cafeAddress,
  cafeCity,
  cafeRegion,
  cafePostal,
  cafeCountry,
  cafePhone,
  cafeUrl,
  established,
  hours,
} from "@/data/botanica";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(cafeUrl),
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
  title: {
    default: "Cafe Botanica — Greenhouse Row",
    template: "%s — Cafe Botanica",
  },
  description:
    "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
  openGraph: {
    type: "website",
    url: cafeUrl,
    siteName: cafeName,
    title: "Cafe Botanica — Greenhouse Row",
    description:
      "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
  },
  twitter: {
    card: "summary",
    title: "Cafe Botanica — Greenhouse Row",
    description:
      "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
  },
};

function buildJsonLd() {
  const openingHours = hours.schedule
    .filter((d) => d.open && d.close)
    .map((d) => `${d.day} ${d.open}-${d.close}`);

  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: cafeName,
    foundingDate: String(established),
    url: cafeUrl,
    telephone: cafePhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: cafeAddress,
      addressLocality: cafeCity,
      addressRegion: cafeRegion,
      postalCode: cafePostal,
      addressCountry: cafeCountry,
    },
    openingHours,
    servesCuisine: ["Coffee", "Bakery", "Breakfast", "Lunch"],
    priceRange: "$$",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteNav />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
