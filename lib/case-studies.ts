export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface Screen {
  /** Section label rendered above its mobile/desktop pair, e.g. "Home", "Gamepage", "Welcome Bonus". */
  titulo: string;
  /** Exactly 2 paths: [mobile, desktop]. */
  images: [string, string];
}

export interface ImageBlock {
  caption: string;
  /** One image renders as a plain <img>; two or more render inside ImageCarousel (components/ui/ImageCarousel.tsx) — unless `variant` says otherwise. */
  images?: string[];
  /**
   * "carousel" (default, or omitted) renders via ImageCarousel — one full
   * uncropped image at a time, no peeking neighbors. "theme-peek" renders
   * via ThemeCarousel instead (components/ui/ThemeCarousel.tsx) — a
   * peek-style carousel purpose-built for "same component, different
   * tenant theme" blocks, where neighbor cards peeking in on both sides
   * is the point (sells the comparison at a glance), with chevron nav and
   * labeled pills instead of dots. "screen-map" renders via
   * ScreenMapBlock instead (components/ui/ScreenMapBlock.tsx) — stacked
   * "screen name + mobile/desktop pair" sections for showing real
   * production screens across breakpoints (reads `screens`, ignores
   * `images`). "contain" stays on ImageCarousel but only changes its
   * single-image path: instead of the usual full-bleed `object-cover`
   * crop, the image is letterboxed with `object-contain` inside the same
   * box on the `bg-surface-primary` backdrop — for a single image whose
   * real aspect ratio (e.g. a tall portrait screenshot) would be
   * destroyed by the default wide-banner crop.
   */
  variant?: "carousel" | "theme-peek" | "screen-map" | "contain";
  /** Only read by the "theme-peek" variant — one label per image (e.g. ["Tema 1", "Tema 2", "Tema 3"]); ThemeCarousel falls back to "Tema N" if omitted. */
  labels?: string[];
  /** Only read by the "screen-map" variant — one entry per screen section, each carrying its own [mobile, desktop] pair. */
  screens?: Screen[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** True for case studies under NDA — content stays as the bracketed placeholders from the Figma template until divulgation is approved. */
  nda: boolean;
  /** True to pull this case study out of every public listing (home ProjectsSection, /case-studies index) and 404 its own page/link — the entry itself stays in this file, just not published. Added 2026-08-28: temporary "close the portfolio" toggle, not an NDA flag. */
  hidden?: boolean;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  cardDescription: string;
  year: string;
  coverImage?: string;
  /**
   * Optional link to the live project (e.g. a landing page hosted as a
   * static copy under public/projects/<slug>/). When set, the case-study
   * hero renders a "Ver site ao vivo" / "View live site" CTA that opens it
   * in a new tab. Added 2026-09-24 for the landing-page case studies.
   */
  liveUrl?: string;
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
//     Play4tune — corrected 2026-09-17 (was Multibet; user can now name
//     Play4tune publicly). The DS also supports Multibet and Supernova as
//     tenants, but Play4tune is where it was built.
//  2. Figma → Storybook bridge: manual/custom-script sync, no Tokens
//     Studio or Style Dictionary in the pipeline — do not claim otherwise.
//  3. Governance process (how a component gets reviewed/versioned) is
//     genuinely not formalized yet — the "Governança compartilhada" pillar
//     below describes who's involved, deliberately not a review/versioning
//     process that doesn't exist. Don't upgrade this to "peer review" or
//     "approval flow" language later without checking with the user again.
// Bonus metric (3 tenants) and platform (Web multi-tenant) were also
// user-confirmed, not inferred — the source draft didn't mention either.
// 2026-09-17: coverImage and imageBlocks filled with real Play4tune
// screenshots (see the "screen-map" entry below) — no longer
// placeholders. The Storybook component-library block, previously
// removed for confidentiality, is back with a components-name-only
// screenshot (no real screens shown).
export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-tenant-design-system",
    nda: false,
    category: "Design System",
    title: "Design System Multi-tenant",
    subtitle:
      "De arquivos Figma defasados na Play4tune a uma base de tokens única que hoje também sustenta a Multibet e a Supernova",
    summary:
      "Arquitetado e construído do zero para sustentar a operação multi-tenant da Play4tune (Brasil, Colômbia, Paquistão), o design system hoje também dá suporte à Multibet e à Supernova — 87 telas, 200+ componentes, cortando o tempo de criação de novas telas em ~80%.",
    cardDescription:
      "Design system arquitetado do zero na Play4tune, hoje também em uso na Multibet e na Supernova, com automação de tema por tenant.",
    year: "2026",
    coverImage: "/images/case-studies/multi-tenant-design-system/cover.jpg",
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
          "Telas reais em produção, do mobile ao desktop, com os mesmos tokens e componentes do design system.",
        variant: "screen-map",
        screens: [
          {
            titulo: "Home",
            images: [
              "/images/case-studies/multi-tenant-design-system/screen-home-mobile.png",
              "/images/case-studies/multi-tenant-design-system/screen-home-desktop.png",
            ],
          },
          {
            titulo: "Gamepage",
            images: [
              "/images/case-studies/multi-tenant-design-system/screen-gamepage-mobile.png",
              "/images/case-studies/multi-tenant-design-system/screen-gamepage-desktop.png",
            ],
          },
          {
            titulo: "Welcome Bonus",
            images: [
              "/images/case-studies/multi-tenant-design-system/screen-welcome-bonus-mobile.png",
              "/images/case-studies/multi-tenant-design-system/screen-welcome-bonus-desktop.png",
            ],
          },
        ],
      },
      {
        caption:
          "Biblioteca de componentes documentada no Storybook — nomes catalogados, sem exibir nenhuma tela real por confidencialidade.",
        images: [
          "/images/case-studies/multi-tenant-design-system/storybook-components.jpg",
        ],
        variant: "contain",
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
    coverImage: "/images/case-studies/zentupet/cover.jpg",
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
        images: [
          "/images/case-studies/zentupet/staff-1-agenda.jpg",
          "/images/case-studies/zentupet/staff-2-timeline-pet.jpg",
          "/images/case-studies/zentupet/staff-3-pets-do-dia.jpg",
          "/images/case-studies/zentupet/staff-4-modal-atividade.jpg",
        ],
      },
      {
        caption:
          "\"Janelinha\" do tutor — acompanhamento em tempo real de cada atualização do pet durante a estadia",
        images: [
          "/images/case-studies/zentupet/janelinha-1-timeline-wide.jpg",
          "/images/case-studies/zentupet/janelinha-2-checkin-wide.jpg",
          "/images/case-studies/zentupet/janelinha-3-timeline.jpg",
          "/images/case-studies/zentupet/janelinha-4-checkin.jpg",
        ],
      },
    ],
    stats: [
      { value: "14", label: "telas desenhadas" },
      { value: "2", label: "perfis de usuário atendidos (staff e tutor)" },
      { value: "1", label: "design system estruturado do zero" },
    ],
    // 2026-08-28: was "aurum-bet-torneios" (hidden). 2026-09-24: now
    // points to the new dr-carlos-mattos landing-page case, continuing the
    // cycle multi-tenant → zentupet → dr-carlos-mattos → marina-alves → multi-tenant.
    nextProjectSlug: "dr-carlos-mattos",
  },
  // Added 2026-09-24. Real client (confirmed by the user). The live page
  // is a static English copy of the delivered LP, hosted at
  // public/projects/dr-carlos-mattos/ (translated for the portfolio, per
  // user request). Contact data on the page (CRM/RQE, WhatsApp number)
  // are still the placeholders from the delivered file.
  // Assumed, NOT user-confirmed: metadata.duracao, metadata.papel wording
  // (design + front-end), year. No performance/conversion metrics were
  // given — stats below are scope facts read from the delivered code only.
  {
    slug: "dr-carlos-mattos",
    nda: false,
    category: "Landing Page",
    title: "Dr. Carlos Mattos",
    subtitle:
      "Landing page para um consultório de psiquiatria em Curitiba, com toda a jornada levando a um único canal de agendamento: o WhatsApp",
    summary:
      "Landing page para um psiquiatra que atende presencialmente em Curitiba e por teleconsulta em todo o Brasil. A página parte das situações que o paciente reconhece no próprio dia a dia, apresenta o médico e explica o tratamento em 4 passos — com o agendamento pelo WhatsApp sempre a um toque de distância, em qualquer ponto da rolagem.",
    cardDescription:
      "Landing page para consultório de psiquiatria — identificação, confiança e agendamento pelo WhatsApp em uma única página.",
    year: "2026",
    coverImage: "/images/case-studies/dr-carlos-mattos/cover.jpg",
    liveUrl: "/projects/dr-carlos-mattos/index.html",
    metadata: {
      papel: "UX/UI Design e desenvolvimento front-end",
      duracao: "Menos de 1 mês",
      plataforma: "Web (landing page responsiva)",
      squad: "Eu (design e código) + o cliente",
    },
    contexto: {
      paragraph:
        "Procurar um psiquiatra costuma acontecer num momento de desgaste: a pessoa já convive há tempo com falta de foco, ansiedade ou um TDAH nunca diagnosticado, e qualquer atrito no caminho vira motivo para adiar mais uma vez. O desafio era construir uma página que gerasse identificação e confiança rápido, respondesse às dúvidas que normalmente travam o primeiro contato (convênio, teleconsulta, tempo de espera, medicação atual) e transformasse essa decisão em uma mensagem no WhatsApp.",
    },
    pillars: [
      {
        number: "01",
        title: "Começar pela identificação",
        description:
          "Logo depois do hero, a seção \"Você se identifica com alguma dessas situações?\" lista sinais concretos do dia a dia em cards numerados — o paciente se reconhece antes de ler qualquer credencial, e a página já responde que existe explicação clínica e tratamento objetivo.",
      },
      {
        number: "02",
        title: "Um único canal de conversão",
        description:
          "Todo CTA leva ao WhatsApp com mensagem pré-preenchida: header, hero, seção de tratamento, menu mobile, rodapé e um botão flutuante que acompanha a rolagem no mobile. Nada de formulário — o agendamento acontece no canal que o paciente já usa.",
      },
      {
        number: "03",
        title: "Confiança antes do clique",
        description:
          "Sobre o médico com trajetória e citação em primeira pessoa, CRM/RQE visíveis no hero e no rodapé, jornada de tratamento em 4 passos (agendamento, primeira consulta, plano e acompanhamento), endereço com mapa e FAQ em acordeão cobrindo convênio, teleconsulta, prazo e pagamento.",
      },
      {
        number: "04",
        title: "Leve e acessível por padrão",
        description:
          "HTML, CSS e JavaScript puros, sem framework. Imagens em WebP com versões separadas para mobile e desktop, fontes carregadas sem bloquear a renderização, lazy loading, animações que respeitam o \"reduzir movimento\" do sistema, skip link e navegação por teclado no menu mobile.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Principais seções da página no mobile e no desktop — hero, sinais, sobre o médico, jornada de tratamento e FAQ",
        variant: "screen-map",
        screens: [
          { titulo: "Hero", images: ["/images/case-studies/dr-carlos-mattos/screen-hero-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-hero-desktop.jpg"] },
          { titulo: "Sinais e desafios", images: ["/images/case-studies/dr-carlos-mattos/screen-signs-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-signs-desktop.jpg"] },
          { titulo: "Sobre o médico", images: ["/images/case-studies/dr-carlos-mattos/screen-about-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-about-desktop.jpg"] },
          { titulo: "Como funciona o tratamento", images: ["/images/case-studies/dr-carlos-mattos/screen-treatment-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-treatment-desktop.jpg"] },
          { titulo: "Perguntas frequentes", images: ["/images/case-studies/dr-carlos-mattos/screen-faq-mobile.jpg", "/images/case-studies/dr-carlos-mattos/screen-faq-desktop.jpg"] },
        ],
      },
    ],
    stats: [
      { value: "6", label: "seções, do primeiro sinal ao agendamento" },
      { value: "6", label: "pontos de contato levando ao WhatsApp" },
      { value: "2", label: "modalidades de atendimento (presencial e teleconsulta)" },
      { value: "0", label: "frameworks — HTML, CSS e JS puros" },
    ],
    nextProjectSlug: "marina-alves",
  },
  // Added 2026-09-24. Concept project: "Marina Alves" is a FICTIONAL
  // persona (confirmed by the user — not a real client), disclosed as such
  // in subtitle/summary, same approach as aurum-bet-torneios' fictional
  // name. All numbers on the page itself (followers, prices, brand
  // testimonials) are part of the fiction, so none of them are used as
  // case-study results. Assumed: metadata.duracao, year.
  {
    slug: "marina-alves",
    nda: false,
    category: "Landing Page · Mídia Kit",
    title: "Marina Alves",
    subtitle:
      "Mídia kit online para uma influenciadora de skincare (persona fictícia) — números, audiência e pacotes prontos para a marca fechar pelo WhatsApp",
    summary:
      "Projeto conceito: um mídia kit em formato de landing page para uma criadora de conteúdo de skincare e rotina real (Marina Alves é uma persona fictícia). A página substitui o PDF que circula por e-mail por uma vitrine viva — métricas, perfil de audiência, melhores conteúdos, depoimentos de marcas e pacotes com preço — e ainda oferece o mídia kit em PDF para quem precisa anexar numa proposta.",
    cardDescription:
      "Projeto conceito de mídia kit online para influenciadora — métricas, audiência e pacotes com contratação direta pelo WhatsApp.",
    year: "2026",
    coverImage: "/images/case-studies/marina-alves/cover.jpg",
    liveUrl: "/projects/marina-alves/index.html",
    metadata: {
      papel: "UX/UI Design e desenvolvimento front-end",
      duracao: "Menos de 1 mês",
      plataforma: "Web (landing page responsiva)",
      squad: "Eu (projeto autoral)",
    },
    contexto: {
      paragraph:
        "Mídia kit de influenciador normalmente é um PDF que desatualiza rápido, não mostra vídeo e obriga a marca a trocar vários e-mails para descobrir o básico: quanto custa e como contratar. A proposta aqui foi pensar o mídia kit do ponto de vista de quem compra — o gerente de marca que precisa avaliar audiência, ver provas de resultado e sair com um pacote escolhido, tudo em poucos minutos e muitas vezes pelo celular, dentro do próprio Instagram.",
    },
    pillars: [
      {
        number: "01",
        title: "Organizado pela decisão da marca",
        description:
          "A ordem das seções segue as perguntas de quem vai contratar: quem é ela (hero com vídeo), qual o alcance (métricas), para quem ela fala (gênero, idade, cidades e assuntos), o que já funcionou (melhores conteúdos e depoimentos) e quanto custa (serviços e pacotes).",
      },
      {
        number: "02",
        title: "Preço visível e contratação em um toque",
        description:
          "4 serviços avulsos e 2 pacotes completos, com o mais pedido em destaque. Cada botão abre o WhatsApp com uma mensagem já preenchida com o nome e o valor do pacote — a conversa começa com a marca sabendo exatamente o que quer.",
      },
      {
        number: "03",
        title: "Dados que se movem",
        description:
          "Contadores animados nas métricas, barras de audiência que se preenchem na rolagem, carrosséis horizontais de vídeos e depoimentos (com rolagem automática no mobile) — tudo como progressive enhancement: sem JavaScript, ou com \"reduzir movimento\" ativo, todo o conteúdo aparece estático e completo.",
      },
      {
        number: "04",
        title: "Pensado para o navegador do Instagram",
        description:
          "Como o link vive na bio, a página foi tratada para os navegadores internos (Instagram/WhatsApp) e para o modo escuro forçado do Samsung Internet, que inverte cores sozinho — ali a página recebe um tema escuro próprio para não quebrar a identidade visual. O mídia kit em PDF continua disponível para download.",
      },
    ],
    imageBlocks: [
      {
        caption:
          "Principais seções do mídia kit no mobile e no desktop — hero, métricas, audiência, serviços e contato",
        variant: "screen-map",
        screens: [
          { titulo: "Hero", images: ["/images/case-studies/marina-alves/screen-hero-mobile.jpg", "/images/case-studies/marina-alves/screen-hero-desktop.jpg"] },
          { titulo: "Métricas", images: ["/images/case-studies/marina-alves/screen-metrics-mobile.jpg", "/images/case-studies/marina-alves/screen-metrics-desktop.jpg"] },
          { titulo: "Audiência", images: ["/images/case-studies/marina-alves/screen-audience-mobile.jpg", "/images/case-studies/marina-alves/screen-audience-desktop.jpg"] },
          { titulo: "Serviços e pacotes", images: ["/images/case-studies/marina-alves/screen-services-mobile.jpg", "/images/case-studies/marina-alves/screen-services-desktop.jpg"] },
          { titulo: "Contato", images: ["/images/case-studies/marina-alves/screen-contact-mobile.jpg", "/images/case-studies/marina-alves/screen-contact-desktop.jpg"] },
        ],
      },
    ],
    stats: [
      { value: "8", label: "seções seguindo a decisão de compra da marca" },
      { value: "6", label: "pacotes com mensagem de WhatsApp pré-preenchida" },
      { value: "1", label: "mídia kit em PDF para download" },
      { value: "0", label: "conteúdo perdido sem JavaScript (progressive enhancement)" },
    ],
    nextProjectSlug: "multi-tenant-design-system",
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
    // 2026-08-28: hidden at the user's request — can't share other
    // projects right now, so this one is pulled from public view to keep
    // the portfolio to what's actually shareable. Content stays here,
    // untouched, for whenever it's cleared to go back up.
    hidden: true,
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

/** `caseStudies` filtered to what's actually public — every listing (home ProjectsSection, /case-studies index) should map over this, never the raw array, so a `hidden: true` entry disappears from both in one place. */
export const publishedCaseStudies: CaseStudy[] = caseStudies.filter(
  (c) => !c.hidden
);

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
