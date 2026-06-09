'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { styles } from '../styles'
import { navLinks, socialLinks } from '../constants'
import { menu, close } from '../assets'
import { Icon } from '../utils/icons'

// Section links navigate to the home route + hash (works from any page; the
// ScrollToHash helper in App smooth-scrolls after navigation). A link with a
// `route` (e.g. Projects) is a normal page route.
const linkTo = (link) => link.route || (link.id ? `/#${link.id}` : '/')
const keyOf = (link) => link.id || link.route

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [currentHash, setCurrentHash] = useState('')
    const pathname = usePathname()

    const isActive = (link) => {
        if (link.route) return pathname === link.route
        return pathname === '/' && currentHash === `#${link.id}`
    }

    useEffect(() => {
        setMounted(true)
        const updateHash = () => setCurrentHash(window.location.hash)
        updateHash()
        window.addEventListener('hashchange', updateHash)
        return () => window.removeEventListener('hashchange', updateHash)
    }, [])

    // Lock page scroll + close on Escape while the full-screen menu is open.
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <nav
            className={`${styles.paddingX} fixed top-0 z-30 flex w-full items-center border-b border-white/10 bg-space-900/70 py-4 backdrop-blur-md`}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                    data-cursor
                    onClick={() => setOpen(false)}
                >
                    <img src="/logo.png" alt="Saurabh Yadav" className="h-9 w-9 object-contain" />
                    <p className="font-display text-[18px] uppercase tracking-tight text-white">
                        Saurabh Yadav
                    </p>
                </Link>

                {/* Desktop links */}
                <ul className="hidden list-none flex-row items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <li key={keyOf(link)}>
                            <Link
                                href={linkTo(link)}
                                className={`font-mono text-[14px] uppercase tracking-widest transition-colors ${
                                    isActive(link)
                                        ? 'text-accent-lavender'
                                        : 'text-secondary hover:text-white'
                                }`}
                            >
                                <span className="mr-1 text-accent-lavender/50">/</span>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    data-cursor
                    aria-label="Open menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-accent-lavender/50 lg:hidden"
                >
                    <img src={menu} alt="menu" className="h-6 w-6 object-contain" />
                </button>
            </div>

            {/* Full-screen, terminal-style glass menu. Portaled to <body> so its
                backdrop-blur isn't nested inside the navbar's own backdrop-filter. */}
            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ backgroundColor: 'rgba(2, 3, 10, 0.6)', WebkitBackdropFilter: 'blur(24px)' }}
                            className="fixed inset-0 z-[60] flex flex-col lg:hidden"
                        >
                            {/* Terminal chrome */}
                            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                                <span className="font-mono text-[12px] tracking-tight text-secondary">
                                    <span className="text-accent-mint">saurabh</span>
                                    <span className="text-white/40">@</span>
                                    <span className="text-accent-sky">portfolio</span>
                                    <span className="text-white/40">:~$</span>{' '}
                                    <span className="text-white">ls --sections</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    data-cursor
                                    aria-label="Close menu"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-accent-lavender/50"
                                >
                                    <img src={close} alt="close" className="h-5 w-5 object-contain" />
                                </button>
                            </div>

                            {/* Links */}
                            <motion.ul
                                className="flex flex-1 flex-col justify-center gap-1 px-8"
                                initial="hidden"
                                animate="show"
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } }}
                            >
                                {navLinks.map((link, i) => (
                                    <motion.li
                                        key={keyOf(link)}
                                        variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                                    >
                                        <Link
                                            href={linkTo(link)}
                                            onClick={() => setOpen(false)}
                                            data-cursor
                                            className="group flex items-baseline gap-4 py-2"
                                        >
                                            <span className="font-mono text-[14px] text-accent-lavender/70">
                                                0{i + 1}
                                            </span>
                                            <span className="font-display text-[13vw] uppercase leading-none tracking-tight text-white transition-colors group-hover:text-accent-lavender xs:text-[44px]">
                                                {link.title}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Footer: status + socials */}
                            <div className="border-t border-white/10 px-8 py-6">
                                <div className="mb-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-secondary">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent-mint" />
                                    Available for work
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((s) => (
                                        <a
                                            key={s.name}
                                            href={s.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            data-cursor
                                            title={s.name}
                                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-secondary transition-colors hover:border-accent-lavender/50 hover:text-accent-lavender"
                                        >
                                            <Icon name={s.iconKey} className="text-[18px]" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </nav>
    )
}

export default Navbar
