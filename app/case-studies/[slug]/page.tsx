import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies } from "@/lib/case-studies";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="flex flex-wrap gap-2">
        {caseStudy.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <h1 className="heading-h1 mt-4">{caseStudy.title}</h1>
      <p className="body-lg mt-4 text-text-secondary">{caseStudy.summary}</p>

      {caseStudy.nda && (
        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <p className="body-base">
            A narrativa completa (decisões arquiteturais, modelo de
            governança, migração do legado) está sob NDA e é apresentada em
            chamada — entre em contato para agendar.
          </p>
        </div>
      )}

      {/* TODO: full case study body once content is written — problema,
          papel, decisões, resultados mensuráveis. */}
    </main>
  );
}
