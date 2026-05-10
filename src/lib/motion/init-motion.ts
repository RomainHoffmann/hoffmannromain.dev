import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { motionDurations, motionEase } from "./config";

let configured = false;

/**
 * Idempotent global GSAP defaults + ScrollTrigger baseline.
 * Called once when Lenis mounts so desktop timelines share one clock.
 */
export function configureMotion(): void {
  if (configured || typeof window === "undefined") return;
  configured = true;

  gsap.config({
    nullTargetWarn: false,
  });

  gsap.defaults({
    duration: motionDurations.normal,
    ease: motionEase.out,
    overwrite: "auto",
  });

  ScrollTrigger.defaults({
    anticipatePin: 1,
  });
}
