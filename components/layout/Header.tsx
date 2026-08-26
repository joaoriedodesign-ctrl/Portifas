import Link from "next/link";

/**
 * Fixed/floating nav, per node 31:1911 "Frame 16" in the PORTIFÓLIO Figma file.
 * Figma's static frame doesn't encode scroll behavior — position:fixed is an
 * implementation decision (standard pattern for this pill-nav shape), not
 * something pulled directly from the design. Flagging it as such.
 *
 * v2 palette notes:
 * - The glass background was a raw `rgba(234,234,234,0.62)` with no token
 *   behind it. `surface/primary` (#ebebeb) is a near-exact match for that
 *   grey, so this now reuses that semantic token at 60% opacity
 *   (`bg-surface-primary/60`) instead of an unrelated hex — no dedicated
 *   "glass/overlay" token exists yet in docs/design-tokens.md, so this is
 *   flagged as a small proposal, not a documented value.
 * - The logo mark used the *hover* shade of the old red accent
 *   (`brand-primary-hover`) purely decoratively, not as an actual hover
 *   state. Preserved as the same relationship in v2: the darker step of
 *   the single new accent (`bg-brand-600`), not the base `brand-500`.
 *
 * Responsive: nav content (logo + 3 links) is tightened at small widths
 * (smaller gaps/padding, secondary "PRODUCT DESIGNER" line hidden below
 * `sm`) so the pill never forces its content wider than the
 * `max-w-[calc(100%-32px)]` cap already in place — that cap is what
 * prevents horizontal overflow on narrow viewports.
 */
export function Header() {
  return (
    <header className="fixed left-1/2 top-6 z-50 w-[564px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[195px] bg-surface-primary/60 py-4 pl-3 pr-4 backdrop-blur-sm sm:top-8 sm:py-6 sm:pr-6">
      <div className="flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex shrink-0 rotate-180">
            <span className="size-[41px] rounded-bl-[39px] rounded-br-[39px] rounded-tr-[39px] bg-brand-600" />
          </span>
          <span className="flex flex-col text-text-primary">
            <span className="heading-h4 -mb-1">JOÃO RIEDO</span>
            <span className="caption hidden sm:block">PRODUCT DESIGNER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <Link href="/case-studies" className="label-button text-text-primary">
            PROJETOS
          </Link>
          <Link href="/#sobre" className="label-button text-text-primary">
            SOBRE
          </Link>
          <Link href="/#contato" className="label-button text-text-primary">
            CONTATO
          </Link>
        </nav>
      </div>
    </header>
  );
}
