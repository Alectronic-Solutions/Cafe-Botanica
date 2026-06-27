"use client";

import { useEffect, useRef } from "react";
import { cafeAddress, established, hours } from "@/data/botanica";

function todayLabel(): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

export default function Hero() {
  const today = todayLabel();
  const open = hours.schedule.find((d) => d.day === today);
  const status =
    open && open.open && open.close
      ? `Open today ${open.open}–${open.close}`
      : "Closed today";

  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative min-h-[70vh] overflow-hidden border-b border-espresso/20">
      {/* Parallax photo layer */}
      <div
        ref={imgRef}
        className="absolute inset-0 h-[130%] w-full will-change-transform"
        style={{ top: "-15%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero.jpg`}
          alt="The counter at Cafe Botanica, early morning"
          className="h-full w-full object-cover"
          style={{ filter: "sepia(0.6) contrast(1.05) saturate(0.8) brightness(0.72)" }}
        />
      </div>

      {/* Warm tan overlay */}
      <div className="absolute inset-0 bg-linen/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Top rule — border draws in via hero-rule */}
        <div className="hero-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-espresso/30 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-espresso">
          <span>Cafe Botanica</span>
          <span>Est. {established}</span>
          <span className="hidden md:inline">{cafeAddress}</span>
          <span className="text-terracotta">{status}</span>
        </div>

        {/* Asymmetric headline */}
        <div className="grid grid-cols-1 gap-y-8 py-14 md:grid-cols-12 md:gap-y-0 md:py-32">
          <h1 className="hero-animate col-span-1 font-display text-[clamp(3.2rem,11vw,8.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-espresso md:col-span-8" style={{ textShadow: "0 0 40px rgba(247,244,238,1), 0 0 12px rgba(247,244,238,1)" }}>
            Coffee, bread,
            <br />
            and a few
            <br />
            <span className="italic text-terracotta">green things.</span>
          </h1>

          {/* Newspaper column */}
          <div className="col-span-1 flex flex-col justify-end md:col-span-4">
            <p
              className="hero-tagline font-mono text-[15px] leading-[1.85] text-espresso w-full"
              style={{
                background: "rgba(247,244,238,0.90)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "18px 20px",
                borderLeft: "2px solid rgba(44,42,41,0.25)",
              }}
            >
              An espresso bar and bakery on Greenhouse Row. We pull short shots,
              bake overnight, and steep what grows in the back.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
