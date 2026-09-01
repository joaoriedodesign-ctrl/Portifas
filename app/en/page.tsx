import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * English homepage — mirrors app/page.tsx, wired to lang="en" on every
 * section it composes. Added 2026-09-01 as part of the English site
 * (separate `/en/...` routes, no PT/EN toggle — see the "UPDATE
 * 2026-09-01" notes on components/layout/Header.tsx and siblings for the
 * full decision). No content lives here that isn't also on the
 * Portuguese homepage — see app/page.tsx for the original build history
 * (Hero = Figma node 31:1793, Projetos selecionados = node 31:1838).
 */
export default function HomeEn() {
  return (
    <main>
      <Hero lang="en" />
      <ProjectsSection lang="en" />
      <ContactSection lang="en" />
    </main>
  );
}
