import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies } from "@/lib/case-studies";
import { PillarCard } from "@/components/ui/PillarCard";
import { StatCard } from "@/components/ui/StatCard";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/**
 * v2 palette + responsiveness pass (docs/design-tokens.md,
 * docs/diretrizes-responsividade.md):
 *
 * - Every `text-brand-primary` eyebrow (CONTEXTO/ABORDAGEM/SOLUÇÃO/IMPACTO)
 *   and the stat values → `text-brand-500` (single accent, "destaque
 *   pontual"). Everything already named `text-primary`/`text-secondary`
 *   keeps that name (same meaning, new value) since it sits on the page
 *   background, not a card.
 * - Anything that sits *inside* a `surface` (the cover/solution image
 *   placeholders, the stat cards) moved to `on-surface-primary` /
 *   `on-surface-secondary` instead of `text-*`, per the doc's surface/
 *   on-surface pairing.
 * - All six `p-16` sections are now mobile-first (`p-6` → `p-10` at `sm`
 *   → `p-16` at `lg`); the breadcrumb row's fixed `h-[97px]` became
 *   padding-driven instead (a hard height clips content that wraps).
 * - The metadata row (papel/duração/plataforma/squad) and the stats row
 *   were `flex flex-wrap` with `min-w-[200px]` items — 4×200px doesn't fit
 *   a 375px viewport and each item's own min-width fights the wrap, so
 *   both are now a `grid grid-cols-2 → sm:grid-cols-4`.
 * - Cover image (`h-[480px]`) and solution images (`h-[520px]`) are now
 *   `aspect-[16/10]` instead of a fixed height, so they scale instead of
 *   clipping on narrow screens (no aspect ratio was documented for these
 *   blocks — 16/10 is a proposed placeholder, flagging it as such).
 * - Removed `whitespace-nowrap` from the "Como cheguei lá" heading group —
 *   consistent with the same fix in PillarsSection, and the project's hard
 *   "no forced horizontal scroll" rule.
 */
export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudyBySlug(params.slug);

  if (!cs) {
    notFound();
  }

  return (
    <main className="w-full">
      {/* Header Section — node 38:4. The global floating nav (Header
          component in layout.tsx) sits above this; this back-link is
          page-specific breadcrumb furniture, not a duplicate of the nav. */}
      <div className="flex w-full items-center justify-between px-6 py-6 sm:px-16 sm:py-8">
        <Link href="/case-studies" className="label-button text-text-secondary">
          ← Projetos
        </Link>
      </div>

      {/* Hero — node 38:17 */}
      <section className="flex w-full flex-col items-start gap-6 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">{cs.category}</p>
        <p className="heading-h1 min-w-full text-text-primary">{cs.title}</p>
        <p className="heading-h3 min-w-full text-text-secondary">{cs.subtitle}</p>
        <p className="body-lg max-w-[800px] text-text-secondary">{cs.summary}</p>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">PAPEL</p>
            <p className="body-sm text-text-primary">{cs.metadata.papel}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">DURAÇÃO</p>
            <p className="body-sm text-text-primary">{cs.metadata.duracao}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">PLATAFORMA</p>
            <p className="body-sm text-text-primary">{cs.metadata.plataforma}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">SQUAD</p>
            <p className="body-sm text-text-primary">{cs.metadata.squad}</p>
          </div>
        </div>

        <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[32px] bg-surface-primary">
          {cs.coverImage ? (
            <img src={cs.coverImage} alt="" className="size-full object-cover" />
          ) : (
            <p className="body-sm text-on-surface-secondary">[Imagem de capa do projeto]</p>
          )}
        </div>
      </section>

      {/* Contexto & Desafio — node 38:37 */}
      <section className="flex w-full flex-col items-start gap-4 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">CONTEXTO</p>
        <p className="heading-h2 min-w-full text-text-primary">O desafio</p>
        <p className="body-lg max-w-[900px] text-text-secondary">
          {cs.contexto.paragraph}
        </p>
      </section>

      {/* Abordagem — node 38:41 */}
      <section className="flex w-full flex-col items-center gap-8 p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col items-center text-center">
          <p className="caption uppercase text-brand-500">ABORDAGEM</p>
          <p className="heading-h2 text-text-primary">Como cheguei lá</p>
        </div>
        <div className="flex w-full flex-wrap items-stretch gap-4">
          {cs.pillars.map((pillar) => (
            <PillarCard key={pillar.number} variant="case-study" {...pillar} />
          ))}
        </div>
      </section>

      {/* Solução em Destaque — node 38:70 */}
      <section className="flex w-full flex-col items-start gap-8 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">SOLUÇÃO</p>
        <p className="heading-h2 min-w-full text-text-primary">O sistema em uso</p>

        {cs.imageBlocks.map((block, i) => (
          <div key={i} className="flex w-full flex-col items-start gap-3">
            <div className="aspect-[16/10] w-full rounded-[32px] bg-surface-primary">
              {block.image ? (
                <img src={block.image} alt="" className="size-full rounded-[32px] object-cover" />
              ) : null}
            </div>
            <p className="body-sm w-full text-center text-text-secondary">{block.caption}</p>
          </div>
        ))}
      </section>

      {/* Resultados — node 38:81 */}
      <section className="flex w-full flex-col items-start gap-6 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">IMPACTO</p>
        <p className="heading-h2 min-w-full text-text-primary">Resultados</p>
        <p className="body-sm text-text-secondary">
          (métricas sujeitas a aprovação de divulgação)
        </p>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {cs.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Próximo Projeto — node 38:98 */}
      <section className="flex w-full flex-col items-center gap-4 p-6 text-center sm:p-10 lg:p-16">
        <p className="caption uppercase text-text-secondary">outros projetos</p>
        {cs.nextProjectSlug ? (
          <Link
            href={`/case-studies/${cs.nextProjectSlug}`}
            className="heading-h3 text-text-primary"
          >
            {getCaseStudyBySlug(cs.nextProjectSlug)?.title} →
          </Link>
        ) : (
          <Link href="/case-studies" className="heading-h3 text-text-primary">
            Ver todos os projetos →
          </Link>
        )}
      </section>
    </main>
  );
}
