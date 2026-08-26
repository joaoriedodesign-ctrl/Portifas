"use client";

import { useInView } from "@/hooks/useInView";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { REVEAL_DURATION_MS, REVEAL_EASING, REVEAL_TRANSLATE_PX } from "@/lib/motion";
import type { Stat } from "@/lib/case-studies";

interface StatCardProps {
  stat: Stat;
  /** Position within the stats grid — staggers this card's reveal + count-start by 90ms per index. */
  index?: number;
}

const STAGGER_STEP_MS = 90;

/**
 * Same card shell as before this pass (rounded-[32px] border
 * border-border-surface-primary bg-surface-primary p-6 sm:p-8) — per the
 * user's call to keep the card boxes and only animate what's inside them.
 * Adds: fade+translateY reveal on the whole card, and a count-up on the
 * value via AnimatedNumber, both triggered by the same inView so they stay
 * in sync. Reveal timing now comes from lib/motion.ts (was hardcoded
 * inline here, out of sync with Reveal.tsx until 2026-08-26 — don't
 * reintroduce a duplicate literal, import the constants instead). See
 * hooks/useInView.ts for the motion-pattern flag.
 */
export function StatCard({ stat, index = 0 }: StatCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const delay = index * STAGGER_STEP_MS;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-2 rounded-[32px] border border-border-surface-primary bg-surface-primary p-6 sm:p-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${REVEAL_TRANSLATE_PX}px)`,
        transition: `opacity ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}, transform ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="heading-h1 text-brand-500">
        <AnimatedNumber value={stat.value} start={inView} delay={delay} />
      </p>
      <p className="body-sm text-on-surface-secondary">{stat.label}</p>
    </div>
  );
}
