import { useEffect, useRef } from "react"
import { Icon } from "../utils/icons"

// ONE grid for the hero. The same right-anchored grid draws the lines, carries
// the travelling light pulses (the "animated grid"), and holds the skill icons
// in its cells (the "icons grid") — no overlapping/second grid. The container
// paints an opaque space backdrop so the global background grid is hidden
// behind the hero, leaving a single continuous grid here.
const CELL = 48

const GRID_FAINT =
    "linear-gradient(rgba(201,184,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,184,255,0.05) 1px, transparent 1px)"
const GRID_BRIGHT =
    "linear-gradient(rgba(201,184,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,184,255,0.5) 1px, transparent 1px)"

// Right/top anchored so cells align with the right-anchored icon grid on any width.
const gridBg = (img) => ({
    backgroundImage: img,
    backgroundSize: `${CELL}px ${CELL}px`,
    backgroundPosition: "top right",
})

const ICON_GRID = {
    gridTemplateColumns: `repeat(6, ${CELL}px)`,
    gridAutoRows: `${CELL}px`,
    gridAutoFlow: "dense",
    justifyContent: "end",
    alignContent: "start",
    paddingTop: `${CELL * 2}px`,
}

const TILES = [
    { key: "python", big: true },
    { key: "react", big: true },
    { key: "fastapi" }, { key: "django" }, { key: "nextjs" }, { key: "typescript" },
    { key: "javascript" }, { key: "nodejs" }, { key: "tailwind" }, { key: "celery" },
    { key: "docker", big: true },
    { key: "kubernetes" }, { key: "aws" }, { key: "gcp" }, { key: "postgresql" },
    { key: "mongodb" }, { key: "redis" }, { key: "sqlite" }, { key: "git" },
    { key: "github" }, { key: "langchain" }, { key: "openai" }, { key: "anthropic" },
    { key: "gemini" }, { key: "stripe" }, { key: "razorpay" }, { key: "shopify" },
    { key: "postman" }, { key: "vercel" }, { key: "datadog" },
]

const span = (big) => (big ? { gridColumn: "span 2", gridRow: "span 2" } : undefined)

const cellClass = (big, bright) =>
    [
        "flex items-center justify-center",
        big ? "bg-space-900 border" : "",
        big ? (bright ? "border-accent-lavender/40" : "border-white/[0.06]") : "",
        bright ? "text-accent-lavender" : "text-white/25",
    ].join(" ")

const renderTiles = (bright) =>
    TILES.map((t) => (
        <div key={t.key} style={span(t.big)} className={cellClass(t.big, bright)}>
            <Icon name={t.key} className={t.big ? "text-3xl" : "text-lg"} />
        </div>
    ))

const HeroGrid = () => {
    const ref = useRef(null)

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
        if (!mq.matches) return
        const el = ref.current
        if (!el) return

        let x = 0
        let y = 0
        let raf = 0
        const apply = () => {
            const r = el.getBoundingClientRect()
            el.style.setProperty("--lx", `${x - r.left}px`)
            el.style.setProperty("--ly", `${y - r.top}px`)
            raf = 0
        }
        const onMove = (e) => {
            x = e.clientX
            y = e.clientY
            if (!raf) raf = requestAnimationFrame(apply)
        }
        window.addEventListener("mousemove", onMove, { passive: true })
        return () => {
            window.removeEventListener("mousemove", onMove)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-space-900"
        >
            {/* depth glow */}
            <div className="absolute inset-0 bg-space-glow" />

            {/* the single grid — faint lines */}
            <div className="absolute inset-0" style={gridBg(GRID_FAINT)} />

            {/* travelling light pulses along the grid lines (animated grid) */}
            <span className="hero-pulse-v" style={{ right: `${CELL * 4}px`, animationDelay: "0s" }} />
            <span className="hero-pulse-v" style={{ right: `${CELL * 9}px`, animationDelay: "2.4s" }} />
            <span className="hero-pulse-v" style={{ right: `${CELL * 14}px`, animationDelay: "4.1s" }} />
            <span className="hero-pulse-h" style={{ top: `${CELL * 5}px`, animationDelay: "1s" }} />
            <span className="hero-pulse-h" style={{ top: `${CELL * 9}px`, animationDelay: "3.6s" }} />

            {/* same grid, brighter — revealed under the cursor spotlight */}
            <div className="hero-spot absolute inset-0" style={gridBg(GRID_BRIGHT)} />

            {/* icons live in the cells of this same grid — hidden by default,
                revealed only within the cursor spotlight */}
            <div className="hero-spot absolute inset-0 hidden lg:grid" style={ICON_GRID}>
                {renderTiles(true)}
            </div>
        </div>
    )
}

export default HeroGrid
