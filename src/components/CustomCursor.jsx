import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// A bespoke cursor: a precise dot + a lagging ring that grows over
// interactive elements. Uses mix-blend-difference so it reads on any
// background. Only enabled on real pointer (hover) devices.
const INTERACTIVE = "a, button, [data-cursor], input, textarea, label, select"

const CustomCursor = () => {
    const [enabled, setEnabled] = useState(false)
    const [hovering, setHovering] = useState(false)

    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 })
    const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 })

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
        if (!mq.matches) return

        setEnabled(true)
        document.body.classList.add("has-custom-cursor")

        const move = (e) => {
            x.set(e.clientX)
            y.set(e.clientY)
        }
        const over = (e) => {
            if (e.target.closest?.(INTERACTIVE)) setHovering(true)
        }
        const out = (e) => {
            if (e.target.closest?.(INTERACTIVE)) setHovering(false)
        }

        window.addEventListener("mousemove", move)
        document.addEventListener("mouseover", over)
        document.addEventListener("mouseout", out)

        return () => {
            window.removeEventListener("mousemove", move)
            document.removeEventListener("mouseover", over)
            document.removeEventListener("mouseout", out)
            document.body.classList.remove("has-custom-cursor")
        }
    }, [x, y])

    if (!enabled) return null

    return (
        <>
            <motion.div className="cursor-dot" style={{ x, y }} />
            <motion.div
                className="cursor-ring"
                style={{ x: ringX, y: ringY }}
                animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.6 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </>
    )
}

export default CustomCursor
