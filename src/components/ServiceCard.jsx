'use client'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/motion'
import { Icon } from '../utils/icons'

const ServiceCard = ({ index, title, iconKey, blurb }) => {
    return (
        <motion.div
            variants={fadeIn("up", "spring", 0.2 * index, 0.6)}
            data-cursor
            className="panel panel-hover w-full p-6 sm:w-[260px]"
        >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-lavender/40 bg-accent-lavender/10 text-accent-lavender">
                <Icon name={iconKey} className="text-3xl" />
            </div>
            <h3 className="font-display text-[20px] font-bold uppercase tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-secondary">
                {blurb}
            </p>
        </motion.div>
    )
}

export default ServiceCard
