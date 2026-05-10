import { gsap } from "@/lib/gsap";
import { motionDurations, motionEase } from "./config";

type TweenTarget = gsap.TweenTarget;
type TweenVars = gsap.TweenVars;
type DOMTarget = gsap.DOMTarget;
type Tween = gsap.core.Tween;

/**
 * Fade + lift — entrance for blocks, captions, list rows.
 */
export function fadeInUp(
  targets: TweenTarget,
  vars?: Partial<TweenVars>,
): gsap.core.Animation {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: motionDurations.normal,
    ease: motionEase.out,
    force3D: true,
    ...vars,
  });
}

export type RevealMaskVars = Partial<TweenVars> & {
  /** inset() axis — bottom edge default reads as upward reveal */
  fromInset?: string;
};

/**
 * Clip-path reveal — cinematic panel / title masks.
 */
export function revealMask(
  targets: TweenTarget,
  vars?: RevealMaskVars,
): gsap.core.Animation {
  const { fromInset, ...rest } = vars ?? {};
  const from = fromInset ?? "inset(0 0 100% 0)";

  return gsap.fromTo(
    targets,
    { clipPath: from, opacity: 0.94 },
    {
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
      duration: motionDurations.moderate,
      ease: motionEase.out,
      ...rest,
    },
  );
}

/**
 * Staggered fade/lift — grids, lists, token rows.
 */
export function staggerReveal(
  targets: TweenTarget,
  stagger: number,
  vars?: Partial<TweenVars>,
): gsap.core.Animation {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    stagger,
    duration: motionDurations.normal,
    ease: motionEase.out,
    force3D: true,
    ...vars,
  });
}

/**
 * Subtle scale + opacity — emphasis moments without bounce.
 */
export function cinematicScale(
  targets: TweenTarget,
  vars?: Partial<TweenVars>,
): gsap.core.Animation {
  return gsap.from(targets, {
    scale: 0.94,
    opacity: 0,
    duration: motionDurations.slow,
    ease: motionEase.soft,
    transformOrigin: "50% 50%",
    ...vars,
  });
}

export type SmoothParallaxVars = Partial<TweenVars> & {
  /** Vertical travel (px) */
  y?: number;
  /** ScrollTrigger scrub smoothing — higher = smoother follow */
  scrub?: number | boolean;
  start?: string;
  end?: string;
  trigger?: DOMTarget;
};

/**
 * Scroll-scrubbed translation — single RAF path via ScrollTrigger + Lenis sync.
 */
export function smoothParallax(
  targets: TweenTarget,
  vars?: SmoothParallaxVars,
): Tween {
  const {
    y = -48,
    scrub = 0.72,
    start = "top bottom",
    end = "bottom top",
    trigger,
    ...rest
  } = vars ?? {};

  const stTrigger = (trigger ?? targets) as DOMTarget;

  return gsap.to(targets, {
    y,
    ease: motionEase.linear,
    scrollTrigger: {
      trigger: stTrigger,
      start,
      end,
      scrub,
    },
    ...rest,
  });
}
