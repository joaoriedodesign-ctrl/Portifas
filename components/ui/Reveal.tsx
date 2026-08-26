"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { REVEAL_DURATION_MS, REVEAL_EASING, REVEAL_TRANSLATE_PX } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms — pass `index * 90` when revealing a list/grid. */
  delay?: number;
  className?: string;
}

/**
 * Generic scroll-reveal wrapper: fades + translates its children up into
 * place every time they enter the viewport, and back out again when they
 * scroll out — see hooks/useInView.ts for the "repeats on every scroll"
 * behavior and lib/motion.ts for the timing/easing values (and why they
 * were softened) that every value here traces back to.
 *
 * Renders as a plain `div`, so pass whatever layout classes the wrapped
 * element needs on the grid/flex parent via `className` (e.g. the
 * `flex-1 basis-[260px]` a PillarCard's own parent expects from its
 * direct child) — the wrapped component itself keeps its own `w-full`/
 * sizing and just fills this wrapper.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${REVEAL_TRANSLATE_PX}px)`,
        transition: `opacity ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}, transform ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
