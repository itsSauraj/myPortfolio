'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function ClientProviders({ children }) {
    useEffect(() => {
        const handleContextmenu = (e) => e.preventDefault()
        document.addEventListener('contextmenu', handleContextmenu)

        const lenis = new Lenis()
        window.__lenis = lenis
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        const mq = window.matchMedia('(pointer: fine)')
        if (mq.matches) document.body.classList.add('has-custom-cursor')
        const onPointerChange = (e) => {
            if (e.matches) document.body.classList.add('has-custom-cursor')
            else document.body.classList.remove('has-custom-cursor')
        }
        mq.addEventListener('change', onPointerChange)

        return () => {
            document.removeEventListener('contextmenu', handleContextmenu)
            lenis.destroy()
            window.__lenis = null
            mq.removeEventListener('change', onPointerChange)
        }
    }, [])

    return <>{children}</>
}
