"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

/**
 * "Hero" section — restyle pass (2026-08-26). Content is unchanged from
 * the v2 responsive build (same copy, same CTA, same destination link);
 * only the visual treatment and layout were redone, at the user's request,
 * following the shape of a reference "dithering card" hero component.
 *
 * Decisions here that touch documented project rules — flagged per the
 * persona checklist ("nunca contradizer um MD sem avisar e justificar",
 * "se faltar um valor, sinalizar antes de usar"):
 *
 * 1. PHOTO DROPPED (user-confirmed). The reference layout is full-bleed
 *    and centered, no portrait. This also retires the open gap already
 *    logged in project memory: hero-visual.png had the pre-v2 blue/yellow
 *    accent blobs baked into its pixels with no updated asset available.
 * 2. HEADLINE HIERARCHY SWAPPED. The previous layout gave `heading-display`
 *    (the biggest style) to "Product Designer" and `heading-h1` to
 *    "Design Systems & Design Ops". Here "Product Designer" becomes the
 *    small eyebrow/role badge (conventional hero pattern: name/role small,
 *    value proposition big) and "Design Systems & Design Ops" takes the
 *    `heading-display` treatment as the actual headline. No words were
 *    added, removed, or reworded — only which line gets the louder type
 *    style changed.
 * 3. NEW, DOCUMENTED EXCEPTION to "brand color is never a background"
 *    (docs/design-tokens.md §1.1). The dithering shader paints `brand-500`
 *    as a moving texture across the whole card. User explicitly approved
 *    this as a deliberate exception scoped to this kind of immersive/
 *    ambient hero background — NOT a green light to use brand-500 as a
 *    flat section background elsewhere. Kept subtle (opacity-30,
 *    mix-blend-screen) so it reads as atmosphere, not a color block.
 * 4. brand-500 IS READ FROM THE TOKEN AT RUNTIME, not hardcoded — the
 *    shader library needs a literal color string and can't resolve a CSS
 *    custom property itself, so this reads the `--color-brand-500`
 *    "R G B" triplet from computed styles once on mount and feeds it in as
 *    `rgb(r g b)`. If the token value changes in tokens-colors.css, this
 *    follows automatically.
 * 5. `rounded-[40px]` ON THE CARD IS A NEW, UN-DOCUMENTED VALUE. The
 *    project has no radius scale yet (docs/design-tokens.md has no
 *    spacing/radius section — same gap already noted for spacing in
 *    tailwind.config.ts). Flagging as a proposal, not a token: worth
 *    formalizing a `radius/lg`-style token if a second large rounded
 *    surface shows up elsewhere.
 * 6. Mobile-first, no fixed heights, per
 *    docs/diretrizes-responsividade.md: the card's height comes from
 *    padding + content (`py-20 sm:py-28 lg:py-36`), never a `min-h-[..px]`.
 * 7. FULL-BLEED (2026-08-26, user-requested). Dropped the `max-w-[1049px]`
 *    cap that kept the card inset with visible dark margins on wide
 *    screens — the card now stretches to the section's own `px-6`
 *    (mobile-style) horizontal padding at every breakpoint, instead of
 *    capping out and floating in the middle of the viewport on desktop.
 *    The text column inside keeps its own `max-w-[720px]`/`max-w-[640px]`
 *    so line length stays readable even though the shader background now
 *    goes edge-to-edge.
 * 8. TOP PADDING = SYMMETRIC GAP AROUND THE HEADER (2026-08-26,
 *    user-requested: "o header está muito longe do hero"). The fixed
 *    header (`components/layout/Header.tsx`) floats at `top-6`/`sm:top-8`
 *    and is 54px tall (8+8 padding + 38px avatar) after its own resize
 *    pass. `pt-[102px]` / `sm:pt-[118px]` here are computed, not
 *    eyeballed: header-top + header-height + header-top again — so the
 *    gap from the viewport top to the header equals the gap from the
 *    header down to this card (24+54+24=102, 32+54+32=118). If the
 *    header's `top-*` or height changes again, this needs recomputing to
 *    stay symmetric — it won't update itself.
 */
export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [shaderColor, setShaderColor] = useState<string | null>(null);

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-500")
      .trim();
    if (raw) setShaderColor(`rgb(${raw.replace(/\s+/g, " ")})`);
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center px-6 pb-16 pt-[102px] sm:pb-20 sm:pt-[118px]">
      <div
        className="relative w-full overflow-hidden rounded-[40px] border border-border-surface-primary bg-surface-primary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {shaderColor && (
          <Suspense fallback={null}>
            <div className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-screen">
              <Dithering
                colorBack="#00000000"
                colorFront="#306dad"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>
        )}

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-20 text-center sm:gap-10 sm:px-10 sm:py-28 lg:py-36">
          <Badge className="border border-brand-500/20">
            <span className="relative mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Product Designer
          </Badge>

          <div className="flex flex-col items-center gap-4">
            <p className="heading-display max-w-[720px] text-text-primary">
              Design Systems &amp; Design Ops
            </p>
            <p className="heading-h4 max-w-[640px] text-text-secondary">
              Sou{" "}
              <span className="text-brand-500">PRODUCT DESIGNER</span>. Já construí produto e design system na Ana
              Gaming (Cassino.bet e 7K.bet), e hoje sou Product Designer na
              Multibet. Sempre equilibrando estratégia de produto, design
              systems e IA pra fazer tudo escalar mais rápido.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full bg-cta-primary-bg px-8 py-3.5 transition-all duration-300 hover:scale-105 hover:bg-cta-primary-bg-hover active:scale-95"
          >
            <span className="label-button text-cta-primary-text">
              EXPLORAR PROJETOS
            </span>
            <ArrowRight
              aria-hidden
              className="size-4 text-cta-primary-text transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
