// Deterministic per-page markdown for the "LLM view" toggle (see
// src/components/PageView.jsx). Built from src/constants — the same data the
// human view renders — so it can never drift out of sync with the site.
//
// The optional AI pass (scripts/generate-llms-ai.mjs) writes enhanced
// versions to src/generated/pages/<page>.md at build time; the server helper
// getPageMarkdown() serves those when present and falls back to these.

import {
    heroName,
    heroRoles,
    aboutText,
    services,
    skillGroups,
    experiences,
    projects,
    apps,
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

const contactSection = () => [
    "## Contact & Social",
    "",
    `- Website: ${SITE_URL}`,
    ...socialLinks.map((s) => `- ${SOCIAL_LABELS[s.name] ?? s.name}: ${s.link}`),
];

function buildHome() {
    return [
        `# ${heroName} — Full Stack Engineer`,
        "",
        `> ${heroName} is a Full Stack Software Engineer based in Surat, Gujarat, India — ${heroRoles.join(", ")}. This is the home page of ${SITE_URL}.`,
        "",
        "## About",
        "",
        aboutText,
        "",
        "## What I Do",
        "",
        ...services.map((s) => `- **${s.title}**: ${s.blurb}`),
        "",
        "## Skills",
        "",
        ...skillGroups.map((g) => `- **${g.title}**: ${g.skills.map((s) => s.name).join(", ")}`),
        "",
        "## Experience",
        "",
        ...experiences.map(
            (e) =>
                `### ${e.title} — ${e.company_name}\n${e.location} · ${e.date}\n${e.points.map((p) => `- ${p}`).join("\n")}`
        ),
        "",
        "## Testimonials",
        "",
        ...testimonials.map(
            (t) => `- "${t.testimonial}" — **${t.name}**, ${t.designation}, ${t.company}`
        ),
        "",
        ...contactSection(),
        "",
        "## More",
        "",
        `- [Projects](${SITE_URL}/projects) · [Apps](${SITE_URL}/apps) · [Timeline](${SITE_URL}/timeline) · [llms.txt](${SITE_URL}/llms.txt)`,
        "",
    ].join("\n");
}

function projectLine(p) {
    const links = [];
    if (p.project_link) links.push(`live: ${p.project_link}`);
    if (p.source_code_link) links.push(`source: ${p.source_code_link}`);
    const linkText = links.length ? ` (${links.join(" · ")})` : "";
    return `- **${p.name}** [${p.category}]${linkText}\n  ${p.description}\n  Stack: ${tagNames(p.tags)}`;
}

function buildProjects() {
    const publicProjects = projects.filter((p) => !p.private);
    const privateProjects = projects.filter((p) => p.private);
    return [
        `# Projects — ${heroName}`,
        "",
        `> All projects by ${heroName}: enterprise systems shipped in production, open-source tools, and personal projects. Live at ${SITE_URL}/projects.`,
        "",
        "## Open Source & Personal",
        "",
        ...publicProjects.map(projectLine),
        "",
        "## Enterprise Work (private, no public links)",
        "",
        ...privateProjects.map(projectLine),
        "",
        ...contactSection(),
        "",
    ].join("\n");
}

function buildTimeline() {
    const items = [...timelineItems].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
    return [
        `# Career Timeline — ${heroName}`,
        "",
        `> Chronological history of ${heroName}'s roles and projects, from first personal builds through internships to Full Stack Engineer at La Net Team Software Solutions. Live at ${SITE_URL}/timeline.`,
        "",
        ...items.map((item) => {
            const head = item.company ? `${item.title} @ ${item.company}` : item.title;
            const links = [];
            if (item.links?.live) links.push(`live: ${item.links.live}`);
            if (item.links?.source) links.push(`source: ${item.links.source}`);
            const linkText = links.length ? `\n  Links: ${links.join(" · ")}` : "";
            return `- ${item.date} — **${head}** (${item.type})\n  ${item.description}${linkText}`;
        }),
        "",
        ...contactSection(),
        "",
    ].join("\n");
}

function buildApps() {
    return [
        `# Apps — ${heroName}`,
        "",
        `> Live apps and web apps built by ${heroName}. Every app is free to open in the browser — no install needed. Live at ${SITE_URL}/apps.`,
        "",
        ...apps.map(
            (a) =>
                `## ${a.name}\n${a.tagline} · ${a.category} · ${a.platform} · ${a.status}\n\n${a.description}\n\n- Open: ${a.links.open}${a.links.source ? `\n- Source: ${a.links.source}` : ""}`
        ),
        "",
        ...contactSection(),
        "",
    ].join("\n");
}

const BUILDERS = {
    home: buildHome,
    projects: buildProjects,
    timeline: buildTimeline,
    apps: buildApps,
};

export const PAGE_NAMES = Object.keys(BUILDERS);

export function buildPageMarkdown(page) {
    const build = BUILDERS[page];
    if (!build) throw new Error(`Unknown page "${page}" (expected ${PAGE_NAMES.join(", ")})`);
    return build();
}
