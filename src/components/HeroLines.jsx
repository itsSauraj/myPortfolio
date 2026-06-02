// Animated line layer for the hero. Faint lavender lines echo the background
// grid (so it blends), and each carries a brighter accent-colored pulse that
// travels along it (stroke-dash animation in index.css). Sits behind the hero
// content and the 3D scene.
const H = [120, 300, 470, 640, 800]
const V = [220, 540, 900, 1240]
const ACCENTS = ["#C9B8FF", "#9FD4FF", "#A9E8D0", "#F3C0E0", "#A9B4FF"]

const HeroLines = () => (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <svg className="hero-lines h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            {/* Faint base lines — same hue/weight as the grid, so they blend */}
            {H.map((y, i) => (
                <line key={`hb-${i}`} x1="0" y1={y} x2="1440" y2={y} stroke="rgba(201,184,255,0.07)" strokeWidth="1" />
            ))}
            {V.map((x, i) => (
                <line key={`vb-${i}`} x1={x} y1="0" x2={x} y2="900" stroke="rgba(201,184,255,0.07)" strokeWidth="1" />
            ))}

            {/* Travelling accent pulses */}
            {H.map((y, i) => (
                <line
                    key={`hp-${i}`}
                    x1="0"
                    y1={y}
                    x2="1440"
                    y2={y}
                    className="hero-flow-h"
                    stroke={ACCENTS[i % ACCENTS.length]}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: "70 1370",
                        animationDuration: `${8 + i * 1.6}s`,
                        animationDelay: `${i * 0.9}s`,
                    }}
                />
            ))}
            {V.map((x, i) => (
                <line
                    key={`vp-${i}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="900"
                    className="hero-flow-v"
                    stroke={ACCENTS[(i + 2) % ACCENTS.length]}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: "55 845",
                        animationDuration: `${7 + i * 1.4}s`,
                        animationDelay: `${i * 0.7}s`,
                    }}
                />
            ))}
        </svg>
    </div>
)

export default HeroLines
