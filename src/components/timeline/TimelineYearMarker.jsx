const TimelineYearMarker = ({ year }) => (
    <>
        {/* Desktop column (hidden on mobile) */}
        <div className='hidden md:flex h-full w-20 shrink-0 flex-col items-center justify-center'>
            <span className='z-10 rounded-full border border-white/10 bg-[#050816] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/40'>
                {year}
            </span>
        </div>

        {/* Mobile divider (hidden on desktop) */}
        <div className='flex md:hidden w-full items-center gap-3 py-2'>
            <div className='h-px flex-1 bg-white/10' />
            <span className='font-mono text-[10px] uppercase tracking-widest text-white/30'>
                {year}
            </span>
            <div className='h-px flex-1 bg-white/10' />
        </div>
    </>
)

export default TimelineYearMarker
