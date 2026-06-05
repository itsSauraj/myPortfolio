'use client'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services, aboutText } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { ServiceCard } from "../components"
import { SectionWrapper } from '../hoc'

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

            <div className='mt-16 flex flex-wrap gap-6'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(About, "about")
