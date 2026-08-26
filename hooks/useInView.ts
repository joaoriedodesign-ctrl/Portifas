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
 * Fires once: after the target intersects, `inView` stays true even if it
 * later scrolls out of view again — this is a one-time reveal, not a
 * repeating effect (re-triggering on every scroll direction would read as
 * "chamativo", the opposite of what this was asked to be).
 *
 * Respects prefers-reduced-motion: when the OS/browser has that set,
 * `inView` resolves to `true` immediately on mount instead of waiting on
 * IntersectionObserver, so anything gated on it renders in its final state
 * right away with no animated transition.
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
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
