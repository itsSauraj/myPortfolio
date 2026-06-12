import '../src/index.css'
import Script from 'next/script'
import { Navbar, Footer, CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, SpotlightGrid } from '../src/components'
import ClientProviders from '../src/components/ClientProviders'
import ScrollToHash from '../src/components/ScrollToHash'

const GA_ID = 'G-YVHLS3QNYL'

export const metadata = {
    title: 'Saurabh Yadav | Full Stack Developer in Surat, India',
    description:
        'Saurabh Yadav — Full Stack Developer based in Surat, India. Building scalable web applications with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, and AWS.',
    keywords: [
        // Branded — personal identity
        'Saurabh Yadav', 'Saurabh Yadav developer', 'Saurabh Yadav portfolio',
        'Saurabh Yadav full stack', 'Saurabh Yadav India', 'Saurabh Yadav Surat',
        'Saurabh Yadav software engineer', 'itsSauraj',

        // Local — Surat / Gujarat / India
        'developers in Surat', 'developer in Surat', 'software developer Surat',
        'full stack developer Surat', 'full stack engineer Surat India',
        'web developer Surat', 'web developer Surat India',
        'Python developer Surat', 'React developer Surat', 'backend developer Surat',
        'software engineer Surat', 'software engineer Surat Gujarat India',
        'IT professional Surat', 'hire developer Surat India',
        'developer Surat Gujarat', 'programmer Surat India',

        // Role / title
        'Full Stack Developer', 'Full Stack Engineer', 'Backend Developer',
        'Frontend Developer', 'Software Engineer', 'Web Developer',
        'Python Developer', 'Django Developer', 'FastAPI Developer',
        'React Developer', 'Next.js Developer', 'Node.js Developer',
        'TypeScript Developer', 'AI Developer', 'Cloud Engineer',
        'full stack developer India', 'software engineer India',
        'hire full stack developer India', 'remote developer India',

        // Skills & technologies
        'Python', 'Django', 'FastAPI', 'Celery', 'REST API',
        'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
        'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
        'AWS', 'GCP', 'Cloudflare', 'GitHub Actions', 'CI/CD',
        'AI Integrations', 'LangChain', 'OpenAI', 'Anthropic', 'Claude',
        'HuggingFace', 'OpenRouter',

        // Company / project associations
        'La Net Team developer', 'La Net Team Software Solutions developer',
        'La Net Team Surat developer', 'La Net Team team lead',
        'Yogya Capital developer', 'Yogya Capital team lead',
        'Scoop Investment developer', 'Scoop Investment team lead',
        'Yogya Capital Scoop Investment', 'theBackOffice developer',
        'MetricsNavigator developer', 'MetricsNavigator project developer',
        'DevRob developer', 'BCG internal tool developer',
        'Finance NSE platform developer', 'multi-tenant CA system developer',
        'S3 file manager developer', 's3-gnome-manager',

        // Domain / intent
        'software engineer portfolio', 'developer portfolio India',
        'full stack portfolio', 'open source developer India',
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
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}');
                    `}
                </Script>
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
