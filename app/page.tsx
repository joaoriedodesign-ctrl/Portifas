import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

/**
 * Home page.
 *
 * Flagging, not silently fixing: before this change, app/page.tsx was a
 * byte-for-byte duplicate of app/case-studies/page.tsx (a "Projetos" list),
 * not actual home content — a leftover from scaffolding, not something
 * pulled from Figma. It was removed when the Pillars section was built.
 *
 * UPDATE 2026-08-26: PillarsSection ("Como eu construo produtos digitais",
 * node 31:1809) was removed from this page per explicit user request — it
 * now lives only on /sobre, as the "Diferenciais" section (node 133:46,
 * reusing PillarCard — see the file-level comment on app/sobre/page.tsx).
 * The component itself (components/sections/PillarsSection.tsx) was left
 * in place since nothing else changed about it; it's just unmounted here.
 *
 * Built so far: Hero (Figma node 31:1793) and Projetos selecionados
 * (node 31:1838). The rest of the home page — "sobre", "contato" (both
 * linked from the header nav) — is NOT built yet and is intentionally
 * left out rather than invented. The Footer CTA (node 31:1896) is built
 * too, but lives in app/layout.tsx as a global component rather than here
 * — see the comment on components/layout/Footer.tsx for why.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
    </main>
  );
}
