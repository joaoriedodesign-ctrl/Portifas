import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackLink } from "@/components/layout/BackLink";

export const metadata: Metadata = {
  title: "Contato — João Riedo",
  description:
    "Fale com João Riedo sobre design systems, automação e product design com IA — envie uma mensagem direto pelo WhatsApp.",
};

/**
 * Dedicated "Entre em contato" screen — new route added 2026-08-27 per
 * explicit user request. Every "Entrar em contato" CTA and the header's
 * "CONTATO" link used to point at `/#contato`, a homepage anchor into a
 * section that was never built (flagged since app/page.tsx's original
 * doc comment, and HeaderNav.tsx's "excluded from active matching"
 * note) — all of those now point here instead. See
 * components/sections/ContactSection.tsx for the actual form + WhatsApp
 * redirect logic; this page is just that section inside the same
 * header-clearance shell every other simple top-level page uses.
 *
 * Layout: mirrors `app/case-studies/page.tsx` (`pt-28 sm:pt-32 lg:pt-40`
 * on `<main>` for the floating header's clearance, `mx-auto max-w-[1312px]`
 * to cap line length on wide screens) rather than a dedicated Hero band
 * like `/sobre` — this page doesn't need its own hero, the section's own
 * eyebrow + heading already carry the "page title" role, and a full
 * `surface-primary` band would be overkill for a single form.
 *
 * UPDATE 2026-08-27, two follow-up requests on this same screen:
 * 1. Breadcrumb added (`<BackLink />`, components/layout/BackLink.tsx) —
 *    unlike the case-study breadcrumb this can't be a fixed
 *    `Link href="/case-studies"`, since `/contato` is reachable from
 *    everywhere (Home, any case study, the header nav on any page). See
 *    BackLink.tsx's own comment for why real browser-history
 *    `router.back()` is the right primitive here instead.
 * 2. The global footer is now suppressed on this route specifically
 *    (components/layout/ConditionalFooter.tsx, wired in app/layout.tsx)
 *    — its closing CTA's whole job is to send people to `/contato`,
 *    which is a redundant loop on the page that already IS `/contato`.
 */
export default function ContatoPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1312px] flex-col px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-32 lg:px-16 lg:pt-40">
      <div className="pb-6 sm:pb-8">
        <BackLink />
      </div>
      <ContactSection />
    </main>
  );
}
