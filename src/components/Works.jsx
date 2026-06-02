import { motion } from "framer-motion"

import { styles } from "../styles"
import { github_w, website } from "../assets"
import { SectionWrapper } from "../hoc"
import { projects } from "../constants"
import { fadeIn, textVariant } from "../utils/motion"

const ProjectCard = ({
    index,
    name,
    description,
    tags,
    image,
    project_link,
    source_code_link,
    private: isPrivate,
    accent,
}) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.15, 0.6)}
        data-cursor
        className="group panel panel-hover flex w-full flex-col overflow-hidden sm:w-[360px]"
    >
        <div className="relative h-[200px] w-full overflow-hidden border-b border-white/10">
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-space-700 to-black-200 p-4">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at 50% 42%, ${accent}33, transparent 70%)`,
                        }}
                    />
                    <span
                        className="relative text-center font-display text-[26px] font-bold uppercase leading-none tracking-tight"
                        style={{ color: accent }}
                    >
                        {name}
                    </span>
                </div>
            )}

            {isPrivate ? (
                <span className="badge absolute right-3 top-3 border-accent-lavender/40 bg-space-900/80 text-accent-lavender backdrop-blur-sm">
                    Private · Enterprise
                </span>
            ) : (
                <div className="absolute right-3 top-3 flex gap-2">
                    <button
                        type="button"
                        onClick={() => window.open(source_code_link, "_blank")}
                        title="Source code"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-space-900/70 backdrop-blur-sm transition-colors hover:border-accent-lavender/50 hover:bg-accent-lavender/10"
                    >
                        <img src={github_w} alt="code" className="h-1/2 w-1/2 object-contain" />
                    </button>
                    <button
                        type="button"
                        onClick={() => window.open(project_link, "_blank")}
                        title="Live demo"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-space-900/70 backdrop-blur-sm transition-colors hover:border-accent-lavender/50 hover:bg-accent-lavender/10"
                    >
                        <img src={website} alt="live" className="h-1/2 w-1/2 object-contain" />
                    </button>
                </div>
            )}
        </div>

        <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-[22px] font-bold uppercase tracking-tight text-white">
                {name}
            </h3>
            <p className="mt-2 flex-1 font-body text-[14px] leading-relaxed text-secondary">
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span key={tag.name} className="tag">
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
)

const Works = () => {
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
                    {projects.map((project, index) => (
                        <ProjectCard key={`project-${index}`} index={index} {...project} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SectionWrapper(Works, "work")
