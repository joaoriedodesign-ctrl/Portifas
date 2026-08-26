"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Motion primitive — NEW pattern, not yet in docs/design-tokens.md (no
 * "Motion" section exists there yet, per the project's own MDs-are-source-
 * of-truth rule). The timing/easing values used by everything built on
 * this hook (Reveal, StatCard's card-level transition) are proposed
 * defaults — 600ms / cubic-bezier(0.16, 1, 0.3, 1) ("ease-out-expo") for
 * reveals, 90ms stagger step per grid/list item — flagging this as a
 * starting point pending a real "Motion" section being added to the
 * design-tokens reference, not an already-approved token.
 *
 * Repeats: `inView` toggles both ways — true when the target enters the
 * viewport, false again once it scrolls back out — so the reveal replays
 * every time the element crosses into view, not just once per page load
 * (per explicit user direction 2026-08-26: animations don't need to be
 * "once in a lifetime", they can fire on every scroll).
 *
 * Respects prefers-reduced-motion: when the OS/browser has that set,
 * `inView` resolves to `true` immediately on mount and never toggles again
 * (no IntersectionObserver is created), so anything gated on it renders in
 * its final state right away with no animated transition, ever.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
