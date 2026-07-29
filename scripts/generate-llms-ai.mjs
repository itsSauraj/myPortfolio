// Optional build-time AI pass for /llms.txt.
//
// Reads the site's source-of-truth files and asks an LLM to write a polished
// llms.txt, saved to src/generated/llms-ai.txt. The route at
// app/llms.txt/route.js serves that file when it exists; otherwise it serves
// the deterministic version built by src/utils/llms.js.
//
// Fail-soft by design: no API key, network error, or bad output → warn and
// exit 0 so `next build` always succeeds with the deterministic fallback.
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
const OUT_FILE = path.join(ROOT, "src", "generated", "llms-ai.txt");
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
    console.warn(`[llms.txt] Unknown LLMS_PROVIDER "${provider}" (expected anthropic|groq|grok) — skipping AI pass.`);
    process.exit(0);
}
if (!provider) provider = anthropicKey ? "anthropic" : groqKey ? "groq" : xaiKey ? "grok" : null;

if (!provider || !KEYS[provider]) {
    console.log("[llms.txt] No AI API key set — skipping AI pass, the deterministic llms.txt will be served.");
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
        .filter((line) => !/^\s*(icon|iconBg|image|accent|monogram)\s*:/.test(line))
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
        ["src/constants/index.js (all site content: about, skills, experience, projects, timeline, testimonials, socials; presentation props removed)", slimConstants(read("src/constants/index.js"))],
        ["app/layout.js excerpt (SEO metadata + schema.org identity)", slimLayout(read("app/layout.js"))],
    ];
} catch (err) {
    console.warn(`[llms.txt] Could not read source files (${err.message}) — skipping AI pass.`);
    process.exit(0);
}

const SYSTEM_PROMPT = `You write llms.txt files (see https://llmstxt.org) for personal websites.

You will receive the source files of saurabh-yadav.me, the portfolio of Saurabh Yadav. Generate the complete llms.txt content for the site.

Hard rules:
- Output ONLY the raw llms.txt markdown. No preamble, no explanation, no code fences.
- Start with an H1 ("# Saurabh Yadav — ..."), followed by a one-paragraph blockquote summary ("> ...").
- Use ONLY facts present in the provided sources. Never invent projects, dates, employers, links, or numbers.
- Include every project (mark enterprise ones as private/no public links), all experience entries with dates, skills grouped by category, testimonials, contact/social links, and the site's pages (https://saurabh-yadav.me/, /projects, /timeline, /design.md which documents the site's design system, /sitemap.xml).
- Keep URLs exactly as they appear in the sources.
- Write for an AI assistant that wants to understand who Saurabh is, what he has built, and how to reach him. Clear, dense, factual prose over marketing fluff.`;

const userContent = sources
    .map(([label, text]) => `=== SOURCE: ${label} ===\n\n${text}`)
    .join("\n\n");

console.log(`[llms.txt] Prompt size: ${(SYSTEM_PROMPT.length + userContent.length).toLocaleString()} chars (~${Math.round((SYSTEM_PROMPT.length + userContent.length) / 4).toLocaleString()} tokens).`);

// -------------------------------------------------------------- API calls
async function callAnthropic() {
    const model = process.env.LLMS_MODEL || "claude-sonnet-5";
    console.log(`[llms.txt] Generating with Anthropic ${model}…`);
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
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: userContent }],
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
async function callOpenAICompatible({ label, url, key, defaultModel }) {
    const model = process.env.LLMS_MODEL || defaultModel;
    console.log(`[llms.txt] Generating with ${label} ${model}…`);
    const res = await fetch(url, {
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model,
            // Explicit cap — Groq counts input + max output against its
            // tokens-per-minute rate limit when sizing a request.
            max_tokens: 4096,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userContent },
            ],
        }),
    });
    if (!res.ok) throw new Error(`${label} API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "";
}

const PROVIDERS = {
    anthropic: callAnthropic,
    groq: () =>
        callOpenAICompatible({
            label: "Groq",
            url: "https://api.groq.com/openai/v1/chat/completions",
            key: KEYS.groq,
            defaultModel: "llama-3.3-70b-versatile",
        }),
    grok: () =>
        callOpenAICompatible({
            label: "xAI",
            url: "https://api.x.ai/v1/chat/completions",
            key: KEYS.grok,
            defaultModel: "grok-4",
        }),
};

// ---------------------------------------------------------------- run
try {
    let text = (await PROVIDERS[provider]()).trim();

    // Strip a wrapping code fence if the model added one despite instructions.
    const fenced = text.match(/^```(?:\w+)?\n([\s\S]*?)\n```$/);
    if (fenced) text = fenced[1].trim();

    const valid = text.startsWith("# ") && text.includes("Saurabh") && text.length > 500;
    if (!valid) throw new Error(`output failed validation (starts-with-h1=${text.startsWith("# ")}, length=${text.length})`);

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(OUT_FILE, text + "\n", "utf8");
    console.log(`[llms.txt] AI version written to ${path.relative(ROOT, OUT_FILE)} (${text.length} chars).`);
} catch (err) {
    console.warn(`[llms.txt] AI pass failed (${err.message}) — the deterministic llms.txt will be served.`);
    // No process.exit() here: exiting naturally (code 0) avoids a libuv
    // assertion crash on Windows when handles are still closing.
}
