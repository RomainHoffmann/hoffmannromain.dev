import { gsap } from "@/lib/gsap";
import {
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
 * Hero load sequence — single timeline (page paint / intro).
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
        yPercent: 108,
        opacity: 0,
        duration: motionDurations.slow,
        stagger: motionStagger.default,
        ease: motionEase.outStrong,
      },
      0,
    )
    .from(
      q("[data-hero-rest]"),
      {
        opacity: 0,
        y: 22,
        duration: motionDurations.moderate,
        ease: motionEase.out,
      },
      0.35,
    );
}

/** Subtle depth on decorative layers — scrubbed, Lenis-synced. */
export function createHeroParallax(section: Element): gsap.core.Tween | null {
  const glow = section.querySelector("[data-parallax-glow]");
  if (!(glow instanceof Element)) return null;

  return smoothParallax(glow, {
    y: -40,
    scrub: 0.55,
    trigger: section,
    start: "top bottom",
    end: "bottom top",
  });
}

/** Project rows enter — scroll-triggered stagger. */
export function createWorkProjectsReveal(section: Element): gsap.core.Animation {
  const q = gsap.utils.selector(section);
  return staggerReveal(q("[data-project]"), motionStagger.relaxed, {
    y: 56,
    duration: motionDurations.moderate,
    ease: motionEase.out,
    scrollTrigger: {
      trigger: section,
      ...scrollDefaults.enterFromBelow,
    },
  });
}

/** Rule lines — per-line trigger (independent of row timeline). */
export function createWorkLineReveals(section: Element): gsap.core.Tween[] {
  const lines = gsap.utils.toArray(
    section.querySelectorAll("[data-project-line]"),
  ) as Element[];
  return lines.map((line) =>
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: motionDurations.cinematic * 0.8,
        ease: motionEase.inOut,
        scrollTrigger: {
          trigger: line,
          ...scrollDefaults.enterLine,
        },
      },
    ),
  );
}

/** Approach block — single staggered pass. */
export function createApproachTimeline(section: Element): gsap.core.Animation {
  const q = gsap.utils.selector(section);
  return staggerReveal(q("[data-approach]"), motionStagger.tight, {
    y: 36,
    duration: 0.95,
    ease: motionEase.out,
    scrollTrigger: {
      trigger: section,
      ...scrollDefaults.approachBlock,
    },
  });
}

/**
 * Register all work-section motion; returns array for optional debugging.
 * useGSAP reverts context — do not store globally.
 */
export function registerWorkSectionMotion(section: Element): void {
  createWorkProjectsReveal(section);
  createWorkLineReveals(section);
}
