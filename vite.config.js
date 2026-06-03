import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', 'logo.png', 'icon_black_bg.png'],
            manifest: {
                name: 'Saurabh Yadav | Full Stack Engineer',
                short_name: 'Saurabh Yadav',
                description:
                    'Portfolio of Saurabh Yadav — Full Stack Engineer building scalable web apps across Python/Django/FastAPI, React/Next.js, AI integrations, and cloud DevOps.',
                theme_color: '#02030a',
                background_color: '#02030a',
                display: 'standalone',
                orientation: 'portrait-primary',
                start_url: '/',
                scope: '/',
                icons: [
                    { src: '/icon_black_bg.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    { src: '/icon_black_bg.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
            },
            // Precache the app shell only; large 3D/image assets load over the network.
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,woff2}'],
                navigateFallback: '/index.html',
                cleanupOutdatedCaches: true,
            },
            // SW is enabled for production builds (and `vite preview`); kept off in
            // `vite dev` so it doesn't cache assets during development.
            devOptions: {
                enabled: false,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        open: false,
    },
})
