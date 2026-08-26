"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlignLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Mobile nav trigger + full-screen menu overlay.
 *
 * Fills the usability gap flagged in Header.tsx's own comment: hiding
 * PROJETOS/SOBRE/CONTATO below `sm` left phone users with no way to
 * navigate at all. User approved a hamburger-menu pattern and shared
 * reference screenshots of the trigger + open state to build from.
 * There's no Figma node for this yet (unlike every other component in
 * this project) — flagging that once this is validated in code, it
 * should get added to the PORTIFÓLIO Figma file too, so Figma stays the
 * source of truth going forward instead of drifting from what's shipped.
 *
 * Trigger button reuses `Button` variant="secondary" — the project's
 * outline "CTA secundário" tokens — per explicit user request, via the
 * new `iconOnly` prop (see the note on Button.tsx) instead of forking a
 * one-off icon button. Icon is `AlignLeft` (three left-aligned bars of
 * different lengths), matching the reference screenshot's icon shape —
 * deliberately not the more generic three-equal-bars "Menu" icon.
 *
 * Content differs from the desktop <nav> in ways the reference dictated,
 * flagging both as deliberate, not oversights:
 * - Link labels are title case ("Sobre Mim", "Projetos") instead of
 *   desktop's all-caps captions — at this much larger (heading-h2) size,
 *   all-caps reads as shouting. Per-context choice, not a change to the
 *   desktop nav.
 * - Order is "Sobre Mim" then "Projetos"; desktop order is Projetos then
 *   Sobre. Matches the reference exactly, but flagging the inversion in
 *   case it wasn't deliberate on the design side — worth reconciling one
 *   way or the other.
 * - "Contato" isn't a third text link here — it's the CTA pill itself,
 *   with the arrow BEFORE the text. Every other CTA in the project
 *   (Hero, Footer) puts the arrow after the text; this is a deliberate
 *   one-off match to this specific reference, not a new site-wide
 *   arrow-position convention.
 *
 * Behavior baseline that the static reference couldn't show but any
 * full-screen menu needs: closes on Escape, closes when a link/CTA is
 * clicked (so it never sits open over the page you just navigated to),
 * and locks background scroll while open.
 *
 * No enter/exit animation (deliberate scope choice, not an oversight) —
 * the project has no animation library installed and hand-rolling an
 * exit transition means keeping the overlay mounted after `isOpen` flips
 * false, which is real added complexity for something the reference
 * didn't show. Instant show/hide is simple and bug-free; revisit with
 * something like `tailwindcss-animate` if the user wants motion later.
 *
 * Fix (2026-08-26, user-reported via screenshot): background is
 * `surface-primary` (per explicit request), not `surface-background` —
 * and the overlay wasn't actually covering the full visible viewport on
 * the user's phone, so content read as pinned near the top with page
 * content (Hero's badge) visible through a gap at the bottom instead of
 * truly centered. `inset-0` alone doesn't reliably fill the real visible
 * screen on mobile browsers with a collapsing address bar — added
 * `h-[100dvh]` (dynamic viewport height, tracks the actual visible area
 * instead of the browser-chrome-collapsed 100vh) so the box's real
 * height matches what's on screen and `justify-center` centers against
 * the right number. Also added `overflow-y-auto` + `py-16` as a safety
 * net (docs/diretrizes-responsividade.md's "content can never overflow
 * its container" rule) in case this ever renders on a screen too short
 * for the content — scrolls instead of clipping/overlapping.
 *
 * Follow-up fix (2026-08-26, same report): the visible "border" around
 * the overlay on the user's phone was the OS/browser chrome showing
 * through outside the page's safe-area rectangle, not anything in this
 * component — root-caused and fixed at the layout level (see
 * `viewport` in app/layout.tsx). Vertical padding here switched from a
 * flat `py-16` to `max(4rem, env(safe-area-inset-*))` so content still
 * clears the notch/home-indicator area now that the background extends
 * fully edge-to-edge. Scroll lock also upgraded from plain
 * `overflow: hidden` to pinning `body` with `position: fixed` — the
 * more robust cross-browser technique, since iOS Safari can still
 * rubber-band/bounce (and momentarily reveal whatever's behind a fixed
 * overlay) with `overflow: hidden` alone.
 *
 * Background changed (2026-08-26, user-requested) from solid
 * `surface-primary` to the same frosted-glass treatment Header.tsx
 * already uses for its own pill: `bg-surface-primary/60` +
 * `backdrop-blur-sm`. The page behind the menu now shows through,
 * blurred, instead of being fully hidden — same token + blur amount as
 * Header, applied full-screen instead of to a small pill.
 *
 * Turned up further (2026-08-26, same day, user asked for more/darker
 * blur): `surface-primary/60` + `backdrop-blur-sm` → `surface-background/80`
 * + `backdrop-blur-lg` — the darkest neutral token instead of the
 * lighter surface tone, at higher opacity, with a much stronger blur
 * radius. This now diverges from Header.tsx's exact pill treatment
 * (kept the same recipe intentionally at first for consistency, but
 * this full-screen use case wanted a heavier effect than a small pill
 * does) — noting the divergence so it doesn't read as an inconsistency
 * bug later.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // `overflow: hidden` on its own doesn't reliably stop scroll/rubber-band
    // bounce on iOS Safari — pinning the body with `position: fixed` (and
    // restoring both scroll position and every overridden style on close)
    // is the standard cross-browser way to lock background scroll behind a
    // full-screen mobile menu.
    const scrollY = window.scrollY;
    const body = document.body;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="secondary"
        iconOnly
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="sm:hidden"
      >
        <AlignLeft aria-hidden className="size-5" />
      </Button>

      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-[60] flex h-[100dvh] flex-col items-center justify-center gap-10 overflow-y-auto bg-surface-background/80 px-6 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(4rem,env(safe-area-inset-top))] backdrop-blur-lg sm:hidden"
        >
          <nav className="flex flex-col items-center gap-8 text-center">
            <Link
              href="/#sobre"
              onClick={() => setIsOpen(false)}
              className="heading-h2 text-text-primary"
            >
              Sobre Mim
            </Link>
            <Link
              href="/case-studies"
              onClick={() => setIsOpen(false)}
              className="heading-h2 text-text-primary"
            >
              Projetos
            </Link>
          </nav>

          <Link
            href="/#contato"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-3 rounded-full bg-cta-primary-bg px-9 py-4 transition-colors hover:bg-cta-primary-bg-hover"
          >
            <ArrowRight aria-hidden className="size-[18px] text-cta-primary-text" />
            <span className="label-button text-cta-primary-text">
              Entre em contato
            </span>
          </Link>

          <Button
            variant="transparent"
            iconOnly
            aria-label="Fechar menu"
            onClick={() => setIsOpen(false)}
          >
            <X aria-hidden className="size-6" />
          </Button>
        </div>
      )}
    </>
  );
}
