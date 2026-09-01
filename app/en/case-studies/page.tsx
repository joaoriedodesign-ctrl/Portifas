import { publishedCaseStudiesEn } from "@/lib/case-studies.en";
import { ProjectCard } from "@/components/ui/ProjectCard";

/**
 * English mirror of app/case-studies/page.tsx — same shell, sourced from
 * `publishedCaseStudiesEn` (lib/case-studies.en.ts) instead of the
 * Portuguese `publishedCaseStudies`, and every `<ProjectCard>` gets
 * `lang="en"` so its "VIEW PROJECT" label and link target
 * (`/en/case-studies/<slug>`) match this route tree.
 */
export default function CaseStudiesIndexEn() {
  return (
    <main className="mx-auto max-w-[1312px] px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:pt-40">
      <h1 className="heading-h1 text-center text-text-primary">Projects</h1>

      <div className="mt-10 flex flex-col gap-4">
        {publishedCaseStudiesEn.map((cs) => (
          <ProjectCard
            key={cs.slug}
            slug={cs.slug}
            category={cs.category}
            year={cs.year}
            title={cs.title}
            description={cs.cardDescription}
            image={cs.coverImage}
            lang="en"
          />
        ))}
      </div>
    </main>
  );
}
