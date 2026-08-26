"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms — pass `index * 90` when revealing a list/grid. */
  delay?: number;
  className?: string;
}

const DURATION_MS = 600;
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"; // ease-out-expo — elegant, not bouncy
const TRANSLATE_PX = 16;

/**
 * Generic scroll-reveal wrapper: fades + translates its children up into
 * place the first time they enter the viewport. See hooks/useInView.ts for
 * the "new, undocumented motion pattern" flag and the timing rationale —
 * every value here traces back to that comment.
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
        transform: inView ? "translateY(0)" : `translateY(${TRANSLATE_PX}px)`,
        transition: `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
