import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    html,
    css,
    reactjs,
    tailwind,
    git,
    github_w,
    github_b,
    none,
    windows,
    youtube,
    portfolio,
    threejs,
    python,
    linux,
    mysql,
    C,
    java,
    bootstrap,
    postgresql,
    gihubIcon,
    linkedinIcon,
    instagramIcon,
    hackerRankIcon,
    whatsapp,
    email,
    feedback,
    anonymous,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Web Developer",
        icon: web,
    },
    {
        title: "React Developer",
        icon: mobile,
    },
    {
        title: "Backend Developer",
        icon: backend,
    },
    {
        title: "Full Stack Developer",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "C",
        icon: C,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Linux",
        icon: linux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "MySql",
        icon: mysql,
    },
    {
        name: "Python",
        icon: python,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "Git",
        icon: git,
    },
    {
        name: 'Github',
        icon: github_b,
    },
    {
        name: 'Java',
        icon: java,
    },
    {
        name: 'Bootstrap',
        icon: bootstrap,
    },
    {
        name: 'PostgreSQL',
        icon: postgresql,
    },
];

const experiences = [
    {
        title: "No work experience",
        company_name: "no company",
        icon: none,
        iconBg: "#FFFFFF",
        date: "no date for now",
        points: [
            "For now I don't have any work experience. But if you provide me with a work I will give my best at the work😊",
            "Help me to increase the size of this timeline."
        ],
    },
];

const projects = [
    {
        name: "Windows 11",
        description:
            "This is a simple replica of Windows 11 using only HTML, CSS and JavaScript.",
        tags: [
            {
                name: "HTML5",
                color: "blue-text-gradient",
            },
            {
                name: "CSS3",
                color: "green-text-gradient",
            },
            {
                name: "JavaScript",
                color: "pink-text-gradient",
            },
        ],
        image: windows,
        project_link: "https://codewithsaurabhyadav.github.io/Windows11-Clone",
        source_code_link: "https://github.com/CodeWithSaurabhYadav/Windows11-Clone.git",
    },
    {
        name: "Youtube Clone",
        description:
            "This is project uses API to get the content that must be displayed on the website. This project completly uses JavaScript React library.",
        tags: [
            {
                name: "HTML5",
                color: "blue-text-gradient",
            },
            {
                name: "CSS3",
                color: "green-text-gradient",
            },
            {
                name: "JavaScript",
                color: "pink-text-gradient",
            },
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "MUI",
                color: "green-text-gradient",
            },
        ],
        image: youtube,
        project_link: "https://youtube-clone-react-18.netlify.app/",
        source_code_link: "https://github.com/CodeWithSaurabhYadav/YoutubeCloneReact.git",
    },
    {
        name: "My Portfolio",
        description:
            "This is my portfolio website which is made using REACT and React Three Fiber (R3F).😊",
        tags: [
            {
                name: "HTML5",
                color: "blue-text-gradient",
            },
            {
                name: "CSS3",
                color: "green-text-gradient",
            },
            {
                name: "JavaScript",
                color: "pink-text-gradient",
            },
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "React three filber",
                color: "green-text-gradient",
            },
        ],
        image: portfolio,
        project_link: "https://saurabhyadav.vercel.app",
        source_code_link: "https://github.com/CodeWithSaurabhYadav/myPortfolio",
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Saurabh proved me wrong.",
        name: "anonymous",
        designation: "XYZ",
        company: "anonymous",
        image: anonymous,
    },
];

const models = {
    desktop_pc: {
        url: './desktop_pc/scene.gltf'
    },
    planet: {
        url: './planet/scene.gltf'
    }
}

const socialLinks =[
    {
        name: 'github',
        link: 'https://github.com/codewithsaurabhyadav',
        icon: gihubIcon,
    },
    {
        name: 'instagram',
        link: 'https://www.instagram.com/this.is.saurabh.official',
        icon: instagramIcon,
    },
    {
        name: 'linkedin',
        link: 'https://www.linkedin.com/in/saurabhyadav07',
        icon: linkedinIcon,
    },
    {
        name: 'hackerrank',
        link: 'https://www.hackerrank.com/sy8502630',
        icon: hackerRankIcon,
    },
    {
        name: 'email',
        link: 'mailto:sauraj.contact@gmail.com',
        icon: email,
    },
    {
        name: 'whatsapp',
        link: 'https://wa.me/+917486052584',
        icon: whatsapp,
    },
    {
        name: 'feedback',
        link: 'https://forms.gle/WcWvaChVMb6A7YvWA',
        icon: feedback,
    },
]


export { services, technologies, experiences, projects, testimonials, models, socialLinks };