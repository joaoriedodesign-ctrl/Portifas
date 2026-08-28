"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface LightboxProps {
  /** Image to show fullscreen, or `null` to render nothing (closed). */
  src: string | null;
  alt?: string;
  onClose: () => void;
}

/**
 * Shared fullscreen image lightbox — extracted 2026-08-28 out of
 * `ImageCarousel.tsx` so `ThemeCarousel.tsx` (the peek-style theme
 * switcher on the design-system case study) can reuse the exact same
 * "click to expand / X in the top-right / Escape / backdrop click"
 * behavior instead of re-implementing it. Behavior itself is unchanged
 * from the ImageCarousel version, which in turn reused `MobileNav.tsx`'s
 * established fullscreen-overlay pattern: a `mounted` guard + `createPortal`
 * to `document.body` (avoids the containing-block bug when a `fixed`
 * overlay sits inside anything with `transform`/`filter`/`backdrop-filter`)
 * and the same body-scroll-lock technique (pins `body` with
 * `position: fixed`, restores scroll position on close — plain
 * `overflow: hidden` doesn't reliably stop iOS Safari rubber-band scroll).
 *
 * No new npm dependency — `react-dom`'s `createPortal` is already a
 * project dependency.
 */
export function Lightbox({ src, alt = "", onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (src === null) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const scrollY = window.scrollY;
    const body = document.body;
    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [src, onClose]);

  if (!mounted || src === null) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Imagem em destaque"}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-background/90 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
      />
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="fixed right-4 top-4 flex size-11 items-center justify-center rounded-full border border-border-surface-primary bg-surface-primary/90 text-text-primary backdrop-blur-sm transition-colors hover:bg-surface-primary sm:right-6 sm:top-6"
      >
        <X aria-hidden className="size-5" />
      </button>
    </div>,
    document.body
  );
}
