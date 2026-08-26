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

const COUNT_DURATION_MS = 900;
const POP_DURATION_MS = 420;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up to the numeric lead of `value` (e.g. 0 -> 200 for "200+"),
 * keeping any non-numeric prefix/suffix ("+", "/5") static and only
 * animating the digits. A single-digit lead (e.g. "3") skips the count —
 * animating 0 to a single digit over ~900ms reads as nothing happening,
 * not motion — and gets a soft scale+fade "pop" instead so it still feels
 * alive. Same "new, undocumented motion pattern" flag as hooks/useInView.ts.
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
    if (!start) return;

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
      const current = Math.round(easeOutCubic(progress) * target);
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
          transform: popVisible ? "scale(1)" : "scale(0.6)",
          transition: `transform ${POP_DURATION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${POP_DURATION_MS}ms ease-out`,
        }}
      >
        {value}
      </span>
    );
  }

  return <span className={className}>{display}</span>;
}
