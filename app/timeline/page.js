import TimelineClient from './TimelineClient'
import PageView from '../../src/components/PageView'
import { getPageMarkdown } from '../../src/utils/getPageMarkdown'

export const metadata = {
    title: 'Career Timeline | Saurabh Yadav — Full Stack Developer',
    description:
        'Career timeline of Saurabh Yadav, Full Stack Developer in Surat, India — from B.Tech Computer Science through internships at theBackOffice and Yogya Capital to Full Stack Engineer at La Net Team Software Solutions.',
    keywords: [
        'Saurabh Yadav career', 'Saurabh Yadav experience', 'Saurabh Yadav timeline',
        'Saurabh Yadav work history', 'Saurabh Yadav resume',
        // La Net Team
        'La Net Team Software Solutions developer', 'La Net Team Surat engineer',
        'La Net Team team lead developer', 'La Net Team full stack developer',
        'La Net Team Software Solutions Pvt Ltd',
        // Yogya Capital / Scoop Investment
        'Yogya Capital developer', 'Yogya Capital team lead',
        'Yogya Capital Scoop Investment developer',
        'Scoop Investment developer India', 'Scoop Investment team lead',
        'Scoop Investment Finance platform developer',
        // theBackOffice
        'theBackOffice developer intern', 'theBackOffice full stack developer',
        'theBackOffice CA management developer',
        // Education
        'B.Tech Computer Science engineer India', 'B.Tech CSE full stack developer',
        // General career
        'full stack developer career Surat', 'software engineer experience India',
        'full stack engineer career path India', 'Python Django developer experience',
        'React developer career India', 'software engineer Surat career',
        'developer internship India', 'full stack developer journey India',
        'software engineer portfolio timeline',
    ],
    alternates: { canonical: '/timeline' },
    openGraph: {
        title: 'Career Timeline | Saurabh Yadav — Full Stack Developer',
        description:
            'Career timeline of Saurabh Yadav — Full Stack Developer in Surat, India. Every internship, job, and project in chronological order.',
        url: 'https://saurabh-yadav.me/timeline',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Career timeline of Saurabh Yadav' }],
    },
    twitter: {
        title: 'Career Timeline | Saurabh Yadav — Full Stack Developer',
        description:
            'Career timeline of Saurabh Yadav — Full Stack Developer in Surat, India.',
    },
}

const schemaOrg = [
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saurabh-yadav.me' },
            { '@type': 'ListItem', position: 2, name: 'Timeline', item: 'https://saurabh-yadav.me/timeline' },
        ],
    },
]

export default function TimelinePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <PageView page="timeline" markdown={getPageMarkdown('timeline')}>
                <TimelineClient />
            </PageView>
        </>
    )
}
