"use client";

import { useEffect, useRef, useState } from "react";
import { cafeAddress, established, hours } from "@/data/botanica";

function todayLabel(): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const heroVideos = [
  `${basePath}/hero-1.mp4`,
  `${basePath}/hero-2.mp4`,
  `${basePath}/hero-3.mp4`,
];

export default function Hero() {
  const today = todayLabel();
  const open = hours.schedule.find((d) => d.day === today);
  const status =
    open && open.open && open.close
      ? `Open today ${open.open}–${open.close}`
      : "Closed today";

  const imgRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) return;

    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, reducedMotion]);

  return (
    <header className="relative h-[calc(100dvh-4.5rem)] overflow-hidden border-b border-espresso/20">
      {/* Parallax photo layer */}
      <div
        ref={imgRef}
        className="absolute inset-0 h-[130%] w-full will-change-transform"
        style={{ top: "-15%" }}
      >
        {reducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${basePath}/hero.jpg`}
            alt="The counter at Cafe Botanica, early morning"
            className="h-full w-full object-cover"
            style={{ filter: "sepia(0.6) contrast(1.05) saturate(0.8) brightness(0.72)" }}
          />
        ) : (
          heroVideos.map((src, i) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={src}
              muted
              playsInline
              autoPlay={i === 0}
              onEnded={() => setActiveIndex((current) => (current + 1) % heroVideos.length)}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1500 ease-in-out"
              style={{
                filter: "sepia(0.6) contrast(1.05) saturate(0.8) brightness(0.72)",
                opacity: i === activeIndex ? 1 : 0,
              }}
            />
          ))
        )}
      </div>

      {/* Warm tan overlay */}
      <div className="absolute inset-0 bg-linen/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6">
        {/* Top rule — border draws in via hero-rule */}
        <div className="hero-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-espresso/30 py-3 font-mono text-eyebrow uppercase tracking-[0.18em] text-espresso">
          <span>Cafe Botanica</span>
          <span>Est. {established}</span>
          <span className="hidden md:inline">{cafeAddress}</span>
          <span className="text-terracotta">{status}</span>
        </div>

        {/* Asymmetric headline */}
        <div className="grid flex-1 grid-cols-1 items-center gap-y-8 md:grid-cols-12 md:gap-y-0">
          <h1
            className="hero-animate col-span-1 font-display text-h1 font-medium leading-[0.98] tracking-[-0.015em] text-espresso md:col-span-8"
            /* Legibility scrim behind display type over photo/video — not a decorative shadow */
            style={{ textShadow: "0 0 24px rgba(247,244,238,0.85), 0 0 10px rgba(247,244,238,0.95)" }}
          >
            Coffee, bread,
            <br />
            and a few
            <br />
            <span className="italic text-terracotta">green things.</span>
          </h1>

          {/* Newspaper column */}
          <div className="col-span-1 flex flex-col justify-end md:col-span-4">
            <p
              className="hero-tagline font-mono text-body-lg leading-[1.85] text-espresso w-full"
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
