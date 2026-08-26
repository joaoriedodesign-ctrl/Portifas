import { caseStudies } from "@/lib/case-studies";
import { ProjectCard } from "@/components/ui/ProjectCard";

export default function CaseStudiesIndex() {
  return (
    <main className="mx-auto max-w-[1312px] px-6 pb-24 pt-40">
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
