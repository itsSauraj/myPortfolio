'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../../src/styles'
import { projects } from '../../src/constants'
import { textVariant, staggerContainer } from '../../src/utils/motion'
import ProjectCard from '../../src/components/ProjectCard'

const CATEGORIES = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
const countOf = (cat) => projects.filter((p) => p.category === cat).length

export default function ProjectsPage() {
    const [active, setActive] = useState('All')
    const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-16">
            <motion.div initial="hidden" animate="show" variants={staggerContainer()}>
                <motion.p variants={textVariant()} className={styles.sectionSubText}>
                    My work
                </motion.p>
                <motion.h1 variants={textVariant(0.1)} className={styles.sectionHeadText}>
                    Projects
                </motion.h1>
                <motion.p
                    variants={textVariant(0.2)}
                    className="mt-4 max-w-3xl font-body text-[17px] leading-[30px] text-secondary"
                >
                    Everything I've built — enterprise systems shipped in production, open-source
                    tools, and personal projects. Filter by category below; public projects link
                    to their live demo and source.
                </motion.p>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActive(cat)}
                        data-cursor
                        className={`rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-widest transition-all ${
                            active === cat
                                ? 'border-accent-lavender/60 bg-accent-lavender/15 text-accent-lavender'
                                : 'border-white/10 bg-white/5 text-secondary hover:border-accent-lavender/40 hover:text-white'
                        }`}
                    >
                        {cat}
                        <span className="ml-1.5 opacity-50">
                            {cat === 'All' ? projects.length : countOf(cat)}
                        </span>
                    </button>
                ))}
            </div>

            <motion.div
                key={active}
                className="mt-12 flex flex-wrap justify-center gap-6 sm:justify-start"
                initial="hidden"
                animate="show"
            >
                {filtered.map((project, index) => (
                    <ProjectCard key={project.name} index={index} {...project} />
                ))}
            </motion.div>
        </section>
    )
}
