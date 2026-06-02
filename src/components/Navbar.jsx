import { useState } from 'react'
import { Link } from 'react-router-dom'

import { styles } from '../styles'
import { navLinks } from '../constants'
import { menu, close } from '../assets'

const Navbar = () => {
    const [active, setActive] = useState('')
    const [toggle, setToggle] = useState(false)

    return (
        <nav
            className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center border-b border-white/10 bg-space-900/70 py-4 backdrop-blur-md`}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    data-cursor
                    onClick={() => {
                        setActive("")
                        window.scrollTo(0, 0)
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Saurabh Yadav logo"
                        className="h-9 w-9 object-contain"
                    />
                    <p className="font-display text-[18px] font-bold uppercase tracking-tight text-white">
                        Saurabh Yadav
                    </p>
                </Link>

                <ul className="hidden list-none flex-row gap-8 sm:flex">
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            className={`${active === link.title ? "text-accent-lavender" : "text-secondary"} font-mono text-[14px] font-bold uppercase tracking-widest transition-colors hover:text-white`}
                            onClick={() => setActive(link.title)}
                        >
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-1 items-center justify-end sm:hidden">
                    <img
                        src={toggle ? close : menu}
                        alt="menu"
                        className="h-7 w-7 cursor-pointer object-contain"
                        onClick={() => setToggle(!toggle)}
                    />
                    <div
                        className={`${!toggle ? 'hidden' : 'flex'} absolute right-4 top-16 z-10 min-w-[160px] rounded-2xl border border-white/10 bg-space-800/95 p-5 shadow-soft backdrop-blur-md`}
                    >
                        <ul className="flex list-none flex-col items-start gap-4">
                            {navLinks.map((link) => (
                                <li
                                    key={link.id}
                                    className={`${active === link.title ? "text-accent-lavender" : "text-secondary"} font-mono text-[14px] font-bold uppercase tracking-widest`}
                                    onClick={() => {
                                        setToggle(!toggle)
                                        setActive(link.title)
                                    }}
                                >
                                    <a href={`#${link.id}`}>{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
