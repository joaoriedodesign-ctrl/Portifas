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
    nextProjectSlug: "zentupet",
  },
  {
    slug: "zentupet",
    nda: false,
    category: "SaaS de Gestão",
    title: "Zentupet",
    subtitle:
      "SaaS de gestão desenhado do zero para creches e hotéis pet, do check-in ao check-out",
    summary:
      "Zentupet é um SaaS de gestão desenhado do zero para creches e hotéis pet, cobrindo toda a jornada do animal no estabelecimento — do check-in ao check-out — incluindo controle de atividades, remédios, banho, tosa e medicações. Projeto autoral: pesquisa de mercado, as 14 telas do produto, componentes e design system, tudo estruturado sem cliente ou equipe na etapa de design.",
    cardDescription:
      "SaaS de gestão para creches e hotéis pet — do check-in ao check-out, com portal em tempo real para o tutor.",
    year: "2026",
    metadata: {
      papel: "Pesquisa de mercado, UX/UI e Design System",
      duracao: "1 a 3 meses",
      plataforma: "Web",
      squad: "Eu (projeto autoral — sem cliente ou equipe na etapa de design)",
    },
    contexto: {
      paragraph:
        "Zentupet atende dois perfis de usuário com necessidades distintas: a operação do estabelecimento (staff) e o tutor do animal (cliente final). O projeto nasceu da observação de que grande parte das creches de cachorro não possuía sistema de gestão próprio — a operação era feita no papel ou em planilhas desorganizadas, sem controle estruturado de atividades nem visibilidade para o tutor sobre o que acontecia com o pet durante a estadia.",
    },
    pillars: [
      {
        number: "01",
        title: "Agendamento sem fricção",
        description:
          "Controle de reservas e estadias no estabelecimento — a base operacional que sustenta toda a jornada do pet, do check-in ao check-out.",
      },
      {
        number: "02",
        title: "\"Janelinha\" do tutor",
        description:
          "Portal onde o tutor acompanha em tempo real cada atualização do pet durante a estadia — banho realizado, remédio administrado, atividade concluída. Funciona como um prontuário vivo do animal, visível para quem mais se importa com essa informação.",
      },
      {
        number: "03",
        title: "Contato direto com os tutores",
        description:
          "Canal de comunicação integrado ao fluxo operacional do staff, para que a conversa com o tutor aconteça sem sair do sistema que já registra a rotina do pet.",
      },
      {
        number: "04",
        title: "Lei de Jakob no calendário",
        description:
          "A tentativa inicial foi desenhar o componente de agenda do zero, mas o padrão mental já consolidado nos usuários tornava isso arriscado — pessoas já têm um modelo formado de como um calendário deve se comportar, a partir de ferramentas como Apple Calendar e Google Calendar. Usei essas referências como base do padrão de interação, em vez de forçar uma reinvenção que exigiria reaprendizado sem ganho real.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Painel operacional do staff — agendamento, atividades e controle de banho, tosa e medicação do pet",
      },
      {
        caption:
          "\"Janelinha\" do tutor — acompanhamento em tempo real de cada atualização do pet durante a estadia",
      },
    ],
    stats: [
      { value: "14", label: "telas desenhadas" },
      { value: "2", label: "perfis de usuário atendidos (staff e tutor)" },
      { value: "1", label: "design system estruturado do zero" },
    ],
    nextProjectSlug: "aurum-bet-torneios",
  },
  // Real content added 2026-08-26. Company name "Aurum Bet" is explicitly
  // fictional per the user's own source draft (nda: false -- this is not
  // the Figma-template placeholder state, just an anonymized employer
  // name, disclosed as such in subtitle/summary). Assumed (not
  // user-confirmed) fields, same "flag, don't invent" treatment as the
  // zentupet entry's assumed fields above: metadata.duracao
  // ("3 a 6 meses"), metadata.plataforma ("Web"), and year ("2026").
  // coverImage and imageBlocks[].image are still empty -- no screenshots
  // supplied yet.
  {
    slug: "aurum-bet-torneios",
    nda: false,
    category: "Sistema de Torneios",
    title: "Aurum Bet",
    subtitle:
      "Sistema de torneios desenhado do zero para uma plataforma de apostas (nome fictício), com cobertura completa de estados e a origem do processo de handoff estruturado no Notion",
    summary:
      "Estruturação do zero do sistema de torneios de uma plataforma de apostas (nome fictício: Aurum Bet) -- 33 telas cobrindo lobby, detalhes, participação e todos os estados de status, suportadas por 7 componentes reutilizáveis e 3 modais. Também foi o projeto onde o processo de handoff estruturado no Notion foi implementado pela primeira vez, documentando telas e componentes para o time de dev.",
    cardDescription:
      "Sistema de torneios estruturado do zero, com cobertura completa de estados -- e o primeiro handoff estruturado no Notion do time.",
    year: "2026",
    metadata: {
      papel: "Pesquisa de referência, UX/UI e handoff para dev",
      duracao: "3 a 6 meses",
      plataforma: "Web",
      squad: "Eu (pesquisa, UX/UI e handoff) + time de dev (implementação)",
    },
    contexto: {
      paragraph:
        "Torneios era uma feature já prevista no roadmap de produto da Aurum Bet -- não houve redirecionamento de escopo nem reinterpretação de briefing. O trabalho começou direto na estruturação completa da funcionalidade: pesquisa de referência com concorrentes diretos, desenho de todas as telas e estados, definição dos componentes reutilizáveis e apresentação do handoff diretamente ao time de dev.",
    },
    pillars: [
      {
        number: "01",
        title: "Benchmark competitivo",
        description:
          "Mapeamento do fluxo de participação, pontuação e premiação de concorrentes diretos antes do desenho das telas -- processo real de pesquisa, ainda que não documentado como artefato à parte.",
      },
      {
        number: "02",
        title: "Cobertura sistemática de estados",
        description:
          "33 telas cobrindo o fluxo completo -- lobby dos torneios, detalhes do torneio, participação, loading e fallback -- com cobertura de todos os status (não iniciado, em andamento, encerrado) em vez de desenhar só o caminho feliz.",
      },
      {
        number: "03",
        title: "Componentes e modais reutilizáveis",
        description:
          "7 componentes reutilizáveis (sem contar variações) e 3 modais sustentando o fluxo inteiro, pensados para reuso entre lobby, detalhes e participação em vez de soluções pontuais por tela.",
      },
      {
        number: "04",
        title: "Handoff estruturado -- a origem do processo",
        description:
          "Primeiro projeto com handoff documentado de forma estruturada no Notion: todas as telas e componentes, criados e reutilizados, com explicação de como cada ponto da funcionalidade deveria se comportar -- apresentado diretamente ao time de dev.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Lobby de torneios com cobertura completa dos estados -- não iniciado, em andamento e encerrado",
      },
      {
        caption:
          "Handoff estruturado no Notion -- telas e componentes documentados para o time de dev",
      },
    ],
    stats: [
      { value: "33", label: "telas cobrindo lobby, detalhes, participação e status" },
      { value: "7", label: "componentes reutilizáveis" },
      { value: "3", label: "modais no fluxo de torneios" },
      { value: "~50%", label: "menos dúvidas de dev após o handoff estruturado (percepção do time)" },
    ],
    nextProjectSlug: "multi-tenant-design-system",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
