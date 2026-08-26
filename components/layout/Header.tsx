import Link from "next/link";

/**
 * Fixed/floating nav, per node 31:1911 "Frame 16" in the PORTIFÓLIO Figma file.
 * Figma's static frame doesn't encode scroll behavior — position:fixed is an
 * implementation decision (standard pattern for this pill-nav shape), not
 * something pulled directly from the design. Flagging it as such.
 */
export function Header() {
  return (
    <header className="fixed left-1/2 top-8 z-50 w-[564px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[195px] bg-[rgba(234,234,234,0.62)] py-6 pl-3 pr-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex shrink-0 rotate-180">
            <span className="size-[41px] rounded-bl-[39px] rounded-br-[39px] rounded-tr-[39px] bg-brand-primary-hover" />
          </span>
          <span className="flex flex-col text-text-primary">
            <span className="heading-h4 -mb-1">JOÃO RIEDO</span>
            <span className="caption">PRODUCT DESIGNER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-8">
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
