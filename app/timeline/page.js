'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { styles } from '../../src/styles'
import { timelineItems } from '../../src/constants'
import { TimelineTrack } from '../../src/components/timeline'
import { textVariant, staggerContainer } from '../../src/utils/motion'

export default function TimelinePage() {
    return (
        <section className="min-h-screen w-full overflow-hidden pb-24 pt-32">
            <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer()}
                className="mx-auto max-w-7xl px-6 sm:px-16"
            >
                {/* Navigation */}
                <motion.div
                    variants={textVariant()}
                    className="mb-10 flex flex-wrap gap-3"
                >
                    <Link
                        href="/"
                        className="rounded-xl border border-accent-lavender/40 bg-accent-lavender/10 px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest text-accent-lavender transition-all hover:bg-accent-lavender/20 hover:shadow-glow"
                    >
                        ← Locate Me
                    </Link>
                    <Link
                        href="/projects"
                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest text-secondary transition-all hover:border-accent-lavender/40 hover:text-accent-lavender"
                    >
                        My Artifacts →
                    </Link>
                </motion.div>

                <motion.p variants={textVariant(0.05)} className={styles.sectionSubText}>
                    Career & Projects
                </motion.p>
                <motion.h1 variants={textVariant(0.1)} className={styles.sectionHeadText}>
                    Timeline
                </motion.h1>
                <motion.p
                    variants={textVariant(0.2)}
                    className="mt-4 max-w-2xl font-body text-[17px] leading-[30px] text-secondary"
                >
                    From early experiments to production systems — every internship, job, and
                    personal project in chronological order.
                </motion.p>
                <motion.p
                    variants={textVariant(0.3)}
                    className="mt-2 hidden font-mono text-[11px] text-white/25 md:block"
                >
                    Scroll or drag to explore · Click any card to expand
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-16"
            >
                <TimelineTrack items={timelineItems} />
            </motion.div>
        </section>
    )
}
