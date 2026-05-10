"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/projects";
import { registerProjectGridMotion } from "@/lib/motion/timelines";

type ProjectGridSectionProps = {
  projects: Project[];
};

const editorialLayouts = [
  "lg:col-span-7 lg:min-h-[min(85vh,38rem)]",
  "lg:col-span-5 lg:min-h-[min(92vh,42rem)]",
  "lg:col-span-10 lg:col-start-2 lg:min-h-[min(72vh,34rem)]",
];

export function ProjectGridSection({ projects }: ProjectGridSectionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      registerProjectGridMotion(section);
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
            Large-format studies — image, type, and metadata in one frame.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-[var(--space-2xl)] lg:grid-cols-12 lg:gap-x-[var(--space-xl)] lg:gap-y-[var(--space-2xl)]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={
                editorialLayouts[index] ??
                "lg:col-span-12 lg:min-h-[min(70vh,32rem)]"
              }
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
