"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";

interface ThemeCarouselProps {
  images: string[];
  /** One label per image, e.g. ["Tema 1", "Tema 2", "Tema 3"]. Falls back
   * to a localized "Tema N" / "Theme N" when omitted or shorter than
   * `images`. */
  labels?: string[];
  alt?: string;
  lang?: "pt" | "en";
}

/**
 * Peek-style carousel for switching between tenant themes of the same
 * component (design-system case study, "Mesmo componente com o tema
 * aplicado automaticamente para tenants diferentes" block) — added
 * 2026-08-28, on user request, as a deliberate SECOND carousel style
 * alongside `ImageCarousel.tsx`.
 *
 * This is intentionally NOT a variant bolted onto `ImageCarousel`: that
 * component's whole point (per its doc comment, "Cut 3") is that no
 * neighbor card ever peeks in — one full uncropped screenshot at a time.
 * Here the user explicitly asked for the opposite look ("algo mais ou
 * menos igual essa outra imagem que anexei", a reference mockup showing a
 * full-height center card with two neighbor cards visibly cut off at each
 * side) specifically to sell "these are the same screen, just re-themed"
 * at a glance — the peeking neighbors are the point, not a bug. Kept as a
 * separate component so `ImageCarousel`'s no-crop guarantee for ordinary
 * screenshot blocks is never put at risk by this one's different needs.
 *
 * **REVISED 2026-08-28 (same day) — mobile border/edge fix:** the first
 * cut had the peek cards absolutely positioned directly inside a plain
 * `relative` stage with no clipping frame at all — unlike the reference
 * mockup, which showed the peeking neighbors cleanly cut off by a
 * rounded container edge. Without that frame, on narrow mobile widths
 * (the page section's own padding leaves less room than desktop) a
 * peeking card could spill past the stage's visual bounds with nothing
 * to crop it, so its raw rectangular image edge showed up as a stray,
 * ungrouped border instead of a soft clipped peek — user flagged this
 * directly from a live mobile screenshot ("Arrume as bordas no mobile").
 * Fixed by wrapping the stage in an actual clipping frame:
 * `overflow-hidden rounded-[32px] bg-surface-primary` (same radius/bg
 * convention as `ImageCarousel`'s empty-state box and `PillarCard`) — now
 * every peek is cleanly cut at the frame's rounded edge on every
 * breakpoint, matching the reference image instead of free-floating.
 *
 * Behavior:
 *   - Center card full size/opacity; the immediate prev/next cards are
 *     visible at reduced scale/opacity, clipped by the stage's rounded
 *     edge — same idea as the reference image (gray peeking rectangles
 *     either side of a white center one).
 *   - Chevron buttons on both sides (always visible, not just on
 *     hover/desktop — this carousel's whole point is chevron-driven
 *     theme switching) step through the themes; wraps around.
 *   - Clicking a peeking side card also steps to it (extra affordance on
 *     top of the chevrons).
 *   - Clicking the active center card opens the same fullscreen lightbox
 *     as `ImageCarousel` ("Lembre-se de manter a funcionalidade de dar
 *     para aumentar a imagem, igual na zentupet") — reuses the shared
 *     `Lightbox` component so the expand/X/Escape/backdrop behavior is
 *     identical, not reimplemented.
 *   - A row of labeled pills below the stage ("Tema 1" / "Tema 2" /
 *     "Tema 3" by default) shows the current theme and doubles as direct
 *     jump navigation, mirroring the dot indicator `ImageCarousel` uses
 *     for the same "where am I" role.
 *
 * No new npm dependency — same reasoning as ImageCarousel.
 *
 * UPDATE 2026-09-01 (English site): added an optional `lang` prop ("pt",
 * default, or "en") for the same reason as ImageCarousel.tsx's update
 * note — accessibility strings + the default "Tema N" / "Theme N"
 * fallback label (rarely hit in practice, since lib/case-studies.en.ts
 * always supplies real English `labels`) + passthrough to `<Lightbox>`.
 */
export function ThemeCarousel({ images, labels, alt = "", lang = "pt" }: ThemeCarouselProps) {
  const isEn = lang === "en";
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const count = images.length;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  const labelFor = (i: number) => labels?.[i] ?? (isEn ? `Theme ${i + 1}` : `Tema ${i + 1}`);

  if (count === 0) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-surface-primary sm:aspect-[21/9] sm:max-h-[400px]" />
    );
  }

  return (
    <div className="w-full">
      <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-[32px] bg-surface-primary sm:h-[460px] lg:h-[540px]">
        {images.map((src, i) => {
          let diff = i - index;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;
          const isActive = diff === 0;
          const visible = Math.abs(diff) <= 1;

          return (
            <button
              key={src}
              type="button"
              aria-label={
                isActive
                  ? isEn
                    ? "Expand image"
                    : "Ampliar imagem"
                  : isEn
                    ? `Go to ${labelFor(i)}`
                    : `Ir para ${labelFor(i)}`
              }
              aria-current={isActive}
              onClick={() => (isActive ? setLightboxOpen(true) : go(i))}
              style={{
                transform: `translate(-50%, -50%) translateX(${diff * 66}%) scale(${
                  isActive ? 1 : 0.82
                })`,
                opacity: visible ? (isActive ? 1 : 0.4) : 0,
                zIndex: isActive ? 10 : 5 - Math.abs(diff),
                pointerEvents: visible ? "auto" : "none",
              }}
              className={`absolute left-1/2 top-1/2 h-[88%] w-auto appearance-none border-0 bg-transparent p-0 transition-[transform,opacity] duration-300 ease-out ${
                isActive ? "cursor-zoom-in" : "cursor-pointer"
              }`}
            >
              <img
                src={src}
                alt={`${alt} — ${labelFor(i)}`}
                className="h-full w-auto rounded-2xl object-contain shadow-2xl shadow-black/40"
              />
            </button>
          );
        })}

        <button
          type="button"
          aria-label={isEn ? "Previous theme" : "Tema anterior"}
          onClick={() => go(index - 1)}
          className="absolute left-1 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-surface-primary bg-surface-primary/90 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-primary sm:left-4"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label={isEn ? "Next theme" : "Próximo tema"}
          onClick={() => go(index + 1)}
          className="absolute right-1 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-surface-primary bg-surface-primary/90 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-primary sm:right-4"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-current={i === index}
            className={`body-sm rounded-full border px-3.5 py-2 transition-colors ${
              i === index
                ? "border-brand-500 bg-brand-500/10 text-brand-500"
                : "border-border-surface-primary bg-surface-primary text-on-surface-secondary hover:text-text-primary"
            }`}
          >
            {labelFor(i)}
          </button>
        ))}
      </div>

      <Lightbox
        src={lightboxOpen ? images[index] : null}
        alt={`${alt} — ${labelFor(index)}`}
        onClose={() => setLightboxOpen(false)}
        lang={lang}
      />
    </div>
  );
}
