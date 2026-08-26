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
export function Badge({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`caption inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-text-primary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
