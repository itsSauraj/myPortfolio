import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

import {
    About, Contact, Experience, Feedbacks,
    Hero, Navbar, Tech, Works, StarsCanvas, Footer,
    CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, Marquee, SpotlightGrid
} from './components'

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

const App = () => {

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

    return (
        <BrowserRouter>
            <IntroReveal />
            <GrainOverlay />
            <CustomCursor />
            <ScrollProgress />

            <div className="relative z-0">
                {/* Ambient space background + cursor spotlight on the grid */}
                <SpotlightGrid />

                <div className="relative z-10">
                    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                        <Navbar />
                        <Hero />
                    </div>

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
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
