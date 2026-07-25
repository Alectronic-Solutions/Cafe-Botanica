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
  siteOrigin,
  siteUrl,
  established,
  hours,
} from "@/data/botanica";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ogImage = `${basePath}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  alternates: { canonical: siteUrl },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  title: {
    default: "Cafe Botanica: Greenhouse Row",
    template: "%s: Cafe Botanica",
  },
  description:
    "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: cafeName,
    title: "Cafe Botanica: Greenhouse Row",
    description:
      "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: cafeName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe Botanica: Greenhouse Row",
    description:
      "An espresso bar and bakery on Greenhouse Row, Atlanta. Pouring since 1974.",
    images: [ogImage],
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
    url: siteUrl,
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
      suppressHydrationWarning
    >
      <head>
        {/* Mark the document as JS-enabled before paint so the scroll-reveal
            styles only hide content when they can actually reveal it again.
            Without JS (or before hydration) content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-1000 focus:bg-espresso focus:px-4 focus:py-2 focus:font-mono focus:text-eyebrow focus:uppercase focus:tracking-[0.16em] focus:text-linen"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
