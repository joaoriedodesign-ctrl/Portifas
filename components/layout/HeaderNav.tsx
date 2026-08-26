"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Desktop nav links inside Header's pill (components/layout/Header.tsx).
 * Extracted as its own "use client" island — same pattern as
 * MobileNav.tsx — because active-route detection needs `usePathname()`,
 * a client-only hook; the rest of Header (logo, avatar, name) stays
 * server-rendered.
 *
 * Active/hover-orange rule (2026-08-26, explicit user request, screenshot
 * of this exact pill: hover AND the current page's link should turn
 * orange):
 * - Color is `text-brand-500` for both states — the *documented* token
 *   for this ("brand-500 ... links", docs/design-tokens.md §1.1), not a
 *   new value.
 * - `/case-studies` and `/sobre` get real active-state matching via
 *   `usePathname()` (prefix match, so a case-study detail page like
 *   `/case-studies/some-slug` still lights up PROJETOS).
 * - `/#contato` is deliberately excluded from active matching: it's a
 *   same-page anchor into a "Contato" section on the homepage that
 *   doesn't exist in the codebase yet (see project notes on Footer) —
 *   there's no route to match and no section to scroll-spy against.
 *   `CONTATO` still gets the hover-orange, just never the active state.
 *   If a Contato section gets built and "currently scrolled to it"
 *   highlighting is wanted, that needs a separate IntersectionObserver
 *   scroll-spy — flagging the gap rather than faking a state.
 */
const NAV_LINKS = [
  { href: "/case-studies", label: "PROJETOS" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/#contato", label: "CONTATO" },
] as const;

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-3 sm:flex sm:gap-6 lg:gap-8">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive =
          href !== "/#contato" && (pathname === href || pathname.startsWith(`${href}/`));

        return (
          <Link
            key={href}
            href={href}
            className={`caption transition-colors hover:text-brand-500 ${
              isActive ? "text-brand-500" : "text-text-primary"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
