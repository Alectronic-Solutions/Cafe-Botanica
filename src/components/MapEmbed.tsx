"use client";

import { useState } from "react";

interface MapEmbedProps {
  src: string;
  title: string;
  /** Address label shown on the facade before the map is loaded. */
  label: string;
}

/**
 * Click-to-load Google Maps facade. The live iframe pulls scripts, cookies, and
 * images from Google on every page it renders; deferring it until the visitor
 * asks removes that third-party cost (and tracking) from the default page load.
 * The "Open in Maps" text link in the footer remains as a no-JS alternative.
 */
export default function MapEmbed({ src, title, label }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(100%) contrast(1.1) sepia(20%)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex h-full w-full flex-col items-center justify-center gap-2 bg-linen/5 px-4 text-center transition-colors duration-150 hover:bg-linen/10"
    >
      <span className="font-mono text-eyebrow uppercase tracking-[0.18em] text-linen/80 group-hover:text-linen">
        Show map
      </span>
      <span className="font-mono text-caption text-balance text-linen/70">{label}</span>
    </button>
  );
}
