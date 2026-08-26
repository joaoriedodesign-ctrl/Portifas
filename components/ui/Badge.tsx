import { HTMLAttributes } from "react";

/**
 * The v2 palette (docs/design-tokens.md) has a single accent (`brand`,
 * orange) instead of the old primary/secondary/tertiary trio — `tertiary`
 * (yellow), which this component used to use, was discontinued with no
 * replacement (see §4 migration table). This now uses the one remaining
 * accent at low opacity instead.
 *
 * Don't reach for `brand-500` directly in page code; route it through here
 * so the "accent color only in CTA/link/one-off highlight" rule stays
 * enforceable in one place.
 */
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Accent-tinted category pill (bg-brand-500/10 + brand-500 text,
   * uppercase) — added 2026-08-26 for app/sobre/page.tsx's "ABORDAGEM" /
   * "FORMAÇÃO" section badges, which need accent-colored uppercase text
   * instead of this component's default neutral/sentence-case treatment
   * (the one already in use for Hero's "Product Designer" status pill).
   * Same reasoning as Button.tsx's `iconOnly` prop: extend the shared
   * component instead of forking a new one.
   */
  accent?: boolean;
}

export function Badge({
  children,
  className = "",
  accent = false,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`caption inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 ${
        accent
          ? "font-semibold uppercase tracking-wide text-brand-500"
          : "text-text-primary"
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
