export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface ImageBlock {
  caption: string;
  image?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** True for case studies under NDA — content stays as the bracketed placeholders from the Figma template until divulgation is approved. */
  nda: boolean;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  cardDescription: string;
  year: string;
  coverImage?: string;
  metadata: {
    papel: string;
    duracao: string;
    plataforma: string;
    squad: string;
  };
  contexto: {
    paragraph: string;
  };
  pillars: Pillar[];
  imageBlocks: ImageBlock[];
  stats: Stat[];
  nextProjectSlug?: string;
}

// Placeholder content. The multi-tenant design system case mirrors the
// Figma template's own bracket placeholders 1:1 — that template exists
// specifically because content is pending NDA/divulgation approval, so
// showing "[Título do projeto]" etc. here is intentional, not a stub I forgot
// to fill in. Swap the bracketed strings for real copy once cleared.
export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-tenant-design-system",
    nda: true,
    category: "[CATEGORIA DO PROJETO]",
    title: "[Título do projeto]",
    subtitle: "[Subtítulo — o que é, em uma linha]",
    summary:
      "[Parágrafo de 2–3 linhas sobre o problema e a solução. Este é um placeholder — o conteúdo real será preenchido após confirmação de divulgação.]",
    cardDescription:
      "Design system multi-tenant com governança de tema e migração de um sistema legado.",
    year: "2026",
    metadata: {
      papel: "[•]",
      duracao: "[•]",
      plataforma: "[•]",
      squad: "[•]",
    },
    contexto: {
      paragraph:
        "[Por que um design system multi-tenant era necessário — duas marcas, um único sistema, o que estava travando antes]",
    },
    pillars: [
      {
        number: "01",
        title: "Auditoria & levantamento",
        description: "[completar após validar o que pode ser mostrado]",
      },
      {
        number: "02",
        title: "Arquitetura de tokens multi-marca",
        description: "[completar após validar o que pode ser mostrado]",
      },
      {
        number: "03",
        title: "Componentização & documentação",
        description: "[completar após validar o que pode ser mostrado]",
      },
      {
        number: "04",
        title: "Governança & rollout",
        description: "[completar após validar o que pode ser mostrado]",
      },
    ],
    imageBlocks: [
      { caption: "[Print da biblioteca de componentes]" },
      { caption: "[Exemplo de tema aplicado às duas marcas]" },
    ],
    stats: [
      { value: "[XX]", label: "[nome da métrica]" },
      { value: "[XX]", label: "[nome da métrica]" },
      { value: "[XX]", label: "[nome da métrica]" },
      { value: "[XX]", label: "[nome da métrica]" },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
