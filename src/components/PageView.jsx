'use client'
import { useEffect, useState } from 'react'

// Wraps a page's human UI and its build-time AI-generated markdown twin.
// A fixed pill under the navbar switches between the two; the LLM view
// renders the raw markdown in a terminal-style panel with a copy button.
// The choice is mirrored to the URL (?view=llm) so it survives a refresh.
const VIEWS = [
    { key: 'human', label: 'Human' },
    { key: 'llm', label: 'LLM' },
]

export default function PageView({ page, markdown, children }) {
    const [view, setView] = useState('human')
    const [copied, setCopied] = useState(false)

    // Restore the view from the URL after hydration. Reading window.location
    // in an effect (instead of useSearchParams) keeps the page statically
    // prerendered with the human view — crawlers always index the real UI.
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get('view') === 'llm') {
            setView('llm')
        }
    }, [])

    const switchTo = (v) => {
        if (v === view) return
        setView(v)
        const url = new URL(window.location.href)
        if (v === 'llm') url.searchParams.set('view', 'llm')
        else url.searchParams.delete('view')
        window.history.replaceState(null, '', url)
        window.scrollTo(0, 0)
    }

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(markdown)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            // Clipboard unavailable (permissions / http) — nothing to do.
        }
    }

    return (
        <>
            {/* View switch — fixed just below the navbar on every page */}
            <div
                className="fixed right-4 top-[84px] z-30 flex items-center rounded-full border border-white/10 bg-space-900/70 p-1 backdrop-blur-md sm:right-8"
                role="group"
                aria-label="Page view"
            >
                {VIEWS.map((v) => (
                    <button
                        key={v.key}
                        type="button"
                        onClick={() => switchTo(v.key)}
                        data-cursor
                        aria-pressed={view === v.key}
                        className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all ${
                            view === v.key
                                ? 'bg-accent-lavender/20 text-accent-lavender'
                                : 'text-secondary hover:text-white'
                        }`}
                    >
                        {v.label}
                    </button>
                ))}
            </div>

            {view === 'human' ? (
                children
            ) : (
                <section className="mx-auto min-h-screen max-w-4xl px-6 pb-24 pt-36 sm:px-16">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {/* Terminal chrome */}
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
                            <span className="truncate font-mono text-[12px] tracking-tight text-secondary">
                                <span className="text-accent-mint">saurabh</span>
                                <span className="text-white/40">@</span>
                                <span className="text-accent-sky">portfolio</span>
                                <span className="text-white/40">:~$</span>{' '}
                                <span className="text-white">cat {page}.md</span>
                            </span>
                            <button
                                type="button"
                                onClick={copy}
                                data-cursor
                                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-secondary transition-colors hover:border-accent-lavender/50 hover:text-accent-lavender"
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-6 font-mono text-[13px] leading-[22px] text-secondary sm:px-8">
                            {markdown}
                        </pre>
                    </div>
                    <p className="mt-4 font-mono text-[12px] leading-relaxed text-secondary/70">
                        AI-generated at build time from this page&apos;s content — made for LLMs,
                        readable by humans. Whole-site version at{' '}
                        <a href="/llms.txt" data-cursor className="text-accent-lavender hover:underline">
                            /llms.txt
                        </a>
                        .
                    </p>
                </section>
            )}
        </>
    )
}
