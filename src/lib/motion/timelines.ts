import { gsap } from "@/lib/gsap";
import { motionDurations, motionEase, motionStagger } from "./config";
import { staggerReveal } from "./presets";

/**
 * Empty labelled timeline for composing scenes (routes, modals, staged UX).
 * Prefer scoped timelines inside useGSAP; ids surface in GSDevTools when enabled.
 */
export function createSceneTimeline(id: string): gsap.core.Timeline {
  return gsap.timeline({
    id,
    defaults: { ease: motionEase.out },
  });
}

/** Project grid cards — editorial stagger on enter. */
export function createProjectGridReveal(section: Element): gsap.core.Animation {
  const q = gsap.utils.selector(section);
  return staggerReveal(q("[data-project-card]"), motionStagger.relaxed, {
    y: 40,
    opacity: 0,
    duration: motionDurations.moderate,
    ease: motionEase.out,
    force3D: true,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      once: true,
      fastScrollEnd: true,
    },
  });
}

export function registerProjectGridMotion(section: Element): void {
  createProjectGridReveal(section);
}
