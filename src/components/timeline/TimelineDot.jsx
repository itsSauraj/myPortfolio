'use client'
const TimelineDot = ({ accent = '#C9B8FF' }) => (
    <div
        className='relative z-10 h-3 w-3 shrink-0 rounded-full'
        style={{
            backgroundColor: accent,
            boxShadow: `0 0 10px 2px ${accent}55`,
        }}
    />
)

export default TimelineDot
