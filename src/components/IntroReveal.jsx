'use client'
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Bold first-paint reveal: a 00 -> 100 counter over a deep-space panel,
// then a curtain wipe upward. Shows once per browser session (sessionStorage)
// and is skipped entirely for prefers-reduced-motion.
const IntroReveal = () => {
    const [done, setDone] = useState(() => {
        if (typeof window === "undefined") return true
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
        return sessionStorage.getItem("intro-played") === "1"
    })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (done) return

        document.body.style.overflow = "hidden"
        const start = performance.now()
        const duration = 1500
        let raf

        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            setCount(Math.round(p * 100))
            if (p < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                window.setTimeout(() => {
                    sessionStorage.setItem("intro-played", "1")
                    setDone(true)
                }, 350)
            }
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            document.body.style.overflow = ""
        }
    }, [done])

    return (
        <AnimatePresence onExitComplete={() => { document.body.style.overflow = "" }}>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden bg-space-900 p-6 sm:p-10"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.35em] text-accent-lavender sm:text-[13px]">
                        <span>Loading Portfolio</span>
                        <span className="hidden sm:inline">EST. 2025</span>
                    </div>

                    <div className="font-display text-[14vw] font-bold uppercase leading-[0.9] tracking-tighter text-white">
                        Saurabh
                        <br />
                        <span className="text-accent-lavender">Yadav</span>
                    </div>

                    <div className="flex items-end justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-secondary sm:text-[13px]">
                            Full&nbsp;Stack&nbsp;Engineer
                        </span>
                        <span className="font-display text-[16vw] font-bold leading-none text-white sm:text-[8vw]">
                            {String(count).padStart(3, "0")}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default IntroReveal
