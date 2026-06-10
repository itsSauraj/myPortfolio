'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">

            {/* Faint grid background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(201,184,255,0.04) 1px, transparent 1px),' +
                        'linear-gradient(90deg, rgba(201,184,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            {/* Radial glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(600px circle at 50% 40%, rgba(201,184,255,0.07), transparent 70%)',
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* 404 number */}
                <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-lavender mb-4">
                    Error 404
                </p>

                <h1
                    className="font-display text-[clamp(120px,20vw,220px)] uppercase leading-none tracking-tight text-white"
                    style={{ textShadow: '0 0 80px rgba(201,184,255,0.2)' }}
                >
                    404
                </h1>

                <div className="mt-2 h-[2px] w-20 bg-accent-lavender/60" />

                <p className="mt-8 max-w-md font-body text-[16px] leading-relaxed text-secondary">
                    This page doesn't exist — or was moved to a black hole somewhere in the cluster.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-xl border border-accent-lavender/40 bg-accent-lavender/10 px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-accent-lavender transition-all hover:bg-accent-lavender/20 hover:shadow-glow"
                    >
                        ← Locate Me
                    </Link>
<Link
                        href="/projects"
                        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-secondary transition-all hover:border-white/20 hover:text-white"
                    >
                        My Artifacts →
                    </Link>
                </div>
            </motion.div>

            {/* Bottom grid pulse lines */}
            <span className="hero-pulse-v pointer-events-none" style={{ right: '20%', animationDelay: '0s' }} />
            <span className="hero-pulse-v pointer-events-none" style={{ right: '70%', animationDelay: '3.2s' }} />
            <span className="hero-pulse-h pointer-events-none" style={{ top: '30%', animationDelay: '1.5s' }} />
        </section>
    )
}
