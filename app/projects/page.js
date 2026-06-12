import ProjectsClient from './ProjectsClient'

export const metadata = {
    title: 'Projects | Saurabh Yadav — Full Stack Developer Surat',
    description:
        'Projects by Saurabh Yadav, Full Stack Developer in Surat, India — enterprise systems, open-source tools, and personal projects built with Python, Django, React, and Next.js.',
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

export default function ProjectsPage() {
    return <ProjectsClient />
}
