import { Hero } from "@/components/sections/Hero";
import { PillarsSection } from "@/components/sections/PillarsSection";

/**
 * Home page.
 *
 * Flagging, not silently fixing: before this change, app/page.tsx was a
 * byte-for-byte duplicate of app/case-studies/page.tsx (a "Projetos" list),
 * not actual home content — a leftover from scaffolding, not something
 * pulled from Figma. It was removed when the Pillars section was built.
 *
 * Built so far: Hero (Figma node 31:1793) and Pillars (node 31:1809) — the
 * two sections requested. The rest of the home page — "sobre", "contato"
 * (both linked from the header nav) — is NOT built yet and is intentionally
 * left out rather than invented.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <PillarsSection />
    </main>
  );
}
