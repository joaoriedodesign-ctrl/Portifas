"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

/**
 * Wraps the global `<Footer />` (mounted in app/layout.tsx after every
 * page's children) so it can be suppressed on specific routes.
 *
 * Added 2026-08-27, explicit user request: `/contato` should NOT show
 * the global footer's closing "Vamos trabalhar juntos?" CTA — that CTA's
 * entire purpose is to send someone to `/contato` (see Footer.tsx's own
 * doc comment), which is a no-op/redundant loop on the page that IS
 * `/contato`. Every other route keeps the footer exactly as before.
 *
 * `usePathname()` needs a client component — hence this thin wrapper
 * instead of making the whole root layout (or Footer itself) client-side
 * just to read the current route.
 *
 * UPDATE 2026-09-01 (English site): `/en/contato` added to
 * `HIDDEN_ON_ROUTES` for the same reason `/contato` is there — the
 * English contact page has the exact same "footer CTA sends you to
 * /contato, which is a no-op on /contato itself" redundancy. Also now
 * passes `lang` to `<Footer />` based on whether the route is under
 * `/en/...`, so the global footer renders in English on every English
 * page without needing every page to import Footer directly.
 */
const HIDDEN_ON_ROUTES = ["/contato", "/en/contato"];

export function ConditionalFooter() {
  const pathname = usePathname();

  if (HIDDEN_ON_ROUTES.includes(pathname)) {
    return null;
  }

  const isEn = pathname?.startsWith("/en") ?? false;
  return <Footer lang={isEn ? "en" : "pt"} />;
}
