import '../src/index.css'
import { Navbar, Footer, CustomCursor, GrainOverlay, IntroReveal, ScrollProgress, SpotlightGrid } from '../src/components'
import ClientProviders from '../src/components/ClientProviders'
import ScrollToHash from '../src/components/ScrollToHash'

const GA_ID = 'G-YVHLS3QNYL'

export const metadata = {
    title: 'Saurabh Yadav | Full Stack & AI Developer in Surat, India',
    description:
        'Saurabh Yadav — Full Stack & AI Developer based in Surat, Gujarat, India. Building scalable web applications and AI integrations with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, and AWS. Creator of Instant, NovaFetch, and S3 File Manager.',
    keywords: [
        // Branded — personal identity
        'Saurabh Yadav', 'Saurabh Yadav developer', 'Saurabh Yadav portfolio',
        'Saurabh Yadav full stack', 'Saurabh Yadav India', 'Saurabh Yadav Surat',
        'Saurabh Yadav software engineer', 'itsSauraj', 'saurabh-yadav.me',
        'Saurabh Yadav AI developer', 'Saurabh Yadav website',
        'Saurabh Yadav LinkedIn', 'Saurabh Yadav GitHub', 'Saurabh Yadav X Twitter',
        'Saurabh Yadav email', 'Saurabh Yadav contact', 'contact@saurabh-yadav.me',
        'Saurabh Yadav apps', 'Saurabh Yadav projects', 'Saurabh Yadav resume',

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
        'AI developers in India', 'AI developer India', 'AI engineer India',
        'AI developer Surat', 'AI engineer Surat', 'AI integration developer India',
        'LLM integration developer', 'hire AI developer India',
        'developers in India', 'best developers in Surat',

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
        'Instant app', 'Instant WebRTC sharing rooms', 'Instant P2P file sharing',
        'NovaFetch', 'NovaFetch YouTube downloader', 'NovaFetch developer',

        // Domain / intent
        'software engineer portfolio', 'developer portfolio India',
        'full stack portfolio', 'open source developer India',
    ],
    authors: [{ name: 'Saurabh Yadav', url: 'https://saurabh-yadav.me' }],
    creator: 'Saurabh Yadav',
    publisher: 'Saurabh Yadav',
    robots: { index: true, follow: true },
    metadataBase: new URL('https://saurabh-yadav.me'),
    alternates: { canonical: '/' },
    // Google Search Console ownership proof — set GOOGLE_SITE_VERIFICATION in
    // the environment (Vercel dashboard / .env.local); omitted when unset.
    ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
        : {}),
    openGraph: {
        type: 'profile',
        siteName: 'Saurabh Yadav',
        locale: 'en_US',
        title: 'Saurabh Yadav | Full Stack & AI Developer in Surat, India',
        description:
            'Full Stack & AI Developer in Surat, India — Python, Django, FastAPI, React, Next.js, TypeScript, AI integrations, Docker, Kubernetes, AWS. Creator of Instant, NovaFetch, and S3 File Manager.',
        url: 'https://saurabh-yadav.me',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Saurabh Yadav — Full Stack & AI Developer based in Surat, India',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@itssauraj',
        creator: '@itssauraj',
        title: 'Saurabh Yadav | Full Stack & AI Developer in Surat, India',
        description:
            'Full Stack & AI Developer in Surat, India — Python, Django, FastAPI, React, Next.js, TypeScript, AI integrations, Docker, Kubernetes, AWS.',
        images: ['/og-image.png'],
    },
}

const person = {
    '@type': 'Person',
    '@id': 'https://saurabh-yadav.me/#person',
    name: 'Saurabh Yadav',
    alternateName: ['itsSauraj', 'Saurabh Yadav (itsSauraj)'],
    url: 'https://saurabh-yadav.me',
    mainEntityOfPage: 'https://saurabh-yadav.me',
    image: 'https://saurabh-yadav.me/og-image.png',
    jobTitle: 'Full Stack Engineer',
    email: 'contact@saurabh-yadav.me',
    description:
        'Full Stack & AI Developer based in Surat, Gujarat, India. Builds scalable web applications and AI integrations with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, Kubernetes, and AWS. Creator of Instant, NovaFetch, and S3 File Manager.',
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
        'AI Integrations', 'Artificial Intelligence', 'LLM Integrations',
        'Docker', 'Kubernetes', 'AWS', 'GCP', 'LangChain',
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
        alternateName: ['saurabh-yadav.me', 'Saurabh Yadav Portfolio'],
        description: 'Portfolio of Saurabh Yadav — Full Stack & AI Developer in Surat, India',
        author: { '@id': 'https://saurabh-yadav.me/#person' },
        publisher: { '@id': 'https://saurabh-yadav.me/#person' },
        inLanguage: 'en',
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
                {/* Google Analytics — in <head> so GA's detection tool finds it in raw HTML */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
                    }}
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
