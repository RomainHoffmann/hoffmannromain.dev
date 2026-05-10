"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { createApproachTimeline } from "@/lib/motion/timelines";

const pillars = [
  "Motion as hierarchy",
  "Restraint in layout",
  "Performance as craft",
] as const;

export function ApproachSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      createApproachTimeline(section);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="approach"
      className="relative px-gutter py-section md:px-gutter-lg md:py-section-lg"
      aria-labelledby="approach-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />

      <div className="mx-auto max-w-[120rem]">
        <p data-approach className="ds-label">
          Approach
        </p>
        <div className="mt-[var(--space-2xl)] grid gap-[var(--space-2xl)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[var(--space-5xl)]">
          <h2
            id="approach-heading"
            data-approach
            className="type-section-title text-[var(--fg)]"
          >
            Code as choreography — every transition earns its place in the
            frame.
          </h2>
          <div data-approach className="space-y-6">
            <p className="ds-body-relaxed">
              I build interfaces that read like scenes: depth from type scale,
              tempo from motion curves, and silence from negative space. No
              decorative noise — only signal.
            </p>
            <ul className="type-caption flex flex-col gap-[var(--space-xs)] border-l border-[var(--border)] pl-[var(--space-lg)] text-[var(--muted)]">
              {pillars.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
