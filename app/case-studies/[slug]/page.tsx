import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies } from "@/lib/case-studies";
import { PillarCard } from "@/components/ui/PillarCard";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

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
      <div className="flex h-[97px] w-full items-center justify-between px-16 pt-8">
        <Link href="/case-studies" className="label-button text-text-secondary">
          ← Projetos
        </Link>
      </div>

      {/* Hero — node 38:17 */}
      <section className="flex w-full flex-col items-start gap-6 p-16">
        <p className="caption uppercase text-brand-primary">{cs.category}</p>
        <p className="heading-h1 min-w-full text-text-primary">{cs.title}</p>
        <p className="heading-h3 min-w-full text-text-secondary">{cs.subtitle}</p>
        <p className="body-lg max-w-[800px] text-text-secondary">{cs.summary}</p>

        <div className="flex w-full flex-wrap gap-8">
          <div className="flex min-w-[200px] flex-1 flex-col gap-1">
            <p className="caption uppercase text-text-secondary">PAPEL</p>
            <p className="body-sm text-text-primary">{cs.metadata.papel}</p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-1">
            <p className="caption uppercase text-text-secondary">DURAÇÃO</p>
            <p className="body-sm text-text-primary">{cs.metadata.duracao}</p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-1">
            <p className="caption uppercase text-text-secondary">PLATAFORMA</p>
            <p className="body-sm text-text-primary">{cs.metadata.plataforma}</p>
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-1">
            <p className="caption uppercase text-text-secondary">SQUAD</p>
            <p className="body-sm text-text-primary">{cs.metadata.squad}</p>
          </div>
        </div>

        <div className="flex h-[480px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-surface">
          {cs.coverImage ? (
            <img src={cs.coverImage} alt="" className="size-full object-cover" />
          ) : (
            <p className="body-sm text-text-secondary">[Imagem de capa do projeto]</p>
          )}
        </div>
      </section>

      {/* Contexto & Desafio — node 38:37 */}
      <section className="flex w-full flex-col items-start gap-4 p-16">
        <p className="caption uppercase text-brand-primary">CONTEXTO</p>
        <p className="heading-h2 min-w-full text-text-primary">O desafio</p>
        <p className="body-lg max-w-[900px] text-text-secondary">
          {cs.contexto.paragraph}
        </p>
      </section>

      {/* Abordagem — node 38:41 */}
      <section className="flex w-full flex-col items-center gap-8 p-16">
        <div className="flex flex-col items-center whitespace-nowrap">
          <p className="caption uppercase text-brand-primary">ABORDAGEM</p>
          <p className="heading-h2 text-text-primary">Como cheguei lá</p>
        </div>
        <div className="flex w-full flex-wrap gap-4">
          {cs.pillars.map((pillar) => (
            <PillarCard key={pillar.number} variant="case-study" {...pillar} />
          ))}
        </div>
      </section>

      {/* Solução em Destaque — node 38:70 */}
      <section className="flex w-full flex-col items-start gap-8 p-16">
        <p className="caption uppercase text-brand-primary">SOLUÇÃO</p>
        <p className="heading-h2 min-w-full text-text-primary">O sistema em uso</p>

        {cs.imageBlocks.map((block, i) => (
          <div key={i} className="flex w-full flex-col items-start gap-3">
            <div className="h-[520px] w-full rounded-[32px] bg-surface">
              {block.image ? (
                <img src={block.image} alt="" className="size-full rounded-[32px] object-cover" />
              ) : null}
            </div>
            <p className="body-sm w-full text-center text-text-secondary">{block.caption}</p>
          </div>
        ))}
      </section>

      {/* Resultados — node 38:81 */}
      <section className="flex w-full flex-col items-start gap-6 p-16">
        <p className="caption uppercase text-brand-primary">IMPACTO</p>
        <p className="heading-h2 min-w-full text-text-primary">Resultados</p>
        <p className="body-sm text-text-secondary">
          (métricas sujeitas a aprovação de divulgação)
        </p>
        <div className="flex w-full flex-wrap gap-4">
          {cs.stats.map((stat, i) => (
            <div
              key={i}
              className="flex min-w-[200px] flex-1 flex-col items-center justify-center gap-2 rounded-[32px] border border-border bg-surface p-8"
            >
              <p className="heading-h1 text-brand-primary">{stat.value}</p>
              <p className="body-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Próximo Projeto — node 38:98 */}
      <section className="flex w-full flex-col items-center gap-4 p-16 text-center">
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
