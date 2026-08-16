# Handoff: Portfolio Revamp — "The Index, no. 2" (concept 2a)

## Overview
A full redesign of Muhammad Hamza Asad's personal portfolio site. The existing site is a dark
navy/cyan template with centered hero, badge pill, and identical rounded cards — it reads as
generic and is losing prospective clients. The new direction is an editorial "printed index":
paper background, ink black, a single burnt-orange accent, dense typographic hierarchy, and
work presented as dossiers rather than cards.

Audience: startup founders looking for a build partner, recruiters at product companies, and
peer engineers. The site's job is to get him shortlisted.

## About the Design Files
The file in this bundle (`Portfolio Concepts.dc.html`) is a **design reference created in HTML** —
a prototype showing intended look and behavior, not production code to copy. The task is to
**recreate this design in the target codebase's environment** (the current site appears to be
Next.js/React + Tailwind; keep it) using its established patterns. Do not port the prototype's
markup or its runtime wrapper.

The file is a canvas containing three concepts. **Only concept `2a` ("The Index, no. 2") is
approved for build** — it is the top-most section in the file, marked with the `2A` badge and
`id="2a"`. Concepts `1a` and `1b` below it are earlier explorations, kept for reference only.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final and should be recreated
faithfully. Two exceptions:
- Imagery is placeholder (diagonal-striped blocks with a mono caption). Real project screenshots
  go in those slots at the same dimensions.
- The design is desktop-only at 1180px content width. Responsive rules below are a spec to
  implement, not something the prototype demonstrates.

---

## Screens / Views

Concept 2a is a **single-page home** plus a nav system. Pages still to be designed (case study
detail, blog index/post, contact) should inherit the tokens and patterns below.

### Home — top to bottom

Page frame: max content width **1180px**, centered, `background #F4F1EA`, `color #16150F`,
`border: 1px solid #16150F` around the whole page block. No rounded corners anywhere on the site.
No box shadows anywhere.

**1. Masthead strip**
- Full-width row, `padding: 12px 28px`, `border-bottom: 1px solid #16150F`
- `display: flex; justify-content: space-between; align-items: center`
- Type: IBM Plex Mono 11px, `letter-spacing: .16em`, `text-transform: uppercase`
- Four items, left to right: `Portfolio no. 04` · `Karachi, PK · UTC+5` · `Four years shipping` ·
  availability
- Availability item: 6px circle, `background: oklch(0.55 0.17 35)`, pulsing
  (`opacity .35 → 1 → .35`, 2.4s infinite), followed by the word `Available`, 8px gap

**2. Name bar**
- `padding: 22px 28px 18px`, `border-bottom: 3px double #16150F`
- `display: flex; justify-content: space-between; align-items: flex-end`
- Left: `Muhammad Hamza Asad` — Bricolage Grotesque 800, 34px, `letter-spacing: -.03em`
- Right: nav — IBM Plex Mono 12px, `.1em` tracking, uppercase, 26px gap:
  `Work · Experience · Writing · Contact · CV`
- Active item carries `border-bottom: 1px solid #16150F; padding-bottom: 2px`
- Nav hover: underline appears (same 1px rule). Nav is not sticky in the prototype; making it
  sticky on scroll is acceptable if it keeps the double-rule.

**3. Ticker**
- Full-bleed bar, `background: #16150F`, `color: #F4F1EA`, `padding: 7px 0`, `overflow: hidden`
- Content: IBM Plex Mono 11px, `.2em` tracking, uppercase, items separated by `·`, 42px gap
- Items: `Go · Postgres · Temporal · Terraform · Kubernetes · TypeScript · Hasura · AWS ·
  ERP delivery · Health-tech`
- Marquee: the item list is duplicated back-to-back inside a `width: max-content` flex row,
  animated `translateX(0) → translateX(-50%)`, **28s linear infinite**. Respect
  `prefers-reduced-motion: reduce` by pausing the animation.

**4. Hero**
- `padding: 76px 28px 64px`, `border-bottom: 1px solid #16150F`, single column, full width
- Headline: Bricolage Grotesque 800, **78px**, `line-height: .95`, `letter-spacing: -.04em`,
  `max-width: 17ch`
  Copy: `I build the product and the infrastructure under it.`
  The word **and** is set in Instrument Serif, 400, *italic*, `letter-spacing: -.01em` (same size,
  inline in the headline)
- Subheading, 26px below: IBM Plex Mono 13px, `.06em` tracking, uppercase, `color: #57544D`,
  flex row, 18px gap, wraps:
  `Currently: an ERP rollout and a clinic records system`  `/` (in `#B3AEA3`)
  `Open to remote & contract · two-week lead time`
- Body, 30px below: IBM Plex Mono 15.5px, `line-height: 1.75`, `max-width: 62ch`,
  `text-wrap: pretty`
  Copy: `Full-stack engineer, 4+ years across product and infrastructure. I run a small
  consultancy delivering ERP and health-tech systems end to end — schema to CI pipeline to the
  screen the client actually uses.`
- Actions, 30px below, flex row, 14px gap:
  - Primary `Start a project` — `background #16150F`, `color #F4F1EA`, `padding: 13px 22px`,
    mono 12px, `.12em`, uppercase, square corners. **Hover:** background →
    `oklch(0.55 0.17 35)`.
  - Secondary `Download CV` — text with `border-bottom: 1px solid #16150F`,
    `padding-bottom: 3px`, same type spec.

**5. Selected work — section header**
- `padding: 14px 28px`, `border-bottom: 1px solid #16150F`, flex space-between
- Mono 11px, `.18em`, uppercase: `Selected work` … `Three of eleven`

**6. Work dossiers** (three, one per project)
- Each: `display: grid; grid-template-columns: 64px 1fr 360px; gap: 28px; padding: 40px 28px;`
  `border-bottom: 1px solid #D6D2C7`
- **Hover:** whole row background → `#EFEBE1`. The row is a link to the case study.
- Column 1 — index number: Instrument Serif 44px, `line-height: .8`,
  `color: oklch(0.55 0.17 35)`. Values `01`, `02`, `03`.
- Column 2 — body:
  - Title: Bricolage Grotesque 600, 36px, `letter-spacing: -.025em`, `line-height: 1.08`
  - Blurb, 16px below: mono 14px, `line-height: 1.7`, `max-width: 46ch`, `text-wrap: pretty`
  - Spec row, 22px below: `border-top: 1px solid #D6D2C7`, `padding-top: 14px`, two cells in a
    grid, 40px gap, `justify-content: start`. Each cell: label mono 10px `#8B877F`, value 4px
    below in mono 11px `.08em` uppercase `#57544D`. Cells: **Year**, **Stack**.
- Column 3 — screenshot slot: 360×210, `border: 1px solid #16150F`, placeholder fill
  `repeating-linear-gradient(135deg, #E4E0D5 0 8px, #F4F1EA 8px 16px)`; caption chip bottom-left
  (`padding: 12px` from edges): mono 10px `.12em` uppercase, `background #16150F`,
  `color #F4F1EA`, `padding: 4px 8px`. Replace with real screenshots (crop 12:7).

Project content, verbatim:

| # | Title | Blurb | Year | Stack | Image caption |
|---|-------|-------|------|-------|----------------|
| 01 | Lost Pet Finders | Community-driven pet recovery: geotag hardware plus human-submitted sightings, searchable from a single query bar. Auto-breed detection on upload, image downsizing pipeline, scheduled cleanup of stale spots. | 2025 | Go · Postgres · geotag devices — public service | map + spot feed |
| 02 | KYC Workflow, Fintech | Long-running identity verification modelled as a durable workflow: retries, compliance checkpoints and third-party SOAP providers behind one Go service. | 2023 | Temporal · Go · SOAP integrations — Elphinstone | workflow state diagram |
| 03 | Farmevo Customer Portal | Customer-facing portal built on a reusable component set, with Hasura handling data modeling and a tightened frontend-backend contract. | 2023 | React · GraphQL · Hasura — agri supply chain | portal dashboard |

**7. Register — two columns**
- `display: grid; grid-template-columns: 1fr 1fr`, `border-bottom: 1px solid #16150F`,
  left column has `border-right: 1px solid #D6D2C7`
- Each column starts with a header row: `padding: 14px 28px`, `border-bottom: 1px solid #D6D2C7`,
  mono 11px `.18em` uppercase — `Where I've worked` / `Writing`
- **Left, job entries** (`padding: 24px 28px`, hairline `#D6D2C7` between):
  - Row 1: company Bricolage Grotesque 600 21px, year right-aligned mono 11.5px `#8B877F`;
    below, 6px: mono 12.5px `#57544D` role line
  - `Farmevo` / `2023` / `Fullstack Developer — customer portal, Hasura data modeling`
  - `Elphinstone Inc` / `2021–2023` / `Associate SWE — KYC on Temporal + Go, CI/CD to ECS/EKS,
    React Native`
- **Right, writing entries** (`padding: 18px 28px`, hairline between, flex space-between, 20px
  gap; title mono 14px, date mono 11.5px `#8B877F`, `white-space: nowrap`). **Hover:** row
  background `#EFEBE1`.
  - `Building a community-driven pet recovery platform` — Jun 09
  - `Architecting a KYC workflow for fintech regulations` — Jun 10
  - `Little forays into game dev land` — Jun 07
  - `Multiplayer Sequence, a web game` — Jun 11

**8. Footer**
- `background: #16150F`, `color: #F4F1EA`, `padding: 72px 28px 40px`
- Top row: flex, `align-items: flex-end`, `justify-content: space-between`, 40px gap
  - Left: Bricolage Grotesque 800, 64px, `letter-spacing: -.035em`, `line-height: .95`,
    `max-width: 14ch` — `Tell me what you're building.`
  - Right, right-aligned, mono 13px `line-height: 2`:
    `hello@hamzaasad.dev` with `border-bottom: 1px solid #4A483F; padding-bottom: 6px`; below it
    at 8px, `opacity: .55` — `Replies within a day · Two-week lead time`
- Bottom row, 56px below, `padding-top: 16px`, `border-top: 1px solid #4A483F`, flex
  space-between, mono 10.5px `.16em` uppercase `opacity: .55`:
  `© 2026 M. H. Asad` · `GitHub` · `LinkedIn` · `Set in Bricolage & IBM Plex Mono`

---

## Interactions & Behavior
- **Ticker marquee** — 28s linear infinite, `translateX(0 → -50%)` over a duplicated list. Pause
  under `prefers-reduced-motion: reduce`.
- **Availability dot** — 2.4s infinite opacity pulse `.35 → 1 → .35`.
- **Row hovers** — work dossiers and writing rows shift background to `#EFEBE1`. Instant
  (no transition) in the prototype; a 120ms ease is acceptable.
- **Primary button hover** — background `#16150F → oklch(0.55 0.17 35)`.
- **Nav hover** — 1px underline.
- **Navigation** — work rows link to case study pages; writing rows to posts; `CV` triggers a
  PDF download; `Start a project` and `hello@hamzaasad.dev` open mail.
- **Focus states** (not in prototype, required for ship): 2px outline in
  `oklch(0.55 0.17 35)`, 2px offset, on every link and button.
- No page-load animation, no scroll-reveal, no parallax. The page should be static and fast.

### Responsive spec (to implement)
- **≥1240px**: as specced, 1180px content, centered.
- **900–1239px**: fluid width, keep the 28px gutters.
- **<900px**: single column throughout.
  - Masthead strip: drop `Portfolio no. 04`, keep location and availability.
  - Name bar: name on its own line, nav collapses to a mono text menu (no hamburger icon —
    a stacked list revealed by a `Menu` text toggle fits the direction).
  - Hero headline: 44px, `max-width` unset. Subheading items stack.
  - Dossiers: image slot moves under the text at full width, 16:9; number sits inline before
    the title.
  - Register: two columns stack, left column loses its right border.
  - Footer headline: 38px; the two footer blocks stack, left-aligned.
- Minimum tap target 44px on all nav/links below 900px.

## State Management
The home page is static. Only two pieces of client state exist site-wide:
- `mobileNavOpen: boolean` — for the sub-900px menu toggle.
- Nothing else. Work, writing and experience content should come from local MDX/JSON, not a CMS,
  unless the codebase already has one.

(The earlier concept `1a` in the prototype file has a hovered-project preview panel with
`hovered: number` state — that pattern is **not** part of the approved 2a build.)

## Design Tokens

**Color**
| Token | Value | Use |
|---|---|---|
| `paper` | `#F4F1EA` | page background |
| `paper-hover` | `#EFEBE1` | row hover |
| `paper-shade` | `#E4E0D5` | placeholder stripe |
| `ink` | `#16150F` | text, borders, dark panels |
| `ink-muted` | `#57544D` | secondary body text |
| `ink-faint` | `#8B877F` | labels, dates |
| `rule` | `#D6D2C7` | hairline dividers inside blocks |
| `rule-faint` | `#B3AEA3` | separator glyphs |
| `rule-dark` | `#4A483F` | dividers on ink panels |
| `accent` | `oklch(0.55 0.17 35)` (≈ `#C1522B`) | numerals, dot, primary hover, focus |

Accent appears in at most four places per page. Do not introduce a second accent.

**Typography**
- Display — **Bricolage Grotesque** 600/800. Sizes: 78 (hero), 64 (footer), 36 (project title),
  34 (name), 21 (company). Tracking tightens as size grows: -.04em → -.02em.
- Accent — **Instrument Serif** 400 italic (one word in the hero) and 400 roman (dossier
  numerals, 44px).
- Text/UI — **IBM Plex Mono** 400/500/600. Sizes: 15.5 (body), 14 (blurbs, list rows),
  13 (subhead), 12.5/12/11.5 (meta), 11/10.5/10 (labels). Uppercase labels use
  `.06em–.2em` tracking.
- Line heights: display `.95–1.15`, body `1.7–1.75`.
- Google Fonts:
  `Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800`,
  `IBM+Plex+Mono:wght@400;500;600`, `Instrument+Serif:ital@0;1`.
  Self-host if the codebase already self-hosts fonts.

**Spacing** — 4px base. Recurring: 4, 6, 8, 12, 14, 16, 18, 22, 26, 28 (page gutter), 30, 40, 56,
64, 72, 76.

**Border radius** — `0` everywhere. This is load-bearing to the concept.

**Borders** — 1px `ink` for structural edges, 1px `rule` for internal hairlines, 3px `double ink`
under the name bar.

**Shadows** — none.

## Assets
- No image assets in the prototype. Every image is a striped placeholder standing in for a real
  screenshot. Three needed at minimum (360×210 desktop, 16:9 mobile): Lost Pet Finders map/spot
  feed, KYC workflow state diagram, Farmevo portal dashboard.
- No icon set is used, deliberately — the old site's icon chips are gone. Do not add icons.
- CV PDF is an existing asset on the current site; wire the `CV` and `Download CV` links to it.

## Files
- `Portfolio Concepts.dc.html` — the design prototype. Concept **2a** (top section, `id="2a"`)
  is the approved design. Concepts `1a` and `1b` below it are earlier explorations for context.
  Open it in a browser to see hover states and the marquee.

## Still to design
Case study detail, blog index and post, and contact pages have not been designed yet. Build the
home page first; the tokens and patterns above (masthead, double rule, dossier grid, register
columns, ink footer) are enough to extend consistently if you need placeholders sooner.
