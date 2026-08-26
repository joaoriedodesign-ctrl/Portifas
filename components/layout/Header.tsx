import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";

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
 * Photo mark (2026-08-26, per Figma node 123:16 in the same file — the
 * updated header frame): replaced the abstract rotated `bg-brand-600`
 * blob with the user's actual photo. The source file
 * (`public/images/header/avatar.png`) is already circle-cropped with a
 * transparent background (confirmed: alpha 0 at all four corners, opaque
 * center), so `rounded-full` is a defensive fallback, not load-bearing.
 * Uses `next/image` (not a plain `<img>`) per
 * `docs/diretrizes-responsividade.md` §2 ("Imagens sempre via
 * next/image").
 *
 * Sizing correction (2026-08-26, same day): first pass sized the avatar
 * at 56px and the pill padding at py-6/pr-6, read off `get_design_context`'s
 * raw exported code (`inset-[-24.21%]` around a `56.4px` image) — that
 * inset is Figma's export artifact for an oversized image fill cropped by
 * its frame, not the actual visible size. `get_metadata` on the same node
 * gives the real geometry, all internally consistent: pill 564×54,
 * content padding top/bottom 8px, left 8px (measured 9), right 24px
 * (measured 25), avatar (`Ellipse 1`) exactly 38×38, logo↔text gap 8px,
 * nav item gap 32px — 8+8+38 = 54 matches the pill height exactly, which
 * the 56px reading never did. Corrected to these numbers; treated as a
 * fixed, intentionally-constant size per
 * `docs/diretrizes-responsividade.md` §2 (avatar doesn't scale down on
 * mobile — same carve-out as a small icon).
 *
 * Responsive: nav content (logo + 3 links) is tightened at small widths
 * (smaller gaps/padding, secondary "PRODUCT DESIGNER" line hidden below
 * `sm`) so the pill never forces its content wider than the
 * `max-w-[calc(100%-32px)]` cap already in place — that cap is what
 * prevents horizontal overflow on narrow viewports.
 *
 * Mobile layout correction (2026-08-26, per Figma node 20:414 "Mobile" ->
 * 31:1923 "Frame 16" — a dedicated 390px-wide header frame, confirmed via
 * both get_metadata and get_design_context, and matching a reference
 * screenshot the user shared directly): two changes, not a full
 * pixel-clone of that frame's own geometry (its avatar/padding numbers
 * don't proportionally match the desktop pill's already-verified 38px/
 * 8px/24px measurements, and cloning a second rigid mobile artboard is
 * exactly what docs/diretrizes-responsividade.md §1 asks NOT to do --
 * "nenhum componente deve assumir que o breakpoint em que foi desenhado
 * ... é o único estado possível"). Instead, the existing fluid pill
 * keeps its validated measurements and adapts via two content changes:
 * (1) "PRODUCT DESIGNER" is no longer hidden below `sm` -- the Mobile
 * frame shows name+role stacked at every width, same as desktop, it was
 * never meant to disappear on phones; (2) the PROJETOS/SOBRE/CONTATO nav
 * is now hidden below `sm` -- the Mobile frame has no nav content at all,
 * only the logo block, which is what the extra ~200px of the desktop
 * pill's width was accommodating.
 *
 * RESOLVED (2026-08-26, same day): the usability gap this left — no way
 * to reach /case-studies, #sobre, or #contato from the header below
 * `sm` — is now closed by `<MobileNav />` (components/layout/MobileNav.tsx),
 * a hamburger trigger + full-screen menu rendered right after this <nav>,
 * each self-hiding at the opposite breakpoint (`<nav>` is `hidden
 * sm:flex`, `MobileNav`'s trigger is `sm:hidden`) so exactly one
 * navigation affordance is visible at any given width.
 */
export function Header() {
  return (
    <header className="fixed left-1/2 top-6 z-50 w-[564px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[195px] bg-surface-primary/60 py-2 pl-2 pr-6 backdrop-blur-sm sm:top-8">
      <div className="flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/header/avatar.png"
            alt="Foto de João Riedo"
            width={76}
            height={76}
            priority
            className="size-[38px] shrink-0 rounded-full object-cover"
          />
          <span className="flex flex-col text-text-primary">
            <span className="heading-h4 -mb-1">JOÃO RIEDO</span>
            <span className="caption block text-text-secondary">PRODUCT DESIGNER</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-3 sm:flex sm:gap-6 lg:gap-8">
          <Link href="/case-studies" className="caption text-text-primary">
            PROJETOS
          </Link>
          <Link href="/#sobre" className="caption text-text-primary">
            SOBRE
          </Link>
          <Link href="/#contato" className="caption text-text-primary">
            CONTATO
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
