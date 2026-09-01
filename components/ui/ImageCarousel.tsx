"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  lang?: "pt" | "en";
}

/**
 * "Solução em Destaque" image slot for a case-study block
 * (app/case-studies/[slug]/page.tsx). Owns its own outer box for every
 * count so the page doesn't need to branch:
 *   - 0 images: empty placeholder box (same look the page used to render
 *     inline before this component existed) — keeps layout/scan-ability
 *     for still-pending blocks.
 *   - 1 image: single full-bleed `object-cover` box, `aspect-[16/9]`
 *     mobile / `aspect-[21/9]` + `max-h-[400px]` desktop — the ORIGINAL
 *     2026-08-28 behavior, unchanged. Fine for a single hero screenshot
 *     where cropping to a wide banner is the point.
 *   - 2+ images: **REVISED 2026-08-28 (first correction)** — the very
 *     first cut force-cropped every count into that same wide banner box,
 *     which chopped the top/bottom off product-UI screenshots. Fixed to a
 *     horizontally-scrollable row of individual cards, each a fixed
 *     height with `object-contain` (never `object-cover`) so the full
 *     screenshot always stays visible, letterboxed rather than cropped.
 *     That fix originally wrapped each card in `PillarCard`'s visual
 *     language (`rounded-[32px] border border-border-surface-primary
 *     bg-surface-primary` + padding) reused from elsewhere in the site.
 *
 * **REVISED AGAIN 2026-08-28 (second correction, same day) — two more
 * explicit user requests, both only for non-cover images (`cs.coverImage`
 * is untouched, still a plain `<img>`, no lightbox):**
 *   1. "tire elas de dentro desse card" — the bordered/background/padded
 *      card chrome around each multi-image item is GONE. Each item is now
 *      just the image itself (still `object-contain`, still no cropping),
 *      sized by a plain unstyled `<button>` (layout classes only — no
 *      border/bg/padding of its own) so scroll-snap sizing/click target
 *      still work without any visible "card" box around the picture.
 *   2. Click-to-expand: every image in this component (both the 1-image
 *      and 2+-image paths) is now a button that opens a fullscreen
 *      lightbox on click — large `object-contain` image, an "X" close
 *      button pinned to the top-right corner, Escape-to-close, and
 *      click-the-backdrop-to-close (image itself stops propagation so
 *      clicking the image doesn't close it).
 *
 * **REVISED A THIRD TIME 2026-08-28 (same day) — user flagged the
 * remaining crop:** the second correction still sized each multi-image
 * card at 86%/55%/42% of the track width (mobile/sm/lg) so 1 neighbor
 * card would visibly peek in at the edge, cropped by the track's own
 * edge — user called this out directly from a live screenshot ("tire
 * também esses crops do lado esquerdo e direito do mobile e do
 * desktop"). Cards are now `w-full` at every breakpoint — exactly one
 * full, uncropped card fills the track at a time, on mobile AND desktop,
 * no partial neighbor visible on either side. Navigation (arrows, dots,
 * swipe) is unchanged; only the peeking-neighbor visual is gone.
 *
 * **REVISED A FOURTH TIME 2026-08-28 (same day) — refactor, no behavior
 * change:** the fullscreen lightbox (mounted guard, createPortal, Escape,
 * body-scroll-lock, X button) was extracted verbatim into
 * `components/ui/Lightbox.tsx` so `ThemeCarousel.tsx` (a new peek-style
 * carousel for switching between tenant themes) could reuse it instead of
 * duplicating the same ~50 lines. This component now just tracks which
 * index is open (`lightboxIndex`) and renders `<Lightbox src={...} />`.
 *
 * No new npm dependency at any revision (same reasoning as
 * Reveal/AnimatedNumber/MobileNav — see project memory on the
 * lucide-react/framer-motion-over-bridge install limitation): native
 * scroll + CSS scroll-snap for the carousel drag, plain `useState` +
 * `scrollIntoView` for the arrow/dot controls, `createPortal` (already a
 * project dependency via `react-dom`, not a new install) for the
 * lightbox.
 *
 * UPDATE 2026-09-01 (English site): added an optional `lang` prop ("pt",
 * default, or "en") purely for accessibility strings (aria-labels on the
 * expand/prev/next/dot buttons) and to pass through to `<Lightbox>` — no
 * visual change, this component has no on-page copy of its own (captions
 * come from the case-study data via the `alt` prop, already
 * language-correct by the time it gets here).
 */
export function ImageCarousel({ images, alt = "", lang = "pt" }: ImageCarouselProps) {
  const isEn = lang === "en";
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const emptyBox =
    "aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-surface-primary sm:aspect-[21/9] sm:max-h-[400px]";

  const lightbox = (
    <Lightbox
      src={lightboxIndex !== null ? images[lightboxIndex] : null}
      alt={alt}
      onClose={() => setLightboxIndex(null)}
      lang={lang}
    />
  );

  if (images.length === 0) {
    return <div className={emptyBox} />;
  }

  if (images.length === 1) {
    return (
      <>
        <div className={emptyBox}>
          <button
            type="button"
            aria-label={isEn ? "Expand image" : "Ampliar imagem"}
            onClick={() => setLightboxIndex(0)}
            className="size-full cursor-zoom-in appearance-none border-0 bg-transparent p-0"
          >
            <img
              src={images[0]}
              alt={alt}
              className="size-full rounded-[32px] object-cover"
            />
          </button>
        </div>
        {lightbox}
      </>
    );
  }

  const scrollToIndex = (i: number) => {
    const clamped = (i + images.length) % images.length;
    const track = trackRef.current;
    const card = track?.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setIndex(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setIndex(closest);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={isEn ? "Expand image" : "Ampliar imagem"}
              onClick={() => setLightboxIndex(i)}
              className="flex h-[280px] w-full shrink-0 cursor-zoom-in snap-start appearance-none items-center justify-center border-0 bg-transparent p-0 text-left sm:h-[380px] lg:h-[460px]"
            >
              <img
                src={src}
                alt={alt}
                className="h-full w-auto max-w-full rounded-2xl object-contain"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={isEn ? "Previous image" : "Imagem anterior"}
          onClick={() => scrollToIndex(index - 1)}
          className="absolute left-1 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-surface-primary bg-surface-primary/90 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-primary sm:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label={isEn ? "Next image" : "Próxima imagem"}
          onClick={() => scrollToIndex(index + 1)}
          className="absolute right-1 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-surface-primary bg-surface-primary/90 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-primary sm:flex"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={isEn ? `Go to image ${i + 1}` : `Ir para imagem ${i + 1}`}
            aria-current={i === index}
            onClick={() => scrollToIndex(i)}
            className={`size-1.5 rounded-full transition-colors ${
              i === index ? "bg-brand-500" : "bg-border-surface-primary"
            }`}
          />
        ))}
      </div>

      {lightbox}
    </div>
  );
}
