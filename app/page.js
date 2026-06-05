'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { About, Contact, Experience, Feedbacks, Hero, Tech, Works, Marquee } from '../src/components'

const StarsCanvas = dynamic(() => import('../src/components/canvas/Stars'), { ssr: false })

const MARQUEE_ITEMS = [
    'Full Stack Engineer',
    'Backend & APIs',
    'AI Integrations',
    'Cloud / DevOps',
    'Python · Django · FastAPI',
    'React · Next.js · TypeScript',
    'Docker · Kubernetes · AWS',
    'Available for work',
]

export default function Home() {
    return (
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
                <Suspense fallback={null}>
                    <StarsCanvas />
                </Suspense>
            </div>
        </>
    )
}
