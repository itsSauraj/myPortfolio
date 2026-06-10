'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToHash() {
    const pathname = usePathname()

    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const id = setTimeout(() => {
                const el = document.querySelector(hash)
                if (el) {
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 })
                    else el.scrollIntoView()
                }
            }, 140)
            return () => clearTimeout(id)
        }
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
    }, [pathname])

    return null
}
