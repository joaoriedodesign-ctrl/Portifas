"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";

export interface ScreenMapEntry {
  titulo: string;
  images: [string, string];
}

interface ScreenMapBlockProps {
  screens: ScreenMapEntry[];
  alt?: string;
  lang?: "pt" | "en";
}

/**
 * "Sistema em uso" block for the multi-tenant-design-system case study —
 * added 2026-09-17, replacing that case's old `theme-peek` block (which
 * showed the SAME screen re-skinned per tenant) with real production
 * screens across breakpoints instead.
 *
 * Structure mirrors a Figma reference the user pointed at (file
 * 5Nf5orHimb0gKEY8dlfN1D, node 45:5713 — a "Comprehensive UX Map
 * Showcase" page): N stacked sections, each a screen name + its
 * mobile/desktop pair side by side. Deliberately NOT copying that
 * reference's visual (light background + dot-grid) — that's just the
 * Figma file's own presentation frame, not part of the design system.
 * Every visual choice here instead reuses this site's own tokens:
 * `bg-surface-primary` / `border-border-surface-primary` for each
 * section's card (same convention as `ImageCarousel`'s empty-state box
 * and `PillarCard`), `text-text-primary` for the screen name, and the
 * project's existing type scale (`heading-h4`) rather than a new size.
 *
 * Each image is its own click-to-expand button (reuses `Lightbox`,
 * exactly like `ImageCarousel`/`ThemeCarousel` — same "X" close, Escape,
 * backdrop-click behavior). `object-contain` throughout, never a crop:
 * the mobile shot is a tall portrait screenshot and the desktop shot is
 * a wide landscape one, so cropping either to match the other would lose
 * real content — same no-crop principle `ImageCarousel` settled on for
 * its own multi-image path.
 */
export function ScreenMapBlock({ screens, alt = "", lang = "pt" }: ScreenMapBlockProps) {
  const isEn = lang === "en";
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  if (screens.length === 0) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-surface-primary sm:aspect-[21/9] sm:max-h-[400px]" />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {screens.map((screen) => {
        const [mobileSrc, desktopSrc] = screen.images;
        return (
          <div
            key={screen.titulo}
            className="flex w-full flex-col gap-4 rounded-[32px] border border-border-surface-primary bg-surface-primary p-4 sm:p-6"
          >
            <p className="heading-h4 text-text-primary">{screen.titulo}</p>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="button"
                aria-label={isEn ? "Expand image" : "Ampliar imagem"}
                onClick={() =>
                  setLightbox({ src: mobileSrc, label: `${screen.titulo} — Mobile` })
                }
                className="flex shrink-0 cursor-zoom-in appearance-none items-center justify-center border-0 bg-transparent p-0"
              >
                <img
                  src={mobileSrc}
                  alt={`${alt} — ${screen.titulo} — Mobile`}
                  className="max-h-[240px] w-auto max-w-full rounded-2xl object-contain sm:max-h-[300px] lg:max-h-[360px]"
                />
              </button>
              <button
                type="button"
                aria-label={isEn ? "Expand image" : "Ampliar imagem"}
                onClick={() =>
                  setLightbox({ src: desktopSrc, label: `${screen.titulo} — Desktop` })
                }
                className="flex min-w-0 shrink cursor-zoom-in appearance-none items-center justify-center border-0 bg-transparent p-0"
              >
                <img
                  src={desktopSrc}
                  alt={`${alt} — ${screen.titulo} — Desktop`}
                  className="max-h-[240px] w-auto max-w-full rounded-2xl object-contain sm:max-h-[300px] lg:max-h-[360px]"
                />
              </button>
            </div>
          </div>
        );
      })}

      <Lightbox
        src={lightbox?.src ?? null}
        alt={lightbox ? `${alt} — ${lightbox.label}` : alt}
        onClose={() => setLightbox(null)}
        lang={lang}
      />
    </div>
  );
}
