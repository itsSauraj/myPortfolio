# Deep-Space Terminal - Complete Design System

> The design system behind saurabh-yadav.me, written as a skill an AI agent
> (Claude or any capable model) can follow to reproduce this design anywhere:
> a dark, space-themed developer aesthetic - deep-void surfaces, soft pastel
> accents, condensed display type over monospace body, glowing grids revealed
> by the cursor, and film grain over everything. Every token below is the
> real value shipped in production, not an approximation.

Live site: https://saurabh-yadav.me · Source: https://github.com/itsSauraj/myPortfolio
Machine-readable site context: https://saurabh-yadav.me/llms.txt

---

## 0 · How to use this file (instructions for AI agents)

Read the whole file before generating any UI. Everything in sections 2–10 is
**mandatory** when applying this system. Sections marked **OPTIONAL** are
features the user must opt into - never assume them.

**Ask the user these questions first, before writing code:**

1. **Theme** - Dark is the canonical theme and the default. Ask: *"Dark only
   (default), light only, or both with a toggle?"* If light is chosen, use
   the light-mode token mapping in §2.4.
2. **3D hero model** - Ask: *"Keep the 3D hero model? (keep / no-keep)"*
   - **keep** → ask the user for the path to their GLTF/GLB model (e.g.
     `public/desktop_pc/scene.gltf`) and follow §9.
   - **no-keep** → use the glowing hero grid (§5) as the hero visual instead;
     it is designed to stand alone.
3. **LLM view** - Ask: *"Include the per-page LLM/Human markdown view? (optional)"*
   If yes, follow §8.
4. **Tone** - Ask: *"Dramatic or professional copy tone?"* Then apply §10
   consistently. Never mix tones on one surface.

**Non-negotiables** (apply regardless of the answers above): the two fonts,
the letter-spacing rules, the shadow system, border + radius rules, the
responsiveness patterns, and reduced-motion support.

---

## 1 · Stack

- **Framework**: Next.js App Router + React. This reference site ships on
  Next.js 14; **new implementations should target Next.js 16** - notes:
  - `params` / `searchParams` / `cookies()` / `headers()` are async - await them.
  - Turbopack is the default bundler; avoid webpack-only plugins.
  - Prefer static generation for every page (this whole system is static-friendly).
  - Everything in this file is plain Tailwind/CSS/Framer Motion and framework-agnostic.
- **Styling**: Tailwind CSS with custom tokens (all listed below), component
  utilities in a single global CSS file.
- **Motion**: Framer Motion (scroll-reveal variants) + Lenis smooth scrolling
  + CSS keyframe loops.
- **3D (optional)**: Three.js via react-three-fiber + drei.
- **Icons**: react-icons resolved by string key.

---

## 2 · Color

### 2.1 Surfaces (deep space - dark, canonical)

| Token | Hex | Use |
| --- | --- | --- |
| `space-900` | `#02030A` | Page background, `theme-color`, nav/footer tint |
| `space-800` | `#070A18` | Raised surfaces, form fields |
| `space-700` | `#0E1228` | Highest opaque surfaces |
| `primary` | `#050816` | Legacy base surface |
| `tertiary` | `#151030` | Cards |
| `black-100` / `black-200` | `#100d25` / `#090325` | Deep panels |

Translucent surface recipe (used more than opaque tokens): `bg-white/5` or
`bg-white/[0.03]` over the void + `border border-white/10` + `backdrop-blur`.
This is the signature "glass on void" look - prefer it for cards, chips,
menus, and panels.

### 2.2 Text

| Token | Hex | Use |
| --- | --- | --- |
| white | `#FFFFFF` | Headings, emphasized values |
| `secondary` | `#aaa6c3` | Body copy, muted labels |
| `#dfd9ff` | - | Hero subtext only |

### 2.3 Pastel accents (muted, readable on dark)

| Token | Hex | Role |
| --- | --- | --- |
| `accent-lavender` | `#C9B8FF` | **Primary** - buttons, labels, glows, grid lines, cursor |
| `accent-sky` | `#9FD4FF` | Secondary - alternate glows, horizontal pulses |
| `accent-mint` | `#A9E8D0` | Status/positive ("available", terminal user) |
| `accent-rose` | `#F3C0E0` | Per-card accent variety |
| `accent-peri` | `#A9B4FF` | Per-card accent variety |

Rules: lavender is the only accent used for interactive states. Cards may
each carry one accent (`accent` prop) for identity. Accents are used at low
alpha for fills (`/15`, `/20`, `/25`) and mid alpha for borders (`/40`–`/60`)
- never as large solid fills.

### 2.4 Light mode (OPTIONAL - only if the user opts in)

Keep the same hue relationships; invert value, deepen accents for contrast
(every text/interactive color must pass WCAG AA 4.5:1 on its surface):

| Dark token | Light equivalent | Hex |
| --- | --- | --- |
| `space-900` background | `paper-50` | `#FAFAFF` |
| `space-800` surface | `paper-100` | `#F1F0FA` |
| `space-700` surface | `paper-200` | `#E6E4F4` |
| white headings | `ink-900` | `#16132B` |
| `secondary` text | `ink-600` | `#565274` |
| `accent-lavender` | `accent-lavender-deep` | `#6D57C8` |
| `accent-sky` | `accent-sky-deep` | `#2F6FA8` |
| `accent-mint` | `accent-mint-deep` | `#1F7A5C` |
| `border-white/10` | `border-ink-900/10` | - |
| `bg-white/5` glass | `bg-ink-900/[0.04]` | - |

Light mode keeps: grid background (lavender lines at 6–8% opacity), grain at
3% opacity, all typography and spacing rules. Light mode drops: spotlight
glow pool (halve its alpha), `glow` shadows (halve alpha). Implement via a
`class` strategy (`dark:` variants or CSS variables), defaulting to dark.

---

## 3 · Typography

Two fonts, no substitutes. Load from Google Fonts with `preconnect`.

| Family | Token | Role |
| --- | --- | --- |
| **Bebas Neue** | `font-display` | All headings and display text. Always uppercase. |
| **Roboto Mono** | `font-mono` / `font-body` | Everything else - body default lives on `<body>`. |

### 3.1 Scale

| Element | Size (px, responsive min → max) | Weight | Leading |
| --- | --- | --- | --- |
| Hero headline | 46 → 58 → 72 → 96 | display | `0.95` |
| Section headline | 36 → 46 → 58 → 72 | display, uppercase | `0.95` |
| Card title | 22–24 | display, uppercase | tight |
| Hero subtext | 16 → 18 → 22 → 26 (mono, `#dfd9ff`) | 500 | 36px at lg |
| Body copy | 15–17 | mono | 26–30px |
| Section sub-label | 13–16 | mono, uppercase | - |
| UI labels / buttons | 12–13 | mono bold, uppercase | - |
| Badges / chips / footnotes | 11–12 | mono, uppercase | - |
| Terminal text | 12–13 | mono | 22px |

### 3.2 Letter spacing (exact, mandatory)

| Context | Tracking |
| --- | --- |
| Display headlines | `-0.01em` (hero) / normal (sections) - never wide |
| Section sub-labels ("MY WORK") | `0.3em` |
| Footer identity label | `0.25em` |
| Nav links, badges, chips, toggle buttons | `widest` (`0.1em`) |
| Buttons (`.btn-accent`) | `wider` (`0.05em`) |
| Terminal chrome | `tight` (`-0.025em`) |

The contrast law of this system: **big condensed tight headlines against tiny
wide-tracked mono labels.** If everything is wide or everything is tight, the
look collapses.

---

## 4 · Shadows, borders, radii

### 4.1 Shadow types (exact values)

| Token | Value | Type | Use |
| --- | --- | --- | --- |
| `soft` | `0 18px 50px -20px rgba(0,0,0,0.7)` | Ambient depth | Default panel/card elevation |
| `card` | `0px 35px 120px -15px #211e35` | Deep ambient | Large feature cards |
| `glow` | `0 0 28px -8px rgba(201,184,255,0.45)` | Accent halo | Hover/focus on interactive elements |
| `glow-sky` | `0 0 28px -8px rgba(159,212,255,0.45)` | Accent halo | Sky-accented elements |
| `glow-lg` | `0 0 60px -10px rgba(201,184,255,0.40)` | Large halo | Hero features, spotlighted panels |
| line glow | `0 0 16px 1px rgba(201,184,255,0.55)` | Neon line | Timeline spine, glowing rules |
| grid glow | `drop-shadow(0 0 8px rgba(201,184,255,0.45))` | Filter | Revealed grid lines |

Rules:
- Two shadow families only: **black ambient** (depth) and **accent glow**
  (energy). Resting elements get ambient; interaction adds glow.
- Glows are omnidirectional (`0 0 X -Y`) with negative spread - a halo, not a
  drop. Never use harsh small-radius black shadows; depth here is soft and far.
- Standard hover: `-translate-y-1` (cards) or `-translate-y-0.5` (small
  controls) + border brightens to `accent/40–50` + `shadow-glow`, over
  `transition-all duration-200–300`.

### 4.2 Borders & radii

- Border: `1px solid rgba(255,255,255,0.10)` everywhere (`border-white/10`);
  brighten on hover, `border-white/20` for strong dividers.
- Radii: `rounded-2xl` (16px) panels/cards · `rounded-xl` (12px)
  buttons/fields/icon tiles · `rounded-full` chips, pills, badges, cursor.

---

## 5 · Background & atmosphere

Layered fixed backgrounds, back to front (this stack IS the brand):

1. **Void** - solid `#02030A`.
2. **Grid** - 40 × 40px lines of lavender at 5% opacity
   (`linear-gradient(rgba(201,184,255,0.05) 1px, transparent 1px)` both axes).
3. **Spotlight** *(pointer devices only, `body.spotlight-on`)* - a bright copy
   of the grid (lines at 0.55 alpha) masked by a ~240px radial that follows
   the cursor via `--mx`/`--my` CSS vars, plus a 300px lavender light pool at
   10% alpha. Fades in over 0.5s.
4. **Hero grid** *(hero only)* - element-local spotlight (`--lx`/`--ly`,
   220px radius) with the grid glow drop-shadow, plus traveling light pulses:
   1px lines with a 150–220px gradient "comet" running along them
   (7s vertical lavender, 9s horizontal sky, linear, infinite).
5. **Grain** - fixed SVG `feTurbulence` (fractalNoise, baseFrequency 0.85,
   3 octaves) tile at 5% opacity, sized 200% and jittered by a `steps(10)`
   8s keyframe walk. `z-index` above content, `pointer-events: none`.
6. **Top glow** - static radials tinting the page top:
   `radial-gradient(900px circle at 50% -10%, rgba(169,180,255,0.12), transparent 60%)`
   + `radial-gradient(700px circle at 100% 20%, rgba(159,212,255,0.08), transparent 55%)`.

---

## 6 · Cursor design

The native cursor is replaced on hover-capable devices only
(`matchMedia("(hover: hover) and (pointer: fine)")`); touch devices are
untouched. When active, `body.has-custom-cursor * { cursor: none !important }`.

Two fixed, `pointer-events: none`, `z-index: 9999` primitives:

| Primitive | Spec | Motion |
| --- | --- | --- |
| **Dot** | 7px circle, solid `#C9B8FF`, centered via negative margin | Tracks pointer 1:1 (raw motion value) |
| **Ring** | 38px circle, `1.5px` border `rgba(201,184,255,0.7)` | Lags on a spring: stiffness 350, damping 28, mass 0.5 |

Over interactive elements (`a, button, [data-cursor], input, textarea,
label, select`): ring scales to **1.8×** and drops to **0.6 opacity** on a
spring (stiffness 300, damping 20). Mark custom interactive elements with
`data-cursor`.

---

## 7 · Motion, responsiveness, layout

### 7.1 Motion

- **Scroll reveal** (Framer Motion variants): `textVariant` (spring drop-in),
  `fadeIn` (directional, ease-out), `zoomIn`, `slideIn`, inside
  `staggerContainer` (~0.07–0.1s stagger). Sections animate `hidden → show`
  once, at ~10–25% viewport visibility.
- **Loops**: marquee 28s linear (two copies, translate −50% for a seamless
  loop; second row reversed), `float` 6s ease-in-out ±8px bob, grain 8s
  `steps(10)`.
- **Scrolling**: Lenis smooth scroll; thin `ScrollProgress` bar; hash targets
  offset by 100px.
- **Micro**: `active:scale-[0.98]` on buttons; 200–300ms `transition-all` on
  hover states; full-screen menu backdrop-blurs in over 0.4s with
  `[0.22, 1, 0.36, 1]` easing.
- **Always** honor `prefers-reduced-motion: reduce` - collapse all animation
  durations to ~0 and stop the grain loop.

### 7.2 Responsiveness

- Breakpoints: Tailwind defaults **plus `xs: 450px`**. Design mobile-first;
  the display scale steps at `xs / sm / lg` (see §3.1).
- Section shell: `max-w-7xl mx-auto` + `px-6 sm:px-16` + `py-10 sm:py-16`;
  reading copy capped at `max-w-3xl`; terminal/markdown panels `max-w-4xl`.
- Grids: 1 column mobile → `md:grid-cols-2` → `xl:grid-cols-3`, `gap-6`.
- Nav: inline links ≥ `lg`; below that, a full-screen terminal-style overlay
  menu (portaled, backdrop-blur 24px, staggered link entrance, socials in the
  footer of the overlay).
- Heavy effects degrade by capability, not width: spotlight + custom cursor
  gate on `(hover: hover) and (pointer: fine)`; 3D swaps to smaller scale or
  static fallback on mobile.

---

## 8 · LLM view (OPTIONAL - ask the user)

Every page gets a machine-readable markdown twin, generated at build time by
an LLM from the page's own source data (with a deterministic fallback so
builds never break). UI contract:

- **Toggle pill** - fixed under the navbar (`top-[84px] right-4`, `z-30`),
  glass style (`border-white/10 bg-space-900/70 backdrop-blur`), two
  segments: `HUMAN` / `LLM` - 11px mono uppercase widest; active segment
  `bg-accent-lavender/20 text-accent-lavender`. Present on every page.
- **LLM mode** replaces the page body with a terminal panel (`max-w-4xl`,
  `rounded-2xl border-white/10 bg-white/5`):
  - Chrome bar: `user@site:~$ cat <page>.md` (user in mint, host in sky,
    command in white) + a `COPY` pill that copies the raw markdown.
  - Body: raw markdown in `<pre>`, 13px mono, 22px leading, `secondary`
    color, `whitespace-pre-wrap`.
  - Footnote linking the whole-site `/llms.txt`.
- Switching views scrolls to top; human view is the default and what search
  engines index.

---

## 9 · 3D models (OPTIONAL - ask keep/no-keep, then ask for the model path)

If the user keeps 3D: ask for the GLTF/GLB path (this site uses
`public/desktop_pc/scene.gltf` for the hero and `public/planet/scene.gltf`).

Rules: react-three-fiber `<Canvas>` in a `dynamic(() => import(...), { ssr:
false })` wrapper inside `<Suspense>` with the dotted `canvas-loader`
spinner; `frameloop="demand"` where possible; `preserveDrawingBuffer`;
hemisphere + spot + point lights tuned dim (the model should sit *in* the
void, not on it); `OrbitControls` locked to rotation only (no zoom/pan,
polar angle clamped); scale down ~30% and lift the camera on `max-width:
500px`; never block first paint on a model.

If the user drops 3D: the hero grid (§5.4) with its pulses and spotlight is
the hero visual. Do not substitute stock illustrations.

---

## 10 · Voice & tone (two modes - ask the user)

Structural constants in both tones: labels are uppercase mono with wide
tracking; headlines are huge, condensed, uppercase; body copy is complete
sentences in sentence case; buttons are 1–3 words.

### 10.1 Dramatic (mission-control cinema)

The interface speaks like a spacecraft terminal. Use for personal sites and
creative portfolios. Metaphors: transmission, payload, mission, systems.

- Section label: `CONTACT TRANSMISSION` · headline: `SEND A SIGNAL`
- Empty state: `NO INCOMING TRANSMISSIONS`
- Status chip: `● SYSTEMS NOMINAL - AVAILABLE FOR WORK`
- Email header: `New Message` under a `Contact Transmission` eyebrow;
  sender block labeled `Sender Information`, body labeled `Message Payload`
- Terminal strings everywhere plausible: `saurabh@portfolio:~$ ls --sections`

### 10.2 Professional (recruiter-grade clarity)

Same skeleton, zero theatrics. Use for client work and B2B surfaces.

- Section label: `CONTACT` · headline: `GET IN TOUCH`
- Empty state: `Nothing here yet.`
- Status chip: `● AVAILABLE FOR WORK`
- Email header: `New contact form message`; blocks labeled `From` / `Message`
- Terminal chrome allowed, but commands stay real: `cat home.md`

Rule: pick one tone per project (ask the user, §0.4). Dramatic lives in
labels, headlines, empty states, and chrome - body copy stays factual in
both modes. Never let drama obscure a fact a recruiter needs.

---

## 11 · Accessibility & performance floor

- Text contrast ≥ 4.5:1 (secondary `#aaa6c3` on `#02030A` passes; accents at
  full value on void pass; accents on light surfaces must use §2.4 deeps).
- Focus states: reuse the hover treatment (accent border + glow) - never
  remove outlines without replacing them.
- `prefers-reduced-motion` fully honored (§7.1).
- Decorative layers (grid, grain, spotlight, pulses, cursor) are
  `pointer-events: none` and `aria-hidden`; the site must be fully usable
  with them deleted.
- Static-render every page; lazy-load canvases; keep First Load JS lean -
  atmosphere is CSS, not JavaScript.

---

## 12 · Application checklist

1. Asked the user: theme? 3D (path?)? LLM view? tone? (§0)
2. Fonts: Bebas Neue display + Roboto Mono everything else. (§3)
3. Tracking: tight headlines, `0.3em` sub-labels, `widest` chips. (§3.2)
4. Surfaces: glass-on-void recipe, `border-white/10`, correct radii. (§2, §4.2)
5. Shadows: ambient at rest, glow on interaction, exact tokens. (§4.1)
6. Atmosphere: void → grid → spotlight → grain → top glow. (§5)
7. Cursor: dot + spring ring, hover-capable devices only. (§6)
8. Motion: staggered reveals, marquee, reduced-motion support. (§7.1)
9. Responsive: `xs` breakpoint, section shell, capability-gated effects. (§7.2)
10. Copy: one tone, applied everywhere. (§10)
