import { motion } from "framer-motion"
import { SectionWrapper } from "../hoc"
import { styles } from "../styles"
import { fadeIn, textVariant } from "../utils/motion"
import { testimonials } from "../constants"
import { Icon } from "../utils/icons"

const FeedbackCard = ({ index, testimonial, name, designation, company, image, linkedIn }) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.25, 0.6)}
        data-cursor
        className="panel flex h-full flex-col p-8"
    >
        <p className="font-display text-[64px] leading-[0.5] text-accent-lavender/70">&ldquo;</p>

        <p className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-secondary">
            {testimonial}
        </p>

        <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
            <img
                src={image}
                alt={name}
                className="h-12 w-12 shrink-0 rounded-full border border-accent-lavender/40 object-cover"
            />
            <div className="min-w-0 flex-1">
                <p className="font-display text-[19px] uppercase leading-tight tracking-tight text-white">
                    {name}
                </p>
                <p className="truncate font-mono text-[11px] uppercase tracking-wider text-secondary">
                    {designation} · {company}
                </p>
            </div>
            {linkedIn && (
                <a
                    href={linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    title={`${name} on LinkedIn`}
                    className="shrink-0 text-secondary transition-colors hover:text-accent-lavender"
                >
                    <Icon name="linkedin" className="text-xl" />
                </a>
            )}
        </div>
    </motion.div>
)

const Feedbacks = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>What others say</p>
                <h2 className={styles.sectionHeadText}>Testimonials</h2>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                    <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(Feedbacks, "")
