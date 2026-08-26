import { Hero } from "@/components/sections/Hero";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

/**
 * Home page.
 *
 * Flagging, not silently fixing: before this change, app/page.tsx was a
 * byte-for-byte duplicate of app/case-studies/page.tsx (a "Projetos" list),
 * not actual home content — a leftover from scaffolding, not something
 * pulled from Figma. It was removed when the Pillars section was built.
 *
 * Built so far: Hero (Figma node 31:1793), Pillars (node 31:1809) and
 * Projetos selecionados (node 31:1838). The rest of the home page —
 * "sobre", "contato" (both linked from the header nav) — is NOT built yet
 * and is intentionally left out rather than invented. The Footer CTA
 * (node 31:1896) is built too, but lives in app/layout.tsx as a global
 * component rather than here — see the comment on components/layout/Footer.tsx
 * for why.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <PillarsSection />
      <ProjectsSection />
    </main>
  );
}
