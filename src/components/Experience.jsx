import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import { motion } from "framer-motion"

import 'react-vertical-timeline-component/style.min.css'

import { styles } from '../styles'
import { experiences } from "../constants"
import { SectionWrapper } from '../hoc'
import { textVariant } from "../utils/motion"

const ExperienceCard = ({ experience }) => (
    <VerticalTimelineElement
        contentStyle={{
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
            boxShadow: '0 18px 50px -20px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
        }}
        contentArrowStyle={{
            borderRight: '7px solid rgba(255, 255, 255, 0.1)',
        }}
        date={experience.date}
        dateClassName="font-mono uppercase tracking-widest text-[13px]"
        iconStyle={{
            background: experience.iconBg,
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 0 0 4px #02030A, 0 0 22px -4px rgba(201, 184, 255, 0.55)',
        }}
        icon={
            <div className="flex h-full w-full items-center justify-center">
                {experience.icon ? (
                    <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="h-[65%] w-[65%] object-contain"
                    />
                ) : (
                    <span className="font-display text-[15px] font-bold text-black">
                        {experience.monogram}
                    </span>
                )}
            </div>
        }
    >
        <h3 className="font-display text-[22px] font-bold uppercase tracking-tight text-white">
            {experience.title}
        </h3>
        <p
            className="font-mono text-[14px] font-semibold text-accent-lavender"
            style={{ margin: 0 }}
        >
            {experience.company_name}
            {experience.location ? ` · ${experience.location}` : ""}
        </p>

        <ul className="mt-5 ml-5 list-disc space-y-2">
            {experience.points.map((point, index) => (
                <li
                    key={`experience-point-${index}`}
                    className="pl-1 font-body text-[14px] tracking-wide text-white-100"
                >
                    {point}
                </li>
            ))}
        </ul>
    </VerticalTimelineElement>
)

const Experience = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>What I have done so far</p>
                <h2 className={styles.sectionHeadText}>Work Experience</h2>
            </motion.div>

            <div className="mt-20 flex flex-col">
                <VerticalTimeline lineColor="#2A2550">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    )
}

export default SectionWrapper(Experience, 'experience')
