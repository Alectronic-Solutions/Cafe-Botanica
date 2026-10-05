"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cafeAddress, established } from "@/data/botanica";
import { useOpenStatus } from "@/lib/openStatus";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Phones and portrait tablets see only the centre column of a 16:9 clip, so
// they get 3:5 crops of that column (`hero-N-portrait.mp4`): the same visible
// pixels at roughly a fifth of the bytes. Must match the <source media> below.
const PORTRAIT_QUERY = "(max-aspect-ratio: 3/4)";
const CLIP_COUNT = 3;
const clipSrc = (i: number, portrait: boolean) =>
  `${basePath}/hero-${i + 1}${portrait ? "-portrait" : ""}.mp4`;

// Seconds before a clip ends to start dipping back to the still.
const DIP_LEAD = 0.7;

const heroFilter = "sepia(0.6) contrast(1.05) saturate(0.8) brightness(0.72)";

type Connection = { saveData?: boolean; effectiveType?: string };

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null = still image only (SSR, reduced motion, Save-Data, or 2G).
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const failures = useRef(0);

  // Decide once on the client whether motion is welcome, then track rotation.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    const constrained =
      conn?.saveData === true || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    if (reduced || constrained) return;

    const mq = window.matchMedia(PORTRAIT_QUERY);
    const sync = () => setPortrait(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Drive playback for the current clip.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || portrait === null) return;

    // iOS only autoplays inline video that is muted *as an attribute*. React
    // sets the muted property but never writes the attribute, so do both.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    let inView = true;
    let blocked = false;

    const tryPlay = () => {
      if (!inView || document.hidden) return;
      v.play().then(
        () => { blocked = false; },
        // Low Power Mode / Data Saver refuse autoplay. The still stays up and
        // the first tap anywhere on the page starts the film.
        () => { blocked = true; }
      );
    };
    const onGesture = () => { if (blocked) tryPlay(); };
    const onVisibility = () => (document.hidden ? v.pause() : tryPlay());

    // Stop decoding when the hero is scrolled away: saves battery on phones.
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) tryPlay();
      else v.pause();
    });
    io.observe(v);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("touchend", onGesture, { passive: true });
    window.addEventListener("click", onGesture);
    tryPlay();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchend", onGesture);
      window.removeEventListener("click", onGesture);
    };
  }, [portrait, index]);

  if (portrait === null) return null;

  const next = () => {
    setVisible(false);
    setIndex((i) => (i + 1) % CLIP_COUNT);
  };

  return (
    <video
      ref={videoRef}
      key={portrait ? "portrait" : "landscape"}
      src={clipSrc(index, portrait)}
      muted
      playsInline
      autoPlay
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
      tabIndex={-1}
      data-visible={visible}
      onPlaying={() => {
        failures.current = 0;
        setVisible(true);
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.duration && v.duration - v.currentTime < DIP_LEAD) setVisible(false);
      }}
      onEnded={next}
      onError={() => {
        // Skip a broken clip; after a full lap of failures, stay on the still.
        failures.current += 1;
        if (failures.current < CLIP_COUNT) next();
        else setPortrait(null);
      }}
      className="hero-video absolute inset-0 h-full w-full object-cover"
    />
  );
}

export default function Hero() {
  const status = useOpenStatus();
  const layerRef = useRef<HTMLDivElement>(null);

  // Parallax: the media layer drifts at a third of scroll speed.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Past the hero there is nothing to move.
        if (layerRef.current && y < window.innerHeight * 1.2) {
          layerRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden border-b border-espresso/20">
      {/* Media layer: still photograph underneath (LCP, no-JS, reduced motion),
          film on top once it is actually painting frames. */}
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-[15%] -z-10 h-[130%] will-change-transform"
        style={{ filter: heroFilter }}
      >
        <picture>
          <source media={PORTRAIT_QUERY} type="image/avif" srcSet={`${basePath}/hero-portrait.avif`} />
          <source media={PORTRAIT_QUERY} type="image/webp" srcSet={`${basePath}/hero-portrait.webp`} />
          <source media={PORTRAIT_QUERY} srcSet={`${basePath}/hero-portrait.jpg`} />
          <source type="image/avif" srcSet={`${basePath}/hero.avif`} />
          <source type="image/webp" srcSet={`${basePath}/hero.webp`} />
          <img
            src={`${basePath}/hero.jpg`}
            alt="The counter at Cafe Botanica, early morning"
            width={1800}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <HeroVideo />
      </div>

      {/* Warm linen wash */}
      <div className="absolute inset-0 -z-10 bg-linen/70" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
        {/* Top rule: draws in on load */}
        <div className="hero-rule flex flex-col items-center gap-1.5 border-b border-espresso/30 py-3 text-center font-mono text-eyebrow uppercase tracking-[0.18em] text-espresso sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6 sm:text-left">
          <span>
            Cafe Botanica<span className="sm:hidden"> · Est. {established}</span>
          </span>
          <span className="hidden sm:inline">Est. {established}</span>
          <span className="hidden md:inline">{cafeAddress}</span>
          <span
            className={`inline-flex items-center gap-2 transition-opacity duration-500 ${status ? "opacity-100" : "opacity-0"}`}
          >
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 ${status?.open ? "status-dot bg-espresso" : "border border-espresso"}`}
            />
            {status?.label ?? "Hours"}
          </span>
        </div>

        {/* Headline + newspaper column */}
        <div className="grid flex-1 grid-cols-1 content-center items-center gap-y-9 py-12 text-center md:grid-cols-12 md:gap-y-0 md:py-0 md:text-left">
          <h1
            className="hero-animate font-display text-h1 font-medium leading-[0.98] tracking-[-0.015em] text-espresso md:col-span-8"
            /* Legibility scrim behind display type over photo/video - not a decorative shadow */
            style={{ textShadow: "0 0 24px rgba(247,244,238,0.85), 0 0 10px rgba(247,244,238,0.95)" }}
          >
            Coffee, bread,
            <br />
            and a few
            <br />
            <span className="italic text-terracotta">green things.</span>
          </h1>

          <div className="mx-auto flex w-full max-w-sm flex-col md:col-span-4 md:mx-0 md:max-w-none md:self-end md:pb-16">
            <p className="hero-tagline border-t border-espresso/25 bg-linen/90 px-5 py-4 font-mono text-body leading-[1.8] text-espresso backdrop-blur-sm md:border-l-2 md:border-t-0 md:text-body-lg md:leading-[1.85]">
              An espresso bar and bakery on Greenhouse Row. We pull short shots,
              bake overnight, and steep what grows in the back.
            </p>
            <div className="hero-actions mt-3 grid grid-cols-2 gap-px border border-espresso bg-espresso font-mono text-eyebrow uppercase tracking-[0.16em]">
              <Link
                href="/menu"
                className="bg-espresso px-3 py-3.5 text-center text-linen transition-colors duration-150 hover:bg-terracotta"
              >
                Read the menu
              </Link>
              <Link
                href="/contact"
                className="bg-linen/90 px-3 py-3.5 text-center text-espresso transition-colors duration-150 hover:bg-linen"
              >
                Find us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div aria-hidden className="flex justify-center pb-5 md:hidden">
          <span className="hero-cue block h-10 w-px bg-espresso/60" />
        </div>
      </div>
    </header>
  );
}
