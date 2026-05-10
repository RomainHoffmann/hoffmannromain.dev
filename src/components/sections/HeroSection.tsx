"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/constants/site";
import { projects } from "@/data/projects";
import {
  createHeroIntroTimeline,
  createHeroScrollParallax,
} from "@/lib/motion/timelines";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const rest = parts.slice(1).join(" ");
  return { first, rest };
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const { first, rest } = splitName(SITE.name);
  const projectCount = projects.length;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      createHeroIntroTimeline(section);
      createHeroScrollParallax(section);

      const aurora = section.querySelector("[data-hero-aurora]");
      if (aurora instanceof Element) {
        gsap.to(aurora, {
          xPercent: 2.8,
          yPercent: -2.2,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const mouseLayers = gsap.utils.toArray(
        section.querySelectorAll("[data-parallax-mouse]"),
      ) as HTMLElement[];

      const drivers = mouseLayers.map((el, index) => {
        const depth = index === 0 ? 1 : 0.62;
        return {
          depth,
          xTo: gsap.quickTo(el, "x", {
            duration: 1.55,
            ease: "power3.out",
          }),
          yTo: gsap.quickTo(el, "y", {
            duration: 1.55,
            ease: "power3.out",
          }),
        };
      });

      const maxPx = 9;

      const onPointerMove = (event: PointerEvent) => {
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;
        drivers.forEach(({ xTo, yTo, depth }) => {
          xTo(nx * maxPx * depth);
          yTo(ny * maxPx * depth);
        });
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-gutter py-[var(--space-section-y)] md:px-gutter-lg"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="hero-grid absolute inset-0 opacity-[0.22]" />

        {/* Primary glow — scroll on outer layer, mouse on inner (no transform conflict) */}
        <div
          data-parallax-scroll
          className="absolute -left-[18%] top-[14%] h-[min(92vmin,52rem)] w-[min(92vmin,52rem)] will-change-transform"
        >
          <div data-parallax-mouse className="h-full w-full will-change-transform">
            <div
              data-hero-aurora
              className="h-full w-full rounded-full bg-[radial-gradient(circle_at_42%_42%,var(--accent-subtle)_0%,transparent_58%)] blur-3xl"
            />
          </div>
        </div>

        {/* Secondary depth — cooler wash */}
        <div
          data-parallax-scroll
          className="absolute -right-[8%] bottom-[18%] h-[min(72vmin,38rem)] w-[min(72vmin,38rem)] will-change-transform"
        >
          <div data-parallax-mouse className="h-full w-full will-change-transform">
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045)_0%,transparent_62%)] blur-3xl" />
          </div>
        </div>

        {/* Light local falloff only — global atmosphere carries grain + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_48%,transparent_34%,rgba(0,0,0,0.38)_100%)]" />
      </div>

      <div className="relative z-[var(--z-raised)] mx-auto flex w-full max-w-[42rem] flex-col items-center text-center">
        <div className="overflow-hidden">
          <h1 className="type-hero text-[var(--fg)]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                {first}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-line
                className={`block ${rest ? "text-[color:var(--accent-soft)]" : "text-[var(--muted)] opacity-[var(--opacity-subtle)]"}`}
              >
                {rest || "—"}
              </span>
            </span>
          </h1>
        </div>

        <p
          data-hero-fade
          className="type-lead mt-[var(--space-xl)] max-w-[34rem] text-pretty text-[var(--muted-strong)]"
        >
          {SITE.heroSubtitle}
        </p>

        <p
          data-hero-fade
          className="type-meta mt-[var(--space-lg)] text-[var(--muted)]"
        >
          {SITE.role}
          <span className="text-[var(--border-strong)]"> · </span>
          {projectCount} indexed work{projectCount === 1 ? "" : "s"}
        </p>

        <div
          data-hero-fade
          className="type-meta mt-[var(--space-3xl)] flex items-center justify-center gap-[var(--space-md)] tracking-[var(--tracking-label-wide)] text-[var(--muted)]"
        >
          <span className="h-px w-10 bg-[var(--accent-line)] opacity-80" aria-hidden />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
