import { motion } from "framer-motion"
import { SectionWrapper } from "../hoc"
import { styles } from "../styles"
import { fadeIn, textVariant } from "../utils/motion"
import { testimonials } from "../constants"

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
    <motion.div
        variants={fadeIn("", "spring", index * 0.4, 0.75)}
        data-cursor
        className="panel z-10 w-full bg-space-800/60 p-8 xs:w-[500px]"
    >
        <p className="font-display text-[56px] font-black leading-none text-accent-lavender">"</p>

        <div className="mt-1">
            <p className="font-body text-[18px] leading-relaxed tracking-wide text-white">
                {testimonial}
            </p>
            <div className="mt-7 flex items-center justify-between gap-2 border-t border-white/10 pt-5">
                <div className="flex flex-1 flex-col">
                    <p className="font-mono text-[15px] font-bold text-white">
                        <span className="text-accent-lavender">@</span> {name}
                    </p>
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-secondary">
                        {designation} · {company}
                    </p>
                </div>
                <img
                    src={image}
                    alt={`feedback-by-${name}`}
                    className="h-12 w-12 rounded-full border border-accent-lavender/50 object-cover"
                />
            </div>
        </div>
    </motion.div>
)

const Feedbacks = () => {
    return (
        <div className="bg-space-900/40">
            <div className={`bg-space-800/40 ${styles.padding} min-h-[300px] border-y border-white/10`}>
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>What others say</p>
                    <h2 className={styles.sectionHeadText}>Testimonials</h2>
                </motion.div>
            </div>
            <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
                {testimonials.map((testimonial, index) => (
                    <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
                ))}
            </div>
        </div>
    )
}

export default SectionWrapper(Feedbacks, "")
