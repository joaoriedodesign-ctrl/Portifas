import type { CaseStudy } from "@/lib/case-studies";

/**
 * English mirror of lib/case-studies.ts — built 2026-09-01 for the
 * English site (see the app/en/ route tree, and Header.tsx/HeaderNav.tsx/
 * MobileNav.tsx/Footer.tsx/BackLink.tsx's own "UPDATE 2026-09-01" notes
 * for the rest of that decision). This is a deliberate SEPARATE array,
 * not an extra `titleEn`/`summaryEn`/... field bolted onto each entry in
 * the original file — the Portuguese file already carries a lot of
 * per-entry dated history in its own comments (NDA/placeholder status,
 * which fields are user-confirmed vs. assumed, the `hidden` flag
 * rationale); duplicating the whole `CaseStudy` shape here keeps that
 * file's structure untouched and this one focused purely on translation.
 *
 * Every entry below is a straight English translation of the matching
 * `caseStudies` entry — same `slug` (so the same dynamic route param
 * works under both `/case-studies/<slug>` and `/en/case-studies/<slug>`),
 * same `year`, same `coverImage`/`imageBlocks[].images` paths (the
 * screenshots themselves aren't language-specific), same `hidden` flag,
 * same `stats[].value` numbers. Only text fields differ. Per the user's
 * explicit direction (2026-09-01), this includes the currently-hidden
 * `aurum-bet-torneios` entry too — kept `hidden: true` here as well, so
 * it stays unpublished on the English site exactly the way it's
 * unpublished on the Portuguese one; flip both files' `hidden` flags
 * together if it's ever cleared to go public.
 *
 * NOTHING beyond straight translation was added or invented here — where
 * the Portuguese source flags a fact as assumed/unconfirmed (see
 * project memory: zentupet's plataforma/duracao/year, aurum-bet's
 * plataforma/duracao/year), the English text carries the same assumed
 * fact, not a new one.
 */
export const caseStudiesEn: CaseStudy[] = [
  {
    slug: "multi-tenant-design-system",
    nda: false,
    category: "Design System",
    title: "Multi-tenant Design System",
    subtitle:
      "From outdated Figma files to a single token foundation for multiple tenants",
    summary:
      "Before this system, every new screen meant hunting for components across scattered Figma files that were out of date almost as soon as they shipped — there was no single source of truth, and each designer worked from a different version of the interface. I structured the token architecture (primitives → semantics) and a per-tenant theme automation layer that today powers 87 screens and 200+ components consumed directly from Storybook.",
    cardDescription:
      "Multi-tenant design system with per-tenant theme automation and a single token foundation consumed via Storybook.",
    year: "2026",
    coverImage: "/images/case-studies/multi-tenant-design-system/cover.jpg",
    metadata: {
      papel: "Design System Architecture",
      duracao: "Ongoing since January",
      plataforma: "Web (multi-tenant)",
      squad: "Me (architecture) + lead (refinement) + teammate (application)",
    },
    contexto: {
      paragraph:
        "Before the design system existed, there was no real component reuse across tenants: every new screen meant digging through scattered files to find wherever a component had last been used — and those files went out of date almost immediately. In practice there was never a single, up-to-date source of truth: each designer worked from a slightly different version of the interface, which caused constant visual inconsistency and rework between design and development.",
    },
    pillars: [
      {
        number: "01",
        title: "Token architecture",
        description:
          "Built on Figma variables with primitive → semantic aliasing — the same token discipline used in this very portfolio today. On the code side, tokens make it into Storybook through a dedicated sync (a manual script/process, no Tokens Studio or Style Dictionary in the pipeline).",
      },
      {
        number: "02",
        title: "Per-tenant theme automation",
        description:
          "Instead of manual color-by-color, screen-by-screen customization, I built an automation layer on top of the semantic foundation that generates each tenant's theme automatically — today serving 3 tenants, eliminating manual color swapping and speeding up onboarding of new tenants into the system.",
      },
      {
        number: "03",
        title: "Technical debt, in parallel",
        description:
          "Fixed components that had shipped without full responsive coverage and migrated legacy components to the new standard — two technical-debt issues resolved alongside the system's evolution, not after it.",
      },
      {
        number: "04",
        title: "Shared governance",
        description:
          "Evolving the foundation is split between architecture (me), refinement (leadership) and rigorous day-to-day application (a teammate) — which has helped keep things consistent even with more than one person touching the system. A formal review/versioning process is still maturing.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Several design-system components with the theme automatically applied for different tenants",
        images: [
          "/images/case-studies/multi-tenant-design-system/tema-1.jpg",
          "/images/case-studies/multi-tenant-design-system/tema-2.jpg",
          "/images/case-studies/multi-tenant-design-system/tema-3.jpg",
        ],
        variant: "theme-peek",
        labels: ["Theme 1", "Theme 2", "Theme 3"],
      },
    ],
    stats: [
      { value: "87", label: "screens powered by the design system" },
      { value: "200+", label: "components reused across tenants" },
      { value: "3", label: "tenants served by the theme automation" },
      { value: "1/5", label: "of the time to create a new screen" },
    ],
    nextProjectSlug: "zentupet",
  },
  {
    slug: "zentupet",
    nda: false,
    category: "Management SaaS",
    title: "Zentupet",
    subtitle:
      "Management SaaS designed from scratch for pet daycares and hotels, from check-in to check-out",
    summary:
      "Zentupet is a management SaaS designed from scratch for pet daycares and hotels, covering the pet's entire journey at the facility — from check-in to check-out — including activity tracking, medication, bathing and grooming. A solo project: market research, all 14 product screens, components and design system, all structured with no client or team during the design phase.",
    cardDescription:
      "Management SaaS for pet daycares and hotels — from check-in to check-out, with a real-time portal for the owner.",
    year: "2026",
    coverImage: "/images/case-studies/zentupet/cover.jpg",
    metadata: {
      papel: "Market research, UX/UI and Design System",
      duracao: "1 to 3 months",
      plataforma: "Web",
      squad: "Me (solo project — no client or team during the design phase)",
    },
    contexto: {
      paragraph:
        "Zentupet serves two user profiles with distinct needs: the facility's own operations (staff) and the pet's owner (end customer). The project started from the observation that most dog daycares had no management system of their own — operations ran on paper or disorganized spreadsheets, with no structured activity tracking and no visibility for the owner into what was happening with their pet during the stay.",
    },
    pillars: [
      {
        number: "01",
        title: "Frictionless scheduling",
        description:
          "Booking and stay management for the facility — the operational backbone that supports the pet's entire journey, from check-in to check-out.",
      },
      {
        number: "02",
        title: "The owner's \"window\"",
        description:
          "A portal where the owner follows every update about their pet in real time during the stay — a bath given, medication administered, an activity completed. It works like a living record of the animal, visible to the person who cares most about that information.",
      },
      {
        number: "03",
        title: "Direct contact with owners",
        description:
          "A communication channel built into the staff's operational flow, so conversations with owners happen without leaving the system that's already logging the pet's routine.",
      },
      {
        number: "04",
        title: "Jakob's Law in the calendar",
        description:
          "The initial attempt was to design the scheduling component from scratch, but the mental model users already had made that risky — people already have a formed idea of how a calendar should behave, shaped by tools like Apple Calendar and Google Calendar. I used those references as the basis for the interaction pattern instead of forcing a reinvention that would require relearning with no real payoff.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Staff operations panel — scheduling, activities and control over bathing, grooming and medication",
        images: [
          "/images/case-studies/zentupet/staff-1-agenda.jpg",
          "/images/case-studies/zentupet/staff-2-timeline-pet.jpg",
          "/images/case-studies/zentupet/staff-3-pets-do-dia.jpg",
          "/images/case-studies/zentupet/staff-4-modal-atividade.jpg",
        ],
      },
      {
        caption:
          "The owner's \"window\" — real-time tracking of every update about the pet during the stay",
        images: [
          "/images/case-studies/zentupet/janelinha-1-timeline-wide.jpg",
          "/images/case-studies/zentupet/janelinha-2-checkin-wide.jpg",
          "/images/case-studies/zentupet/janelinha-3-timeline.jpg",
          "/images/case-studies/zentupet/janelinha-4-checkin.jpg",
        ],
      },
    ],
    stats: [
      { value: "14", label: "screens designed" },
      { value: "2", label: "user profiles served (staff and owner)" },
      { value: "1", label: "design system built from scratch" },
    ],
    nextProjectSlug: "multi-tenant-design-system",
  },
  {
    slug: "aurum-bet-torneios",
    nda: false,
    // Kept hidden here too — see the file-level comment above. Mirrors
    // lib/case-studies.ts's own `hidden: true` on this same slug.
    hidden: true,
    category: "Tournament System",
    title: "Aurum Bet",
    subtitle:
      "Tournament system designed from scratch for a betting platform (fictitious name), with full coverage of every state and the origin of the structured handoff process in Notion",
    summary:
      "Structured, from scratch, the tournament system for a betting platform (fictitious name: Aurum Bet) — 33 screens covering the lobby, details, entry and every status state, backed by 7 reusable components and 3 modals. This was also the project where the structured handoff process in Notion was implemented for the first time, documenting screens and components for the dev team.",
    cardDescription:
      "Tournament system structured from scratch, with full state coverage — and the team's first structured handoff in Notion.",
    year: "2026",
    metadata: {
      papel: "Reference research, UX/UI and dev handoff",
      duracao: "3 to 6 months",
      plataforma: "Web",
      squad: "Me (research, UX/UI and handoff) + dev team (implementation)",
    },
    contexto: {
      paragraph:
        "Tournaments were already a planned feature on Aurum Bet's product roadmap — there was no scope pivot or reinterpretation of the brief. The work went straight into structuring the feature end to end: reference research on direct competitors, designing every screen and state, defining the reusable components, and presenting the handoff directly to the dev team.",
    },
    pillars: [
      {
        number: "01",
        title: "Competitive benchmark",
        description:
          "Mapped the entry, scoring and prize flow of direct competitors before designing any screens — real research work, even if not documented as a separate artifact.",
      },
      {
        number: "02",
        title: "Systematic state coverage",
        description:
          "33 screens covering the full flow — tournament lobby, tournament details, entry, loading and fallback — with coverage of every status (not started, in progress, closed) instead of designing only the happy path.",
      },
      {
        number: "03",
        title: "Reusable components and modals",
        description:
          "7 reusable components (not counting variants) and 3 modals supporting the entire flow, designed for reuse across the lobby, details and entry screens instead of one-off solutions per screen.",
      },
      {
        number: "04",
        title: "Structured handoff — where the process began",
        description:
          "The first project with a structured handoff documented in Notion: every screen and component, created and reused, explained for how each part of the feature should behave — presented directly to the dev team.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Tournament lobby with full state coverage — not started, in progress and closed",
      },
      {
        caption:
          "Structured handoff in Notion — screens and components documented for the dev team",
      },
    ],
    stats: [
      { value: "33", label: "screens covering lobby, details, entry and status" },
      { value: "7", label: "reusable components" },
      { value: "3", label: "modals in the tournament flow" },
      { value: "~50%", label: "fewer dev questions after the structured handoff (team's perception)" },
    ],
    nextProjectSlug: "multi-tenant-design-system",
  },
];

/** English mirror of `publishedCaseStudies` — filtered to what's actually public. */
export const publishedCaseStudiesEn: CaseStudy[] = caseStudiesEn.filter(
  (c) => !c.hidden
);

export function getCaseStudyBySlugEn(slug: string): CaseStudy | undefined {
  return publishedCaseStudiesEn.find((c) => c.slug === slug);
}
