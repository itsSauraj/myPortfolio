'use client'
import { motion } from "framer-motion"
import Link from 'next/link'

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"
import ProjectCard from "./ProjectCard"

// Home preview — shows a slice of projects with a CTA to the full /projects page.
const PREVIEW_COUNT = 3

const Works = () => {
    const preview = projects.slice(0, PREVIEW_COUNT)

    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>My work</p>
                <h2 className={styles.sectionHeadText}>Selected Projects</h2>
            </motion.div>

            <div className="flex w-full flex-col">
                <motion.p
                    variants={fadeIn("", "", 0.1, 1)}
                    className="mt-3 max-w-3xl font-body text-[17px] leading-[30px] text-secondary"
                >
                    A mix of enterprise systems shipped in production and personal builds.
                    Enterprise work is private; the public projects link to live demos and
                    source code.
                </motion.p>

                <div className="mt-16 flex flex-wrap gap-6">
                    {preview.map((project, index) => (
                        <ProjectCard key={`project-${index}`} index={index} {...project} />
                    ))}
                </div>

                <motion.div variants={fadeIn("up", "spring", 0.2, 0.6)} className="mt-12">
                    <Link
                        href="/projects"
                        data-cursor
                        className="btn-accent w-fit"
                    >
                        View all {projects.length} projects →
                    </Link>
                </motion.div>
            </div>
        </>
    )
}

export default SectionWrapper(Works, "work")
