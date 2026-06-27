const LINEN = "#f7f4ee"
const ESPRESSO = "#2c2a29"
const TERRACOTTA = "#b5562f"

function Sprockets() {
  return (
    <>
      <g opacity="0.25">
        {[50, 100, 150, 200, 250].map((y) => (
          <circle key={`l${y}`} cx="12" cy={y} r="5" fill={ESPRESSO} />
        ))}
      </g>
      <g opacity="0.25">
        {[50, 100, 150, 200, 250].map((y) => (
          <circle key={`r${y}`} cx="388" cy={y} r="5" fill={ESPRESSO} />
        ))}
      </g>
    </>
  )
}

function FrameLabel({ n, year }: { n: number; year: number }) {
  return (
    <text
      x="200"
      y="288"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="9"
      letterSpacing="2"
      fill={ESPRESSO}
      opacity="0.4"
      textRendering="geometricPrecision"
    >
      {`BOTANICA · ${year} · FRAME ${String(n).padStart(2, "0")}`}
    </text>
  )
}

/* Scene 1 — counter, morning light */
function CounterScene({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill={LINEN} />
      <Sprockets />
      {/* Window light */}
      <rect x="30" y="20" width="340" height="2" fill={ESPRESSO} opacity="0.12" />
      <rect x="30" y="22" width="340" height="100" fill={ESPRESSO} opacity="0.04" />
      {/* Counter */}
      <rect x="24" y="160" width="352" height="6" fill={ESPRESSO} opacity="0.4" />
      <rect x="24" y="166" width="352" height="60" fill={ESPRESSO} opacity="0.08" />
      {/* Cup */}
      <ellipse cx="120" cy="158" rx="22" ry="7" fill={ESPRESSO} opacity="0.15" />
      <path d="M98 135 Q98 158 120 158 Q142 158 142 135 Z" fill="none" stroke={ESPRESSO} strokeWidth="1" opacity="0.4" />
      <path d="M142 145 Q154 145 154 152 Q154 159 142 156" fill="none" stroke={ESPRESSO} strokeWidth="1" opacity="0.35" />
      {/* Saucer steam */}
      <path d="M112 128 Q114 122 112 116" fill="none" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.2" />
      <path d="M120 126 Q122 118 120 110" fill="none" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.2" />
      <path d="M128 128 Q130 121 128 115" fill="none" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.2" />
      {/* Terracotta accent line */}
      <rect x="24" y="160" width="352" height="1" fill={TERRACOTTA} opacity="0.3" />
      <FrameLabel n={n} year={1978 + n} />
    </svg>
  )
}

/* Scene 2 — window, afternoon */
function WindowScene({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill={LINEN} />
      <Sprockets />
      {/* Window frame */}
      <rect x="80" y="20" width="240" height="220" fill="none" stroke={ESPRESSO} strokeWidth="1.5" opacity="0.35" />
      {/* Mullions */}
      <line x1="200" y1="20" x2="200" y2="240" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.25" />
      <line x1="80" y1="130" x2="320" y2="130" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.25" />
      {/* Light wash */}
      <rect x="81" y="21" width="118" height="108" fill={TERRACOTTA} opacity="0.05" />
      <rect x="201" y="21" width="118" height="108" fill={ESPRESSO} opacity="0.04" />
      <rect x="81" y="131" width="238" height="108" fill={ESPRESSO} opacity="0.03" />
      {/* Plant silhouette */}
      <ellipse cx="155" cy="200" rx="18" ry="8" fill={ESPRESSO} opacity="0.15" />
      <line x1="155" y1="192" x2="155" y2="160" stroke={ESPRESSO} strokeWidth="1.2" opacity="0.25" />
      <ellipse cx="145" cy="168" rx="12" ry="6" fill={ESPRESSO} opacity="0.12" transform="rotate(-30,145,168)" />
      <ellipse cx="165" cy="172" rx="11" ry="5" fill={ESPRESSO} opacity="0.12" transform="rotate(20,165,172)" />
      <FrameLabel n={n} year={1974 + n * 2} />
    </svg>
  )
}

/* Scene 3 — greenhouse, stems */
function GreenhouseScene({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill={LINEN} />
      <Sprockets />
      {/* Greenhouse grid */}
      {[80, 140, 200, 260, 320].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="240" stroke={ESPRESSO} strokeWidth="0.6" opacity="0.15" />
      ))}
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1="60" y1={y} x2="340" y2={y} stroke={ESPRESSO} strokeWidth="0.6" opacity="0.15" />
      ))}
      {/* Plant stems */}
      {[110, 160, 200, 245, 290].map((x, i) => {
        const h = 80 + i * 15
        return (
          <g key={x}>
            <line x1={x} y1={240} x2={x} y2={240 - h} stroke={ESPRESSO} strokeWidth="1.2" opacity="0.3" />
            <ellipse cx={x - 10} cy={240 - h + 20} rx="14" ry="6" fill={ESPRESSO} opacity="0.12" transform={`rotate(-40,${x - 10},${240 - h + 20})`} />
            <ellipse cx={x + 10} cy={240 - h + 30} rx="12" ry="5" fill={ESPRESSO} opacity="0.1" transform={`rotate(35,${x + 10},${240 - h + 30})`} />
          </g>
        )
      })}
      {/* Soil line */}
      <rect x="40" y="238" width="320" height="3" fill={TERRACOTTA} opacity="0.25" />
      <FrameLabel n={n} year={1982 + n} />
    </svg>
  )
}

/* Scene 4 — table overhead, cup and paper */
function TableScene({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="400" height="300" fill={LINEN} />
      <Sprockets />
      {/* Table surface — wood grain lines */}
      {[50, 80, 110, 140, 170, 200, 230].map((y) => (
        <line key={y} x1="30" y1={y} x2="370" y2={y + 5} stroke={ESPRESSO} strokeWidth="0.4" opacity="0.08" />
      ))}
      {/* Newspaper / folded paper */}
      <rect x="180" y="80" width="140" height="100" fill="none" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.25" />
      <line x1="180" y1="130" x2="320" y2="130" stroke={ESPRESSO} strokeWidth="0.5" opacity="0.2" />
      {[90, 100, 110, 140, 150, 160].map((y) => (
        <line key={y} x1="188" y1={y} x2="312" y2={y} stroke={ESPRESSO} strokeWidth="0.4" opacity="0.15" />
      ))}
      {/* Cup overhead */}
      <circle cx="110" cy="140" r="36" fill="none" stroke={ESPRESSO} strokeWidth="1.2" opacity="0.35" />
      <circle cx="110" cy="140" r="24" fill={ESPRESSO} opacity="0.07" />
      <circle cx="110" cy="140" r="10" fill={ESPRESSO} opacity="0.12" />
      {/* Saucer */}
      <ellipse cx="110" cy="140" rx="50" ry="10" fill="none" stroke={ESPRESSO} strokeWidth="0.8" opacity="0.2" />
      {/* Terracotta spoon */}
      <line x1="130" y1="155" x2="160" y2="180" stroke={TERRACOTTA} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="165" cy="183" rx="6" ry="4" fill={TERRACOTTA} opacity="0.3" transform="rotate(40,165,183)" />
      <FrameLabel n={n} year={1990 + n} />
    </svg>
  )
}

const scenes = [CounterScene, WindowScene, GreenhouseScene, TableScene]

interface Frame {
  caption: string
  variant: 1 | 2 | 3 | 4
}

interface FilmGalleryStaticProps {
  frames: Frame[]
  heading?: string
}

export default function FilmGalleryStatic({ frames, heading }: FilmGalleryStaticProps) {
  return (
    <div>
      {heading && (
        <h2 className="font-display text-4xl font-bold mb-8 md:text-5xl">{heading}</h2>
      )}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {frames.map(({ caption, variant }, i) => {
          const Scene = scenes[variant - 1]
          return (
            <div key={i} className="film-frame group relative overflow-hidden border border-espresso/20">
              <Scene n={i + 1} />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linen/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-espresso/70">
                  {caption}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
