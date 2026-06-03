import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TbMenu2, TbX } from 'react-icons/tb'

import { styles } from '../styles'
import { navLinks, socialLinks } from '../constants'
import { Icon } from '../utils/icons'

const Navbar = () => {
    const [active, setActive] = useState('')
    const [open, setOpen] = useState(false)

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

    const select = (title) => {
        setActive(title)
        setOpen(false)
    }

    return (
        <nav
            className={`${styles.paddingX} fixed top-0 z-30 flex w-full items-center border-b border-white/10 bg-space-900/70 py-4 backdrop-blur-md`}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    data-cursor
                    onClick={() => { setActive(''); setOpen(false); window.scrollTo(0, 0) }}
                >
                    <img src="/logo.png" alt="Saurabh Yadav" className="h-9 w-9 object-contain" />
                    <p className="font-display text-[18px] uppercase tracking-tight text-white">
                        Saurabh Yadav
                    </p>
                </Link>

                {/* Desktop links */}
                <ul className="hidden list-none flex-row items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={() => select(link.title)}
                                className={`font-mono text-[14px] uppercase tracking-widest transition-colors ${
                                    active === link.title
                                        ? 'text-accent-lavender'
                                        : 'text-secondary hover:text-white'
                                }`}
                            >
                                <span className="mr-1 text-accent-lavender/50">/</span>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    data-cursor
                    aria-label="Open menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:border-accent-lavender/50 hover:text-accent-lavender lg:hidden"
                >
                    <TbMenu2 className="text-xl" />
                </button>
            </div>

            {/* Full-screen, terminal-style glass menu. Portaled to <body> so its
                backdrop-blur isn't nested inside the navbar's own backdrop-filter
                (which otherwise breaks the overlay's compositing). */}
            {createPortal(
                <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ backgroundColor: 'rgba(4, 5, 14, 0.94)' }}
                        className="fixed inset-0 z-[60] flex flex-col backdrop-blur-xl lg:hidden"
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
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:border-accent-lavender/50 hover:text-accent-lavender"
                            >
                                <TbX className="text-xl" />
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
                                    key={link.id}
                                    variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                                >
                                    <a
                                        href={`#${link.id}`}
                                        onClick={() => select(link.title)}
                                        data-cursor
                                        className="group flex items-baseline gap-4 py-2"
                                    >
                                        <span className="font-mono text-[14px] text-accent-lavender/70">
                                            0{i + 1}
                                        </span>
                                        <span className="font-display text-[13vw] uppercase leading-none tracking-tight text-white transition-colors group-hover:text-accent-lavender xs:text-[44px]">
                                            {link.title}
                                        </span>
                                    </a>
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
