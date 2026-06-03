# Saurabh Yadav — Portfolio

A dark, space-themed developer portfolio for **Saurabh Yadav**, Full Stack Engineer.
Built with React + Vite, pastel-on-black aesthetics, motion-driven animations,
signature page-wide effects (intro reveal, film grain, custom cursor, smooth
scroll), and a 3D Three.js layer.

## Live Link

Check out the live version [here](https://saurabh-yadav.me).

## Tech Stack

- React 18 + Vite 6
- Tailwind CSS (dark/space pastel design system)
- Framer Motion + Lenis (smooth scroll)
- Three.js / react-three-fiber + drei (3D scenes)
- react-icons (skill icons)
- EmailJS (contact form)

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in your EmailJS values
npm run dev                  # http://localhost:5173
npm run build                # production build
npm run preview              # preview the build
```

## Environment Variables

The contact form is configured via `VITE_*` variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service id |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS publishable public key |
| `VITE_CONTACT_EMAIL` | Recipient email address |
| `VITE_CONTACT_NAME` | Display name on the email |

These are inlined into the client bundle at build time (the EmailJS public key
is publishable by design). For production, set the same variables in your
**Cloudflare** dashboard (Workers & Pages → your project → Settings →
Variables and Secrets) so they're present at build time.

## Deployment

Deployed to **Cloudflare** (Workers Static Assets) via Wrangler. SPA routing is
handled by `assets.not_found_handling: "single-page-application"` in
[`wrangler.jsonc`](wrangler.jsonc) — unknown paths fall back to `index.html` so
client routes like `/projects` resolve. Build output is `dist/`.

```bash
npm run build
npx wrangler deploy        # or: npm run deploy
```

## About

Full Stack Engineer building high-performing, scalable web applications across
Python/Django/FastAPI, React/Next.js/TypeScript, AI integrations, and cloud
DevOps. Comfortable across the full software lifecycle — architecture, build,
deploy, and optimization.

## Connect

- [GitHub](https://github.com/itsSauraj)
- [LinkedIn](https://www.linkedin.com/in/saurabhyadav07/)
- [Live site](https://saurabh-yadav.me/#contact)
