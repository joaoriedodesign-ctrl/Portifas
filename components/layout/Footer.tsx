import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Footer / closing CTA — node 31:1896 ("Footer CTA") in the PORTIFÓLIO
 * Figma file. In Figma this frame appears once, at the bottom of the
 * "Desktop" home-page flow (Hero → Pillars → Projetos → Footer CTA).
 * Rendered here as a GLOBAL footer instead — mounted in app/layout.tsx
 * after {children}, the same placement pattern as the global <Header />
 * before it — rather than only inside the home page. A closing "let's
 * talk" CTA + copyright is conventionally site-wide furniture, and
 * Header.tsx's own nav already links `/#contato` from every route, which
 * only makes sense if a way to reach out is meant to be reachable
 * everywhere, not just from "/". Flagging this as an implementation
 * decision the Figma frame itself doesn't specify — same kind of call
 * Header.tsx's own comment makes about its position:fixed behavior.
 *
 * CTA target is `/contato` (updated 2026-08-27 — was `/#contato`, a
 * homepage anchor into a section that didn't exist yet, same gap
 * app/page.tsx's own comment used to flag). A real dedicated contact
 * page now exists at that route (components/sections/ContactSection.tsx,
 * a simple form that redirects to WhatsApp — also reused directly on
 * Home and at the end of every case study), so this CTA finally lands
 * somewhere real instead of a no-op anchor.
 *
 * CTA styling mirrors Hero's primary CTA link (hover:scale-105 + a
 * translating arrow icon, lucide-react `ArrowRight`) rather than the
 * `Button` component — Hero already established that richer treatment for
 * the site's headline CTAs, so the footer's CTA (arguably the second most
 * important CTA on the site) follows the same precedent instead of mixing
 * in a third button style.
 *
 * Copyright year is computed (`new Date().getFullYear()`) instead of the
 * literal "2026" baked into the Figma text — identical output today, but
 * the footer won't silently read "2026" forever.
 *
 * v2 palette: eyebrow caption/brand-500, heading-h1/text-primary, CTA via
 * cta-primary-bg/cta-primary-text tokens — no raw hex, per the project's
 * token rule. `heading-h1` already steps down to `h2` size below `lg`
 * automatically (tokens-typography.css), so no manual breakpoint variant
 * is needed on the headline.
 *
 * Responsiveness (docs/diretrizes-responsividade.md): the Figma
 * `pt-[120px]` desktop value is mobile-first (`pt-16` → `sm:pt-20` →
 * `lg:pt-[120px]`); horizontal padding likewise (`px-6` → `sm:px-10` →
 * `lg:px-20`, the last exactly matching Figma's `px-[80px]`). The CTA
 * button keeps a ~52px tall hit area (`py-4` + label + icon), clearing the
 * project's 44×44px minimum touch target at every breakpoint.
 *
 * UPDATE 2026-09-01 (English site): added an optional `lang` prop ("pt",
 * default, or "en") so `ConditionalFooter.tsx` can render this in
 * English for every route under `/en/...` — same pattern as Badge's
 * `accent` prop / Button's `iconOnly` prop (extend, don't fork). Every
 * route that doesn't pass `lang` renders byte-identical to before this
 * change.
 */
interface FooterProps {
  lang?: "pt" | "en";
}

export function Footer({ lang = "pt" }: FooterProps) {
  const isEn = lang === "en";

  return (
    <footer className="flex w-full flex-col items-center gap-8 px-6 pb-8 pt-16 text-center sm:gap-10 sm:px-10 sm:pt-20 lg:px-20 lg:pt-[120px]">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-4 sm:gap-6">
        <p className="caption text-brand-500">
          {isEn ? "LET'S WORK TOGETHER?" : "VAMOS TRABALHAR JUNTOS?"}
        </p>
        <p className="heading-h1 text-text-primary">
          {isEn
            ? "Let's talk about design systems, automation, or where AI is taking product design?"
            : "Vamos conversar sobre design systems, automação, ou pra onde a IA tá levando o product design?"}
        </p>
      </div>

      <Link
        href={isEn ? "/en/contato" : "/contato"}
        className="group inline-flex items-center gap-3 rounded-full bg-cta-primary-bg px-9 py-4 transition-all duration-300 hover:scale-105 hover:bg-cta-primary-bg-hover active:scale-95"
      >
        <span className="label-button text-cta-primary-text">
          {isEn ? "GET IN TOUCH" : "ENTRAR EM CONTATO"}
        </span>
        <ArrowRight
          aria-hidden
          className="size-[18px] text-cta-primary-text transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <p className="caption max-w-[289px] text-text-secondary">
        {isEn
          ? `© ${new Date().getFullYear()} João Riedo. All rights reserved.`
          : `© ${new Date().getFullYear()} João Riedo. Todos os direitos reservados.`}
      </p>
    </footer>
  );
}
