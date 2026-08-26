"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  /** Raw stat value as authored in lib/case-studies.ts, e.g. "87", "200+", "1/5". */
  value: string;
  /** Set true by the parent once its own reveal/inView trigger has fired. */
  start: boolean;
  /** ms to wait before starting — keeps this in sync with a staggered card reveal. */
  delay?: number;
  className?: string;
}

const COUNT_DURATION_MS = 1100;
const POP_DURATION_MS = 550;
// ease-out-quint — decelerates smoothly with no overshoot (was
// cubic-bezier(0.34, 1.56, 0.64, 1), a springy bounce that read as harsh
// alongside the softened Reveal curve; see lib/motion.ts for the same
// 2026-08-26 "mais suave" pass on the reveal side).
const POP_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/**
 * Counts up to the numeric lead of `value` (e.g. 0 -> 200 for "200+"),
 * keeping any non-numeric prefix/suffix ("+", "/5") static and only
 * animating the digits. A single-digit lead (e.g. "3") skips the count —
 * animating 0 to a single digit over ~900ms reads as nothing happening,
 * not motion — and gets a soft scale+fade "pop" instead so it still feels
 * alive. Same "new, undocumented motion pattern" flag as hooks/useInView.ts.
 *
 * Repeats: when `start` goes false (card scrolled out of view, per
 * useInView's toggle-both-ways behavior), the displayed digits/pop state
 * reset back to their pre-animation baseline — invisible to the user since
 * the parent card has already faded out by then — so the count/pop plays
 * again in full the next time `start` flips back to true.
 */
export function AnimatedNumber({
  value,
  start,
  delay = 0,
  className = "",
}: AnimatedNumberProps) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const isCountable = !!match && match[2].length >= 2;

  const [display, setDisplay] = useState(
    isCountable ? `${match![1]}0${match![3]}` : value
  );
  const [popVisible, setPopVisible] = useState(false);

  useEffect(() => {
    if (!start) {
      // Reset so the animation replays in full next time `start` flips
      // back to true — happens while hidden, so no visible flash.
      if (isCountable) {
        setDisplay(`${match![1]}0${match![3]}`);
      } else {
        setPopVisible(false);
      }
      return;
    }

    if (!isCountable) {
      const t = setTimeout(() => setPopVisible(true), delay);
      return () => clearTimeout(t);
    }

    const [, prefix, digits, suffix] = match!;
    const target = parseInt(digits, 10);
    let raf = 0;
    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / COUNT_DURATION_MS, 1);
      const current = Math.round(easeOutQuint(progress) * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  if (!isCountable) {
    return (
      <span
        className={className}
        style={{
          display: "inline-block",
          opacity: popVisible ? 1 : 0,
          transform: popVisible ? "scale(1)" : "scale(0.85)",
          transition: `transform ${POP_DURATION_MS}ms ${POP_EASING}, opacity ${POP_DURATION_MS}ms ${POP_EASING}`,
        }}
      >
        {value}
      </span>
    );
  }

  return <span className={className}>{display}</span>;
}
