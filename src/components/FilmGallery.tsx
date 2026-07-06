export interface FilmFrame {
  src: string;
  alt: string;
  caption?: string;
  /** Grid columns out of 12 at md+. Each row group must sum to 12. */
  span?: 4 | 6 | 8;
}

interface FilmGalleryProps {
  frames: FilmFrame[];
  /** Section heading — defaults to none. */
  heading?: string;
}

const SPAN_CLASS: Record<number, string> = {
  4: "md:col-span-4",
  6: "md:col-span-6",
  8: "md:col-span-8",
};

// Every cell in a row shares one height, so mixed column widths still tile
// edge-to-edge instead of leaving gaps under the shorter aspect ratio.
const ROW_HEIGHT = "h-65 md:h-80";

export default function FilmGallery({ frames, heading }: FilmGalleryProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section className="border-b border-espresso">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between border-b border-espresso py-4 font-mono text-caption uppercase tracking-[0.18em]">
          <span>{heading ?? "Contact Sheet"}</span>
          <span className="text-espresso/50">
            {String(frames.length).padStart(2, "0")} frames
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px border-l border-t border-espresso/15 bg-espresso/15 md:grid-cols-12">
          {frames.map((frame, i) => {
            const span = frame.span ?? 4;
            return (
              <figure
                key={frame.src}
                className={`group relative overflow-hidden border-b border-r border-espresso/15 bg-linen ${SPAN_CLASS[span]} ${ROW_HEIGHT}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${frame.src}`}
                  alt={frame.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ filter: "sepia(10%) contrast(110%) saturate(120%)" }}
                />

                <span className="absolute left-0 top-0 bg-espresso px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-linen">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {frame.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 flex items-baseline justify-between border-t border-linen/20 bg-espresso/85 px-3 py-2 font-mono text-eyebrow uppercase tracking-[0.14em] text-linen">
                    <span>{frame.caption}</span>
                    <span className="text-linen/50">Cafe Botanica</span>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
