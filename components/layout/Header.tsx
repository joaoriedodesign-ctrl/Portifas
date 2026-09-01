"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { HeaderNav } from "@/components/layout/HeaderNav";

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
 * to reach /case-studies, /sobre, or #contato from the header below
 * `sm` — is now closed by `<MobileNav />` (components/layout/MobileNav.tsx),
 * a hamburger trigger + full-screen menu rendered right after this <nav>,
 * each self-hiding at the opposite breakpoint (`<nav>` is `hidden
 * sm:flex`, `MobileNav`'s trigger is `sm:hidden`) so exactly one
 * navigation affordance is visible at any given width.
 *
 * Liquid Glass restyle (2026-08-26, explicit user request: lighter pill
 * color + a "liquid glass" material treatment) — RESTORED after this
 * file got reverted to its pre-glass committed state (`git log` showed
 * it back at commit `v9`, matching HEAD exactly, while sibling files
 * with uncommitted edits from the same session stayed dirty — likely a
 * single-file discard/checkout done outside this session, not something
 * this session did):
 * - Lighter color: moved one documented step up the surface scale,
 *   `surface/primary` (`primary-100`, #242424) -> `surface/secondary`
 *   (`primary-200`, #383838). Both are real semantic tokens from
 *   docs/design-tokens.md §1.2 — no invented hex here. Opacity also
 *   dropped 60% -> 45% so more of the blurred/saturated backdrop shows
 *   through, which is what makes the glass read as "lighter" rather than
 *   just a flat darker-grey pill.
 * - Liquid glass material: three ingredients, none of which have a
 *   documented token yet (flagging per project rule — these are new
 *   proposals, not references to something already approved):
 *   1. `backdrop-blur-xl` + `backdrop-saturate-150` replacing the old
 *      `backdrop-blur-sm` alone — the saturate boost is what actually
 *      sells "liquid glass" (Apple's material spec): content behind the
 *      pill reads more vivid/saturated through the glass than it does
 *      unblurred, not just blurry.
 *   2. `border-white/10` hairline + an arbitrary
 *      `shadow-[0_8px_32px_rgba(0,0,0,0.35)]` for edge definition and
 *      floating elevation against the dark page background.
 *   3. A `::before` sheen (`before:bg-gradient-to-b before:from-white/10
 *      before:to-transparent`) simulating a specular highlight catching
 *      the top of curved glass. Given `position: absolute` on `::before`
 *      would otherwise paint over the static-flow nav content per CSS2.1
 *      painting order, the actual content row now carries `relative z-10`
 *      so it stays above the sheen.
 *   Proposing these as the seed of a "Effects/Glass" section in
 *   docs/design-tokens.md (blur intensity, saturate step, rim-light
 *   opacity, elevation shadow) rather than letting them stay one-off
 *   arbitrary values here and in any future glass surface (e.g. if
 *   MobileNav's fixed pill treatment ever gets the same look).
 *
 * Active/hover-orange nav state (2026-08-26): the desktop `<nav>` above
 * was extracted into `<HeaderNav />` (components/layout/HeaderNav.tsx,
 * "use client") so it can read the current route and turn the current
 * page's link (and any hovered link) `text-brand-500` — see that file's
 * doc comment for the color-token and active-matching rules. UPDATE
 * 2026-08-27: CONTATO now links to a real `/contato` page (see
 * app/contato/page.tsx) instead of the `/#contato` homepage-anchor gap
 * this comment used to describe — it now gets the same active-matching
 * treatment as PROJETOS/SOBRE, no more exclusion.
 *
 * UPDATE 2026-09-01 (English site): converted to a "use client" component
 * (was a plain server component) so it can read `usePathname()` directly,
 * the same way HeaderNav/MobileNav already do — needed to tell the
 * English site (routes under `/en/...`, see lib/case-studies.en.ts and
 * the app/en/ tree) apart from the Portuguese one and swap the logo link
 * + avatar alt text accordingly. No visual/behavioral change on the
 * existing Portuguese routes. This mirrors the "no toggle, path-based
 * locale" decision (see project memory) rather than threading a `lang`
 * prop down from app/layout.tsx, which mounts this component once for
 * every route and has no per-route way to pass one in.
 */
export function Header() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en") ?? false;

  return (
    <header className="fixed left-1/2 top-6 z-50 w-[564px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[195px] border border-white/10 bg-surface-secondary/45 py-2 pl-2 pr-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-[195px] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:content-[''] sm:top-8">
      <div className="relative z-10 flex items-center justify-between gap-2">
        <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2">
          <Image
            src="/images/header/avatar.png"
            alt={isEn ? "Photo of João Riedo" : "Foto de João Riedo"}
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
        <HeaderNav />
        <MobileNav />
      </div>
    </header>
  );
}
