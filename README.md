# João Lucas — Portfolio

Product Designer portfolio, built with Next.js (App Router) + TypeScript +
Tailwind. Design-first project: everything here traces back to a Figma file
(`PORTIFÓLIO`, `Primitivas` + `Semânticas` variable collections) and to two
reference docs that are the source of truth for any color or type decision.

> README is in English on purpose — this repo is part of the positioning for
> international roles, and it's public-facing in a way the internal
> reference docs aren't.

## Token architecture

Tokens flow one direction: **Figma variables → JSON → CSS custom properties
→ Tailwind config → components.** Nothing in a component should ever be a
raw hex or px value; if you're tempted to write one, the token is either
missing from `design-tokens/` (add it there first) or you're not looking in
the right place.

```
design-tokens/
├── design-tokens-colors.json       # W3C-format tokens, primitives + semantic aliases
└── design-tokens-typography.json   # same, plus 10 composite typography tokens

styles/
├── tokens-colors.css        # same tokens as CSS custom properties
└── tokens-typography.css    # font-weight/size vars + .heading-*/.body-* utility classes

tailwind.config.ts           # maps Tailwind's color/fontSize scales to those CSS vars
```

Fonts (Sora for headings, DM Sans for body) are loaded once via `next/font`
in `app/layout.tsx`, which exposes them as `--font-heading` / `--font-body`.
`tokens-typography.css` only *consumes* those variables — it never hardcodes
a family name, so swapping a typeface is a one-line change in one file.

**Known gap:** there's no documented spacing/grid token yet. Tailwind's
default spacing scale is used as a placeholder — it is not a documented
project token. Add a grid reference doc before this scaffold grows past
placeholder pages, then wire it into `tailwind.config.ts` the same way
colors and type are wired.

## Structure

```
app/
├── layout.tsx                  # next/font setup, global <html>/<body>
├── page.tsx                    # home
├── globals.css                 # Tailwind layers + token imports
└── case-studies/
    ├── page.tsx                 # index
    └── [slug]/page.tsx          # detail, NDA-aware rendering

components/ui/                  # Button, Badge — extend these, don't fork one-offs
lib/case-studies.ts             # placeholder data source; swap for MDX/CMS later
```

## Adding a case study

Add an entry to the `caseStudies` array in `lib/case-studies.ts`. Set
`nda: true` for the restricted design-system case study — the detail page
already renders a "full narrative available on a call" note instead of the
protected content when that flag is set.

## Pending assets from Figma

`public/images/hero/hero-visual.png` (the photo + blue/yellow blob group,
Figma node `31:1805`) is already in place — supplied directly by the user as
a pre-composited, transparent-background PNG. The earlier plan below of
separately downloading `profile.png` + `blob.svg` and reconstructing the
blobs in CSS/SVG was dropped as a result; see the comment at the top of
`components/sections/Hero.tsx` for why.

Two icon assets are still pending. Figma's export URLs expire ~7 days after
generation — run these before then (the code already points at the correct
local paths, so no code changes needed after downloading):

```bash
curl -o public/icons/arrow-down.svg "https://www.figma.com/api/mcp/asset/4156fc04-03ac-4a99-ae62-b3bcb483d405.svg"
curl -o public/icons/arrow-right.svg "https://www.figma.com/api/mcp/asset/a6e450df-a09d-4f53-a59d-9bc35a140f1d.svg"
```

`arrow-right.svg` is reused at two sizes (project card and footer CTA) —
that's one glyph, not a missing second asset.

**Known gaps vs. the Figma file**, flagged rather than silently fixed:
- The small decorative divider line (node `31:1905`, a 4×115px accent near
  the hero) wasn't ported — out of scope for the Hero section built so far;
  revisit if/when it's requested.
- ~~The rotated tertiary-yellow pill behind the hero photo used an
  approximated transform~~ — resolved: the pill is now part of the supplied
  `hero-visual.png` composite instead of being reconstructed, so there's no
  transform left to approximate.

## Local development

```bash
npm install
npm run dev
```

## Getting this onto GitHub

```bash
cd portfolio-nextjs
git init
git add .
git commit -m "Initial scaffold: Next.js + design token architecture"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Create the empty repo on GitHub first (no README/gitignore auto-generated
there, this project already has both), then run the commands above from
inside this folder.

## Deploying to Vercel

1. Push the repo to GitHub (above).
2. On [vercel.com](https://vercel.com), **Add New → Project**, import the
   GitHub repo.
3. Framework preset auto-detects as Next.js — no config needed.
4. Deploy. Every subsequent push to `main` redeploys automatically; pushes
   to other branches get their own preview URL, which is useful for trying
   a layout change without touching the live site.
