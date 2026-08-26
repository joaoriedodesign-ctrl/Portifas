interface PillarCardProps {
  number: string;
  title: string;
  description: string;
  /**
   * "home" = node 31:1814 (number in brand-primary/semibold, indicator in
   * brand-secondary). "case-study" = node 38:46 (number in text-secondary/
   * regular, indicator in brand-primary). Same card, two contexts in Figma —
   * kept as one component with a variant switch rather than duplicating markup.
   */
  variant?: "home" | "case-study";
}

export function PillarCard({
  number,
  title,
  description,
  variant = "home",
}: PillarCardProps) {
  const isHome = variant === "home";

  return (
    <div className="flex h-[328px] flex-1 flex-col gap-4 rounded-[32px] border border-border bg-surface p-8">
      <div className="flex w-full items-center justify-between">
        <span
          className={
            isHome
              ? "label-button text-brand-primary"
              : "body-base text-text-secondary"
          }
        >
          {number}
        </span>
        <span
          className={`size-2 rounded shrink-0 ${
            isHome ? "bg-brand-secondary" : "bg-brand-primary"
          }`}
        />
      </div>
      <p className="heading-h3 text-brand-secondary w-full">{title}</p>
      <p className="body-base text-text-secondary w-full">{description}</p>
    </div>
  );
}
