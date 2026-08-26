import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/lib/case-studies";

/**
 * "Projetos selecionados" section — node 31:1838 ("Frame 14") in the
 * PORTIFÓLIO Figma file, home page. Eyebrow + H2 + subtitle header
 * (same shape as PillarsSection's header: caption/brand-500 eyebrow,
 * heading-h2/text-primary title), then a vertical stack of `ProjectCard`
 * pulled from `lib/case-studies.ts` — the same data source
 * app/case-studies/page.tsx already renders. One source of truth for
 * project copy; nothing duplicated between the home teaser and the full
 * list.
 *
 * Figma's canvas repeats one placeholder card 4× ("Plataforma de
 * Gamificação") — that's Figma mock content, not a spec for "always show
 * exactly 4" or "always show everything". There are currently two real
 * entries in `caseStudies`, so this renders both (matches what the
 * case-studies index page does). FLAGGING for later: once there are more
 * than ~3-4 case studies, this section should probably filter to a
 * `featured` subset instead of dumping the whole list on the home page —
 * no such flag exists in the `CaseStudy` data model yet
 * (lib/case-studies.ts), so not inventing one now.
 *
 * v2 palette: eyebrow/heading/subtitle follow the same
 * caption+brand-500 / heading-h2+text-primary / body-lg+text-secondary
 * pattern used by every other section header in the project — no raw hex
 * or ad-hoc sizes.
 *
 * Responsiveness (docs/diretrizes-responsividade.md): mobile-first section
 * padding (p-6 → sm:p-10 → lg:p-16, matches PillarsSection exactly). The
 * subtitle gets `max-w-[720px]` so it doesn't stretch to unreadable line
 * lengths at wide viewports — no exact width was documented for this
 * copy block, so 720px reuses the max-w already established for body text
 * in Hero rather than inventing a new one. Card list is capped at the
 * project's standard `max-w-[1312px]` content width, same as
 * PillarsSection's grid and the case-studies index list. `heading-h2`
 * already steps down to `h3` size below `lg` automatically
 * (tokens-typography.css), so no manual breakpoint variant is needed here.
 */
export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="flex w-full flex-col items-center justify-center gap-8 p-6 sm:p-10 lg:p-16"
    >
      <div className="flex max-w-[720px] flex-col items-center justify-center text-center">
        <p className="caption text-brand-500">PORTFÓLIO & TRABALHOS</p>
        <h2 className="heading-h2 text-text-primary">Projetos selecionados</h2>
        <p className="body-lg text-text-secondary">
          Alguns dos projetos mais recentes de produto que mais gosto de ter
          feito — do discovery ao sistema que sustenta a interface.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-4">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} className="w-full" delay={i * 90}>
            <ProjectCard
              slug={cs.slug}
              category={cs.category}
              year={cs.year}
              title={cs.title}
              description={cs.cardDescription}
              image={cs.coverImage}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
