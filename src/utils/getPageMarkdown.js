// Server-only: resolves the markdown shown in a page's "LLM view".
// Prefers the AI-enhanced file written at build time by
// scripts/generate-llms-ai.mjs; falls back to the deterministic version
// built from src/constants. Pages are statically generated, so this runs
// once at build time.

import fs from "fs";
import path from "path";

import { buildPageMarkdown } from "./pageMarkdown";

export function getPageMarkdown(page) {
    try {
        const file = path.join(process.cwd(), "src", "generated", "pages", `${page}.md`);
        const text = fs.readFileSync(file, "utf8").trim();
        if (text.startsWith("# ")) return text;
    } catch {
        // No AI-generated file — fall through to the deterministic build.
    }
    return buildPageMarkdown(page);
}
