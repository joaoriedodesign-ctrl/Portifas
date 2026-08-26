import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "transparent";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Exact exported icon asset for this instance (e.g. arrow-down, arrow-right) — Figma uses a different icon per CTA, so this isn't baked into the component. */
  icon?: ReactNode;
  /**
   * Square, icon-only button (e.g. a mobile menu trigger) instead of the
   * default text pill. Pass the icon as `children`, not via `icon` (that
   * prop exists to trail text, which an icon-only button doesn't have).
   * Caller MUST supply its own `aria-label` — an icon alone has no
   * accessible name, and this component has no way to infer one.
   */
  iconOnly?: boolean;
}

/**
 * Reference implementation for the project's Label/Button text style +
 * the v2 `cta-*` tokens (docs/design-tokens.md §1.2). Covers default /
 * hover / focus-visible / disabled, per the "todos os estados relevantes"
 * rule in the project checklist.
 *
 * `secondary` used to reach for `brand-secondary` (blue) — blue was
 * discontinued in the v2 palette with no replacement accent
 * (docs/design-tokens.md §4), so it's remapped onto the doc's own
 * `cta-secondary` tokens (outline style) instead of inventing a color.
 *
 * `transparent` is new here: the doc already defines a full `cta-transparent`
 * token set (ghost button — ver §1.2) that had no consumer in code yet.
 * Adding the variant wires it up rather than leaving it undocumented-but-unused.
 *
 * Do not fork this into a one-off styled <button> elsewhere — extend the
 * variant prop instead, so every CTA in the site stays visually consistent.
 *
 * `iconOnly` added (2026-08-26, for the mobile-nav hamburger trigger,
 * user asked for it to reuse the "CTA secundário" style) instead of
 * writing a one-off icon button — same reasoning as the note above.
 * Swaps the pill padding/typography for a `size-11` (44px — the
 * project's documented touch-target minimum, docs/diretrizes-
 * responsividade.md §2) square with a smaller radius; the color
 * variants themselves are unchanged and shared with the pill mode.
 */
export function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  icon,
  iconOnly = false,
  ...props
}: ButtonProps) {
  const base = iconOnly
    ? "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors disabled:cursor-not-allowed disabled:opacity-40"
    : "label-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-cta-primary-bg text-cta-primary-text hover:bg-cta-primary-bg-hover",
    secondary:
      "border border-cta-secondary-border bg-transparent text-cta-secondary-text hover:bg-cta-secondary-bg-hover",
    transparent:
      "border border-transparent bg-transparent text-cta-transparent-text hover:bg-cta-transparent-bg-hover hover:text-cta-transparent-text-hover",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
