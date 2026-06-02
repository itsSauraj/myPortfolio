// Infinite horizontal scrolling band used as a subtle section divider.
// The track holds two identical copies of the items and animates -50%, so the
// loop is seamless. Pause on hover for a tactile feel.
const Marquee = ({
    items = [],
    reverse = false,
    className = "text-accent-lavender",
}) => {
    const loop = [...items, ...items]

    return (
        <div
            className={`group relative w-full overflow-hidden border-y border-white/10 bg-white/[0.02] py-3 backdrop-blur-sm ${className}`}
            aria-hidden="true"
        >
            <div
                className={`marquee-track group-hover:[animation-play-state:paused] ${
                    reverse ? "animate-marquee-reverse" : "animate-marquee"
                }`}
            >
                {loop.map((item, i) => (
                    <span
                        key={i}
                        className="mx-6 flex items-center gap-6 whitespace-nowrap font-mono text-[13px] font-bold uppercase tracking-[0.25em]"
                    >
                        {item}
                        <span className="text-accent-lavender/40">✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Marquee
