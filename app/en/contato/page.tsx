import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackLink } from "@/components/layout/BackLink";

export const metadata: Metadata = {
  title: "Contact — João Riedo",
  description:
    "Get in touch with João Riedo about design systems, automation and AI-assisted product design — send a message straight to WhatsApp.",
};

/**
 * English mirror of app/contato/page.tsx. Same shell (BackLink breadcrumb
 * + ContactSection, `pt-28 sm:pt-32 lg:pt-40` clearance for the floating
 * header) — see the Portuguese file for the full build history
 * (breadcrumb rationale, why the global footer is suppressed here via
 * ConditionalFooter.tsx's `HIDDEN_ON_ROUTES`, which now also lists
 * "/en/contato"). `<BackLink />` and the global `<Header />`/`<Footer />`
 * detect the English site from the URL themselves (`usePathname()`
 * starting with "/en") — nothing extra to wire up on this page for that.
 */
export default function ContactPageEn() {
  return (
    <main className="mx-auto flex w-full max-w-[1312px] flex-col px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-32 lg:px-16 lg:pt-40">
      <div className="pb-6 sm:pb-8">
        <BackLink />
      </div>
      <ContactSection lang="en" />
    </main>
  );
}
