interface PillarCardProps {
  number: string;
  title: string;
  description: string;
  /**
   * "home" = node 31:1814, "case-study" = node 38:46 — same card, two
   * contexts in Figma, kept as one component with a variant switch rather
   * than duplicating markup.
   *
   * v2 palette note: the original design distinguished the two variants by
   * *hue* — home's indicator dot was `brand-secondary` (blue), case-study's
   * number was plain secondary text. The v2 palette discontinued the blue
   * accent with no replacement (docs/design-tokens.md §4 — "sem
   * correspondência, sinalizar antes de reintroduzir um segundo acento").
   * Reintroducing a second hue wasn't requested, so the two variants are
   * now distinguished by *accent vs. neutral* instead of by hue: "home"
   * (marketing context) keeps the single brand accent on both the number
   * and the dot; "case-study" (documentation context) drops to the neutral
   * on-surface scale for both, per the project's "acento só em CTA/link/
   * destaque pontual" restriction — the case-study grid isn't a CTA.
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
    <div className="flex h-full w-full min-h-[220px] flex-1 basis-[260px] flex-col gap-4 rounded-[32px] border border-border-surface-primary bg-surface-primary p-6 sm:p-8">
      <div className="flex w-full items-center justify-between">
        <span
          className={
            isHome
              ? "label-button text-brand-500"
              : "body-base text-on-surface-secondary"
          }
        >
          {number}
        </span>
        <span
          className={`size-2 shrink-0 rounded ${
            isHome ? "bg-brand-500" : "bg-on-surface-primary"
          }`}
        />
      </div>
      <p className="heading-h3 w-full text-on-surface-primary">{title}</p>
      <p className="body-base w-full text-on-surface-secondary">{description}</p>
    </div>
  );
}
