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
 * - `/case-studies`, `/sobre` and `/contato` all get real active-state
 *   matching via `usePathname()` (prefix match, so a case-study detail
 *   page like `/case-studies/some-slug` still lights up PROJETOS).
 *
 * UPDATE 2026-08-27: `CONTATO` used to point at `/#contato`, a homepage
 * anchor into a section that didn't exist yet, and was deliberately
 * excluded from active-state matching for that reason (no route to
 * match, no section to scroll-spy against). A real `/contato` page now
 * exists (components/sections/ContactSection.tsx, reused there and on
 * Home/case-study pages) — `CONTATO` is a normal route link now, same
 * treatment as PROJETOS/SOBRE, no more exclusion.
 *
 * UPDATE 2026-09-01 (English site): `NAV_LINKS` split into a PT and an EN
 * variant, picked based on whether the current route is under `/en/...`
 * — the existing `isActive` prefix-match logic already worked unchanged
 * for `/en/*` routes, only the link list itself needed a second,
 * English-labeled/English-hrefed version. See project memory: this is a
 * deliberate "separate routes, no toggle" decision, not a bilingual
 * switcher.
 */
const NAV_LINKS_PT = [
  { href: "/case-studies", label: "PROJETOS" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/contato", label: "CONTATO" },
] as const;

const NAV_LINKS_EN = [
  { href: "/en/case-studies", label: "PROJECTS" },
  { href: "/en/sobre", label: "ABOUT" },
  { href: "/en/contato", label: "CONTACT" },
] as const;

export function HeaderNav() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;
  const links = isEn ? NAV_LINKS_EN : NAV_LINKS_PT;

  return (
    <nav className="hidden items-center gap-3 sm:flex sm:gap-6 lg:gap-8">
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname?.startsWith(`${href}/`);

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
