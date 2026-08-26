import Link from "next/link";

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
 * proposed placeholder pending a real one). The category/title/description
 * block and the "VER PROJETO" CTA stack vertically below `sm` instead of
 * being forced into one row, since `min-w-0`+`truncate` alone isn't enough
 * room for both at narrow widths.
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
      <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface-background">
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
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
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
            <img
              src="/icons/arrow-right.svg"
              alt=""
              aria-hidden
              className="size-4"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
