import gsap from "gsap";

export const motion = {
  duration: {
    fast: 0.35,
    base: 0.55,
    slow: 0.75,
  },
  ease: {
    out: "power2.out",
    soft: "power3.out",
  },
  stagger: 0.08,
} as const;

export function fadeUp(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  },
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: options?.y ?? 24 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? motion.duration.base,
      delay: options?.delay ?? 0,
      stagger: options?.stagger,
      ease: motion.ease.soft,
      clearProps: "transform",
    },
  );
}

export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document;
}
