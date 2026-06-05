'use client'
import { motion } from 'framer-motion'

const TAG_COLORS = {
    'blue-text-gradient':   'text-[#9FD4FF]',
    'green-text-gradient':  'text-[#A9E8D0]',
    'pink-text-gradient':   'text-[#F3C0E0]',
    'orange-text-gradient': 'text-[#FBBF7A]',
}

const TimelineCard = ({ item }) => {
    const isWork = item.type === 'work'

    return (
        <motion.div
            className='group relative w-full rounded-xl border bg-white/[0.03] p-4 backdrop-blur-sm md:w-56'
            style={{ borderColor: isWork ? '#C9B8FF44' : `${item.accent}44` }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Accent top bar */}
            <div
                className='absolute inset-x-0 top-0 h-[2px] rounded-t-xl'
                style={{ backgroundColor: item.accent }}
            />

            {/* Header */}
            <div className='mt-1'>
                <p className='font-mono text-[10px] uppercase tracking-widest text-white/40'>
                    {item.date}
                </p>
                <h3 className='mt-1 font-display text-[15px] font-semibold leading-snug text-white'>
                    {item.title}
                </h3>
                {item.company && (
                    <p className='mt-0.5 font-mono text-[11px] text-white/50'>
                        {item.company}
                        {item.location ? ` · ${item.location}` : ''}
                    </p>
                )}
            </div>

            {/* Body — always visible */}
            <p className='mt-3 font-body text-[12px] leading-relaxed text-secondary'>
                {item.description}
            </p>

            <div className='mt-3 flex flex-wrap gap-1.5'>
                {item.tags.map((tag) => (
                    <span
                        key={tag.name}
                        className={`font-mono text-[10px] ${TAG_COLORS[tag.color] ?? 'text-white/50'}`}
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>

            {(item.links?.live || item.links?.source) && (
                <div className='mt-3 flex gap-2'>
                    {item.links.live && (
                        <a
                            href={item.links.live}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-white/30 hover:text-white'
                        >
                            Live ↗
                        </a>
                    )}
                    {item.links.source && (
                        <a
                            href={item.links.source}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-white/30 hover:text-white'
                        >
                            Source ↗
                        </a>
                    )}
                </div>
            )}
        </motion.div>
    )
}

export default TimelineCard
