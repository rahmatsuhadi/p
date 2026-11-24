---
name: Rahmat Suhadi Portfolio
description: Systems-focused frontend and fullstack engineering portfolio in the Systems Monograph visual language.
colors:
  signal-vermilion-dark: "#F26B3A"
  signal-vermilion-light: "#C84316"
  obsidian-bg: "#0C0E12"
  slate-surface: "#14181F"
  slate-muted: "#1C222D"
  slate-border: "#252C38"
  ink-light: "#F3F5F8"
  steel-muted: "#9AA4B2"
  paper-bg: "#F6F7F9"
  paper-surface: "#FFFFFF"
  paper-muted: "#ECEEF2"
  paper-border: "#DCE0E7"
  ink-dark: "#111318"
  graphite-muted: "#4B5563"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  badge: "6px"
  control: "8px"
  card: "12px"
  showcase: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-sm: "80px"
  section-lg: "128px"
components:
  button-primary-dark:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.obsidian-bg}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-light:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-accent-dark:
    backgroundColor: "{colors.signal-vermilion-dark}"
    textColor: "{colors.obsidian-bg}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-accent-light:
    backgroundColor: "{colors.signal-vermilion-light}"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-dark:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-light:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.card}"
    padding: "24px"
  badge-dark:
    backgroundColor: "{colors.slate-muted}"
    textColor: "{colors.steel-muted}"
    rounded: "{rounded.badge}"
    padding: "4px 10px"
  badge-light:
    backgroundColor: "{colors.paper-muted}"
    textColor: "{colors.graphite-muted}"
    rounded: "{rounded.badge}"
    padding: "4px 10px"
---

# Design System: Rahmat Suhadi Portfolio

## Overview

**Creative North Star: "The Systems Monograph"**
Dial: ENERGY 2 / RHYTHM 3 / MOTION 2 (DESIGN_VARIANCE: 7, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4)

This portfolio represents Rahmat Suhadi, a frontend and fullstack engineer based in Yogyakarta who builds operational web systems: cloud VPS orchestrators, self-hosted LiveKit SFU video conferencing, construction CDE file managers, regional infrastructure monitoring dashboards, and offline-first PWAs with AI receipt scanning. Rather than presenting these systems inside a generic developer template, the visual language treats the site like an engineering monograph: structured, tactile, high-contrast, and deliberate in every transition.

The interface is dark-first with full light-mode parity via a manual theme toggle. It rejects default Zinc-and-Tailwind-Blue SaaS cloning, purple-cyan neon gradients, warm-beige faux-luxury palettes, stacked eyebrow pill spam above every heading, and double-rendered `blur-2xl` thumbnail backdrops.

**Key Characteristics:**
- Precision index notation (`01 / 08`) and subtle geographic/technical metadata (`Yogyakarta, ID`) as a recurring identity motif.
- Structural 1px hairline dividers (`slate-border` / `paper-border`) paired with stepped tonal surfaces instead of heavy drop shadows.
- A single Signal Vermilion accent reserved strictly for focal actions, active states, and progress markers.
- Dual-theme parity (Deep Steel Obsidian default + Crisp Architectural Paper toggle) with verified WCAG AA contrast in both modes.
- Earned motion split between Framer Motion (micro-interactions, layout filters, modals) and GSAP ScrollTrigger (2 signature scroll moments only).

## Colors

A disciplined neutral foundation paired with one high-visibility industrial accent (Signal Vermilion), calibrated separately for dark and light canvases so every text pair exceeds WCAG AA contrast.

### Primary
- **Signal Vermilion Dark** (`#F26B3A`): Primary accent on dark surfaces (6.0:1 contrast against Deep Steel Obsidian `#0C0E12`, 5.5:1 against Elevated Slate `#14181F`). Used for active indicators, focus rings, key index markers, and accent CTAs paired with dark ink `#0C0E12`.
- **Signal Vermilion Light** (`#C84316`): Primary accent on light surfaces (5.6:1 contrast against Pure Surface `#FFFFFF`, 5.2:1 against Architectural Paper `#F6F7F9`). Used for active indicators, focus rings, and accent CTAs paired with crisp white ink `#FFFFFF`.

### Neutral
- **Deep Steel Obsidian** (`#0C0E12`): Default dark mode page ground.
- **Elevated Slate** (`#14181F`): Dark mode card, panel, and showcase surface.
- **Slate Muted** (`#1C222D`): Dark mode chip, badge, and secondary control background.
- **Slate Border** (`#252C38`): Dark mode 1px hairline divider and structural border.
- **Ink Light** (`#F3F5F8`): Dark mode primary headings, body emphasis, and primary pill button ground.
- **Steel Muted** (`#9AA4B2`): Dark mode secondary prose and metadata (7.6:1 on `#0C0E12`, 6.2:1 on `#1C222D`).
- **Architectural Paper** (`#F6F7F9`): Light mode page ground.
- **Pure Surface** (`#FFFFFF`): Light mode elevated card and showcase surface.
- **Paper Muted** (`#ECEEF2`): Light mode chip, badge, and secondary control background.
- **Paper Border** (`#DCE0E7`): Light mode 1px hairline divider and structural border.
- **Ink Dark** (`#111318`): Light mode primary headings, body emphasis, and primary pill button ground.
- **Graphite Muted** (`#4B5563`): Light mode secondary prose and metadata (7.5:1 on `#FFFFFF`, 6.4:1 on `#ECEEF2`).

### Named Rules
**The One Signal Rule.** Signal Vermilion occupies at most 10% of any viewport. It marks active navigation, index numbers, focus rings, and primary highlights, never full-bleed backgrounds or decorative gradient washes.
**The Contrast Floor Rule.** Every text and icon control must meet WCAG AA (4.5:1 normal text, 3:1 large text). Never place white text on `#F26B3A`; pair `#F26B3A` with `#0C0E12` text, and pair `#C84316` with `#FFFFFF` text.
**The Theme Parity Rule.** The page holds one unified theme at a time (dark-first with a working manual toggle). Never sandwich a light section inside a dark page or invert individual sections mid-scroll.

## Typography

**Display Font:** Bricolage Grotesque (with `system-ui, sans-serif` fallback)
**Body Font:** Plus Jakarta Sans (with `system-ui, sans-serif` fallback)
**Label/Mono Font:** IBM Plex Mono (with `ui-monospace, monospace` fallback)

**Character:** Bricolage Grotesque brings crisp, architectural personality to headlines without resorting to overused serifs or default SaaS sans. Plus Jakarta Sans provides clean, legible long-form reading across case studies, while IBM Plex Mono grounds technical metadata like dates, stack labels, and index counters.

### Hierarchy
- **Display** (`600`, `clamp(2.5rem, 5vw, 4.25rem)`, line-height `1.08`, tracking `-0.03em`): Hero H1 only.
- **Headline** (`600`, `clamp(1.75rem, 3vw, 2.5rem)`, line-height `1.15`, tracking `-0.025em`): Section H2 headings and Project Detail titles.
- **Title** (`600`, `1.25rem`, line-height `1.3`, tracking `-0.015em`): Project card titles and case study sub-sections.
- **Body** (`400`, `1rem`, line-height `1.65`, tracking `0em`): Narrative copy and case study descriptions, constrained to `max-w-[65ch]`.
- **Label** (`500`, `0.75rem`, line-height `1.4`, tracking `0.04em`): IBM Plex Mono for project indices (`01 / 08`), experience dates, location coordinates, and technical tags.

### Named Rules
**The No-AI-Default Rule.** Do not use Inter, Geist, Space Grotesk, Fraunces, or Instrument Serif.
**The Mono Restraint Rule.** Reserve IBM Plex Mono strictly for structured metadata (indices, dates, coordinates, stack tags), never for H1/H2 headings or multi-line prose. Limit uppercase eyebrow labels to at most 1 per 3 sections.

## Layout

Baseline container width is `max-w-6xl mx-auto px-6`, broken intentionally by full-width hairline dividers, asymmetric splits, and varied section compositions so no two consecutive sections share the same layout family. Vertical rhythm uses `py-20 md:py-32` (`80px` to `128px`) between major chapters.

**Homepage Section Rhythm:**
1. **Hero:** Asymmetric editorial split (`min-h-[100dvh]`, `pt-24` max). Left column holds H1, concise value proposition, Primary CTA to Projects, and Secondary Resume CTA; right column holds the portrait frame with a mono technical caption (`Yogyakarta, ID`). Fits cleanly above the fold on desktop.
2. **About & Engineering Focus:** 12-column editorial narrative paired with a hairline-divided (`divide-x` / `divide-y`) factual metric strip derived dynamically from real data (no hardcoded stale counts).
3. **Flagship Projects & Archive:** Two-part structure. Part A uses a GSAP Pinned Editorial Showcase on desktop (`>= 1024px`) for 4 flagship systems (Khayangan, Parisada Meet, CDE, Karthi Arta). Part B presents a compact, category-filterable Archive list/grid for all 8 projects.
4. **Experience:** GSAP ScrollTrigger scrub-drawn vertical timeline with real-time progress line and active node highlight.
5. **Education & Skills:** Asymmetric two-zone technical ledger combining compact Education entries with a grouped Skills matrix using local/inline icons (zero external CDN fan-out).
6. **Footer / Contact:** High-contrast closing typographic CTA, accessible social icon links (minimum `44px x 44px` tap targets), and copyright.

**Mobile Collapse (`< 768px`):** Multi-column grids collapse explicitly to `grid-cols-1` with `w-full` and `px-6`. Desktop GSAP scroll-pinning disables cleanly below `lg` (`1024px`) and renders as a crisp vertical stack. Root wrapper uses `overflow-x-clip` to prevent horizontal scrollbars.

### Named Rules
**The Rhythm Variation Rule.** Adjacent sections must never repeat the same layout skeleton. Alternate between asymmetric split, hairline metric ledger, pinned showcase, scrub timeline, and compact matrix.

## Elevation & Depth

Surfaces communicate hierarchy through tonal stepping (`obsidian-bg` -> `slate-surface` -> `slate-muted` in dark mode; `paper-bg` -> `paper-surface` -> `paper-muted` in light mode) and crisp `1px` structural hairline borders.

Shadows are omitted at rest. Subtle background-tinted elevation appears only on interactive hover states or modal overlays. `backdrop-blur` is strictly restricted to fixed/sticky layers (the floating Navbar island, mobile navigation drawer, and screenshot lightbox overlay) and is banned on scrolling cards or content containers. Double-rendered `blur-2xl` background images behind thumbnails are prohibited.

### Named Rules
**The Flat-By-Default Rule.** Cards and containers sit flat on the grid at rest with 1px hairline borders; depth and shadow appear only in response to hover, focus, or modal state.

## Shapes

A strict, purposeful radius hierarchy distinguishes interactive pills from structural containers:
- **Pills (`9999px` / `rounded-full`):** Primary action buttons, floating Navbar island, and circular social icon buttons.
- **Showcase Frames (`16px` / `rounded-2xl`):** Flagship project screenshot frames, hero portrait container, and lightbox media frame.
- **Cards & Panels (`12px` / `rounded-xl`):** Experience entries, education panels, and archive cards.
- **Secondary Controls (`8px` / `rounded-lg`):** Filter tabs, theme toggle button, and inline action buttons.
- **Badges (`6px` / `rounded-md`):** Tech stack chips and status tags.

### Named Rules
**The Shape Discipline Rule.** Never make every element pill-shaped. Reserve `rounded-full` strictly for primary CTAs, circular icon controls, and the floating navigation island.

## Components

### Buttons & CTA Vocabulary
- Use one consistent label per intent across the entire site: `"View Projects"` (or `"Explore Work"` -> pick one and reuse), `"Get in touch"` (for `mailto:` contact), and `"Download Resume"` (or `"Resume (Soon)"` while pending).
- **Dummy Resume Placeholder Policy:** Until `public/resume.pdf` is supplied by the owner, the Resume CTA must render as an honest, functional placeholder (e.g., clearly labeled `"Resume (Coming Soon)"` or triggering a clean inline toast/notice rather than a broken `404` file download), marked with `// TODO: replace with real /resume.pdf` in source.
- Primary pill buttons use `Ink Light` on `Obsidian` (dark) or `Ink Dark` on `Paper` (light), with tactile press feedback (`active:scale-[0.98]`).
- All interactive controls (`a[href]`, `button`, `[role="button"]`) must declare `cursor: pointer`, minimum `44px` touch target on mobile, and a visible `2px` Signal Vermilion `:focus-visible` ring.

### Navigation
- Floating pill island fixed at top (`max-h-[72px]`), using global absolute hash links (`/#projects`, `/#experience`, `/#skills`) so navigation works from both `/` and `/projects/[slug]`.
- Includes a working **Dark/Light Theme Toggle** persisted in `localStorage` and synced cleanly without hydration flicker.
- Mobile menu overlay includes `aria-expanded`, `Escape` key dismissal, and `44px+` tap targets.

### Project Showcase & Detail Case Study
- Thumbnails and screenshots render via a single Next.js `<Image>` inside a clean framed container (`slate-surface` / `paper-surface` with `1px` border), eliminating the double-image blur pattern.
- Project Detail (`/projects/[slug]`) provides generous top padding (`pt-28 md:pt-32`) to clear the fixed Navbar, structured case study blocks (Overview, Problems, Solutions, Tech Stack Decisions), **Prev / Next Project** navigation at the bottom, and an interactive **Screenshot Lightbox** (closable via `Escape` or backdrop click).

### Motion Grammar
Motion runs on a single unified engine (**GSAP 3.15 + `@gsap/react`**) with zero dual-library overhead:
- **Hero & Editorial Reveals (`SplitText`, `ScrambleTextPlugin`, `gsap.timeline()`, `gsap.quickTo()`):** Masked line/word reveal on display headings, technical coordinate decode on load/hover, and GPU-composited magnetic CTA physics on fine-pointer desktops.
- **Scroll Choreography (`ScrollTrigger`, `ScrollTrigger.batch()`, `ScrollToPlugin`):** Top reading-progress hairline, sticky flagship index tracking with image parallax scrub, smooth anchor jumps, and scroll-scrubbed Experience timeline progress.
- **UI State & Layout Transitions (`Flip`):** Smooth category filter reordering in the project archive followed by `ScrollTrigger.refresh()`, plus lightweight GSAP transitions for the mobile drawer, toast notice, and screenshot lightbox.
- Every GSAP setup uses `useGSAP()` with scoped refs and `gsap.matchMedia()`, disabling non-essential motion cleanly under `prefers-reduced-motion: reduce`.

### Named Rules
**The Earned Motion Rule.** Every animation must serve hierarchy, spatial orientation, or user feedback. Static elements stay still; GSAP ScrollTrigger is reserved exclusively for the 2 signature scroll chapters.

## Do's and Don'ts

### Do:
- **Do** keep Signal Vermilion (`#F26B3A` dark / `#C84316` light) to <= 10% of the viewport and always pair it with compliant high-contrast text.
- **Do** use one consistent language across all UI chrome, metadata, and JSON content.
- **Do** verify every interactive element (navbar links from subpages, theme toggle, project filters, lightbox Escape key, dummy resume feedback) and run `pnpm lint`, `npx tsc --noEmit`, and `pnpm build` after edits.
- **Do** bundle or inline skill icons locally instead of firing 20+ external requests to `cdn.simpleicons.org`.
- **Do** include `width`/`height` or `aspect-ratio` on all media, `priority` + `fetchpriority="high"` on the hero avatar only, and JSON-LD + `sitemap.ts` + `robots.ts` for SEO.

### Don't:
- **Don't** use em dash characters (U+2014) anywhere in UI copy or prose; use commas, colons, periods, or en dashes (`-` / `--`) for date ranges.
- **Don't** render two `<Image>` elements per project card or apply `blur-2xl` to scrolling containers.
- **Don't** ship dead links (`404` `/resume.pdf` or broken repo URLs); use an honest placeholder state until real assets exist.
- **Don't** use `h-screen` (always `min-h-[100dvh]`) or leave mobile tap targets smaller than `44px`.
- **Don't** attach GSAP ScrollTriggers to every section on the page or ignore `prefers-reduced-motion`.
