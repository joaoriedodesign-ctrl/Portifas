/**
 * Shared scroll-reveal motion constants — single source of truth for
 * Reveal.tsx and StatCard.tsx. Before this file existed, StatCard
 * duplicated Reveal's duration/easing as a hardcoded inline string
 * instead of importing it, which is exactly how the two could silently
 * drift apart — centralizing here so a future tweak only happens once.
 *
 * See hooks/useInView.ts for the "fires every time it crosses into/out
 * of view" trigger these values animate (not once-per-page-load).
 *
 * 2026-08-26: softened per explicit user feedback ("as animações estão
 * muito duras, deixe-as mais suaves"). Went from 600ms /
 * cubic-bezier(0.16,1,0.3,1) ("ease-out-expo") / 16px to 750ms /
 * cubic-bezier(0.65,0,0.35,1) ("ease-in-out-cubic") / 12px.
 * ease-out-expo starts already at near-full velocity and then hard-brakes
 * at the very end — reads as a "snap" on entrance, and since `inView` now
 * toggles both ways, the exact same curve played in reverse on exit reads
 * as an abrupt yank away rather than a graceful fade. ease-in-out-cubic
 * ramps up gently and eases back down symmetrically in both directions,
 * which is what "suave" means for something that now plays on every
 * scroll crossing, not just a one-time entrance.
 */
export const REVEAL_DURATION_MS = 750;
export const REVEAL_EASING = "cubic-bezier(0.65, 0, 0.35, 1)"; // ease-in-out-cubic
export const REVEAL_TRANSLATE_PX = 12;
