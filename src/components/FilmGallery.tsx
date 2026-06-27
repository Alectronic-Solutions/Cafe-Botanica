export interface FilmFrame {
  src: string;
  alt: string;
  caption?: string;
}

interface FilmGalleryProps {
  frames: FilmFrame[];
  /** Section heading — defaults to none. */
  heading?: string;
}

export default function FilmGallery({ frames, heading }: FilmGalleryProps) {
  return (
    <section className="border-b border-espresso">
      <div className="mx-auto max-w-6xl px-6">
        {heading && (
          <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-[12px] uppercase tracking-[0.18em]">
            <span>{heading}</span>
          </div>
        )}
        <div
          className="grid gap-px py-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {frames.map((frame) => (
            <figure key={frame.src} className="group relative overflow-hidden aspect-video bg-espresso/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={frame.src}
                alt={frame.alt}
                className="h-full w-full object-cover"
                style={{
                  filter: "sepia(10%) contrast(110%) saturate(120%)",
                }}
              />
              {frame.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-espresso/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-linen opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {frame.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
