import '../src/index.css'
import { Navbar, Footer, CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, SpotlightGrid } from '../src/components'
import ClientProviders from '../src/components/ClientProviders'
import ScrollToHash from '../src/components/ScrollToHash'

export const metadata = {
    title: 'Saurabh Yadav | Full Stack Developer in Surat, India',
    description:
        'Saurabh Yadav — Full Stack Developer based in Surat, India. Building scalable web applications with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, and AWS.',
    keywords: [
        'Saurabh Yadav', 'Full Stack Developer', 'Full Stack Engineer',
        'developer in Surat', 'full stack developer Surat', 'software engineer Surat India',
        'web developer Surat', 'full stack engineer Surat India',
        'Python developer India', 'React developer Surat',
        'Python', 'Django', 'FastAPI', 'React', 'Next.js', 'TypeScript',
        'AI Integrations', 'Docker', 'Kubernetes', 'AWS', 'software engineer portfolio',
    ],
    authors: [{ name: 'Saurabh Yadav', url: 'https://saurabh-yadav.me' }],
    robots: { index: true, follow: true },
    metadataBase: new URL('https://saurabh-yadav.me'),
    alternates: { canonical: '/' },
    openGraph: {
        type: 'profile',
        siteName: 'Saurabh Yadav',
        locale: 'en_US',
        title: 'Saurabh Yadav | Full Stack Developer in Surat, India',
        description:
            'Full Stack Developer in Surat, India — Python, Django, FastAPI, React, Next.js, TypeScript, AI integrations, Docker, Kubernetes, AWS.',
        url: 'https://saurabh-yadav.me',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Saurabh Yadav — Full Stack Developer based in Surat, India',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@itssauraj',
        creator: '@itssauraj',
        title: 'Saurabh Yadav | Full Stack Developer in Surat, India',
        description:
            'Full Stack Developer in Surat, India — Python, Django, FastAPI, React, Next.js, TypeScript, AI integrations, Docker, Kubernetes, AWS.',
        images: ['/og-image.png'],
    },
}

const person = {
    '@type': 'Person',
    '@id': 'https://saurabh-yadav.me/#person',
    name: 'Saurabh Yadav',
    url: 'https://saurabh-yadav.me',
    image: 'https://saurabh-yadav.me/og-image.png',
    jobTitle: 'Full Stack Engineer',
    email: 'contact@saurabh-yadav.me',
    description:
        'Full Stack Engineer based in Surat, India. Builds scalable web applications with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, and AWS.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
    },
    worksFor: {
        '@type': 'Organization',
        name: 'La Net Team Software Solutions Pvt. Ltd.',
    },
    hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Engineer',
        occupationLocation: {
            '@type': 'City',
            name: 'Surat',
        },
        skills: 'Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, AWS, GCP',
    },
    knowsAbout: [
        'Python', 'Django', 'FastAPI', 'React', 'Next.js', 'TypeScript',
        'AI Integrations', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'LangChain',
    ],
    sameAs: [
        'https://github.com/itsSauraj',
        'https://www.linkedin.com/in/saurabhyadav07',
        'https://x.com/itssauraj',
        'https://www.hackerrank.com/sy8502630',
    ],
}

const schemaOrg = [
    {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': 'https://saurabh-yadav.me/#profilepage',
        url: 'https://saurabh-yadav.me',
        name: 'Saurabh Yadav — Full Stack Developer Portfolio',
        description:
            'Portfolio of Saurabh Yadav, Full Stack Developer based in Surat, India.',
        mainEntity: person,
    },
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://saurabh-yadav.me/#website',
        url: 'https://saurabh-yadav.me',
        name: 'Saurabh Yadav',
        description: 'Portfolio of Saurabh Yadav — Full Stack Developer in Surat, India',
        author: { '@id': 'https://saurabh-yadav.me/#person' },
    },
]

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
