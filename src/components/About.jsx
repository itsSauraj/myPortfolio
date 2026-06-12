'use client'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services, aboutText, aboutSkills } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { ServiceCard } from "../components"
import { SectionWrapper } from '../hoc'
import { Icon } from '../utils/icons'

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Who I Am</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 max-w-3xl border-l-2 border-accent-lavender/60 pl-5 text-justify font-body text-[17px] leading-[30px] text-secondary'
            >
                {aboutText}
            </motion.p>

            <motion.div
                variants={fadeIn("up", "spring", 0.2, 0.6)}
                className='mt-6 flex flex-wrap gap-3'
            >
                {aboutSkills.map((skill) => (
                    <div
                        key={skill.name}
                        className='group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-lavender/40 hover:bg-accent-lavender/[0.07] hover:shadow-glow'
                    >
                        <Icon
                            name={skill.iconKey}
                            className='text-xl text-secondary transition-colors group-hover:text-accent-lavender'
                        />
                        <span className='font-mono text-[13px] text-white'>{skill.name}</span>
                    </div>
                ))}
            </motion.div>

            <div className='mt-16 flex flex-wrap gap-6'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(About, "about")
