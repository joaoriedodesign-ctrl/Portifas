import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  category: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

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
      className="flex w-full flex-col items-start gap-2.5 rounded-[32px] border border-border bg-surface p-2"
    >
      <div className="h-[482px] w-full overflow-hidden rounded-3xl bg-page">
        {image ? (
          <img
            src={image}
            alt=""
            className="size-full object-cover opacity-[0.89]"
          />
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start rounded-[32px] p-6">
        <div className="flex w-full items-end justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <div className="caption flex w-full items-start gap-2">
              <span className="text-brand-primary">{category}</span>
              <span className="text-text-secondary">{year}</span>
            </div>
            <p className="heading-h3 w-full text-text-primary">{title}</p>
            <p className="body-base w-full truncate text-text-secondary">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-2">
            <span className="label-button text-text-primary">
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
