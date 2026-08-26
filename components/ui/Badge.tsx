import { HTMLAttributes } from "react";

/**
 * brand/tertiary is documented as "badges, ícones, highlight pontual" —
 * this is the one component that's allowed to use it. Don't reach for
 * brand-tertiary directly in page code; route it through here so the
 * "accent color only in CTA/link/one-off highlight" rule stays enforceable
 * in one place.
 */
export function Badge({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`caption inline-flex items-center rounded-full bg-brand-tertiary/20 px-3 py-1 text-text-primary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
