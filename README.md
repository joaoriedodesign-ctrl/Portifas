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
