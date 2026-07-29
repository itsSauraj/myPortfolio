import AppsClient from './AppsClient'
import PageView from '../../src/components/PageView'
import { getPageMarkdown } from '../../src/utils/getPageMarkdown'
import { apps } from '../../src/constants'

export const metadata = {
    title: 'Apps | Saurabh Yadav — Free Web Apps by a Full Stack & AI Developer',
    description:
        'Apps and web apps built by Saurabh Yadav, Full Stack & AI Developer in Surat, India — Instant (P2P sharing rooms), NovaFetch (YouTube downloader), S3 File Manager, and more. Free, live, open source.',
    keywords: [
        'Saurabh Yadav apps', 'Saurabh Yadav web apps', 'apps by Saurabh Yadav',
        'Instant app Saurabh Yadav', 'Instant WebRTC sharing rooms',
        'Instant peer to peer file sharing app', 'instant.saurabh-yadav.me',
        'NovaFetch', 'NovaFetch YouTube downloader', 'NovaFetch app',
        'novafetch.saurabh-yadav.me', 'YouTube video audio extraction app',
        'S3 File Manager web', 'S3 GNOME file manager', 's3.saurabh-yadav.me',
        'Cloudflare R2 file manager', 'AWS S3 web client',
        'free web apps developer India', 'open source web apps',
        'web apps by developer in Surat', 'AI developer apps India',
    ],
    alternates: { canonical: '/apps' },
    openGraph: {
        title: 'Apps | Saurabh Yadav — Free Web Apps',
        description:
            'Live apps built by Saurabh Yadav — Instant, NovaFetch, S3 File Manager, and more. Free to open in the browser, open source on GitHub.',
        url: 'https://saurabh-yadav.me/apps',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Apps by Saurabh Yadav' }],
    },
    twitter: {
        title: 'Apps | Saurabh Yadav — Free Web Apps',
        description:
            'Live apps built by Saurabh Yadav — Instant, NovaFetch, S3 File Manager, and more. Free, open source, no install needed.',
    },
}

const schemaOrg = [
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saurabh-yadav.me' },
            { '@type': 'ListItem', position: 2, name: 'Apps', item: 'https://saurabh-yadav.me/apps' },
        ],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'https://saurabh-yadav.me/apps#applist',
        name: 'Apps by Saurabh Yadav',
        itemListElement: apps.map((app, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': ['SoftwareApplication', 'WebApplication'],
                name: app.name,
                url: app.links.open,
                description: app.description,
                applicationCategory: `${app.category} application`,
                operatingSystem: 'Any (web browser)',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                author: { '@id': 'https://saurabh-yadav.me/#person' },
            },
        })),
    },
]

export default function AppsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <PageView page="apps" markdown={getPageMarkdown('apps')}>
                <AppsClient />
            </PageView>
        </>
    )
}
