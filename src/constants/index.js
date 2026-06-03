import {
    theBackOffice,
    yogyaCapital,

    windows,
    youtube,
    portfolio,

    anubhav,
    chirag_jain,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "experience",
        title: "Experience",
    },
    {
        id: "skills",
        title: "Skills",
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

// Hero identity
const heroName = "Saurabh";
const heroRoles = [
    "Full Stack Engineer",
    "Backend & APIs",
    "AI Integrations",
    "Cloud / DevOps",
];

const aboutText =
    "I'm a Full Stack Engineer who builds high-performing, scalable web applications — comfortable across the entire software lifecycle, from system architecture and design through development, deployment, and optimization. I work daily with Python, Node.js, React, TypeScript, and SCSS, integrating external APIs into reliable products, and I lean on Docker and CI/CD pipelines for dependable, automated deployments. I actively use AI-assisted workflows (Claude, Codex) and modern developer tooling to ship faster. With a B.Tech in Computer Science & Engineering completed, I now work as a Full Stack Software Engineer at La Net Team Software Solutions in Surat, applying engineering fundamentals to real-world problems while continuously learning.";

const services = [
    {
        title: "Backend & APIs",
        iconKey: "fastapi",
        blurb: "Scalable services and REST APIs with Django, FastAPI, and Celery background workers.",
    },
    {
        title: "Frontend Engineering",
        iconKey: "react",
        blurb: "Responsive, accessible interfaces with React, Next.js, and TypeScript.",
    },
    {
        title: "AI Integrations",
        iconKey: "anthropic",
        blurb: "AI-driven features with Anthropic, OpenAI, and Gemini via LangChain and OpenRouter.",
    },
    {
        title: "Cloud & DevOps",
        iconKey: "docker",
        blurb: "Containerized deploys with Docker, Kubernetes, AWS/GCP, and CI/CD on GitHub Actions.",
    },
];

// Skills grouped by category (icons resolved via src/utils/icons.jsx)
const skillGroups = [
    {
        title: "Languages & Frameworks",
        skills: [
            { name: "Python", iconKey: "python" },
            { name: "Django", iconKey: "django" },
            { name: "FastAPI", iconKey: "fastapi" },
            { name: "Celery", iconKey: "celery" },
            { name: "REST API", iconKey: "restapi" },
            { name: "PyTest", iconKey: "pytest" },
            { name: "Jest", iconKey: "jest" },
            { name: "React", iconKey: "react" },
            { name: "Next.js", iconKey: "nextjs" },
            { name: "TypeScript", iconKey: "typescript" },
            { name: "JavaScript", iconKey: "javascript" },
            { name: "Node.js", iconKey: "nodejs" },
        ],
    },
    {
        title: "Databases",
        skills: [
            { name: "PostgreSQL", iconKey: "postgresql" },
            { name: "SQL", iconKey: "sql" },
            { name: "SQLite", iconKey: "sqlite" },
            { name: "MongoDB", iconKey: "mongodb" },
            { name: "Redis", iconKey: "redis" },
        ],
    },
    {
        title: "AI & Data",
        skills: [
            { name: "NumPy", iconKey: "numpy" },
            { name: "Pandas", iconKey: "pandas" },
            { name: "Matplotlib", iconKey: "matplotlib" },
            { name: "OpenCV", iconKey: "opencv" },
            { name: "HuggingFace", iconKey: "huggingface" },
            { name: "Anthropic", iconKey: "anthropic" },
            { name: "OpenAI", iconKey: "openai" },
            { name: "Gemini", iconKey: "gemini" },
            { name: "LangChain", iconKey: "langchain" },
        ],
    },
    {
        title: "Integrations",
        skills: [
            { name: "Stripe", iconKey: "stripe" },
            { name: "Razorpay", iconKey: "razorpay" },
            { name: "Google Maps", iconKey: "googlemaps" },
            { name: "Swagger", iconKey: "swagger" },
            { name: "OpenRouter", iconKey: "openrouter" },
            { name: "Shopify", iconKey: "shopify" },
            { name: "Meta", iconKey: "meta" },
            { name: "QuickBooks", iconKey: "quickbooks" },
            { name: "Google Ads", iconKey: "googleads" },
            { name: "Paytm", iconKey: "paytm" },
        ],
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "Docker", iconKey: "docker" },
            { name: "Kubernetes", iconKey: "kubernetes" },
            { name: "Git", iconKey: "git" },
            { name: "GitHub", iconKey: "github" },
            { name: "AWS", iconKey: "aws" },
            { name: "GCP", iconKey: "gcp" },
            { name: "Postman", iconKey: "postman" },
            { name: "Railway", iconKey: "railway" },
            { name: "VS Code", iconKey: "vscode" },
            { name: "Datadog", iconKey: "datadog" },
        ],
    },
];

const experiences = [
    {
        title: "Full Stack Software Developer",
        company_name: "La Net Team Software Solutions Pvt. Ltd.",
        location: "Surat, India",
        icon: null,
        monogram: "LN",
        iconBg: "#C9B8FF",
        date: "Sep 2024 – Present",
        points: [
            "Built integrations with Shopify, QuickBooks, and Google Ads using background workers to sync user data.",
            "Led a team building microservices deployed via Docker on Railway with CI/CD, testing, and linting.",
            "Building AI-driven systems with Django and FastAPI, integrating Anthropic, ChatGPT, and Gemini.",
            "Operated on AWS and Kubernetes with Datadog monitoring and security checks via GitHub Actions.",
        ],
    },
    {
        title: "Full Stack Developer (Intern) · Team Lead",
        company_name: "Yogya Capital",
        location: "Remote",
        icon: yogyaCapital,
        iconBg: "#FFFFFF",
        date: "Dec 2023 – Mar 2024",
        points: [
            "Led project design, architecture, and deployment as Team Lead and Backend Developer.",
            "Coordinated the team and managed the end-to-end development process.",
            "Built backend systems for finance and NSE-related workflows.",
        ],
    },
    {
        title: "Full Stack Developer (Intern)",
        company_name: "theBackOffice",
        location: "Remote",
        icon: theBackOffice,
        iconBg: "#FFFFFF",
        date: "Jul 2023 – Nov 2023",
        points: [
            "Developed backend APIs, then contributed to the web platform's frontend.",
            "Worked across backend and frontend to ship features and improve functionality.",
            "Key project: a Multi-Tenant CA Management system.",
        ],
    },
];

// Tag color helpers (gradient text classes defined in index.css)
const C = {
    blue: "blue-text-gradient",
    green: "green-text-gradient",
    pink: "pink-text-gradient",
    orange: "orange-text-gradient",
};

const projects = [
    // ---- Enterprise / professional work (no public links) ----
    {
        name: "BCG-Internal",
        private: true,
        description:
            "Internal enterprise tool integrating Anthropic, ChatGPT, and Gemini using Django and FastAPI to perform automated actions, AI-driven generation, and web-search workflows.",
        tags: [
            { name: "FastAPI", color: C.green },
            { name: "Celery", color: C.blue },
            { name: "Next.js", color: C.pink },
            { name: "PostgreSQL", color: C.blue },
            { name: "Docker", color: C.orange },
            { name: "Datadog", color: C.green },
        ],
        accent: "#A9B4FF",
    },
    {
        name: "DevRob",
        private: true,
        description:
            "Robotics simulation platform built on a microservices architecture with AI integrations to simulate robotic workflows and automate actions through intelligent systems.",
        tags: [
            { name: "Node.js", color: C.green },
            { name: "FastAPI", color: C.pink },
            { name: "Next.js", color: C.blue },
            { name: "Tailwind", color: C.green },
            { name: "Railway", color: C.orange },
            { name: "Docker", color: C.blue },
        ],
        accent: "#9FD4FF",
    },
    {
        name: "MetricsNavigator",
        private: true,
        description:
            "Data-integration platform connecting Shopify, QuickBooks, and Google Ads to sync business data through background workers, enabling centralized analytics and reporting.",
        tags: [
            { name: "Django", color: C.green },
            { name: "React", color: C.blue },
            { name: "TypeScript", color: C.pink },
            { name: "Chart.js", color: C.orange },
            { name: "OpenAI", color: C.green },
            { name: "LangChain", color: C.blue },
        ],
        accent: "#F3C0E0",
    },
    {
        name: "Finance & NSE Platform",
        private: true,
        description:
            "Backend system for financial data workflows and NSE-related processes — system design, architecture, and deployment, coordinating development as team lead.",
        tags: [
            { name: "Django", color: C.green },
            { name: "Celery", color: C.blue },
            { name: "Redis", color: C.pink },
            { name: "PostgreSQL", color: C.blue },
            { name: "Stripe", color: C.orange },
        ],
        accent: "#A9E8D0",
    },
    {
        name: "Multi-Tenant CA System",
        private: true,
        description:
            "Multi-tenant platform for Chartered Accountants to manage multiple clients, financial records, and workflows with backend APIs and a supporting web interface.",
        tags: [
            { name: "Django", color: C.green },
            { name: "Celery", color: C.blue },
            { name: "Redis", color: C.pink },
            { name: "PostgreSQL", color: C.blue },
            { name: "AWS (boto)", color: C.orange },
        ],
        accent: "#C9B8FF",
    },

    // ---- Public / personal projects (with live links) ----
    {
        name: "S3 File Manager",
        private: false,
        description:
            "A web-based file manager for Amazon S3 and S3-compatible storage (e.g. Cloudflare R2) with a GNOME Files–inspired interface.",
        tags: [
            { name: "Next.js", color: C.blue },
            { name: "React", color: C.green },
            { name: "TypeScript", color: C.pink },
            { name: "Tailwind", color: C.orange },
            { name: "AWS SDK", color: C.green },
        ],
        accent: "#9FD4FF",
        project_link: "https://s3.saurabh-yadav.me",
        source_code_link: "https://github.com/itsSauraj/s3-gnome-manager",
    },
    {
        name: "Windows 11",
        private: false,
        description:
            "A pixel-faithful replica of the Windows 11 desktop built with vanilla HTML, CSS, and JavaScript.",
        tags: [
            { name: "HTML5", color: C.blue },
            { name: "CSS3", color: C.green },
            { name: "JavaScript", color: C.pink },
        ],
        image: windows,
        project_link: "https://itsSauraj.github.io/Windows11-Clone",
        source_code_link: "https://github.com/itsSauraj/Windows11-Clone.git",
    },
    {
        name: "YouTube Clone",
        private: false,
        description:
            "A YouTube clone that consumes a live API to render trending content, built entirely with React.",
        tags: [
            { name: "React", color: C.blue },
            { name: "JavaScript", color: C.pink },
            { name: "MUI", color: C.green },
        ],
        image: youtube,
        project_link: "https://youtube-clone-react-18.netlify.app/",
        source_code_link: "https://github.com/itsSauraj/YoutubeCloneReact.git",
    },
    {
        name: "This Portfolio",
        private: false,
        description:
            "The site you're on — a dark, space-themed developer portfolio built with React, Three.js (R3F), Framer Motion, and Vite.",
        tags: [
            { name: "React", color: C.blue },
            { name: "Three.js", color: C.green },
            { name: "Framer Motion", color: C.pink },
            { name: "Vite", color: C.orange },
        ],
        image: portfolio,
        project_link: "https://saurabhyadav.vercel.app",
        source_code_link: "https://github.com/itsSauraj/myPortfolio",
    },
];

const testimonials = [
    {
        testimonial:
            "We have no hesitation in recommending Saurabh Yadav for any future roles or positions requiring expertise in Python Development with the Django Framework or Frontend Development with ReactJS. His positive attitude, determination, and technical proficiency make him a valuable asset to any organisation.",
        name: "Anubhav Shrivastava",
        designation: "Staff Software Engineer",
        company: "HevoData",
        image: anubhav,
        linkedIn: "https://www.linkedin.com/in/anubhavshrivastava1/",
    },
    {
        testimonial:
            "Saurabh is a highly skilled and dedicated software developer who consistently delivers high-quality work. He has a strong understanding of both frontend and backend technologies, and his ability to quickly learn and adapt to new tools and frameworks is impressive. Saurabh's positive attitude, excellent communication skills, and collaborative approach make him a valuable asset to any team. I have no doubt that he will continue to excel in his career and make significant contributions to the field of software development.",
        name: "Chirag Jain",
        designation: "Founder of Scoop Investment",
        company: "Yogya Capital",
        image: chirag_jain,
        linkedIn: "https://www.linkedin.com/in/chiragjain1097/",
    }
];

const models = {
    desktop_pc: {
        url: './desktop_pc/scene.gltf'
    },
    planet: {
        url: './planet/scene.gltf'
    }
}

const socialLinks = [
    {
        name: 'github',
        link: 'https://github.com/itsSauraj',
        iconKey: 'github',
    },
    {
        name: 'x',
        link: 'https://x.com/itssauraj',
        iconKey: 'x',
    },
    {
        name: 'linkedin',
        link: 'https://www.linkedin.com/in/saurabhyadav07',
        iconKey: 'linkedin',
    },
    {
        name: 'hackerrank',
        link: 'https://www.hackerrank.com/sy8502630',
        iconKey: 'hackerrank',
    },
    {
        name: 'email',
        link: 'mailto:contact@saurabh-yadav.me',
        iconKey: 'email',
    },
    {
        name: 'whatsapp',
        link: 'https://wa.me/+917486052584',
        iconKey: 'whatsapp',
    },
    {
        name: 'feedback',
        link: 'https://forms.gle/WcWvaChVMb6A7YvWA',
        iconKey: 'feedback',
    },
]

export {
    heroName,
    heroRoles,
    aboutText,
    services,
    skillGroups,
    experiences,
    projects,
    testimonials,
    models,
    socialLinks,
};
