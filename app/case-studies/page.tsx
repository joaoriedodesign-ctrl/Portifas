import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import { Badge } from "@/components/ui/Badge";

export default function CaseStudiesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="heading-h1">Case studies</h1>

      <ul className="mt-10 flex flex-col gap-6">
        {caseStudies.map((cs) => (
          <li
            key={cs.slug}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <Link href={`/case-studies/${cs.slug}`} className="block">
              <h2 className="heading-h4">{cs.title}</h2>
              <p className="body-base mt-2 text-text-secondary">
                {cs.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                {cs.nda && <Badge>Detalhes sob NDA — disponível em call</Badge>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
