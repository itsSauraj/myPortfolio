'use client'
import { motion } from 'framer-motion'

import { SectionWrapper } from "../hoc"
import { skillGroups } from "../constants"
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'
import { Icon } from '../utils/icons'

const Tech = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>What I work with</p>
                <h2 className={styles.sectionHeadText}>Skills &amp; Stack</h2>
            </motion.div>

            <div className='mt-14 flex flex-col gap-10'>
                {skillGroups.map((group, gi) => (
                    <motion.div
                        key={group.title}
                        variants={fadeIn("up", "spring", 0.1 * gi, 0.6)}
                    >
                        <div className='mb-4 flex items-center gap-4'>
                            <span className='font-mono text-[12px] uppercase tracking-[0.3em] text-accent-lavender'>
                                {group.title}
                            </span>
                            <span className='h-px flex-1 bg-white/10' />
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {group.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    data-cursor
                                    className='group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-lavender/40 hover:bg-accent-lavender/[0.07] hover:shadow-glow'
                                >
                                    <Icon
                                        name={skill.iconKey}
                                        className='text-xl text-secondary transition-colors group-hover:text-accent-lavender'
                                    />
                                    <span className='font-mono text-[13px] text-white'>
                                        {skill.name}
                                    </span>
                                    {skill.badge && (
                                        <span className='rounded-full border border-accent-mint/40 bg-accent-mint/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-mint'>
                                            {skill.badge}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(Tech, "skills")
