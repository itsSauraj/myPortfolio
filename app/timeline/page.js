import TimelineClient from './TimelineClient'

export const metadata = {
    title: 'Career Timeline | Saurabh Yadav — Full Stack Developer',
    description:
        'Career timeline of Saurabh Yadav, Full Stack Developer in Surat, India — internships, jobs, and projects from B.Tech through Full Stack Engineer at La Net Team Software Solutions.',
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

export default function TimelinePage() {
    return <TimelineClient />
}
