import Link from "next/link";

/**
 * "Hero" section — node 31:1793 ("Frame 15") in the PORTIFÓLIO Figma file,
 * home page. Renders directly above PillarsSection.
 *
 * v2 palette + responsiveness pass (docs/design-tokens.md, this session):
 *
 * 1. Brand accent: `text-brand-primary` → `text-brand-500` (the doc's
 *    single remaining accent, sanctioned for exactly this "destaque
 *    pontual" use). The static darker "PRODUCT DESIGNER" emphasis span
 *    keeps the same relationship it had before (main accent vs its darker
 *    step), now `text-brand-600` instead of the discontinued
 *    `text-brand-primary-hover`.
 * 2. CTA: `bg-brand-primary` → `bg-cta-primary-bg`, `text-text-inverse` →
 *    `text-cta-primary-text`. Also added `hover:bg-cta-primary-bg-hover` —
 *    the original never had a hover treatment on this hand-rolled CTA,
 *    which the project's "cover all relevant states" rule calls out; fixed
 *    while this file was already open, not left as-is.
 * 3. Background note (unchanged from the original build): the Figma
 *    frame's raw #F4F1EB fill is the old warm-paper primitive, now doubly
 *    stale after the v2 migration — this section still sets no background
 *    of its own and inherits `surface-background` from `body`
 *    (app/globals.css).
 * 4. Layout made mobile-first (docs/diretrizes-responsividade.md — hard
 *    project rule, any touched component must ship responsive): the text
 *    column + photo now stack in a column below `lg` and become the
 *    original side-by-side row (588px column + 87px gap + 374px photo, the
 *    frame's exact desktop numbers) at `lg` and up. The photo scales fluidly
 *    (`w-full max-w-[280px]` → `max-w-[340px]` at `sm`) instead of a fixed
 *    374×373 box, and vertical padding steps down from `py-16` to the
 *    frame's exact `py-[238px]` only at `lg`.
 */
export function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center px-6 py-16 sm:py-20 lg:py-[238px]">
      <div className="mx-auto flex w-full max-w-[1049px] flex-col items-center gap-10 lg:flex-row lg:gap-[87px]">
        <div className="flex w-full flex-col items-start justify-center gap-8 lg:w-[588px] lg:shrink-0">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col items-start">
              <p className="heading-display text-brand-500">
                Product Designer
              </p>
              <p className="heading-h1 text-text-primary">
                Design Systems &amp; Design Ops
              </p>
            </div>
            <p className="heading-h4 text-text-secondary">
              Sou{" "}
              <span className="text-brand-600">
                PRODUCT DESIGNER
              </span>{" "}
              há mais de 2 anos. Já construí produto e design system na Ana
              Gaming (Cassino.bet e 7K.bet), e hoje sou Product Designer na
              Multibet. Sempre equilibrando estratégia de produto, design
              systems e IA pra fazer tudo escalar mais rápido.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="flex items-center gap-2 rounded-[100px] bg-cta-primary-bg px-6 py-3 transition-colors hover:bg-cta-primary-bg-hover"
          >
            <span className="label-button text-cta-primary-text">
              EXPLORAR PROJETOS
            </span>
            <img
              src="/icons/arrow-down.svg"
              alt=""
              aria-hidden
              className="size-4"
            />
          </Link>
        </div>

        <img
          src="/images/hero/hero-visual.png"
          alt="Foto de João Lucas ao ar livre, sobreposta a duas formas orgânicas nas cores azul e amarelo da marca"
          className="aspect-square w-full max-w-[280px] shrink-0 sm:max-w-[340px] lg:h-[373px] lg:w-[374px] lg:max-w-none"
        />
      </div>
    </section>
  );
}
