/**
 * Motion tokens aligned with GSAP — mirrors CSS rhythm where useful.
 * Single source for durations / eases used across timelines & presets.
 */

export const motionDurations = {
  instant: 0,
  fast: 0.45,
  normal: 0.75,
  moderate: 1,
  slow: 1.25,
  cinematic: 1.45,
} as const;

export const motionEase = {
  /** Primary UI moves */
  out: "power3.out",
  /** Heavy headline / hero */
  outStrong: "power4.out",
  /** Scale / depth */
  soft: "power2.out",
  /** Lines, masks */
  inOut: "power2.inOut",
  /** Linear scrub only */
  linear: "none",
} as const;

/** Default stagger gap for indexed reveals */
export const motionStagger = {
  tight: 0.06,
  default: 0.09,
  relaxed: 0.12,
} as const;

/** ScrollTrigger presets — desktop-first feel */
export const scrollDefaults = {
  enterFromBelow: {
    start: "top 82%",
    once: true as const,
  },
  enterLine: {
    start: "top 88%",
    once: true as const,
  },
  approachBlock: {
    start: "top 80%",
    once: true as const,
  },
} as const;
