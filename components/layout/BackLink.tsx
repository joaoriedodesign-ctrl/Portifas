"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * Back/breadcrumb link — added 2026-08-27 for `/contato` per explicit
 * user request ("colocar um breadcrumb ... para que o usuário possa
 * retornar de onde ele veio").
 *
 * Unlike `app/case-studies/[slug]/page.tsx`'s own breadcrumb (a plain
 * `<Link href="/case-studies">` — that page always has exactly one
 * logical parent, the projects list), `/contato` doesn't have a single
 * fixed parent: it's reachable from Home, every case study, and the
 * header's "CONTATO" link from literally any page. A hardcoded
 * destination would be wrong most of the time (e.g. sending someone
 * back to Home when they actually came from a case study). Real
 * browser-history `router.back()` is the correct primitive for "de onde
 * ele veio" here — a client component (`useRouter`) so
 * `app/contato/page.tsx` itself can stay a server component and keep
 * its `metadata` export.
 *
 * Falls back to doing nothing (native `history.back()` behavior) if
 * there's no history entry to go back to — e.g. `/contato` opened
 * directly via a bookmarked/shared URL in a fresh tab. Not treated as a
 * bug: same as any browser "back" affordance behaves with no history.
 *
 * Styled to match the case-study breadcrumb exactly (`label-button
 * text-text-secondary`, hover → `brand-500`) so both breadcrumb patterns
 * on the site read as the same furniture despite the different
 * navigation mechanism underneath.
 */
export function BackLink() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="label-button inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-brand-500"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Voltar
    </button>
  );
}
