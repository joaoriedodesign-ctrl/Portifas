import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PillarCard } from "@/components/ui/PillarCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Sobre Mim — João Riedo",
  description:
    "Product Designer especializado em Design Systems, Design Ops e IA aplicada ao fluxo de trabalho de ponta a ponta.",
};

/**
 * "Sobre Mim" — Figma node 133:4 ("about-me"), PORTIFÓLIO file.
 *
 * ROUTE DECISION (flagging, not silently deciding): Header.tsx's nav links
 * `/#sobre` — an anchor on the homepage — because when that link was
 * written, "sobre" was assumed to be a short homepage section, the same
 * shape as Pillars/Projetos. But node 133:4 sits at the SAME top level as
 * "Desktop" (the home page) and the case-study screen in the Figma file's
 * layer list (confirmed via get_metadata on the page root) — its own
 * Hero, its own closing CTA, six full sections. That's a dedicated page,
 * not a homepage anchor. Built here as `/sobre` instead, matching the
 * `/case-studies` precedent (a real route, not `/#anchor`) —
 * Header.tsx and MobileNav.tsx's "SOBRE" / "Sobre Mim" links were updated
 * to `/sobre` in the same pass. `/#contato` is untouched (still a real
 * gap, out of scope here).
 *
 * PALETTE (flagging — this is the single biggest judgment call on this
 * page): the Figma frame itself is still painted in the OLD v1 token set
 * ("Bauhaus matte" — paper/red/blue/yellow, confirmed via get_metadata:
 * the file's own "Design Tokens" section still shows `red`/`blue`/`yellow`
 * primitives). Figma hasn't been updated to the v2 dark/single-accent
 * palette that's been live in code since the earlier tokens pass
 * (docs/design-tokens.md v2) and is what every other page on the site
 * actually looks like today. Rendering this page in the old light/duotone
 * palette would make it visually a different site from Home and
 * /case-studies. Per the user's own framing for this task ("aplicando
 * tudo que temos definido até agora"), every color below is re-mapped
 * onto the CURRENT v2 semantic tokens, not the Figma hex. Concretely:
 * - `brand/primary` (red, #b8492f) → `brand-500` (the one remaining
 *   accent) everywhere it appears: eyebrows, the "+2 Anos" stat, pillar
 *   numbers/dots, timeline dates, education-item years.
 * - `brand/secondary` (blue, #35618f) has **no replacement** per
 *   docs/design-tokens.md §4 ("sem correspondência, sinalizar antes de
 *   reintroduzir um segundo acento") — not reintroducing it. Every blue
 *   use on this screen is remapped to something specific, not a blanket
 *   substitution:
 *   - Pillars ("Diferenciais") — Figma colors the pillar TITLE + dot
 *     blue, the number red. That's a two-accent split PillarCard doesn't
 *     support and shouldn't grow a second hue for. Reused
 *     `<PillarCard variant="home">` as-is instead of forking new markup —
 *     same shell, same border/radius/padding as this Figma node
 *     essentially 1:1 — which already gives number+dot the single accent
 *     and keeps the title neutral (`on-surface-primary`). Real component
 *     reuse, not a coincidence: this section and the home Pillars section
 *     are the same design pattern.
 *   - Hero's second highlight stat ("LATAM & Asia") — was blue, now
 *     `text-primary` (neutral). Two stats side by side both in brand-500
 *     would read as one undifferentiated block, and brand-500 already
 *     does the work on the first stat.
 *   - Timeline company name (e.g. "Multibet") — was blue, now `brand-500`
 *     instead of neutral. This one gets the accent (not neutral) because
 *     it plays the same "context label" role `text-brand-500` already
 *     plays on `ProjectCard`'s category text — a short, repeated,
 *     per-item label, not a paragraph.
 *   - "FORMAÇÃO" badge — was a blue-tinted pill (vs. "ABORDAGEM"'s
 *     red-tinted pill). Both are now the same accent-tinted `Badge`
 *     (see below) — they'll look identical where Figma had them differ
 *     by hue. Flagging this loss of differentiation explicitly since two
 *     badges collapsing into one visual treatment is a real, visible
 *     change from the design, not a rounding error.
 * - Section backgrounds: Figma alternates `#f4f1eb` / `#fff` / `#fbf9f5`
 *   per section. No other page in this codebase alternates section
 *   backgrounds (Home's sections all sit flat on `surface-background`,
 *   differentiated by spacing/cards, not fills) — introducing a new
 *   pattern for one page only would be inconsistent with the rest of the
 *   site and doesn't map cleanly onto the 3 surface tokens that exist
 *   anyway. Flattened to `surface-background` throughout, letting cards
 *   (PillarCard, contact cards) carry `surface-primary` the same way they
 *   already do elsewhere.
 *
 * BADGE COMPONENT: extended with an `accent` prop (bg-brand-500/10 +
 * brand-500 text, uppercase) instead of forking a new component — the
 * existing `<Badge>` (used in Hero for the "Product Designer" status
 * pill) has neutral text and sentence case, which doesn't match this
 * page's "ABORDAGEM"/"FORMAÇÃO" category-pill style. Same reasoning
 * Button.tsx used for its `iconOnly` prop.
 *
 * ICONS: Mail / Smartphone are lucide-react, matching the
 * project's established precedent (Hero/Footer/ProjectCard already use
 * lucide instead of one-off Figma SVG exports for icons that have a
 * lucide equivalent). LinkedIn does NOT have a lucide-react equivalent
 * (lucide dropped brand/social glyphs) — rather than install a new
 * dependency (memory: installs over the device bridge are unreliable and
 * once corrupted lucide-react itself) or leave it blank, the standard
 * LinkedIn "in" glyph is inlined as a local SVG component just below —
 * this is the canonical, publicly-documented brand mark (same path every
 * icon library ships), not a redrawn/guessed asset.
 *
 * HERO PHOTO: Figma's Hero has a real photo as an edge-to-edge fill on
 * the right side of the frame. The Figma asset host wasn't reachable from
 * either this session's cloud shell or the user's own device shell to
 * download it programmatically — the user exported and sent the exact
 * asset directly instead (615×727, matching the Figma "Rectangle" node's
 * geometry exactly), converted to `public/images/sobre/portrait.jpg`
 * (JPEG — smaller than the source PNG for a photo with no transparency
 * needed) and rendered via `next/image` below, matching the project's
 * "imagens sempre via next/image" rule
 * (docs/diretrizes-responsividade.md §2).
 * Also dropped Figma's true edge-to-edge/no-radius bleed treatment for
 * the photo in favor of the `rounded-[32px]` card language used
 * everywhere else on the site (Hero shader card, ProjectCard cover,
 * case-study cover) — there's no Figma mobile frame for this page to
 * show how the bleed layout should respond, and every other image on the
 * site is already a rounded card, so this reuses that instead of
 * inventing a new responsive behavior for a one-off treatment.
 * UPDATE 2026-08-26: reverted, per explicit user request — two reference
 * screenshots pasted in chat (a color + a b/w version of the same layout)
 * asked for the photo "nessa pegada, sem essa imagem dentro de um card."
 * The Hero JSX below now does what this paragraph originally described
 * skipping: the photo is edge-to-edge, no rounding, no card, bleeding to
 * the section's real right/top/bottom edges on desktop (full details in
 * the inline comment right above the Hero `<section>`). Leaving this
 * paragraph in place rather than deleting it — it's still the accurate
 * record of why the card version existed for one round before this.
 *
 * STAT SIZE: the "+2 Anos" / "LATAM & Asia" numbers use a raw `36px` in
 * Figma's own export — not tied to any of its named text styles (not in
 * the "styles contained in the design" list `get_design_context`
 * returned). No documented token is exactly 36px; mapped to the closest
 * one, `heading-h2` (32px), and flagging the gap per the project's
 * "não inventar, sinalizar" rule rather than hardcoding an undocumented
 * `text-[36px]`.
 *
 * FOOTER CTA — DROPPED, ON PURPOSE: Figma's node 133:173 ("Footer CTA")
 * has its own eyebrow + big heading + copyright, identical in shape to
 * the GLOBAL `<Footer />` already mounted in `app/layout.tsx` after every
 * page's children. Keeping both would stack two "let's talk" CTAs
 * back-to-back on this one route. Kept only what's genuinely new here —
 * the three contact cards (email/phone/linkedin), which exist nowhere
 * else on the site — and let the existing global Footer supply the
 * closing heading/CTA/copyright for this page like it does for every
 * other page. Flagging this as a structural call, not an oversight.
 *
 * MOTION: pillar grid, timeline rows, and contact cards use the existing
 * `<Reveal>` wrapper + stagger convention (see PillarsSection/
 * ProjectsSection) instead of introducing a new pattern for this page.
 *
 * RESPONSIVENESS (docs/diretrizes-responsividade.md): built mobile-first
 * throughout — no fixed px on layout containers, section padding steps
 * up `p-6 → sm:p-10 → lg:p-16`/`p-20`, the timeline's decorative
 * dot-and-line column is `hidden` below `sm` (a 3-column desktop-only
 * layout with no natural single-column translation — period/role/company
 * still read top-to-bottom fine without it), and the Formação/Skills grid
 * stacks `flex-col → lg:flex-row`.
 */

const differentiators = [
  {
    number: "01",
    title: "Design Systems & Ops",
    description:
      "Construção de bibliotecas consistentes com foco real em handoff para desenvolvimento, suporte a múltiplos temas (Light/Dark) e tokenização avançada para escala de produtos.",
  },
  {
    number: "02",
    title: "Produto de Ponta a Ponta",
    description:
      "Desde a fase inicial de descobrimento (Discovery) e pesquisa até a alta fidelidade e prototipação rica, com forte atuação em plataformas complexas B2B, B2C e Sportsbook.",
  },
  {
    number: "03",
    title: "IA no Workflow",
    description:
      "Utilização de ferramentas de ponta para automação de processos de design de alta fidelidade, convertendo fluxos burocráticos manuais em frameworks inteligentes de geração.",
  },
  {
    number: "04",
    title: "Mentalidade Global",
    description:
      "Interfaces pensadas e adaptadas culturalmente para operar em grandes mercados de alta complexidade e demanda, incluindo LATAM e Ásia.",
  },
] as const;

const experience = [
  {
    period: "Fevereiro 2026 – Presente",
    role: "Product Designer",
    company: "Multibet",
    description:
      "Responsável pelo design ponta a ponta de produtos e gamificação em ambientes complexos de iGaming/Betting. Liderança de auditoria de Design Tokens e migração estruturada de bibliotecas para Supernova DS.",
  },
  {
    period: "Dezembro 2025 – Fevereiro 2026",
    role: "Product Designer Freelancer",
    company: "Freelance",
    description:
      "Atuação como freelancer em projetos de Product Design entre o fim do período na Ana Gaming e o início na Multibet.",
  },
  {
    period: "Abril 2025 – Dezembro 2025",
    role: "UX Designer",
    company: "Ana Gaming (Cassino.bet / 7K.bet)",
    description:
      "Redesenho completo da experiência de sportsbook do Cassino.bet e estruturação dos alicerces iniciais do Design System unificado de múltiplos inquilinos.",
  },
  {
    period: "Abril 2024 – Abril 2025",
    role: "UI/UX Freelancer",
    company: "Freelance",
    description:
      "Atuação como freelancer em projetos de UI/UX após o retorno do intercâmbio nos Estados Unidos, até o início na Ana Gaming.",
  },
  {
    period: "Dezembro 2023 – Março 2024",
    role: "Work and Travel",
    company: "Alterra Mountain Company",
    description:
      "Intercâmbio nos Estados Unidos com foco em aprimorar o inglês. Atuação no design e otimização de interfaces de reservas, backoffice e operações de hospitalidade digital voltados para experiências em montanhas.",
  },
  {
    period: "Julho 2023 – Novembro 2023",
    role: "UI/UX Freelancer",
    company: "Freelance",
    description:
      "Atuação como freelancer em projetos de UI/UX entre a saída do Instituto ESPE e o início do intercâmbio nos Estados Unidos.",
  },
  {
    period: "Setembro 2020 – Julho 2023",
    role: "Supervisor de Design",
    company: "Instituto ESPE",
    description:
      "Liderança e gerenciamento do time de design gráfico e digital do Instituto ESPE, estabelecendo processos e padrões de consistência visual.",
  },
] as const;

const education = [
  {
    period: "2020 – 2022",
    title: "Graduação, Design Gráfico",
    institution: "UniFil - Centro Universitário Filadélfia",
  },
  {
    period: "2015 – 2018",
    title: "Técnico em Informática Integrado",
    institution: "IFPR Londrina (Instituto Federal do Paraná)",
  },
] as const;

const skills = [
  "Claude Cowork",
  "Automação de Workflow",
  "Design Tokens",
  "Design Ops",
  "iGaming & Sportsbook",
  "Pesquisa de Mercado",
  "Prototipagem de Alta Fidelidade",
] as const;

// 2026-08-26: replaced with the user's real 9-credential list (exact
// titles + Coursera/Tera verify links, supplied directly) — supersedes
// the earlier 4-item placeholder above, which deliberately dropped
// issue-date/credential-code fields rather than invent them (see prior
// note, kept in project memory). `logo` points at the real issuer marks
// the user provided (`public/images/sobre/logos/`); every card is now a
// clickable link to its real verification URL.
const certifications = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/specialization/Y2WKA6Q7A19U",
    logo: "google",
  },
  {
    title: "Design a User Experience for Social Good & Prepare for Jobs",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/IBJJNGCDBRSR",
    logo: "google",
  },
  {
    title: "Build Dynamic User Interfaces (UI) for Websites",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/DPWEC33B85JH",
    logo: "google",
  },
  {
    title: "Create High-Fidelity Designs and Prototypes in Figma",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/HZW8WR203NHO",
    logo: "google",
  },
  {
    title: "Claude para Designers",
    issuer: "Tera",
    url: "https://credentials.somostera.com/d2a2aaf94c6cd04c9afdf55dcdadbebb",
    logo: "tera",
  },
  {
    title: "Conduct UX Research and Test Early Concepts",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/ILK6P2UV4GLU?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    logo: "google",
  },
  {
    title: "Build Wireframes and Low-Fidelity Prototype",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/UMN275LDU6GZ",
    logo: "google",
  },
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/BM65601UQ0NF",
    logo: "google",
  },
  {
    title: "Start the UX Design Process: Empathize, Define, and Ideate",
    issuer: "Google",
    url: "https://www.coursera.org/account/accomplishments/verify/LWRYK5Q53102",
    logo: "google",
  },
] as const;

const certificationLogos = {
  google: "/images/sobre/logos/google.png",
  tera: "/images/sobre/logos/tera.png",
} as const;

/** Standard LinkedIn "in" brand glyph — see the file-level comment on why this is inlined instead of a lucide import or a downloaded Figma asset. */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function SobrePage() {
  return (
    <main className="w-full">
      {/* Hero — node 133:17. Full-bleed `surface-primary` band at the top
          of the page (2026-08-26, corrected per direct user feedback —
          first pass wrapped this in a rounded/bordered card matching
          Home's Hero, but the user explicitly does NOT want a card here:
          full page width, sitting at the top. Closer to Figma's own
          structure, actually — the "Hero" frame there is a full-bleed
          section fill too, not an inset card). The section itself carries
          `bg-surface-primary` edge-to-edge; the text column is centered
          inside it via `mx-auto max-w-[1312px]`, same content-width cap
          every other section on this page uses. No border/rounding on the
          section — that visual language stays reserved for actual cards
          (PillarCard, the contact cards).

          PHOTO, changed 2026-08-26 (explicit user request, two reference
          screenshots pasted in chat): reverted the `rounded-[32px]` card
          treatment described in the file-level "HERO PHOTO" comment above
          — user wants the photo back to Figma's real edge-to-edge bleed,
          not inside a card (see the "UPDATE" note added to that comment).
          On `lg+` the photo is `absolute inset-y-0 right-0` relative to
          the *section*, not the `max-w-[1312px]` row — it fills the
          section's full rendered height flush to the true right edge, no
          rounding, no inset margin. Text keeps its `max-w-[640px]`
          reading measure but is also capped at `lg:max-w-[48%]` of the
          row so it can never collide with the photo, checked down to the
          `lg` breakpoint's own minimum width (1024px — still a
          comfortable gap). `lg:w-[40%]` / `lg:max-w-[48%]` are inferred,
          undocumented values — no Figma responsive frame exists for this
          bleed layout, same "flag, don't invent a token" rule as the rest
          of this page — chosen so the two columns never overlap while
          still reading as a true bleed on wide screens. Mobile gets the
          same "no card" treatment for consistency (not explicitly
          requested for mobile, but the alternative — padded on mobile,
          bled on desktop — would be a stranger inconsistency): full-bleed
          edge-to-edge below the text, `mt-10` standing in for the row's
          old `gap-10` now that the photo isn't a flex sibling anymore. */}
      <section className="relative w-full overflow-hidden bg-surface-primary">
        <div className="relative z-10 mx-auto flex w-full max-w-[1312px] flex-col px-6 pb-16 pt-28 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-40">
          <div className="flex w-full max-w-[640px] flex-col items-start gap-8 lg:max-w-[48%]">
            <div className="flex flex-col items-start gap-4">
              <p className="caption text-brand-500">SOBRE MIM</p>
              <h1 className="heading-display text-text-primary">
                Criando sistemas que ajudam equipes e produtos a escalar
              </h1>
              <p className="heading-h4 text-text-secondary">
                Product Designer especializado em{" "}
                <span className="text-brand-500">Design Systems</span>,{" "}
                <span className="text-brand-500">Design Ops</span> e{" "}
                <span className="text-brand-500">IA aplicada</span> ao fluxo
                de trabalho de ponta a ponta.
              </p>
            </div>

            <div className="flex w-full items-start gap-6 sm:gap-10">
              <div className="flex flex-col gap-1">
                <p className="heading-h2 text-brand-500">+2 Anos</p>
                <p className="body-sm text-text-secondary">
                  De experiência focada em produto
                </p>
              </div>
              <div className="h-[60px] w-px shrink-0 bg-border-background" />
              <div className="flex flex-col gap-1">
                <p className="heading-h2 text-text-primary">
                  LATAM &amp; Asia
                </p>
                <p className="body-sm text-text-secondary">
                  Foco em produtos globais
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo — edge-to-edge bleed, no card. See comment above. */}
        <div className="relative mt-10 aspect-[4/5] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[40%]">
          <Image
            src="/images/sobre/portrait.jpg"
            alt="Foto de João Riedo"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Perspective — node 133:36. Content wrapped in the same
          `mx-auto max-w-[1312px]` cap every other section on this page
          uses — this section was the one exception (padding applied
          directly on the `<section>`, no inner cap), which is why "Minha
          Filosofia de Trabalho" sat flush against the true edge on wide
          screens while Diferenciais' cards right below it stayed
          centered/inset. Bug spotted by the user via screenshot,
          2026-08-26 — fixed by matching the Trajetória/Formação idiom
          (outer padding on the section, `mx-auto max-w-[1312px]` on an
          inner wrapper). */}
      <section className="flex w-full flex-col px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col items-start gap-4 lg:w-[400px] lg:shrink-0">
            <Badge accent>Abordagem</Badge>
            <h2 className="heading-h2 text-text-primary">
              Minha Filosofia de Trabalho
            </h2>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <p className="body-lg text-text-primary">
              Acredito que o design vai muito além da estética. Meu foco
              principal é construir sistemas inteligentes que permitam que
              times de produto criem e escalem com eficiência técnica máxima.
            </p>
            <p className="body-base text-text-secondary">
              Atualmente, me especializo em Design Operations, utilizando
              inteligência artificial de alta complexidade (como Claude e
              workflows de automação) para eliminar o trabalho operacional
              repetitivo. Minha missão é traduzir dias de documentação,
              tokenização de cores e preparação de handoff em tarefas
              concluídas de forma consistente e precisa em apenas algumas
              horas.
            </p>
            <p className="body-base text-text-secondary">
              Ao unir uma mentalidade focada em métricas de produto com a
              solidez de um design system robusto, garanto que o time de
              engenharia receba especificações perfeitas e que o usuário
              final desfrute de uma experiência integrada e limpa.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais — node 133:46, reuses PillarCard (see file-level comment). */}
      <section
        id="diferenciais"
        className="flex w-full flex-col items-center justify-center gap-8 p-6 sm:p-10 lg:p-16"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="caption text-brand-500">DIFERENCIAIS</p>
          <h2 className="heading-h2 text-text-primary">
            O que eu trago para a mesa
          </h2>
        </div>

        <div className="mx-auto flex w-full max-w-[1312px] flex-wrap items-stretch justify-center gap-x-4 gap-y-4">
          {differentiators.map((pillar, i) => (
            <Reveal
              key={pillar.number}
              className="flex-1 basis-[260px]"
              delay={i * 130}
            >
              <PillarCard
                number={pillar.number}
                title={pillar.title}
                description={pillar.description}
                variant="home"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trajetória — node 133:75 */}
      <section
        id="trajetoria"
        className="flex w-full flex-col items-center gap-8 p-6 sm:p-10 lg:p-16"
      >
        <div className="flex flex-col items-center text-center">
          <p className="caption text-brand-500">TRAJETÓRIA</p>
          <h2 className="heading-h2 text-text-primary">
            Experiência Profissional
          </h2>
        </div>

        <div className="flex w-full max-w-[1000px] flex-col gap-8">
          {experience.map((role, i) => (
            <Reveal key={role.company + role.period} delay={i * 90}>
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-10">
                <div className="w-full shrink-0 sm:w-[200px]">
                  <p className="label-button text-brand-500">{role.period}</p>
                </div>
                {/* Decorative timeline column — desktop-only, see file-level "RESPONSIVENESS" note. */}
                <div className="hidden shrink-0 flex-col items-center sm:flex sm:w-6">
                  <span className="size-4 shrink-0 rounded-full bg-on-surface-primary" />
                  {i < experience.length - 1 && (
                    <span className="w-px flex-1 bg-border-background" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 pb-2">
                  <p className="heading-h3 text-text-primary">{role.role}</p>
                  <p className="body-lg text-brand-500">{role.company}</p>
                  <p className="body-base text-text-secondary">
                    {role.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Formação — rebuilt 2026-08-26 from Figma node 140:52 (an updated
          version of the original 133:120), per direct user request.
          Two changes from the original build:
          1. Full-bleed `surface-primary` band, same treatment as the Hero
             correction above (full page width, no card/border/rounding),
             per explicit instruction on this pass too — content centered
             via `mx-auto max-w-[1312px]`.
          2. Certificações moved OUT of the two-column grid into its own
             full-width block below it, matching 140:52's actual layout
             (the credential-card style there needs the full row width for
             icon + title/issuer, not half a column) — Educação/Top Skills
             stay as the two-column grid.
          Skill tags kept `bg-surface-primary`/`border-surface-primary`
          even though the whole section now already sits on
          `surface-primary` — same "surface nested one level up" pattern
          `ProjectCard`'s inner image placeholder uses (contrast via a
          different token, not a repeat of the section's own fill); would
          need re-checking if this ever gets a second nesting level. */}
      <section
        id="formacao"
        className="flex w-full flex-col items-center gap-10 bg-surface-primary px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-start gap-3">
              <Badge accent>Formação</Badge>
              <h3 className="heading-h3 text-text-primary">
                Educação &amp; Base Técnica
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.title} className="flex flex-col gap-2">
                  <p className="label-button text-brand-500">{edu.period}</p>
                  <p className="heading-h4 text-text-primary">{edu.title}</p>
                  <p className="body-base text-text-secondary">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h4 className="heading-h4 text-text-primary">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="body-sm rounded-full border border-border-surface-primary bg-surface-primary px-3.5 py-2 text-on-surface-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-6">
          <h4 className="heading-h4 text-text-primary">Certificações</h4>
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl transition-opacity hover:opacity-80"
              >
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-secondary">
                  <Image
                    src={certificationLogos[cert.logo]}
                    alt={cert.issuer}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
                  <p className="body-base font-semibold text-text-primary">
                    {cert.title}
                  </p>
                  <p className="body-sm text-text-secondary">{cert.issuer}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contato direto — trimmed from Figma node 133:173, see file-level "FOOTER CTA" note.
          `pt-4` originally left this hugging the Formação section right above it — bumped to the
          same symmetric `py-16`/`lg:py-20` every other section on this page uses, per user
          feedback that the gap here read as too tight (2026-08-26). */}
      <section
        id="contato-direto"
        className="flex w-full flex-col items-center gap-8 px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <p className="caption text-brand-500">CONTATO DIRETO</p>

        <div className="flex w-full max-w-[1000px] flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
          {[
            {
              key: "email",
              href: "mailto:joaoriedodesign@gmail.com",
              label: "E-MAIL",
              value: "joaoriedodesign@gmail.com",
              Icon: Mail,
              external: false,
            },
            {
              key: "phone",
              href: "tel:+554331910157",
              label: "TELEFONE",
              value: "+55 43 3191-0157",
              Icon: Smartphone,
              external: false,
            },
            {
              key: "linkedin",
              href: "https://linkedin.com/in/ri3do",
              label: "LINKEDIN",
              value: "in/ri3do",
              Icon: LinkedInIcon,
              external: true,
            },
          ].map(({ key, href, label, value, Icon, external }, i) => (
            <Reveal key={key} className="flex-1 sm:max-w-[280px]" delay={i * 90}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full w-full flex-col items-center gap-2 rounded-3xl border border-border-surface-primary bg-surface-primary p-6 text-center transition-colors hover:border-border-surface-secondary"
              >
                <Icon className="size-6 text-brand-500" />
                <p className="body-sm text-on-surface-secondary">{label}</p>
                <p className="body-lg break-words text-on-surface-primary">
                  {value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
