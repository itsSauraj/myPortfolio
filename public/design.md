# saurabh-yadav.me — Design System

> How this portfolio is designed and built. A dark, space-themed developer
> portfolio: deep-space surfaces, soft pastel accents, monospace body type,
> and a cursor-driven "spotlight" that reveals a glowing grid.

Live site: https://saurabh-yadav.me · Source: https://github.com/itsSauraj/myPortfolio
Machine-readable site context: https://saurabh-yadav.me/llms.txt

## Stack

- **Framework**: Next.js 14 (App Router) + React 18, deployed as a PWA (`@ducanh2912/next-pwa`)
- **Styling**: Tailwind CSS 3 (JIT) with custom tokens in `tailwind.config.cjs`, component utilities in `src/index.css`
- **Motion**: Framer Motion (scroll-reveal variants), Lenis smooth scrolling, CSS keyframe loops
- **3D**: Three.js via react-three-fiber + drei — GLTF desktop PC model in the hero, star-field and planet canvases
- **Icons**: react-icons, resolved by string key via `src/utils/icons.jsx`

## Color

### Surfaces (deep space)

| Token | Hex | Use |
| --- | --- | --- |
| `space-900` | `#02030A` | Page background, theme-color |
| `space-800` | `#070A18` | Raised surfaces, form fields |
| `space-700` | `#0E1228` | Higher surfaces |
| `primary` | `#050816` | Legacy base surface |
| `tertiary` | `#151030` | Cards |
| `black-100` / `black-200` | `#100d25` / `#090325` | Deep panels |

### Text

| Token | Hex | Use |
| --- | --- | --- |
| white | `#FFFFFF` | Headings |
| `secondary` | `#aaa6c3` | Body copy, muted text |
| `#dfd9ff` | — | Hero subtext |

### Pastel accents (muted, readable on dark)

| Token | Hex |
| --- | --- |
| `accent-lavender` | `#C9B8FF` |
| `accent-sky` | `#9FD4FF` |
| `accent-mint` | `#A9E8D0` |
| `accent-rose` | `#F3C0E0` |
| `accent-peri` | `#A9B4FF` |

Lavender is the primary accent (buttons, labels, glows, grid lines). Project
cards each carry one accent as their `accent` color. Tags use gradient text
utility classes (`blue|green|pink|orange-text-gradient`).

## Typography

- **Display**: Bebas Neue (`font-display`) — headings, uppercase, tight leading (`0.95`)
- **Body / mono**: Roboto Mono (`font-mono`, also the `body` default) — everything else
- Loaded from Google Fonts with `preconnect`; `color-scheme: dark` globally

Scale (from `src/styles.js`):

- Hero head: 46 → 58 → 72 → 96px across breakpoints, tracking `-0.01em`
- Section head: 36 → 46 → 58 → 72px, uppercase
- Section sub-label: 13–16px mono, uppercase, letter-spacing `0.3em`, lavender
- UI labels/badges: 11–13px mono, bold, uppercase, wide tracking

## Components (utility classes in `src/index.css`)

- `.panel` — `rounded-2xl`, `border-white/10`, `bg-white/[0.03]`, soft shadow, backdrop blur; `.panel-hover` lifts `-translate-y-1` and glows lavender
- `.btn-accent` — pill button: lavender border/tint, mono uppercase 13px, glow on hover, `active:scale-[0.98]`
- `.badge` — full-round bordered chip, 11px mono uppercase, widest tracking
- `.tag` — full-round `bg-white/5` chip, 12px mono, secondary text
- `.field` / `.field-label` — form inputs on `space-800/80`, lavender focus ring + glow

Shadows: `soft` (deep drop), `glow` / `glow-sky` / `glow-lg` (accent halos), `card`.
Radii: `rounded-2xl` panels, `rounded-xl` buttons/fields, `rounded-full` chips.

## Background & atmosphere

Layered fixed backgrounds, back to front:

1. `space-grid` — 40px × 40px grid of 5%-opacity lavender lines
2. **Spotlight** — a bright copy of the grid revealed through a ~240px radial
   cursor mask (`--mx`/`--my` CSS vars), plus a soft lavender light pool;
   enabled only on hover-capable devices (`body.spotlight-on`)
3. **Hero grid** — element-local spotlight (`--lx`/`--ly`) with drop-shadow
   glow, and traveling light pulses that run along grid lines (7s loops)
4. **Film grain** — fixed SVG `feTurbulence` overlay at 5% opacity, animated
   with `steps(10)` over 8s
5. `space-glow` — static radial gradients tinting the top of the page

## Motion

- **Scroll reveal**: Framer Motion variants in `src/utils/motion.js` —
  `textVariant` (spring drop-in), `fadeIn` (directional, ease-out), `zoomIn`,
  `slideIn`, `staggerContainer`. Sections animate `hidden → show` once, at
  10% viewport visibility (see `src/hoc/SectionWrapper.jsx`)
- **Loops**: `marquee` / `marquee-reverse` (28s linear, seamless −50%
  translate), `float` (6s ease-in-out bob), `grain` (8s stepped)
- **Scrolling**: Lenis smooth scroll; `ScrollProgress` bar; hash scrolling
  offset by 100px (`.hash-span`)
- **Cursor**: custom cursor replaces the native one on pointer-fine devices
  (`cursor: none` + `CustomCursor` component); intro reveal on first load

## Layout

- Sections: `max-w-7xl mx-auto`, padding `sm:px-16 px-6` / `sm:py-16 py-10`,
  wrapped by `SectionWrapper` (adds anchor span + stagger container)
- Breakpoints: Tailwind defaults plus `xs: 450px`
- Pages: `/` (hero, about, experience, skills, works, testimonials, contact),
  `/projects`, `/timeline`; global Navbar + Footer around all pages

## Voice

Terminal/engineer aesthetic: uppercase mono labels with wide tracking, big
condensed display headings, muted lavender-on-void palette. Dark only —
no light theme.
