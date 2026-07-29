// Optional build-time AI pass for /llms.txt and the per-page "LLM view".
//
// Reads the site's source-of-truth files and asks an LLM to write:
//   1. a polished llms.txt            → src/generated/llms-ai.txt
//   2. one markdown doc per page      → src/generated/pages/<page>.md
//      (home, projects, apps, timeline — shown by the LLM/Human toggle)
//
// app/llms.txt/route.js serves file 1 when it exists; the pages read file 2
// via src/utils/getPageMarkdown.js. Both fall back to deterministic versions
// built from src/constants (src/utils/llms.js and src/utils/pageMarkdown.js).
//
// Fail-soft by design: no API key, network error, or bad output → warn and
// exit 0 so `next build` always succeeds with the deterministic fallbacks.
//
// Providers (auto-detected from whichever key is set; .env is loaded too):
//   ANTHROPIC_API_KEY          → Claude   (console.anthropic.com,  model claude-sonnet-5)
//   GROQ_API_KEY  (gsk_...)    → Groq     (console.groq.com,       model llama-3.3-70b-versatile)
//   XAI_API_KEY   (xai-...)    → xAI Grok (console.x.ai,           model grok-4)
// GROK_API_KEY also works — its value's prefix decides Groq (gsk_) vs xAI.
// Env overrides: LLMS_PROVIDER=anthropic|groq|grok, LLMS_MODEL=<model-id>

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LLMS_OUT_FILE = path.join(ROOT, "src", "generated", "llms-ai.txt");
const PAGES_OUT_DIR = path.join(ROOT, "src", "generated", "pages");
const TIMEOUT_MS = 120_000;

// Load env files (plain `node` doesn't) without overriding real environment
// vars. Same family and precedence as Next.js: process.env wins, then
// .env.<mode>.local > .env.local > .env.<mode> > .env. On Vercel/CI the
// dashboard variables are already in process.env, so these files are optional.
const MODE = process.env.NODE_ENV || "production";
for (const file of [`.env.${MODE}.local`, ".env.local", `.env.${MODE}`, ".env"]) {
    try {
        for (const line of fs.readFileSync(path.join(ROOT, file), "utf8").split("\n")) {
            const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
            if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
        }
    } catch {
        // File doesn't exist — fine, try the next one.
    }
}

// ---------------------------------------------------------------- provider
const anthropicKey = process.env.ANTHROPIC_API_KEY;
// "Groq" (console.groq.com, keys gsk_...) and xAI's "Grok" (console.x.ai,
// keys xai-...) are different services — GROK_API_KEY/XAI_API_KEY are routed
// by the key's prefix so a mixed-up name still reaches the right API.
const ambiguousKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
const groqKey = process.env.GROQ_API_KEY || (ambiguousKey?.startsWith("gsk_") ? ambiguousKey : null);
const xaiKey = ambiguousKey && !ambiguousKey.startsWith("gsk_") ? ambiguousKey : null;

const KEYS = { anthropic: anthropicKey, groq: groqKey, grok: xaiKey };

let provider = process.env.LLMS_PROVIDER;
if (provider && !(provider in KEYS)) {
    console.warn(`[llms-ai] Unknown LLMS_PROVIDER "${provider}" (expected anthropic|groq|grok) — skipping AI pass.`);
    process.exit(0);
}
if (!provider) provider = anthropicKey ? "anthropic" : groqKey ? "groq" : xaiKey ? "grok" : null;

if (!provider || !KEYS[provider]) {
    console.log("[llms-ai] No AI API key set — skipping AI pass, the deterministic fallbacks will be served.");
    process.exit(0);
}

// ------------------------------------------------------------------ inputs
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// Strip presentation-only noise (icons, tag colors, accents, JSX, SEO keyword
// stuffing) so the prompt stays small — Groq's free tier caps requests at
// 12k tokens/minute and the raw files alone exceed that.
function slimConstants(src) {
    return src
        .replace(/^import\s*\{[\s\S]*?\}\s*from\s*"\.\.\/assets";\s*/m, "")
        .replace(/,?\s*color:\s*(C\.\w+|['"][\w-]+['"])/g, "")
        .replace(/,?\s*iconKey:\s*['"][\w-]*['"]/g, "")
        .split("\n")
        .filter((line) => !/^\s*(icon|iconBg|image|accent|monogram|sortDate)\s*:/.test(line))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n");
}

function slimLayout(src) {
    return src
        .replace(/keywords:\s*\[[\s\S]*?\],/, "")
        .replace(/const schemaOrg[\s\S]*$/, "") // drops JSON-LD wrapper + JSX; `person` stays
        .replace(/\n{3,}/g, "\n\n");
}

let sources;
try {
    sources = [
        ["src/constants/index.js (all site content: about, skills, experience, projects, apps, timeline, testimonials, socials; presentation props removed)", slimConstants(read("src/constants/index.js"))],
        ["app/layout.js excerpt (SEO metadata + schema.org identity)", slimLayout(read("app/layout.js"))],
    ];
} catch (err) {
    console.warn(`[llms-ai] Could not read source files (${err.message}) — skipping AI pass.`);
    process.exit(0);
}

const userContent = sources
    .map(([label, text]) => `=== SOURCE: ${label} ===\n\n${text}`)
    .join("\n\n");

// ----------------------------------------------------------------- prompts
const LLMS_SYSTEM_PROMPT = `You write llms.txt files (see https://llmstxt.org) for personal websites.

You will receive the source files of saurabh-yadav.me, the portfolio of Saurabh Yadav. Generate the complete llms.txt content for the site.

Hard rules:
- Output ONLY the raw llms.txt markdown. No preamble, no explanation, no code fences.
- Start with an H1 ("# Saurabh Yadav — ..."), followed by a one-paragraph blockquote summary ("> ...").
- Use ONLY facts present in the provided sources. Never invent projects, dates, employers, links, or numbers.
- Include every project (mark enterprise ones as private/no public links), every app from the \`apps\` array with its open/source links, all experience entries with dates, skills grouped by category, testimonials, contact/social links, and the site's pages (https://saurabh-yadav.me/, /projects, /apps, /timeline, /design.md which documents the site's design system, /sitemap.xml).
- Keep URLs exactly as they appear in the sources.
- Write for an AI assistant that wants to understand who Saurabh is, what he has built, and how to reach him. Clear, dense, factual prose over marketing fluff.`;

const PAGE_DEFS = [
    { name: "home", url: "https://saurabh-yadav.me/", covers: "hero identity and roles, about, what he does (services), skills grouped by category, work experience with dates, testimonials, contact/social links" },
    { name: "projects", url: "https://saurabh-yadav.me/projects", covers: "every entry in the `projects` array — open source and personal projects with live/source links, enterprise work marked as private with no public links — each with its description and stack" },
    { name: "apps", url: "https://saurabh-yadav.me/apps", covers: "every entry in the `apps` array — name, tagline, description, category/platform/status, and its open + source links" },
    { name: "timeline", url: "https://saurabh-yadav.me/timeline", covers: "every entry in the `timelineItems` array in chronological order — dates, titles, companies, descriptions, and any links" },
];

const PAGES_SYSTEM_PROMPT = `You write the "LLM view" markdown twin for each page of saurabh-yadav.me, the portfolio of Saurabh Yadav. Every page of the site offers a human UI and a markdown version an AI can read; you produce the markdown versions.

You will receive the site's source files. Generate one markdown document per page, in this exact output format (marker line, then the document):

===PAGE: home===
# ...
===PAGE: projects===
# ...
===PAGE: apps===
# ...
===PAGE: timeline===
# ...

Pages and what each must fully cover:
${PAGE_DEFS.map((p) => `- ${p.name} (${p.url}): ${p.covers}`).join("\n")}

Hard rules:
- Output ONLY the marker lines and markdown documents. No preamble, no explanation, no code fences.
- Every document starts with an H1, followed by a one-paragraph blockquote summary ("> ...").
- Use ONLY facts present in the provided sources. Never invent projects, dates, employers, links, or numbers.
- Keep URLs exactly as they appear in the sources.
- Dense and factual; prefer lists over prose; roughly 250–400 words per document.
- End every document with the contact links (website, GitHub, LinkedIn, email).`;

console.log(`[llms-ai] Sources size: ${userContent.length.toLocaleString()} chars (~${Math.round(userContent.length / 4).toLocaleString()} tokens).`);

// -------------------------------------------------------------- API calls
async function callAnthropic(system, user) {
    const model = process.env.LLMS_MODEL || "claude-sonnet-5";
    console.log(`[llms-ai] Generating with Anthropic ${model}…`);
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
            "content-type": "application/json",
            "x-api-key": KEYS.anthropic,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model,
            max_tokens: 8192,
            system,
            messages: [{ role: "user", content: user }],
        }),
    });
    if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    return (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
}

// Groq and xAI both speak the OpenAI chat-completions dialect.
async function callOpenAICompatible({ label, url, key, defaultModel }, system, user) {
    const model = process.env.LLMS_MODEL || defaultModel;
    console.log(`[llms-ai] Generating with ${label} ${model}…`);
    const res = await fetch(url, {
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model,
            // Explicit cap — Groq counts input + max output against its 12k
            // tokens-per-minute rate limit when sizing a request; with ~8k
            // input tokens this must stay under ~3.9k. 3k is ample for both
            // the llms.txt (~2k tokens) and the four page docs (~2.2k).
            max_tokens: 3000,
            messages: [
                { role: "system", content: system },
                { role: "user", content: user },
            ],
        }),
    });
    if (!res.ok) throw new Error(`${label} API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "";
}

const PROVIDERS = {
    anthropic: callAnthropic,
    groq: (system, user) =>
        callOpenAICompatible({
            label: "Groq",
            url: "https://api.groq.com/openai/v1/chat/completions",
            key: KEYS.groq,
            defaultModel: "llama-3.3-70b-versatile",
        }, system, user),
    grok: (system, user) =>
        callOpenAICompatible({
            label: "xAI",
            url: "https://api.x.ai/v1/chat/completions",
            key: KEYS.grok,
            defaultModel: "grok-4",
        }, system, user),
};

const generate = (system, user) => PROVIDERS[provider](system, user);

// ---------------------------------------------------------------- helpers
// Strip a wrapping code fence if the model added one despite instructions.
function stripFence(text) {
    const fenced = text.match(/^```(?:\w+)?\n([\s\S]*?)\n```$/);
    return fenced ? fenced[1].trim() : text;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Groq's free tier caps tokens per minute — space the two calls out so the
// second one doesn't 429. Anthropic/xAI don't need it.
async function throttle() {
    if (provider !== "groq") return;
    console.log("[llms-ai] Groq tokens-per-minute limit — waiting 65s before the next call…");
    await sleep(65_000);
}

function writeFileEnsuringDir(file, text) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text + "\n", "utf8");
}

// Split "===PAGE: name===" delimited output into { name: markdown }.
function parsePages(text) {
    const pages = {};
    const parts = text.split(/^===\s*PAGE:\s*([a-z]+)\s*===\s*$/m);
    for (let i = 1; i < parts.length; i += 2) {
        const body = (parts[i + 1] ?? "").trim();
        if (body) pages[parts[i]] = stripFence(body);
    }
    return pages;
}

// ---------------------------------------------------------------- run
// Each pass is independently fail-soft: a failure only means that output's
// deterministic fallback gets served.
try {
    let text = stripFence((await generate(LLMS_SYSTEM_PROMPT, userContent)).trim());
    const valid = text.startsWith("# ") && text.includes("Saurabh") && text.length > 500;
    if (!valid) throw new Error(`output failed validation (starts-with-h1=${text.startsWith("# ")}, length=${text.length})`);
    writeFileEnsuringDir(LLMS_OUT_FILE, text);
    console.log(`[llms-ai] llms.txt written to ${path.relative(ROOT, LLMS_OUT_FILE)} (${text.length} chars).`);
} catch (err) {
    console.warn(`[llms-ai] llms.txt pass failed (${err.message}) — the deterministic llms.txt will be served.`);
}

try {
    await throttle();
    const raw = (await generate(PAGES_SYSTEM_PROMPT, userContent)).trim();
    const pages = parsePages(raw);
    let written = 0;
    for (const { name } of PAGE_DEFS) {
        const md = pages[name];
        if (!md || !md.startsWith("# ") || md.length < 200) {
            console.warn(`[llms-ai] page "${name}" missing or failed validation — its deterministic markdown will be served.`);
            continue;
        }
        writeFileEnsuringDir(path.join(PAGES_OUT_DIR, `${name}.md`), md);
        written += 1;
    }
    console.log(`[llms-ai] ${written}/${PAGE_DEFS.length} page markdown files written to ${path.relative(ROOT, PAGES_OUT_DIR)}.`);
} catch (err) {
    console.warn(`[llms-ai] page markdown pass failed (${err.message}) — the deterministic page markdown will be served.`);
    // No process.exit() here: exiting naturally (code 0) avoids a libuv
    // assertion crash on Windows when handles are still closing.
}
