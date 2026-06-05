'use client'
import { socialLinks } from "../constants";
import { Icon } from "../utils/icons";

const year = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-space-900/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
                <div className="text-center sm:text-left">
                    <p className="font-display text-[22px] font-bold uppercase tracking-tight text-white">
                        Saurabh Yadav
                    </p>
                    <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent-lavender">
                        Full Stack Engineer
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    {socialLinks.map((social, index) => (
                        <a
                            href={social.link}
                            target="_blank"
                            rel="noreferrer"
                            key={index}
                            title={social.name}
                            data-cursor
                            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-lavender/50 hover:bg-accent-lavender/10 hover:text-accent-lavender hover:shadow-glow"
                        >
                            <Icon name={social.iconKey} className="text-[18px]" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="border-t-2 border-white/20 py-4">
                <p className="text-center font-mono text-[12px] uppercase tracking-widest text-secondary">
                    © {year} Saurabh Yadav — All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;
