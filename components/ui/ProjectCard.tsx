import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  category: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

/**
 * v2 palette: card surface/border/border tokens (`bg-surface` → `bg-surface-primary`,
 * `border-border` → `border-border-surface-primary`, placeholder `bg-page` →
 * `bg-surface-background`); text inside the card moves to the `on-surface`
 * scale (it sits on `surface-primary`, not the page background) while the
 * category label keeps the single accent (`text-brand-500`, "destaque
 * pontual"). Added a `group-hover` accent on "VER PROJETO" using the
 * `cta-transparent` hover token — the doc defines that token set but nothing
 * consumed it yet, and this card's whole surface is already a link, so a
 * hover cue on the CTA row is a "cover the hover state" fix, not new scope.
 *
 * Responsiveness: the fixed `h-[482px]` cover image is now `aspect-[4/3]`
 * (scales with card width instead of clipping/leaving gaps at narrow
 * widths — no aspect ratio was documented for this card, so 4/3 is a
 * proposed placeholder pending a real one). **2026-08-26: widened twice
 * per explicit user requests, both same session:**
 * 1. `aspect-[4/3]` → `aspect-[16/9]` ("deixe a imagem dele mais
 *    horizontal").
 * 2. User then reported the image still didn't fit a desktop viewport
 *    without scrolling ("deixe mais horizontal ainda, preciso que caiba
 *    na tela desktop") — a pure aspect-ratio widen alone can't guarantee
 *    that on its own, since height still grows with container width on
 *    large monitors. Fix combines two things, desktop-only (`sm:`, this
 *    project's existing desktop threshold), mobile keeps `16/9`
 *    unchanged since only the desktop case was reported as an issue:
 *    `sm:aspect-[21/9]` (wider ratio, shorter for a given width) **plus**
 *    `sm:max-h-[400px]` (a hard cap so very wide monitors — where 21/9
 *    at full container width would still exceed 400px — don't blow past
 *    it; object-cover on the `<img>` crops horizontally to compensate,
 *    which is fine, it's a photo/screenshot placeholder, not content
 *    that needs to stay uncropped). Neither `21/9` nor `400px` is a
 *    documented token — still an undocumented placeholder, same flag as
 *    the original 4/3 pick, just tuned twice now based on user feedback.
 * The category/title/description
 * block and the "VER PROJETO" CTA stack vertically below `sm` instead of
 * being forced into one row, since `min-w-0`+`truncate` alone isn't enough
 * room for both at narrow widths.
 *
 * Icon fix (2026-08-26, while building ProjectsSection): the "VER PROJETO"
 * arrow was an <img src="/icons/arrow-right.svg"> pointing at a file that
 * never existed (public/icons/ only ever had a .gitkeep) — a pre-existing
 * gap, invisible until now because this card wasn't rendered anywhere with
 * real traffic. Hero.tsx already established lucide-react as this
 * project's icon source (its own CTA arrow), so this card now matches that
 * precedent instead of pointing at a second, still-broken icon path.
 *
 * Overflow fix (2026-08-26, user-reported via screenshot — description
 * text rendering past the card's rounded edge on mobile, no ellipsis):
 * root cause was this card's text column div having `flex-1` but no
 * `w-full`. `flex-1` only constrains size on the flex CONTAINER's main
 * axis — which is horizontal in the `sm:flex-row` desktop layout (so it
 * worked there) but VERTICAL in the default `flex-col` mobile layout, so
 * below `sm` this div had no width constraint at all and sized itself to
 * its own content's intrinsic width. Since the description paragraph has
 * `truncate` (`white-space: nowrap`), its intrinsic/max-content width is
 * the FULL unwrapped sentence — so the parent grew to fit that, and the
 * whole block spilled past the card's actual boundary with no ellipsis
 * ever kicking in (truncate can only clip once its box has a real,
 * bounded width). Fix: added `w-full` alongside `flex-1` so the column
 * has an explicit width at every breakpoint, not just when flex-row
 * makes `flex-1` do that job implicitly. See
 * docs/diretrizes-responsividade.md §2 for the general rule this
 * violated — any `flex-1` item inside a wrapper that switches
 * `flex-col`→`sm:flex-row` needs its own `w-full` for the `flex-col`
 * state, it doesn't come for free.
 */
export function ProjectCard({
  slug,
  category,
  year,
  title,
  description,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group flex w-full flex-col items-start gap-2.5 rounded-[32px] border border-border-surface-primary bg-surface-primary p-2"
    >
      <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-surface-background sm:aspect-[21/9] sm:max-h-[400px]">
        {image ? (
          <img
            src={image}
            alt=""
            className="size-full object-cover opacity-[0.89]"
          />
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start rounded-[32px] p-4 sm:p-6">
        <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-2">
            <div className="caption flex w-full items-start gap-2">
              <span className="text-brand-500">{category}</span>
              <span className="text-on-surface-secondary">{year}</span>
            </div>
            <p className="heading-h3 w-full text-on-surface-primary">{title}</p>
            <p className="body-base w-full truncate text-on-surface-secondary">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-2 transition-colors group-hover:text-cta-transparent-text-hover">
            <span className="label-button text-on-surface-primary group-hover:text-cta-transparent-text-hover">
              VER PROJETO
            </span>
            <ArrowRight
              aria-hidden
              className="size-4 transition-colors group-hover:text-cta-transparent-text-hover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
