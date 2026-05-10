"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import {
  createHeroIntroTimeline,
  createHeroParallax,
} from "@/lib/motion/timelines";
import { SITE } from "@/constants/site";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const rest = parts.slice(1).join(" ");
  return { first, rest };
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const { first, rest } = splitName(SITE.name);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      createHeroIntroTimeline(section);
      createHeroParallax(section);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end px-gutter pb-[var(--space-4xl)] pt-[var(--space-5xl)] md:px-gutter-lg md:pb-[var(--space-section-y)] md:pt-[10rem]"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-[0.35]" aria-hidden />
        <div
          data-parallax-glow
          className="absolute -left-1/4 top-1/3 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-subtle)_0%,transparent_62%)] blur-3xl will-change-transform"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto w-full max-w-[120rem]">
        <p
          data-hero-rest
          className="ds-label mb-[var(--space-lg)]"
        >
          {SITE.role}
        </p>

        <div className="overflow-hidden">
          <h1 className="font-display text-[length:var(--text-display)] font-normal leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[var(--fg)]">
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
          data-hero-rest
          className="ds-body-relaxed mt-[var(--space-2xl)] max-w-xl text-pretty text-base md:text-lg"
        >
          {SITE.description}
        </p>

        <div
          data-hero-rest
          className="mt-[var(--space-3xl)] flex items-center gap-[var(--space-md)] font-mono text-[10px] uppercase tracking-[var(--tracking-label-wide)] text-[var(--muted)]"
        >
          <span className="h-px w-12 bg-[var(--accent-line)]" aria-hidden />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
