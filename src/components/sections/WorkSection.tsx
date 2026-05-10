"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { registerWorkSectionMotion } from "@/lib/motion/timelines";
import type { Project } from "@/data/projects";

type WorkSectionProps = {
  projects: Project[];
};

export function WorkSection({ projects }: WorkSectionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      registerWorkSectionMotion(section);
    },
    { scope: root, dependencies: [projects] },
  );

  return (
    <section
      ref={root}
      id="work"
      className="border-t border-[var(--border)] px-gutter py-section md:px-gutter-lg md:py-section-lg"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[120rem]">
        <div className="mb-[var(--space-4xl)] flex flex-col gap-[var(--space-md)] md:mb-[var(--space-5xl)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="ds-label">Index</p>
            <h2
              id="work-heading"
              className="mt-[var(--space-sm)] font-display text-4xl tracking-[var(--tracking-tight)] text-[var(--fg)] md:text-5xl"
            >
              Selected{" "}
              <span className="text-[color:var(--accent-soft)]">work</span>
            </h2>
          </div>
          <p className="ds-body-relaxed max-w-md text-sm md:text-right">
            Case studies shaped as spatial narratives — rhythm, type, and motion
            locked to the same beat.
          </p>
        </div>

        <ul className="flex flex-col">
          {projects.map((project, index) => (
            <li key={project.id} data-project className="group relative">
              <div
                data-project-line
                className="mb-[var(--space-2xl)] h-px w-full bg-[var(--border)] md:mb-[var(--space-3xl)]"
                aria-hidden
              />
              <article className="grid gap-[var(--space-2xl)] pb-[var(--space-sm)] md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-[var(--space-4xl)] md:pb-[var(--space-lg)]">
                <div className="flex items-start justify-between gap-6 md:block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] md:mt-6 md:block">
                    {project.year}
                  </span>
                </div>

                <div className="space-y-6">
                  <h3 className="ds-title-accent font-display text-3xl tracking-[var(--tracking-tight)] text-[var(--fg)] md:text-[2.15rem]">
                    {project.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--muted-strong)] md:text-[1.05rem]">
                    {project.synopsis}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                    <span>{project.role}</span>
                    {project.stack.map((tag) => (
                      <span key={tag} className="text-[var(--muted)]">
                        <span className="text-[var(--border-strong)]">·</span>{" "}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
