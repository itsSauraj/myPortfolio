// Builds /llms.txt (https://llmstxt.org) from the site's actual content in
// src/constants/index.js — the same data every page renders from — so the
// file can never drift out of sync with the site.
//
// Served by app/llms.txt/route.js (static, baked at build time). If the
// optional AI pass (scripts/generate-llms-ai.mjs) produced an enhanced file,
// the route serves that instead and this output is used as its fallback.

import {
    heroName,
    heroRoles,
    aboutText,
    services,
    skillGroups,
    experiences,
    projects,
    testimonials,
    socialLinks,
    timelineItems,
} from "../constants";

const SITE_URL = "https://saurabh-yadav.me";

const SOCIAL_LABELS = {
    github: "GitHub",
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    hackerrank: "HackerRank",
    email: "Email",
    whatsapp: "WhatsApp",
    feedback: "Feedback form",
};

const tagNames = (tags = []) => tags.map((t) => t.name).join(", ");

function projectLine(p) {
    const links = [];
    if (p.project_link) links.push(`live: ${p.project_link}`);
    if (p.source_code_link) links.push(`source: ${p.source_code_link}`);
    const linkText = links.length ? ` (${links.join(" · ")})` : "";
    return `- **${p.name}** [${p.category}]${linkText}\n  ${p.description}\n  Stack: ${tagNames(p.tags)}`;
}

function timelineLine(item) {
    const head = item.company ? `${item.title} @ ${item.company}` : item.title;
    return `- ${item.date} — **${head}** (${item.type})`;
}

export function buildLlmsTxt() {
    const publicProjects = projects.filter((p) => !p.private);
    const privateProjects = projects.filter((p) => p.private);

    const sections = [
        `# ${heroName} — Full Stack Engineer`,
        "",
        `> Portfolio of ${heroName}, a Full Stack Software Engineer based in Surat, Gujarat, India — ${heroRoles.join(", ")}. This file is generated at build time from the site's content so it always matches what the site shows.`,
        "",
        aboutText,
        "",
        "## Pages",
        "",
        `- [Home](${SITE_URL}/): hero, about, work experience, skills, testimonials, and contact form`,
        `- [Projects](${SITE_URL}/projects): all projects — open source, personal, and enterprise work`,
        `- [Timeline](${SITE_URL}/timeline): chronological history of roles and projects`,
        `- [Design system](${SITE_URL}/design.md): how this site is designed (colors, type, motion)`,
        `- [Sitemap](${SITE_URL}/sitemap.xml)`,
        "",
        "## What I Do",
        "",
        ...services.map((s) => `- **${s.title}**: ${s.blurb}`),
        "",
        "## Skills",
        "",
        ...skillGroups.map(
            (g) => `- **${g.title}**: ${g.skills.map((s) => s.name).join(", ")}`
        ),
        "",
        "## Experience",
        "",
        ...experiences.map(
            (e) =>
                `### ${e.title} — ${e.company_name}\n${e.location} · ${e.date}\n${e.points.map((p) => `- ${p}`).join("\n")}`
        ),
        "",
        "## Open Source & Personal Projects",
        "",
        ...publicProjects.map(projectLine),
        "",
        "## Enterprise Work (private, no public links)",
        "",
        ...privateProjects.map(projectLine),
        "",
        "## Timeline",
        "",
        ...[...timelineItems]
            .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
            .map(timelineLine),
        "",
        "## Testimonials",
        "",
        ...testimonials.map(
            (t) =>
                `- "${t.testimonial}" — **${t.name}**, ${t.designation}, ${t.company}`
        ),
        "",
        "## Contact & Social",
        "",
        `- Website: ${SITE_URL}`,
        ...socialLinks.map(
            (s) => `- ${SOCIAL_LABELS[s.name] ?? s.name}: ${s.link}`
        ),
        "",
        "## About This Site",
        "",
        "- Dark, space-themed portfolio built with Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, and Three.js (react-three-fiber).",
        "- Source: https://github.com/itsSauraj/myPortfolio",
        "",
    ];

    return sections.join("\n");
}

export { SITE_URL };
