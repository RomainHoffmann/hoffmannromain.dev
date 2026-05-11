/**
 * Motion tokens aligned with GSAP — mirrors CSS rhythm (`globals.css` durations).
 * One coherent scale: calm reveals, soft hovers, no harsh snaps.
 */

/** GSAP timelines — seconds */
export const motionDurations = {
  instant: 0,
  micro: 0.3,
  fast: 0.48,
  normal: 0.72,
  moderate: 0.98,
  slow: 1.28,
  cinematic: 1.52,
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
  /** Exits — softer than power2.in */
  inSoft: "power3.in",
  /** Linear scrub only */
  linear: "none",
} as const;

/** Stagger between sibling elements — relaxed = calmer cadence */
export const motionStagger = {
  tight: 0.072,
  default: 0.104,
  relaxed: 0.138,
  gallery: 0.058,
} as const;

/** ScrollTrigger presets */
export const scrollDefaults = {
  enterFromBelow: {
    start: "top 82%",
    once: true as const,
  },
  enterLine: {
    start: "top 88%",
    once: true as const,
  },
} as const;

/**
 * Project expand overlay — FLIP stage + staged fade/slide content (seconds).
 * Paired easing: flip uses inOut; content uses same family as scroll reveals.
 */
export const overlayMotion = {
  flipIn: 0.84,
  backdropIn: 0.44,
  titleIn: 0.36,
  leadIn: 0.34,
  detailsIn: 0.32,
  galleryItemIn: 0.28,
  galleryStaggerIn: motionStagger.gallery,
  easeFlip: "power4.inOut" as const,
  easeContent: "power3.out" as const,
  /** Start title/lead/details after flip has committed */
  contentEnterAt: 0.36,
  /** Gallery wave — offset from timeline start (after content begins) */
  galleryWaveDelay: 0.22,
  /** Exit — slightly longer than enter micro-moves for opacity blend */
  exitGalleryDur: 0.2,
  exitGalleryStagger: 0.036,
  exitContentDur: 0.24,
  exitContentAt: 0.03,
  exitBackdropDur: 0.32,
  exitBackdropAt: 0.07,
  exitFlipDur: 0.54,
  exitFlipAt: 0.05,
  easeExit: motionEase.inSoft,
} as const;
