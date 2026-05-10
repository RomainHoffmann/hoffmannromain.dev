import { gsap } from "@/lib/gsap";
import {
  motionDelay,
  motionDurations,
  motionEase,
  motionStagger,
  scrollDefaults,
} from "./config";
import { smoothParallax, staggerReveal } from "./presets";

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

/**
 * Hero load sequence — name lines, then staggered opacity / lift on supporting copy.
 */
export function createHeroIntroTimeline(section: Element): gsap.core.Timeline {
  const q = gsap.utils.selector(section);
  return gsap
    .timeline({
      id: "timeline-hero-intro",
      defaults: { ease: motionEase.outStrong },
    })
    .from(
      q("[data-hero-line]"),
      {
        yPercent: 100,
        opacity: 0,
        duration: motionDurations.slow,
        stagger: motionStagger.default,
        ease: motionEase.outStrong,
        force3D: true,
      },
      0,
    )
    .from(
      q("[data-hero-fade]"),
      {
        opacity: 0,
        y: 14,
        duration: motionDurations.fast,
        stagger: motionStagger.tight,
        ease: motionEase.out,
        force3D: true,
      },
      motionDelay.heroSecondary,
    );
}

/** Scroll-scrubbed drift on layered backgrounds — Lenis-synced. */
export function createHeroScrollParallax(section: Element): gsap.core.Tween[] {
  const layers = gsap.utils.toArray(
    section.querySelectorAll("[data-parallax-scroll]"),
  ) as Element[];
  const depths = [-30, -18];
  return layers.map((el, i) =>
    smoothParallax(el, {
      y: depths[i % depths.length] ?? -22,
      scrub: 0.72,
      trigger: section,
      start: "top bottom",
      end: "bottom top",
    }),
  );
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

/** Approach block — single staggered pass. */
export function createApproachTimeline(section: Element): gsap.core.Animation {
  const q = gsap.utils.selector(section);
  return staggerReveal(q("[data-approach]"), motionStagger.tight, {
    y: 32,
    duration: motionDurations.moderate,
    ease: motionEase.out,
    force3D: true,
    scrollTrigger: {
      trigger: section,
      ...scrollDefaults.approachBlock,
      fastScrollEnd: true,
    },
  });
}
