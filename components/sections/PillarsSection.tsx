import { PillarCard } from "@/components/ui/PillarCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Pillars" section — node 31:1809 ("Frame13") in the PORTIFÓLIO Figma file,
 * home page. Eyebrow + H2 header, then a 4-up row of PillarCard
 * (variant="home", matching node 31:1814 — see the comment on that
 * component for the "home" vs "case-study" variant mapping).
 *
 * v2 palette: `text-brand-primary` → `text-brand-500` (single accent now,
 * same "destaque pontual" use as before).
 *
 * Responsiveness (docs/diretrizes-responsividade.md): the fixed `p-16`
 * section padding is now mobile-first (`p-6` → `p-10` at `sm` → `p-16` at
 * `lg`). Also removed `whitespace-nowrap` from the H2 — "Como eu construo
 * produtos digitais" is long enough that forcing it onto one line was a
 * real horizontal-overflow risk at narrow widths (the project's hard "no
 * forced horizontal scroll" rule), not just a style call.
 */

const pillars = [
  {
    number: "01",
    title: "Design Systems & Ops",
    description:
      "Bibliotecas escaláveis com foco em handoff para desenvolvimento, multi-tennant e tokenização avançada.",
  },
  {
    number: "02",
    title: "Produto ponta a ponta",
    description:
      "De discovery e estratégia de UX a UI de alta fidelidade e prototipação interativa, para plataformas B2B e B2C complexas.",
  },
  {
    number: "03",
    title: "IA aplicada ao workflow",
    description:
      "Uso ferramentas como o Claude para automatizar processos de alta complexidade, transformando dias de trabalho manual em horas.",
  },
  {
    number: "04",
    title: "Mentalidade global de produto",
    description:
      "Interfaces pensadas para mercados como LATAM e Ásia, com alinhamento cultural e técnico.",
  },
] as const;

export function PillarsSection() {
  return (
    <section
      id="como-eu-construo"
      className="flex w-full flex-col items-center justify-center gap-8 p-6 sm:p-10 lg:p-16"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <p className="caption text-brand-500">DIRETRIZES TÉCNICAS</p>
        <h2 className="heading-h2 text-text-primary">
          Como eu construo produtos digitais
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-[1312px] flex-wrap items-stretch justify-center gap-x-4 gap-y-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.number} className="flex-1 basis-[260px]" delay={i * 90}>
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
  );
}
