import ProjectsClient from './ProjectsClient'
import PageView from '../../src/components/PageView'
import { getPageMarkdown } from '../../src/utils/getPageMarkdown'
import { projects } from '../../src/constants'

export const metadata = {
    title: 'Projects | Saurabh Yadav — Full Stack Developer Surat',
    description:
        'Projects by Saurabh Yadav, Full Stack Developer in Surat, India — enterprise systems, open-source tools, and personal projects built with Python, Django, FastAPI, React, Next.js, TypeScript, Docker, and AWS.',
    keywords: [
        'Saurabh Yadav projects', 'Saurabh Yadav portfolio projects',
        'full stack developer projects Surat', 'Python Django projects India',
        'React Next.js projects India', 'open source developer India',
        // Project names
        'MetricsNavigator', 'MetricsNavigator developer', 'MetricsNavigator project',
        'MetricsNavigator Shopify QuickBooks integration',
        'DevRob', 'DevRob robotics simulation', 'DevRob developer',
        'BCG internal AI tool developer', 'BCG enterprise tool Django FastAPI',
        'Finance NSE platform developer', 'Scoop Investment platform developer',
        'Yogya Capital Finance platform', 'multi-tenant CA system developer',
        'Multi-Tenant CA Management system', 'Chartered Accountant platform developer',
        'S3 file manager', 'S3 GNOME file manager', 'GNOME file manager web',
        'AWS S3 web client open source', 's3-gnome-manager GitHub',
        'Instant WebRTC app', 'Instant peer to peer sharing', 'Instant Saurabh Yadav',
        'NovaFetch YouTube downloader', 'NovaFetch Saurabh Yadav',
        'La Net Team projects', 'La Net Team Software Solutions projects',
        // Skills in projects context
        'enterprise web application developer India', 'full stack project portfolio',
        'Python developer portfolio', 'React developer portfolio India',
        'Next.js projects', 'FastAPI microservices projects', 'Docker Kubernetes projects',
        'AI integration projects', 'LangChain Shopify integration developer',
        'software engineer portfolio Surat', 'developer portfolio India',
    ],
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Projects | Saurabh Yadav — Full Stack Developer',
        description:
            'Enterprise systems, open-source tools, and personal projects by Saurabh Yadav — Full Stack Developer based in Surat, India.',
        url: 'https://saurabh-yadav.me/projects',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Projects by Saurabh Yadav' }],
    },
    twitter: {
        title: 'Projects | Saurabh Yadav — Full Stack Developer',
        description:
            'Enterprise systems, open-source tools, and personal projects by Saurabh Yadav — Full Stack Developer in Surat, India.',
    },
}

const schemaOrg = [
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saurabh-yadav.me' },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://saurabh-yadav.me/projects' },
        ],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'https://saurabh-yadav.me/projects#projectlist',
        name: 'Projects by Saurabh Yadav',
        itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'CreativeWork',
                name: p.name,
                description: p.description,
                ...(p.project_link ? { url: p.project_link } : {}),
                author: { '@id': 'https://saurabh-yadav.me/#person' },
            },
        })),
    },
]

export default function ProjectsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <PageView page="projects" markdown={getPageMarkdown('projects')}>
                <ProjectsClient />
            </PageView>
        </>
    )
}
