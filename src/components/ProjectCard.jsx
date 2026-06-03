import { motion } from "framer-motion"

import { github_w, website } from "../assets"
import { fadeIn } from "../utils/motion"

// Shared project card used by the home "Selected Projects" preview and the
// dedicated /projects page. Shows the category (top-left), and either a
// Private badge or live/source buttons (top-right).
const ProjectCard = ({
    index = 0,
    name,
    description,
    tags,
    image,
    project_link,
    source_code_link,
    private: isPrivate,
    accent,
    category,
}) => (
    <motion.div
        variants={fadeIn("up", "spring", (index % 8) * 0.08, 0.6)}
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
                        style={{ background: `radial-gradient(circle at 50% 42%, ${accent}33, transparent 70%)` }}
                    />
                    <span
                        className="relative text-center font-display text-[26px] font-bold uppercase leading-none tracking-tight"
                        style={{ color: accent }}
                    >
                        {name}
                    </span>
                </div>
            )}

            {category && (
                <span className="badge absolute left-3 top-3 border-white/15 bg-space-900/70 text-secondary backdrop-blur-sm">
                    {category}
                </span>
            )}

            {isPrivate ? (
                <span className="badge absolute right-3 top-3 border-accent-lavender/40 bg-space-900/80 text-accent-lavender backdrop-blur-sm">
                    Private
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

export default ProjectCard
