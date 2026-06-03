import { useEffect } from "react"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "framer-motion"

// Top scroll-progress bar + Lenis smooth scrolling. Lenis animates the real
// window scroll position, so framer-motion's useScroll keeps working and
// anchor links are routed through lenis.scrollTo for a buttery jump.
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.3,
    })

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduce) return

        const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
        // Expose so cross-route hash navigation (ScrollToHash) can smooth-scroll.
        window.__lenis = lenis
        let raf
        const loop = (time) => {
            lenis.raf(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        const onClick = (e) => {
            const anchor = e.target.closest?.('a[href^="#"]')
            if (!anchor) return
            const href = anchor.getAttribute("href")
            if (href && href.length > 1) {
                const el = document.querySelector(href)
                if (el) {
                    e.preventDefault()
                    lenis.scrollTo(el, { offset: -80 })
                }
            }
        }
        document.addEventListener("click", onClick)

        return () => {
            cancelAnimationFrame(raf)
            document.removeEventListener("click", onClick)
            lenis.destroy()
            delete window.__lenis
        }
    }, [])

    return (
        <motion.div
            className="fixed left-0 top-0 z-[9997] h-[3px] w-full origin-left bg-gradient-to-r from-accent-lavender to-accent-sky"
            style={{ scaleX }}
            aria-hidden="true"
        />
    )
}

export default ScrollProgress
