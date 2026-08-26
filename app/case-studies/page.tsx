import { caseStudies } from "@/lib/case-studies";
import { ProjectCard } from "@/components/ui/ProjectCard";

/**
 * v2 palette: heading uses `text-text-primary` (unchanged name/meaning —
 * this text sits directly on the page background, not a surface).
 * Responsiveness: the huge fixed `pt-40` (clearance for the floating
 * header) now scales down on mobile instead of eating most of a 375px
 * viewport's vertical space before any content shows.
 */
export default function CaseStudiesIndex() {
  return (
    <main className="mx-auto max-w-[1312px] px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:pt-40">
      <h1 className="heading-h1 text-text-primary">Projetos</h1>

      <div className="mt-10 flex flex-col gap-4">
        {caseStudies.map((cs) => (
          <ProjectCard
            key={cs.slug}
            slug={cs.slug}
            category={cs.category}
            year={cs.year}
            title={cs.title}
            description={cs.cardDescription}
            image={cs.coverImage}
          />
        ))}
      </div>
    </main>
  );
}
