export const dynamic = 'force-dynamic'

import '../src/index.css'
import { Navbar, Footer, CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, SpotlightGrid } from '../src/components'
import ClientProviders from '../src/components/ClientProviders'
import ScrollToHash from '../src/components/ScrollToHash'

export const metadata = {
    title: 'Saurabh Yadav | Full Stack Engineer',
    description:
        'Saurabh Yadav — Full Stack Engineer building high-performing, scalable web applications across Python/Django/FastAPI, React/Next.js/TypeScript, AI integrations, and cloud DevOps.',
    keywords: [
        'Saurabh Yadav', 'Full Stack Engineer', 'Backend Developer',
        'Python', 'Django', 'FastAPI', 'React', 'Next.js', 'TypeScript',
        'AI Integrations', 'Docker', 'Kubernetes', 'AWS', 'software engineer portfolio',
    ],
    authors: [{ name: 'Saurabh Yadav', url: 'https://saurabh-yadav.me' }],
    robots: { index: true, follow: true },
    metadataBase: new URL('https://saurabh-yadav.me'),
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: 'Saurabh Yadav',
        locale: 'en_US',
        title: 'Saurabh Yadav | Full Stack Engineer',
        description:
            'Full Stack Engineer — backend, AI integrations, and cloud. Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, AWS.',
        url: 'https://saurabh-yadav.me',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Saurabh Yadav — Full Stack Engineer portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@itssauraj',
        creator: '@itssauraj',
        title: 'Saurabh Yadav | Full Stack Engineer',
        description:
            'Full Stack Engineer — backend, AI integrations, and cloud. Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, AWS.',
        images: ['/og-image.png'],
    },
}

const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saurabh Yadav',
    url: 'https://saurabh-yadav.me',
    image: 'https://saurabh-yadav.me/og-image.png',
    jobTitle: 'Full Stack Engineer',
    email: 'mailto:contact@saurabh-yadav.me',
    sameAs: [
        'https://github.com/itsSauraj',
        'https://www.linkedin.com/in/saurabhyadav07',
        'https://x.com/itssauraj',
    ],
    knowsAbout: [
        'Python', 'Django', 'FastAPI', 'React', 'Next.js', 'TypeScript',
        'AI Integrations', 'Docker', 'Kubernetes', 'AWS',
    ],
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#02030a" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
                />
            </head>
            <body suppressHydrationWarning>
                <ClientProviders>
                    <IntroReveal />
                    <GrainOverlay />
                    <CustomCursor />
                    <ScrollProgress />
                    <ScrollToHash />

                    <div className="relative z-0">
                        <SpotlightGrid />
                        <div className="relative z-10">
                            <Navbar />
                            {children}
                            <Footer />
                        </div>
                    </div>
                </ClientProviders>
            </body>
        </html>
    )
}
