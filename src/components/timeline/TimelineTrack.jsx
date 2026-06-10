'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import TimelineCard from './TimelineCard'
import TimelineDot from './TimelineDot'
import TimelineYearMarker from './TimelineYearMarker'

function buildDisplayItems(items) {
    const sorted = [...items].sort((a, b) => a.sortDate.localeCompare(b.sortDate))
    const display = []
    let lastYear = null
    sorted.forEach((item) => {
        const year = item.sortDate.slice(0, 4)
        if (year !== lastYear) {
            display.push({ type: 'year', year })
            lastYear = year
        }
        display.push(item)
    })
    return display
}

const TimelineTrack = ({ items }) => {
    const trackRef = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollStart = useRef(0)
    const [progress, setProgress] = useState(0)

    const displayItems = buildDisplayItems(items)

    const handleWheel = useCallback((e) => {
        if (!trackRef.current) return
        e.preventDefault()
        trackRef.current.scrollLeft += e.deltaY + e.deltaX
    }, [])

    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [handleWheel])

    const onMouseDown = (e) => {
        isDragging.current = true
        startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
        scrollStart.current = trackRef.current?.scrollLeft ?? 0
        if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
    }
    const onMouseMove = (e) => {
        if (!isDragging.current || !trackRef.current) return
        const x = e.pageX - (trackRef.current.offsetLeft ?? 0)
        trackRef.current.scrollLeft = scrollStart.current - (x - startX.current)
    }
    const onMouseUp = () => {
        isDragging.current = false
        if (trackRef.current) trackRef.current.style.cursor = 'grab'
    }

    const onKeyDown = (e) => {
        if (!trackRef.current) return
        if (e.key === 'ArrowRight') trackRef.current.scrollLeft += 240
        if (e.key === 'ArrowLeft')  trackRef.current.scrollLeft -= 240
    }

    const onScroll = () => {
        if (!trackRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
        setProgress(scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0)
    }

    return (
        <div className='relative w-full'>
            {/* DESKTOP LAYOUT (md+) */}
            <div
                ref={trackRef}
                tabIndex={0}
                role='region'
                aria-label='Career timeline'
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                className='relative hidden md:flex h-[620px] w-full cursor-grab select-none overflow-x-auto overflow-y-hidden items-stretch px-16 py-8 focus:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                style={{ scrollBehavior: 'auto' }}
            >
                {/* Spine */}
                <div
                    className='pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2'
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(201,184,255,0.25) 5%, rgba(201,184,255,0.25) 95%, transparent)' }}
                />

                {displayItems.map((item, i) => {
                    if (item.type === 'year') {
                        return (
                            <div key={`year-${item.year}-${i}`} className='relative h-full w-24 shrink-0'>
                                <span className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#C9B8FF]/50 bg-[#1a1040] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#C9B8FF]'
                                    style={{ boxShadow: '0 0 12px 2px rgba(201,184,255,0.25)' }}>
                                    {item.year}
                                </span>
                            </div>
                        )
                    }

                    const isWork = item.type === 'work'

                    return (
                        <div
                            key={`${item.title}-${i}`}
                            className='relative flex h-full w-60 shrink-0 flex-col items-center px-2'
                        >
                            <div className='flex flex-1 w-full items-end pb-2'>
                                {isWork
                                    ? <TimelineCard item={item} position='above' />
                                    : <div className='w-full' />
                                }
                            </div>

                            <div className='relative z-10 flex flex-col items-center'>
                                <div className='h-4 w-px' style={{ background: `${item.accent}55` }} />
                                <TimelineDot accent={item.accent} />
                                <div className='h-4 w-px' style={{ background: `${item.accent}55` }} />
                            </div>

                            <div className='flex flex-1 w-full pt-2'>
                                {!isWork
                                    ? <TimelineCard item={item} position='below' />
                                    : <div className='w-full' />
                                }
                            </div>
                        </div>
                    )
                })}

                <div className='w-16 shrink-0' />
            </div>

            {/* Desktop progress bar */}
            <div className='relative hidden md:block mx-16 mt-2 h-[2px] rounded-full bg-white/5'>
                <div
                    className='absolute inset-y-0 left-0 rounded-full bg-[#C9B8FF]/40 transition-all duration-75'
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {/* MOBILE LAYOUT (< md) */}
            <div className='flex md:hidden flex-col px-5 pb-16'>
                {displayItems.map((item, i) => {
                    if (item.type === 'year') {
                        return <TimelineYearMarker key={`year-${item.year}-${i}`} year={item.year} />
                    }

                    return (
                        <div key={`${item.title}-${i}`} className='flex gap-4 py-3'>
                            <div className='flex flex-col items-center'>
                                <div className='w-px flex-1 bg-white/10' />
                                <TimelineDot accent={item.accent} />
                                <div className='w-px flex-1 bg-white/10' />
                            </div>

                            <div className='flex-1 pb-2 pt-0.5'>
                                <p className='font-mono text-[10px] uppercase tracking-widest text-white/40'>
                                    {item.date}
                                    <span className='ml-2 text-white/20'>
                                        {item.type === 'work' ? '· work' : '· project'}
                                    </span>
                                </p>
                                <h3 className='mt-0.5 font-display text-[15px] font-semibold text-white'>
                                    {item.title}
                                </h3>
                                {item.company && (
                                    <p className='font-mono text-[11px] text-white/50'>
                                        {item.company}{item.location ? ` · ${item.location}` : ''}
                                    </p>
                                )}
                                <p className='mt-2 font-body text-[13px] leading-relaxed text-secondary'>
                                    {item.description}
                                </p>
                                <div className='mt-2 flex flex-wrap gap-1.5'>
                                    {item.tags.map((tag) => (
                                        <span key={tag.name} className='font-mono text-[10px] text-white/40'>
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                                {(item.links?.live || item.links?.source) && (
                                    <div className='mt-2 flex gap-2'>
                                        {item.links.live && (
                                            <a href={item.links.live} target='_blank' rel='noopener noreferrer'
                                                className='rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/60 hover:text-white'>
                                                Live ↗
                                            </a>
                                        )}
                                        {item.links.source && (
                                            <a href={item.links.source} target='_blank' rel='noopener noreferrer'
                                                className='rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/60 hover:text-white'>
                                                Source ↗
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TimelineTrack
