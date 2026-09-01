import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlugEn, publishedCaseStudiesEn } from "@/lib/case-studies.en";
import { PillarCard } from "@/components/ui/PillarCard";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ThemeCarousel } from "@/components/ui/ThemeCarousel";
import { StatCard } from "@/components/ui/StatCard";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return publishedCaseStudiesEn.map((cs) => ({ slug: cs.slug }));
}

/**
 * English mirror of app/case-studies/[slug]/page.tsx — same layout,
 * responsiveness and image-ratio decisions (see that file's own doc
 * comment for the full history), sourced from `lib/case-studies.en.ts`
 * instead of `lib/case-studies.ts`. Section eyebrows/headings and the
 * metadata-row labels are translated statically here (they're page
 * furniture, not per-case-study data); every field pulled from `cs.*` is
 * already English because it comes from the English data file.
 * `ImageCarousel`/`ThemeCarousel` get `lang="en"` for their aria-labels.
 */
export default function CaseStudyPageEn({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudyBySlugEn(params.slug);

  if (!cs) {
    notFound();
  }

  return (
    <main className="w-full">
      {/* Header/breadcrumb — see app/case-studies/[slug]/page.tsx for the
          mobile-padding rationale (`pt-24`/`sm:pt-8`, clears the floating
          header's own footprint). */}
      <div className="flex w-full items-center justify-between px-6 pb-6 pt-24 sm:px-16 sm:pb-8 sm:pt-8">
        <Link href="/en/case-studies" className="label-button text-text-secondary">
          ← Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="flex w-full flex-col items-start gap-6 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">{cs.category}</p>
        <p className="heading-h1 min-w-full text-text-primary">{cs.title}</p>
        <p className="heading-h3 min-w-full text-text-secondary">{cs.subtitle}</p>
        <p className="body-lg max-w-[800px] text-text-secondary">{cs.summary}</p>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">ROLE</p>
            <p className="body-sm text-text-primary">{cs.metadata.papel}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">DURATION</p>
            <p className="body-sm text-text-primary">{cs.metadata.duracao}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">PLATFORM</p>
            <p className="body-sm text-text-primary">{cs.metadata.plataforma}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="caption uppercase text-text-secondary">SQUAD</p>
            <p className="body-sm text-text-primary">{cs.metadata.squad}</p>
          </div>
        </div>

        <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-[32px] bg-surface-primary sm:aspect-[21/9] sm:max-h-[400px]">
          {cs.coverImage ? (
            <img src={cs.coverImage} alt="" className="size-full object-cover" />
          ) : (
            <p className="body-sm text-on-surface-secondary">[Project cover image]</p>
          )}
        </div>
      </section>

      {/* Context & Challenge */}
      <section className="flex w-full flex-col items-start gap-4 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">CONTEXT</p>
        <p className="heading-h2 min-w-full text-text-primary">The challenge</p>
        <p className="body-lg max-w-[900px] text-text-secondary">
          {cs.contexto.paragraph}
        </p>
      </section>

      {/* Approach */}
      <section className="flex w-full flex-col items-center gap-8 p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col items-center text-center">
          <p className="caption uppercase text-brand-500">APPROACH</p>
          <p className="heading-h2 text-text-primary">How I got there</p>
        </div>
        <div className="flex w-full flex-wrap items-stretch gap-4">
          {cs.pillars.map((pillar) => (
            <div key={pillar.number} className="flex-1 basis-[260px]">
              <PillarCard variant="case-study" {...pillar} />
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="flex w-full flex-col items-start gap-8 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">SOLUTION</p>
        <p className="heading-h2 min-w-full text-text-primary">The system in use</p>

        {cs.imageBlocks.map((block, i) => (
          <div key={i} className="flex w-full flex-col items-start gap-3">
            {block.variant === "theme-peek" ? (
              <ThemeCarousel
                images={block.images ?? []}
                labels={block.labels}
                alt={block.caption}
                lang="en"
              />
            ) : (
              <ImageCarousel images={block.images ?? []} alt={block.caption} lang="en" />
            )}
            <p className="body-sm w-full text-center text-text-secondary">{block.caption}</p>
          </div>
        ))}
      </section>

      {/* Results */}
      <section className="flex w-full flex-col items-start gap-6 p-6 sm:p-10 lg:p-16">
        <p className="caption uppercase text-brand-500">IMPACT</p>
        <p className="heading-h2 min-w-full text-text-primary">Results</p>
        <p className="body-sm text-text-secondary">
          (metrics subject to disclosure approval)
        </p>
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {cs.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="flex w-full flex-col items-center gap-4 p-6 text-center sm:p-10 lg:p-16">
        <p className="caption uppercase text-text-secondary">other projects</p>
        {cs.nextProjectSlug ? (
          <Link
            href={`/en/case-studies/${cs.nextProjectSlug}`}
            className="heading-h3 text-text-primary"
          >
            {getCaseStudyBySlugEn(cs.nextProjectSlug)?.title} →
          </Link>
        ) : (
          <Link href="/en/case-studies" className="heading-h3 text-text-primary">
            View all projects →
          </Link>
        )}
      </section>

      {/* Contact — see app/case-studies/[slug]/page.tsx's own comment;
          same ContactSection reused here as on Home and /en/contato. */}
      <ContactSection lang="en" />
    </main>
  );
}
