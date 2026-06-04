import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import {
    About, Contact, Experience, Feedbacks,
    Hero, Navbar, Tech, Works, StarsCanvas, Footer,
    CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, Marquee, SpotlightGrid
} from './components'
import Projects from './pages/Projects'
import Timeline from './pages/Timeline'

const MARQUEE_ITEMS = [
    "Full Stack Engineer",
    "Backend & APIs",
    "AI Integrations",
    "Cloud / DevOps",
    "Python · Django · FastAPI",
    "React · Next.js · TypeScript",
    "Docker · Kubernetes · AWS",
    "Available for work",
]

const Home = () => (
    <>
        <Hero />

        <Marquee items={MARQUEE_ITEMS} />

        <About />
        <Experience />
        <Tech />

        <Marquee items={MARQUEE_ITEMS} reverse className="text-accent-sky" />

        <Works />
        <Feedbacks />
        <div className="relative z-0">
            <Contact />
            <StarsCanvas />
        </div>
    </>
)

// Smooth-scrolls to the hash target after route/hash changes (e.g. clicking a
// section link from the /projects page), and resets to top on plain route changes.
const ScrollToHash = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const id = setTimeout(() => {
                const el = document.querySelector(hash)
                if (el) {
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 })
                    else el.scrollIntoView()
                }
            }, 140)
            return () => clearTimeout(id)
        }
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
    }, [pathname, hash])

    return null
}

const App = () => {
    useEffect(() => {
        const handleContextmenu = (e) => e.preventDefault()
        document.addEventListener('contextmenu', handleContextmenu)
        return () => document.removeEventListener('contextmenu', handleContextmenu)
    }, [])

    return (
        <BrowserRouter>
            <IntroReveal />
            <GrainOverlay />
            <CustomCursor />
            <ScrollProgress />
            <ScrollToHash />

            <div className="relative z-0">
                {/* Ambient space background + cursor spotlight on the grid */}
                <SpotlightGrid />

                <div className="relative z-10">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/timeline" element={<Timeline />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
