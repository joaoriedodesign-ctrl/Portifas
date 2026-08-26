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

// Real content, cleared for divulgation 2026-08-26 (nda -> false).
// Confirmed directly with the user before filling this in — see the 3
// pendências the source case-study draft itself flagged as blocking:
//  1. Attribution: the DS was architected and built from scratch at
//     Multibet (not brought over from Ana Gaming) — safe to name Multibet.
//  2. Figma → Storybook bridge: manual/custom-script sync, no Tokens
//     Studio or Style Dictionary in the pipeline — do not claim otherwise.
//  3. Governance process (how a component gets reviewed/versioned) is
//     genuinely not formalized yet — the "Governança compartilhada" pillar
//     below describes who's involved, deliberately not a review/versioning
//     process that doesn't exist. Don't upgrade this to "peer review" or
//     "approval flow" language later without checking with the user again.
// Bonus metric (3 tenants) and platform (Web multi-tenant) were also
// user-confirmed, not inferred — the source draft didn't mention either.
// coverImage and imageBlocks[].image are still empty; add real screenshots
// when available.
export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-tenant-design-system",
    nda: false,
    category: "Design System",
    title: "Design System Multi-tenant",
    subtitle:
      "De arquivos Figma defasados a uma base de tokens única para múltiplos tenants",
    summary:
      "Antes deste sistema, cada tela nova nascia garimpando componentes em arquivos Figma específicos que ficavam defasados quase na hora — sem fonte única, cada designer trabalhava com uma versão diferente da interface. Estruturei a arquitetura de tokens (primitivas → semânticas) e uma camada de automação de tema por tenant, hoje sustentando 87 telas e mais de 200 componentes consumidos direto no Storybook.",
    cardDescription:
      "Design system multi-tenant com automação de tema por tenant e uma base de tokens única consumida via Storybook.",
    year: "2026",
    metadata: {
      papel: "Arquitetura de Design System",
      duracao: "Em andamento desde janeiro",
      plataforma: "Web (multi-tenant)",
      squad: "Eu (arquitetura) + líder (refinamento) + colega (aplicação)",
    },
    contexto: {
      paragraph:
        "Antes do design system existir, não havia reuso real de componentes entre tenants: cada tela nova exigia entrar em arquivos específicos e garimpar o componente de onde ele tivesse sido usado da última vez — e esses arquivos ficavam defasados quase imediatamente. Na prática, nunca existia uma fonte única e atualizada: cada designer trabalhava com uma versão ligeiramente diferente da interface, o que gerava inconsistência visual e retrabalho constante entre design e desenvolvimento.",
    },
    pillars: [
      {
        number: "01",
        title: "Arquitetura de tokens",
        description:
          "Base estruturada em Figma variables com aliasing primitiva → semântica — a mesma disciplina de tokens usada hoje neste portfólio. Do lado do código, os tokens migram para o Storybook por sincronização própria (script/processo manual, sem Tokens Studio ou Style Dictionary na ponte).",
      },
      {
        number: "02",
        title: "Automação de tema por tenant",
        description:
          "Em vez de customização manual, cor por cor, tela por tela, criei uma camada de automação sobre a base semântica que gera o tema de cada tenant automaticamente — hoje atende 3 tenants, eliminando a troca manual de cor e acelerando a entrada de novos tenants no sistema.",
      },
      {
        number: "03",
        title: "Dívida técnica em paralelo",
        description:
          "Corrigi componentes cadastrados sem cobertura responsiva completa e migrei componentes antigos para o padrão novo — dois problemas de dívida técnica resolvidos junto com a evolução da base, não depois dela.",
      },
      {
        number: "04",
        title: "Governança compartilhada",
        description:
          "A evolução da base ficou dividida entre arquitetura (eu), refinamento (liderança) e aplicação rigorosa no dia a dia (um colega de time) — o que ajudou a manter consistência mesmo com mais de uma pessoa mexendo no sistema. Um processo formal de review/versionamento ainda está amadurecendo.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Biblioteca de componentes documentada no Storybook, consumindo os tokens do design system",
      },
      {
        caption:
          "Mesmo componente com o tema aplicado automaticamente para tenants diferentes",
      },
    ],
    stats: [
      { value: "87", label: "telas sustentadas pelo design system" },
      { value: "200+", label: "componentes reutilizados entre tenants" },
      { value: "3", label: "tenants atendidos pela automação de tema" },
      { value: "1/5", label: "do tempo para criar uma tela nova" },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
