import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
import HeroGrid from './HeroGrid'
import { heroName, heroRoles } from '../constants'

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(
            () => setRoleIndex((i) => (i + 1) % heroRoles.length),
            2200
        )
        return () => clearInterval(id)
    }, [])

    return (
        <section className="relative mx-auto h-screen w-full">
            <HeroGrid />

            <div
                className={`${styles.paddingX} absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5`}
            >
                <div className="mt-5 flex flex-col items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-accent-lavender shadow-glow" />
                    <div className="violet-gradient w-1 sm:h-80" />
                </div>

                <div className="flex-1">
                    <p className="mb-4 inline-block rounded-full border border-accent-lavender/40 bg-accent-lavender/5 px-4 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-lavender sm:text-[12px]">
                        Surat · India — Available for work
                    </p>
                    <h1 className={`${styles.heroHeadText} text-white`}>
                        Hi, I'm <span className="text-accent-lavender">{heroName}</span>
                    </h1>
                    <div className="mt-2 flex h-[40px] items-center overflow-hidden sm:h-[50px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={heroRoles[roleIndex]}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                                className={`${styles.heroSubText} text-white-100`}
                            >
                                {heroRoles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <ErrorBoundary fallback={<div />}>
                <ComputersCanvas />
            </ErrorBoundary>

            <div className="absolute bottom-32 flex w-full items-center justify-center xs:bottom-10">
                <a href="#about" data-cursor>
                    <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-2 border-accent-lavender/60 p-2">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                            className="mb-1 h-3 w-3 rounded-full bg-accent-lavender"
                        />
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Hero
