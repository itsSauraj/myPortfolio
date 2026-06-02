import { useEffect } from "react"

// Ambient space background + a cursor-following spotlight that makes the grid
// lines glow within a radius of the pointer. A dim base grid is always shown;
// a brighter grid layer is masked to a radial spotlight at the cursor. Only
// enabled on real pointer (hover) devices via the body.spotlight-on class.
const SpotlightGrid = () => {
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
        if (!mq.matches) return

        const root = document.documentElement
        let raf = 0
        let x = window.innerWidth / 2
        let y = window.innerHeight / 2

        const apply = () => {
            root.style.setProperty("--mx", `${x}px`)
            root.style.setProperty("--my", `${y}px`)
            raf = 0
        }
        apply()
        document.body.classList.add("spotlight-on")

        const onMove = (e) => {
            x = e.clientX
            y = e.clientY
            if (!raf) raf = requestAnimationFrame(apply)
        }
        window.addEventListener("mousemove", onMove, { passive: true })

        return () => {
            window.removeEventListener("mousemove", onMove)
            if (raf) cancelAnimationFrame(raf)
            document.body.classList.remove("spotlight-on")
        }
    }, [])

    return (
        <>
            {/* Ambient nebula glow */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-space-glow" aria-hidden="true" />
            {/* Dim base grid (always visible) */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-space-grid bg-grid-40 opacity-40" aria-hidden="true" />
            {/* Bright grid revealed only around the cursor */}
            <div className="spotlight-layer spotlight-grid bg-space-grid-bright bg-grid-40" aria-hidden="true" />
            {/* Soft light pool that follows the cursor */}
            <div className="spotlight-layer spotlight-pool" aria-hidden="true" />
        </>
    )
}

export default SpotlightGrid
