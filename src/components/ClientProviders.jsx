'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function ClientProviders({ children }) {
    useEffect(() => {
        const handleContextmenu = (e) => e.preventDefault()
        document.addEventListener('contextmenu', handleContextmenu)

        const lenis = new Lenis()
        window.__lenis = lenis

        let rafId = null
        let cancelled = false
        const raf = (time) => {
            if (cancelled) return
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        const mq = window.matchMedia('(pointer: fine)')
        if (mq.matches) document.body.classList.add('has-custom-cursor')
        const onPointerChange = (e) => {
            if (e.matches) document.body.classList.add('has-custom-cursor')
            else document.body.classList.remove('has-custom-cursor')
        }
        mq.addEventListener('change', onPointerChange)

        return () => {
            cancelled = true
            if (rafId !== null) cancelAnimationFrame(rafId)
            document.removeEventListener('contextmenu', handleContextmenu)
            lenis.destroy()
            window.__lenis = null
            mq.removeEventListener('change', onPointerChange)
        }
    }, [])

    return <>{children}</>
}
