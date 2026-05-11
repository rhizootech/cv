# PRD: Personal Portfolio Site — dewald.{dev/co.za/vercel.app}

**Author:** Dewald Scholtz
**Status:** Approved for build
**Date:** 2026-05-11
**Working title:** `dewald-cv` (Next.js, deployed to Vercel)

---

## Problem Statement

I'm a polymath founder / builder running RCT, currently maintaining the Edgetower SaaS suite, and I take on engagements with employers and clients to (a) help them build, and (b) keep learning myself. Every time I'm invited to a role — like the recent Senior Full Stack / Tech Lead invitation at eSimplified — I find myself updating my CV from scratch: copying achievements, re-formatting, hunting for media, fiddling with PDF layout.

Worse, a CV is a poor representation of what I actually am. I'm not a "coder" — I'm someone who builds solutions by whatever means necessary, across AI, IoT, cybersecurity, telecoms, industrial automation, full-stack SaaS, and adtech. A bullet-pointed PDF flattens that into "Python · Django · AWS" and loses the polymath / founder / problem-solver identity that is actually my differentiation. Recruiters see another senior engineer; hiring managers don't see the owner-mindset they're actually looking for.

I want one stable link I can send to employers, clients, and connections that:

- Replaces the recurring CV-update tax — I update one source, everything else (incl. a print-ready CV) regenerates.
- Positions me honestly as an *owner who chooses where to plug in*, not a job applicant.
- Lets visitors self-filter against the kinds of engagements I'm open to (senior FS / tech lead · founding eng / fractional CTO · R&D / AI specialist · RCT consulting).
- Demonstrates breadth (Edgetower SaaS, OTH industrial automation, Think WiFi adtech, Cybermarks SIEM, Vodacom telecoms-scale ops, AI/CV work) without overwhelming the reader.
- Looks and feels like *me* — continuous with the Edgetower brand, restrained-cybersec aesthetic, polymath voice — not another interchangeable senior-engineer portfolio.

---

## Solution

A single-page portfolio site at a stable Vercel URL (`*.vercel.app` initially, custom domain later) that visitors can scan in under a minute and explore in depth if they want.

**Structure** (scroll-driven, left side-nav with scrollspy in Brittany Chiang's structural mold):

1. **Hero** — name, role line ("Founder · Polymath · Builder"), primary tagline (*"I help teams build. They help me learn."*), portrait, "● open to engagements" pulsing status pill, CTAs into Selected Work and What I'm Open To.
2. **About** — short prose in my own voice. Original Nerd from the '90s, problem-solver, polymath, "I'm possible."
3. **Now / What I'm open to** — concrete enumeration: Senior Full-Stack / Tech Lead roles · Founding Engineer / Fractional CTO at seed–Series A · R&D / AI / CV specialist · RCT consulting. Visitors self-select.
4. **Selected Work** — extensible card grid driven by MDX content files. Featured cards link to full detail pages where the project warrants it (Edgetower, OTH, Think WiFi at launch); others stay as cards with external links.
5. **Career arc** — visual timeline: Vodacom (12 yrs telecoms) → Naxian (AI) → Health Solutions → Cybermarks → RCT (8+ yrs, with Think WiFi and other engagements nested). The arc itself is the story: hardcore engineer → AI → security → founder.
6. **Stack** — scannable, recruiter-parseable chips of the actual tooling.
7. **Contact** — LinkedIn (primary CTA) + GitHub. No email surfaced. No contact form.

**Plus:**

- `/projects/[slug]` — full detail pages for Edgetower, OTH/SANS rigs, Think WiFi; more added by dropping MDX files into `content/projects/`.
- `/cv` — print-stylesheet route. Visitor hits the URL, sees a clean A4-formatted resume composed from the same content source, `Cmd+P → Save as PDF`. One source of truth; no more separate CV file to maintain.

**Aesthetic** — restrained cybersec / military / sci-fi. Brittany Chiang's structural polish (scrollspy side nav, project cards, smooth motion, generous whitespace) combined with Edgetower brand colors (`#1d8885` deep teal, `#35cbbb` bright cyan-teal) on a near-black base (`#0a0e10`), Inter for body, JetBrains Mono for HUD accents only (`// 01.` section labels, stack chips, hero greeting). Subtle ops cues: thin teal corner-brackets on cards, faint dot-grid background at ~5% opacity, teal radial glow behind the hero portrait, pulsing dot on the status pill. **No** hacker tropes (no Matrix rain, no green-on-black terminal, no `CLASSIFIED` redaction, no glitch). Executive, not edgelord.

---

## User Stories

### As Dewald (site owner / maintainer)

1. As Dewald, I want a single canonical URL I can paste into emails to employers, recruiters, and prospective clients, so that I never have to attach a freshly updated CV again.
2. As Dewald, I want to add a new project by dropping one MDX file into `content/projects/` with frontmatter, so that growing the site is a content task, not a code task.
3. As Dewald, I want the same project content to surface in the Selected Work cards AND the print-ready CV, so that there's exactly one place to update when something changes.
4. As Dewald, I want the print-ready CV regenerated automatically from site data, so that I can produce a fresh PDF on demand without ever maintaining a separate CV document.
5. As Dewald, I want a `featured: true/false` flag on each project, so that I can promote / demote a project's prominence on the home page without touching code.
6. As Dewald, I want a `detail: true/false` flag on each project, so that I can decide per-project whether it gets a full case-study page or stays card-only.
7. As Dewald, I want to control display order via a frontmatter `order` field, so that I can curate the narrative without renaming files.
8. As Dewald, I want the site to deploy automatically on every push to `main`, so that updating content == publishing.
9. As Dewald, I want Vercel preview deploys on every branch, so that I can share a draft URL before promoting changes to live.
10. As Dewald, I want privacy-friendly analytics (Vercel Analytics), so that I can see traffic patterns when I share the link with employers without dropping cookies or needing a consent banner.
11. As Dewald, I want to add a new "Open to" role type by editing one config file/array, so that I can pivot what kind of work I'm seeking without redesigning the site.

### As a recruiter / hiring manager (primary audience)

12. As a recruiter, I want to scan the site in under 60 seconds, so that I can decide whether to forward to the hiring manager.
13. As a recruiter, I want to immediately see what kinds of roles Dewald is open to, so that I don't waste a pitch on a role he won't entertain.
14. As a recruiter, I want a clearly visible, parseable list of tech stack keywords (Python, Django, Next.js, TypeScript, AWS, etc.), so that I can match against the JD's required skills.
15. As a recruiter, I want a downloadable PDF CV, so that I can attach it to an ATS / forward it in an email.
16. As a recruiter, I want a single contact CTA, so that I don't have to figure out the right channel.
17. As a hiring manager, I want to see real production projects with real outcomes (not lorem-ipsum portfolio fluff), so that I can judge senior-engineer credibility.
18. As a hiring manager, I want to read a full case-study on at least one project, so that I can assess depth, not just breadth.
19. As a hiring manager, I want the site itself to look polished and modern, so that it's evidence the candidate can produce polished, modern work.

### As a technical interviewer / senior engineer reviewing

20. As a senior engineer, I want to see architecture descriptions and tech choices for hero projects, so that I can probe in interview.
21. As a senior engineer, I want to see the candidate's GitHub linked prominently, so that I can sanity-check their code.
22. As a senior engineer, I want to see how the candidate writes about their own work, so that I can gauge communication and self-awareness.
23. As a senior engineer, I want the site to be fast and accessible, so that I infer the candidate cares about craft.

### As a potential RCT consulting client

24. As a potential client, I want to see what industries Dewald has shipped real solutions into, so that I can decide if my problem is in his wheelhouse.
25. As a potential client, I want to see Edgetower as an active product, so that I know he ships and maintains his own software, not just talks.
26. As a potential client, I want a way to reach him, so that I can start a conversation about my project.

### As a casual visitor / peer / ex-colleague

27. As a casual visitor, I want the site to feel distinctive and reflect Dewald's personality, so that it doesn't read like another templated dev portfolio.
28. As a peer in the SA tech scene, I want to see his career arc, so that I can understand how he got from Vodacom to founding RCT.

### As future Dewald (a year from now)

29. As future Dewald, I want the project schema to be strongly typed, so that I can't accidentally publish a project with missing or malformed metadata.
30. As future Dewald, I want a printable resume that always reflects what's on the site, so that the resume-update tax stays at zero.
31. As future Dewald, I want the site to remain stylistically continuous with Edgetower's brand, so that my personal and product brands reinforce each other.

---

## Implementation Decisions

### Stack

- **Next.js 15** (App Router) compiled as a **fully static export** — no SSR needed; deploys as static assets behind Vercel's CDN.
- **TypeScript** strict mode.
- **Tailwind CSS v4** for styling; brand tokens (`bg-base`, `accent-bright`, `accent-deep`, etc.) defined in CSS variables and exposed to Tailwind.
- **shadcn/ui** for primitives (Radix-backed, copy-paste ownership — no opaque dependency).
- **Framer Motion** for subtle scroll-spy reveals, hover micro-interactions, and the hero portrait fade-in. Animations stay restrained.
- **MDX** for project detail pages and the project-list source of truth. **`next-mdx-remote`** or equivalent for rendering.
- **Zod** for runtime validation of MDX frontmatter against a typed schema.
- **pnpm** as package manager.
- **Vercel Analytics** (free tier) — no consent banner needed.

### Deployment

- Hosted on **Vercel**, free tier.
- Default `*.vercel.app` URL at launch. Custom domain attached later without rebuild (likely `dewald.dev` or `dewaldscholtz.com`, decided post-launch).
- Auto-deploy on push to `main`; preview deploys on every branch.

### Content model — extensible by design

- All project content lives in `content/projects/<slug>.mdx`.
- Frontmatter schema (validated at build time via Zod):
  - `title`, `slug`, `summary` (1–2 sentences for the card), `stack[]`, `industry`, `year` or `dateRange`, `featured: boolean`, `detail: boolean`, `order: number`, `externalUrl?`, `cover?`, `status?` (e.g. `live`, `archived`, `case-study`).
- MDX body is the case-study content for `detail: true` projects; ignored for `detail: false` projects (which use only the summary).
- Same pattern for `content/experience/` entries powering the Career arc and the print CV.
- Same pattern for the **"Open to" list** — config array of `{ label, description }` editable in one place.

### Site structure

- **Single-page scroller** on `/` with sections: Hero, About, Now, Selected Work, Career arc, Stack, Contact.
- **Side-nav** with scrollspy highlighting the active section (`01. About`, `02. Now`, …).
- **`/projects/[slug]`** dynamic routes generated at build time from MDX files where `detail: true`.
- **`/cv`** print-stylesheet route: A4 layout, light background, no animations, page-break-friendly, composed from the same content data. Visitor uses browser print-to-PDF.

### Visual system

- **Palette**: `#0a0e10` base / `#10171a` elevated / `#1c2529` border / `#e6edf0` primary text / `#8a9499` secondary text / `#1d8885` accent-deep / `#35cbbb` accent-bright.
- **Type**: Inter for body & headings (variable), JetBrains Mono for HUD accents only — section numbers, stack chips, hero greeting line.
- **HUD vocabulary**: thin teal corner brackets on cards, `// 01.` mono section labels, status pill with pulsing teal dot, faint dot-grid background (~5% opacity), subtle teal radial glow behind the hero portrait.
- **No** hacker-aesthetic tropes (no Matrix rain, no green-on-black terminal, no `CLASSIFIED` redaction, no glitch animations).

### Contact

- **LinkedIn only** as primary contact CTA. GitHub linked as portfolio-of-code, not contact channel. No email surfaced, no contact form, no Resend / Formspree.

### Modules

The site decomposes into the following modules. Deep modules (with simple, testable interfaces hiding nontrivial logic) are marked **deep**.

1. **Content loader — `lib/content/`** *(deep)*
   - **Interface**: `getProjects(): Project[]`, `getExperience(): ExperienceItem[]`, `getOpenToList(): OpenToEntry[]`.
   - **Hides**: MDX file enumeration, frontmatter parsing, Zod validation, sorting by `order`, filtering by `featured` / `detail`.
   - **Why deep**: source of truth for every other surface (home page, detail pages, print CV). A single tested module guarantees consistency. Stable interface; the schema can evolve internally.

2. **Print-CV renderer — `app/cv/`** *(deep)*
   - **Interface**: renders the `/cv` route, consuming the content loader's typed output.
   - **Hides**: print-only typography, A4 page sizing, page-break heuristics, redaction of "open to" / interactive elements.
   - **Why deep**: keeps print-specific layout knowledge isolated from the main site components.

3. **Project detail page — `app/projects/[slug]/`**
   - Renders MDX body with a custom component map: `<Callout>`, `<Stack>`, `<MediaFrame>`, `<Figure>`, `<Metric>`.
   - Generates static params at build time from `getProjects()`.

4. **Section components — `components/sections/`**
   - One component per home-page section (Hero, About, Now, Work, CareerArc, StackChips, Contact). Composition only; data injected by the page.

5. **HUD primitives — `components/hud/`**
   - `<CornerBrackets>`, `<StatusPill>`, `<SectionLabel>` (the `// 01.` mono label), `<DotGridBackground>`, `<TealGlow>`. Visual atoms reused across sections.

6. **Scrollspy nav — `components/scrollspy-nav.tsx`**
   - IntersectionObserver-driven side nav. Emits the active section ID, highlights the corresponding nav item.

### Architectural decisions

- **Static export over SSR**: no DB, no auth, no per-request data — full static generation gives the best perf, lowest cost, simplest mental model.
- **Content-in-repo over headless CMS**: lower complexity, version-controlled, the MDX files ARE the CV. No CMS to log in to.
- **Same content powers home cards, detail pages, AND `/cv`**: the print CV is not a separate document; it's a different *view* over the same data.
- **shadcn over a component library import**: Dewald owns the component code, can re-skin freely, no opaque dependency upgrades.
- **No analytics consent banner**: Vercel Analytics is cookie-free.
- **LinkedIn-only contact**: aligns with Dewald's stated preference; also reduces inbox noise from low-quality inbound.

---

## Testing Decisions

### What makes a good test here

The site is mostly visual / compositional, so testing must focus on **external observable behavior of the data layer**, not implementation details of components. Tests should:

- Use fixture MDX files in a tests directory; never mock the parser itself.
- Assert on the shape of returned data, not on intermediate function calls.
- Catch the bugs that would silently break the site at build time (malformed frontmatter, missing required fields, wrong sort order, broken `featured` filter).
- Stay fast (`< 1s` total runtime) — this is a personal site, not a SaaS platform.

### Modules with tests

- **Content loader** (`lib/content/`) — **tested.** Critical because every other surface depends on it. Tests:
  - Valid fixture MDX files parse to the expected typed shape.
  - Missing required frontmatter fields throw a clear validation error.
  - Projects are returned sorted by `order` ascending.
  - `featured: true` filter returns only featured projects.
  - `detail: true` filter returns only those with detail pages (used to generate static routes).
- **Print-CV data composition** — **tested.** Asserts that the projects + experience + skills fed into `/cv` are the right subset and ordering. Doesn't test layout / CSS — that's manual print-preview QA.

### Modules NOT tested

- HUD primitives, section components, scrollspy — UI / DOM-dependent, more economical to verify manually in the browser.
- Framer Motion animations — manual QA.
- MDX rendering — covered transitively by content-loader tests + visual review of detail pages.

### Prior art

No existing test suite in the repo (greenfield). Test runner choice: **Vitest** (Next.js / Vite-friendly, fast, TS-native). A `tests/fixtures/content/` directory holds the canonical fixture files.

---

## Out of Scope

- **Blog / writing section.** Deferred — an empty or stale blog hurts more than no blog. May be added later if Dewald actually has writing to publish.
- **i18n / multi-language**. English-only.
- **Authenticated content / admin UI.** Content is just MDX files in the repo; editing == `git push`.
- **Backend / database.** Fully static, no server-side rendering, no API routes.
- **Server-side contact form handling** (Resend / Formspree / nodemailer). Dewald wants LinkedIn-only inbound; explicitly cut.
- **Custom domain at launch.** Site goes live on `*.vercel.app`; custom domain attached later as a no-rebuild DNS change.
- **Dark/light mode toggle.** Dark-only — the brand is dark.
- **Mobile-only redesign.** Site is mobile-responsive (Chiang structure adapts to a top-nav drawer), but is primarily designed for the desktop reading experience an employer will use.
- **CMS integration.** No Sanity, Contentlayer, Storyblok, etc.

---

## Further Notes

### Hero tagline decision

- **Primary tagline** in the Hero: **"I help teams build. They help me learn."** — Dewald's own line from the grilling session, captures the bi-directional value exchange that distinguishes him from typical applicants.
- **Secondary line** in the About section: **"I'm possible."** — his personal philosophy, woven into the prose rather than the hero.

### Project slate at launch

- **Detail pages (case studies)**: Edgetower · OTH (SANS-certified plumbing test rigs) · Think WiFi (ad-pacing algorithm + Django back-office + Pub/Sub→BigQuery pipeline).
- **Cards only**: Cybermarks SIEM · Vodacom core network (12 yrs, +3M subscriber scale) · AI / Computer Vision compilation (links to `github.com/scholtde`) · GitHub profile tile.
- Dewald has additional projects to add over time; the dynamic content model supports this without code changes.

### Career arc framing

- Think WiFi is listed as a *notable engagement under RCT* (since it was contracted through RCT), not as a separate role. Accurate to the LinkedIn record and avoids "why isn't this on his LinkedIn" friction.
- Same pattern for any future engagements Dewald takes through RCT.

### Assets pending from Dewald

- **Portrait photo** for the hero section. Placeholder used in the interim.
- **Edgetower screenshots / architecture diagram** for the Edgetower detail page (or permission to use anything from `resources/edgetower/`).
- **OTH metrics** (number of test rigs deployed, types of tests covered, dates) for the OTH detail page. The Plumbing Africa article and existing media in `resources/OTH/` cover the visual side.
- **Think WiFi specifics** (exact start month, team shape, rough scale numbers like campaigns paced / IOs delivered / BigQuery row counts) for the Think WiFi detail page. NDA-permitting; if numbers can't be shared, we lean on architecture and algorithm description.

### Memory persistence

Two memory files were written during the discovery session to inform future conversations on this project:

- `user_profile.md` — Dewald's career arc, tech depth, hero projects, positioning, LinkedIn-only contact preference.
- `feedback_voice_and_visual.md` — voice / aesthetic preferences (the "I'm possible" voice; Chiang structure + Edgetower teal palette; restrained cybersec aesthetic; explicit no-hacker-tropes guardrail).
