'use client'
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
                <motion.p variants={textVariant()} className={styles.sectionSubText}>
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
