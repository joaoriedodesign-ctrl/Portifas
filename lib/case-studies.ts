export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  /** True for case studies under NDA — page should render a "details on call" note instead of full content. */
  nda: boolean;
}

// Placeholder content. Replace with real case studies as they're written.
// The NDA-restricted design system case study should keep `nda: true` and a
// short public summary only — full architectural narrative stays for calls.
export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-tenant-design-system",
    title: "Design system multi-tenant: 250+ tokens, 200+ componentes",
    summary:
      "Arquitetura de um design system multi-tenant com governança de tema e migração de um sistema legado.",
    tags: ["Design Systems", "Governança", "Multi-tenant"],
    nda: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
