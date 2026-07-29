import fs from 'fs'
import path from 'path'

import { buildLlmsTxt } from '../../src/utils/llms'

// Baked at build time (like robots.js / sitemap.js). If the optional AI pass
// (scripts/generate-llms-ai.mjs) wrote an enhanced file, serve that; otherwise
// serve the deterministic version built from src/constants.
export const dynamic = 'force-static'

const AI_FILE = path.join(process.cwd(), 'src', 'generated', 'llms-ai.txt')

export async function GET() {
    let body = null

    try {
        const ai = fs.readFileSync(AI_FILE, 'utf8').trim()
        if (ai.startsWith('# ')) body = ai
    } catch {
        // No AI-generated file — fall through to the deterministic build.
    }

    if (!body) body = buildLlmsTxt()

    return new Response(body + '\n', {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    })
}
