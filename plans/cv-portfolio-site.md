# Plan: CV Portfolio Site

> Source PRD: `docs/prd/cv-portfolio-site.md`

## Architectural decisions

Durable decisions that apply across all phases:

- **Routes**:
  - `/` — single-page scroller (Hero · About · Now · Work · Career arc · Stack · Contact)
  - `/projects/[slug]` — dynamic detail pages, statically generated from MDX files where `detail: true`
  - `/cv` — print-stylesheet route (composed from same content)
- **Content model**: MDX files in `content/projects/` and `content/experience/`. Frontmatter validated at build time via Zod. The same content powers home cards, detail pages, and the print CV.
- **Project frontmatter schema**: `title`, `slug`, `summary`, `stack[]`, `industry`, `year` or `dateRange`, `featured: boolean`, `detail: boolean`, `order: number`, `externalUrl?`, `cover?`, `status?`.
- **"Open to" model**: config array `{ label, description }` in `content/open-to.ts`.
- **Visual tokens**: CSS custom properties exposed to Tailwind v4 — `--color-bg-base`, `--color-bg-elevated`, `--color-border-muted`, `--color-text-primary`, `--color-text-secondary`, `--color-accent-deep` (`#1d8885`), `--color-accent-bright` (`#35cbbb`).
- **Typography**: Inter (body + headings, via `next/font/google`), JetBrains Mono (HUD accents only).
- **Stack**: Next.js 15 App Router + TypeScript strict + Tailwind v4 + shadcn/ui + Framer Motion + `next-mdx-remote` + Zod + Vitest + pnpm.
- **Deploy**: Vercel. Default `*.vercel.app` URL at launch; custom domain attached later. Auto-deploy on push to `main`; preview deploys on branches. Vercel Analytics (free tier, cookie-free).
- **Contact**: LinkedIn-only outbound link. No email surfaced, no form, no server-side route handlers.
- **Tests**: Vitest, two test files only — content loader, CV data composition. Everything else verified in-browser.

---

## Phase 1: Tracer bullet — scaffold + Hello, world on Vercel

**User stories**: 1, 8, 9, 10, 27

### What to build

Next.js 15 scaffold with TypeScript strict, Tailwind v4, brand tokens, Inter + JetBrains Mono fonts loaded, and a placeholder home page rendered against the dark base palette. Side-nav skeleton visible on the left. Hero placeholder: name + role line + primary tagline + static (non-pulsing) status pill. `@vercel/analytics` package installed and `<Analytics />` mounted in the root layout. No real content yet — this phase is about proving the stack works and the brand is visible.

### Acceptance criteria

- [ ] `pnpm install` and `pnpm build` complete without errors
- [ ] `pnpm dev` serves the home page at `localhost:3000` with the dark base background and brand colors applied
- [ ] Hero shows the name, the role line, the tagline, and a static status pill
- [ ] Side-nav skeleton is visible (no scrollspy logic yet, just static items `01. About / 02. Now / …`)
- [ ] `@vercel/analytics` is wired into the root layout
- [ ] Project is deployable to Vercel (the user connects the repo to Vercel via the dashboard once the scaffold builds locally)

---

## Phase 2: Content loader + Selected Work cards

**User stories**: 2, 3, 5, 6, 7, 17, 24, 29

### What to build

The deep "content loader" module that enumerates MDX files in `content/projects/`, parses + validates frontmatter against a Zod schema, and exports `getProjects()` returning a typed array sorted by `order`. Six stub project MDX files seeded (Edgetower, OTH, Think WiFi, Cybermarks SIEM, Vodacom, AI/CV). The home page renders a Selected Work card grid driven by the loader output. Cards show title, summary, stack chips, industry, year; cards with `externalUrl` link to that URL, cards with `detail: true` link to `/projects/[slug]` (route stubbed for Phase 3). Vitest is configured and the content-loader test file is written.

### Acceptance criteria

- [ ] `getProjects()` returns a typed `Project[]` array, sorted by `order` ascending
- [ ] All six seeded projects render as cards on the home page
- [ ] Adding a seventh MDX file to `content/projects/` adds a seventh card on next build, with zero code changes
- [ ] Vitest suite passes with tests covering: valid fixture parses correctly, missing required frontmatter throws a validation error, sort order honored, `featured` filter returns featured-only, `detail` filter returns detail-only
- [ ] Card hover state shows a subtle teal accent (matches the cybersec-ops aesthetic without hacker tropes)

---

## Phase 3: Project detail pages (Edgetower · OTH · Think WiFi)

**User stories**: 18, 20, 28

### What to build

Dynamic `/projects/[slug]` route with `generateStaticParams` driven by `getProjects().filter(p => p.detail)`. MDX bodies render with a custom component map: `<Callout>`, `<Stack>`, `<MediaFrame>`, `<Figure>`, `<Metric>`. HUD primitives wired in: corner brackets, section labels, mono accents. Real case-study content drafted for Edgetower (architecture, what problem it solves, current status), OTH (the SANS-certified test rigs story, with Plumbing Africa magazine reference + photos from `resources/OTH/`), and Think WiFi (ad-pacing algorithm, Pub/Sub→BigQuery pipeline, Django back-office, the contractor-through-RCT framing).

### Acceptance criteria

- [ ] `/projects/edgetower`, `/projects/oth`, `/projects/think-wifi` each render the case study content with HUD chrome
- [ ] Project cards on the home page with `detail: true` route through to these pages
- [ ] OTH detail page uses the existing OTH photos / video in `resources/OTH/`
- [ ] Card-only projects (Cybermarks, Vodacom, AI/CV, GitHub) do NOT generate detail routes
- [ ] Back-to-home navigation works from every detail page

---

## Phase 4: Remaining home sections — About · Now · Career arc · Stack · Contact

**User stories**: 11, 12, 13, 14, 22, 25, 26, 28

### What to build

Fills in every home-page section beyond the Hero + Selected Work. **About** prose in Dewald's voice (polymath / "I'm possible" / problem-solver-not-coder). **Now** section: enumerated "Open to" list driven by a `content/open-to.ts` config array. **Career arc**: vertical timeline component reading from `content/experience/` MDX files — Vodacom → Naxian → Health Solutions → Cybermarks → RCT (with Think WiFi nested as a notable engagement under RCT). **Stack**: parseable chip grid grouping Languages / Backend / Frontend / Data / Cloud / AI/CV / Hardware. **Contact**: LinkedIn (primary CTA) + GitHub icon links, no email surfaced.

### Acceptance criteria

- [ ] All home-page sections present in scrollable order: Hero → About → Now → Selected Work → Career arc → Stack → Contact
- [ ] Career arc timeline renders all major roles with dates, location, brief blurb
- [ ] "Open to" list is editable by changing one config file
- [ ] Stack chips are visibly grouped by category for fast recruiter scanning
- [ ] Contact section has LinkedIn as the primary CTA and a GitHub icon link; no email, no form

---

## Phase 5: `/cv` print-stylesheet route

**User stories**: 4, 15, 30

### What to build

A `/cv` route that renders an A4-formatted resume using the same content loader output (projects + experience + stack). Print-only stylesheet: light background, serif/sans mix, page-break rules, no animations, no nav. Visitor visits `/cv` → `Cmd+P → Save as PDF` produces a clean, printable CV. A Vitest test asserts the data-composition logic (the right projects + experience flow into the CV view) — does not test layout/CSS (that's manual print-preview QA).

### Acceptance criteria

- [ ] `/cv` renders a print-ready, A4-formatted resume composed from the same content sources as the home page
- [ ] `Cmd+P` from `/cv` produces a clean PDF with no scrollbars, no nav, sensible page breaks
- [ ] Updating a project's frontmatter is reflected in `/cv` on next build
- [ ] Vitest passes for the CV data-composition module
- [ ] Existing `resources/Profile.pdf` remains as a fallback download until the print route is verified

---

## Phase 6: Polish — scrollspy, motion, dot-grid, glow, favicon, OG meta

**User stories**: 19, 23, 31

### What to build

Final visual layer. IntersectionObserver-driven scrollspy: side nav highlights the active section (`01. About` lights up when that section is in view). Framer Motion subtle reveals on scroll for sections and project cards. Faint dot-grid background at ~5% opacity. Teal radial glow behind the hero portrait. Pulsing dot on the "● open to engagements" status pill. OG image generated (Next.js OG image route or static file). Favicon. SEO meta tags (`title`, `description`, `og:*`, `twitter:*`). Final cross-browser + mobile-width QA.

### Acceptance criteria

- [ ] Scrollspy works: scrolling the home page updates the active nav item visibly
- [ ] Scroll-triggered reveals feel subtle, not theatrical (no aggressive bounces or slides)
- [ ] Dot-grid background visible but faint
- [ ] Hero has a soft teal radial glow
- [ ] Status pill has a pulsing teal dot
- [ ] OG image renders correctly when the URL is pasted into LinkedIn / WhatsApp / Slack
- [ ] Favicon visible in browser tab
- [ ] Site renders cleanly at 320px, 768px, 1024px, 1440px widths
- [ ] Lighthouse score: Performance ≥ 95, Accessibility ≥ 95
