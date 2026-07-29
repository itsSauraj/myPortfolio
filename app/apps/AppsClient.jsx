'use client'
import { motion } from 'framer-motion'
import { styles } from '../../src/styles'
import { apps } from '../../src/constants'
import { textVariant, staggerContainer } from '../../src/utils/motion'

const cardVariant = (i) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } },
})

function AppCard({ app, index }) {
    return (
        <motion.article
            variants={cardVariant(index)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-accent-lavender/40"
        >
            <div className="flex items-start gap-4">
                {/* App icon */}
                <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    className="h-16 w-16 shrink-0 rounded-2xl border border-white/10 object-cover"
                    style={{ backgroundColor: `${app.accent}22` }}
                />
                <div className="min-w-0">
                    <h2 className="font-display text-[22px] uppercase leading-tight tracking-tight text-white">
                        {app.name}
                    </h2>
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-widest text-secondary">
                        {app.tagline}
                    </p>
                </div>
            </div>

            <p className="mt-4 flex-1 font-body text-[15px] leading-[26px] text-secondary">
                {app.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {[app.category, app.platform, app.status].map((label) => (
                    <span
                        key={label}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-secondary"
                    >
                        {label}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
                <a
                    href={app.links.open}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="rounded-full border border-accent-lavender/60 bg-accent-lavender/15 px-5 py-2 font-mono text-[12px] uppercase tracking-widest text-accent-lavender transition-all hover:bg-accent-lavender/25"
                >
                    Open app ↗
                </a>
                {app.links.source && (
                    <a
                        href={app.links.source}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-[12px] uppercase tracking-widest text-secondary transition-colors hover:border-accent-lavender/40 hover:text-white"
                    >
                        Source
                    </a>
                )}
            </div>
        </motion.article>
    )
}

export default function AppsClient() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-16">
            <motion.div initial="hidden" animate="show" variants={staggerContainer()}>
                <motion.p variants={textVariant()} className={styles.sectionSubText}>
                    Things you can use
                </motion.p>
                <motion.h1 variants={textVariant(0.1)} className={styles.sectionHeadText}>
                    Apps
                </motion.h1>
                <motion.p
                    variants={textVariant(0.2)}
                    className="mt-4 max-w-3xl font-body text-[17px] leading-[30px] text-secondary"
                >
                    Apps and web apps I&apos;m building — live, free, and open in the browser with
                    no install needed. Every app links to its source on GitHub.
                </motion.p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {apps.map((app, index) => (
                    <AppCard key={app.name} app={app} index={index} />
                ))}
            </div>
        </section>
    )
}
