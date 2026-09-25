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
    nextProjectSlug: "instituto-mais",
  },
  // Added 2026-09-25 — English mirror of the instituto-mais entry in
  // lib/case-studies.ts (real client; see notes there on assumed fields).
  {
    slug: "instituto-mais",
    nda: false,
    category: "Institutional Website",
    title: "Instituto MAIS",
    subtitle:
      "Website for a multidisciplinary clinic in Londrina, Brazil — 7 specialties, 9 professionals and a short path to booking",
    summary:
      "Website for Instituto MAIS, a clinic that brings psychology, educational psychology, psychoanalysis, neuropsychology, neuro-educational psychology, pilates and massage therapy under one roof. The site organizes all of it around the person looking for help — by specialty, by life stage and by professional — and sends every path to the clinic's WhatsApp with the right message already written.",
    cardDescription:
      "Website for a multidisciplinary clinic — specialties, team and direct WhatsApp booking with each professional.",
    year: "2026",
    coverImage: "/images/case-studies/instituto-mais/cover.jpg",
    liveUrl: "https://institutomaislondrina.com.br",
    metadata: {
      papel: "UX/UI Design and front-end development",
      duracao: "1 to 3 months",
      plataforma: "Web (responsive website)",
      squad: "Me (design and code) + the clinic",
    },
    contexto: {
      paragraph:
        "A clinic with 7 specialties can easily turn into a list of technical names patients can't tell apart — a parent looking for help for a child struggling at school doesn't necessarily know whether they need educational psychology, neuro-educational psychology or psychology. The challenge was to present the clinic as one place with a clear identity (welcome, develop, transform), help people who don't know where to start, and make the path from the first visit to a conversation with the team as short as possible.",
    },
    pillars: [
      {
        number: "01",
        title: "Organized around the visitor",
        description:
          "Three entry points to the same care: specialties explained in plain language, life stages (children, teens, adults and families) and integrated care showing how the areas combine. For anyone who still isn't sure what they need, a dedicated card: \"Not sure where to start? We'll help.\"",
      },
      {
        number: "02",
        title: "Direct booking with each professional",
        description:
          "Each of the 9 professionals has their own booking button, which opens WhatsApp with their name and specialty already in the message. The front desk gets the contact already knowing who the patient wants to see, with no back-and-forth.",
      },
      {
        number: "03",
        title: "An identity that moves",
        description:
          "The brand's mosaic becomes the visual language of the whole site — in the badges, the specialty icons and the integrated care section, where the blocks converge as you scroll (\"perspectives meet\"). Light and dark themes follow the device, with a toggle to switch.",
      },
      {
        number: "04",
        title: "Ready to be found and measured",
        description:
          "Local SEO with clinic structured data, sitemap and Open Graph; self-hosted fonts; and Google Tag Manager, GA4 and Meta Pixel ready to go, with every WhatsApp click tracked as a conversion event for the clinic's campaigns.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Key sections of the site on mobile and desktop — hero, specialties, integrated care, team and dark theme",
        variant: "screen-map",
        screens: [
          { titulo: "Hero", images: ["/images/case-studies/instituto-mais/screen-hero-mobile.jpg", "/images/case-studies/instituto-mais/screen-hero-desktop.jpg"] },
          { titulo: "Specialties", images: ["/images/case-studies/instituto-mais/screen-specialties-mobile.jpg", "/images/case-studies/instituto-mais/screen-specialties-desktop.jpg"] },
          { titulo: "Integrated care", images: ["/images/case-studies/instituto-mais/screen-integrated-mobile.jpg", "/images/case-studies/instituto-mais/screen-integrated-desktop.jpg"] },
          { titulo: "Team", images: ["/images/case-studies/instituto-mais/screen-team-mobile.jpg", "/images/case-studies/instituto-mais/screen-team-desktop.jpg"] },
          { titulo: "Dark theme", images: ["/images/case-studies/instituto-mais/screen-dark-mobile.jpg", "/images/case-studies/instituto-mais/screen-dark-desktop.jpg"] },
        ],
      },
    ],
    stats: [
      { value: "7", label: "specialties explained in plain language" },
      { value: "9", label: "professionals with direct WhatsApp booking" },
      { value: "4", label: "life stages served (children to families)" },
      { value: "2", label: "themes — light and dark, following the device" },
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
    nextProjectSlug: "dr-carlos-mattos",
  },
  // Added 2026-09-24 — English mirror of the dr-carlos-mattos entry in
  // lib/case-studies.ts (see the notes there on assumed fields).
  {
    slug: "dr-carlos-mattos",
    nda: false,
    category: "Landing Page",
    title: "Dr. Carlos Mattos",
    subtitle:
      "A landing page for a psychiatry practice in Curitiba, Brazil, where the whole journey leads to a single booking channel: WhatsApp",
    summary:
      "A landing page for a psychiatrist who sees patients in person in Curitiba and via telehealth across Brazil. The page starts from situations patients recognize in their own daily lives, introduces the doctor and explains treatment in 4 steps — with WhatsApp booking always one tap away, at any point of the scroll.",
    cardDescription:
      "Landing page for a psychiatry practice — recognition, trust and WhatsApp booking on a single page.",
    year: "2026",
    coverImage: "/images/case-studies/dr-carlos-mattos/cover.jpg",
    liveUrl: "/projects/dr-carlos-mattos/index.html",
    metadata: {
      papel: "UX/UI Design and front-end development",
      duracao: "Under 1 month",
      plataforma: "Web (responsive landing page)",
      squad: "Me (design and code) + the client",
    },
    contexto: {
      paragraph:
        "People usually look for a psychiatrist when they're already worn out: they've lived for a long time with poor focus, anxiety or undiagnosed ADHD, and any friction along the way becomes another reason to put it off. The challenge was to build a page that creates recognition and trust quickly, answers the questions that usually block the first contact (insurance, telehealth, wait time, current medication) and turns that decision into a WhatsApp message.",
    },
    pillars: [
      {
        number: "01",
        title: "Start with recognition",
        description:
          "Right after the hero, the \"Do any of these sound familiar?\" section lists concrete everyday signs in numbered cards — patients recognize themselves before reading any credentials, and the page immediately answers that there is a clinical explanation and an objective treatment.",
      },
      {
        number: "02",
        title: "One conversion channel",
        description:
          "Every CTA leads to WhatsApp with a pre-filled message: header, hero, treatment section, mobile menu, footer and a floating button that follows the scroll on mobile. No forms — booking happens in the channel patients already use.",
      },
      {
        number: "03",
        title: "Trust before the click",
        description:
          "An about section with the doctor's background and a first-person quote, license numbers visible in the hero and footer, a 4-step treatment journey (booking, first appointment, plan and follow-up), address with a map, and an accordion FAQ covering insurance, telehealth, wait time and payment.",
      },
      {
        number: "04",
        title: "Lightweight and accessible by default",
        description:
          "Plain HTML, CSS and JavaScript, no framework. WebP images with separate mobile and desktop versions, non-render-blocking fonts, lazy loading, animations that respect the system's \"reduce motion\" setting, a skip link and keyboard navigation in the mobile menu.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Key sections of the page on mobile and desktop — hero, signs, about the doctor, treatment journey and FAQ",
        variant: "screen-map",
        screens: [
          { titulo: "Hero", images: ["/images/case-studies/dr-carlos-mattos/screen-hero-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-hero-desktop.jpg"] },
          { titulo: "Signs and challenges", images: ["/images/case-studies/dr-carlos-mattos/screen-signs-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-signs-desktop.jpg"] },
          { titulo: "About the doctor", images: ["/images/case-studies/dr-carlos-mattos/screen-about-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-about-desktop.jpg"] },
          { titulo: "How treatment works", images: ["/images/case-studies/dr-carlos-mattos/screen-treatment-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-treatment-desktop.jpg"] },
          { titulo: "FAQ", images: ["/images/case-studies/dr-carlos-mattos/screen-faq-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-faq-desktop.jpg"] },
        ],
      },
    ],
    stats: [
      { value: "6", label: "sections, from the first sign to booking" },
      { value: "6", label: "touchpoints leading to WhatsApp" },
      { value: "2", label: "care options (in person and telehealth)" },
      { value: "0", label: "frameworks — plain HTML, CSS and JS" },
    ],
    nextProjectSlug: "marina-alves",
  },
  // Added 2026-09-24 — English mirror of the marina-alves entry (fictional
  // persona, concept project — see lib/case-studies.ts).
  {
    slug: "marina-alves",
    nda: false,
    category: "Landing Page · Media Kit",
    title: "Marina Alves",
    subtitle:
      "An online media kit for a skincare creator (fictional persona) — numbers, audience and ready-made packages brands can book on WhatsApp",
    summary:
      "Concept project: a media kit built as a landing page for a skincare and real-routine content creator (Marina Alves is a fictional persona). The page replaces the PDF that gets passed around by email with a living showcase — metrics, audience profile, top content, brand testimonials and priced packages — while still offering the PDF media kit for anyone who needs to attach it to a proposal.",
    cardDescription:
      "Concept online media kit for a creator — metrics, audience and packages brands can book straight on WhatsApp.",
    year: "2026",
    coverImage: "/images/case-studies/marina-alves/cover.jpg",
    liveUrl: "/projects/marina-alves/index.html",
    metadata: {
      papel: "UX/UI Design and front-end development",
      duracao: "Under 1 month",
      plataforma: "Web (responsive landing page)",
      squad: "Me (personal project)",
    },
    contexto: {
      paragraph:
        "A creator's media kit is usually a PDF that goes stale fast, can't show video, and forces brands into several emails just to learn the basics: how much it costs and how to book. The idea here was to design the media kit from the buyer's point of view — the brand manager who needs to assess the audience, see proof of results and leave with a package chosen, all in a few minutes and often on a phone, inside Instagram itself.",
    },
    pillars: [
      {
        number: "01",
        title: "Structured around the brand's decision",
        description:
          "The section order follows the questions a buyer asks: who she is (hero with video), how far she reaches (metrics), who she talks to (gender, age, cities and topics), what has worked (top content and testimonials) and what it costs (services and packages).",
      },
      {
        number: "02",
        title: "Visible pricing, one-tap booking",
        description:
          "4 single services and 2 full packages, with the most popular one highlighted. Every button opens WhatsApp with a message already filled in with the package name and price — the conversation starts with the brand knowing exactly what it wants.",
      },
      {
        number: "03",
        title: "Data that moves",
        description:
          "Animated counters on the metrics, audience bars that fill on scroll, horizontal carousels for videos and testimonials (auto-scrolling on mobile) — all as progressive enhancement: without JavaScript, or with \"reduce motion\" on, every piece of content still shows up, static and complete.",
      },
      {
        number: "04",
        title: "Built for Instagram's in-app browser",
        description:
          "Since the link lives in the bio, the page was tuned for in-app browsers (Instagram/WhatsApp) and for Samsung Internet's forced dark mode, which inverts colors on its own — there the page gets its own dark theme so the visual identity doesn't break. The PDF media kit is still available to download.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Key sections of the media kit on mobile and desktop — hero, metrics, audience, services and contact",
        variant: "screen-map",
        screens: [
          { titulo: "Hero", images: ["/images/case-studies/marina-alves/screen-hero-mobile.jpg", "/images/case-studies/marina-alves/screen-hero-desktop.jpg"] },
          { titulo: "Metrics", images: ["/images/case-studies/marina-alves/screen-metrics-mobile.jpg", "/images/case-studies/marina-alves/screen-metrics-desktop.jpg"] },
          { titulo: "Audience", images: ["/images/case-studies/marina-alves/screen-audience-mobile.jpg", "/images/case-studies/marina-alves/screen-audience-desktop.jpg"] },
          { titulo: "Services and packages", images: ["/images/case-studies/marina-alves/screen-services-mobile.jpg", "/images/case-studies/marina-alves/screen-services-desktop.jpg"] },
          { titulo: "Contact", images: ["/images/case-studies/marina-alves/screen-contact-mobile.jpg", "/images/case-studies/marina-alves/screen-contact-desktop.jpg"] },
        ],
      },
    ],
    stats: [
      { value: "8", label: "sections following the brand's buying decision" },
      { value: "6", label: "packages with a pre-filled WhatsApp message" },
      { value: "1", label: "downloadable PDF media kit" },
      { value: "0", label: "content lost without JavaScript (progressive enhancement)" },
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
