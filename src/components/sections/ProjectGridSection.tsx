"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SITE } from "@/constants/site";
import type { Project } from "@/types/project";
import { registerProjectGridMotion } from "@/lib/motion/timelines";

type ProjectGridSectionProps = {
  projects: Project[];
};

const editorialCellClasses = [
  "project-grid__cell project-grid__cell--layout-a",
  "project-grid__cell project-grid__cell--layout-b",
  "project-grid__cell project-grid__cell--layout-c",
] as const;

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
      className="project-grid"
      aria-labelledby="work-heading"
    >
      <div className="project-grid__inner">
        <h1 id="work-heading" className="sr-only">
          {SITE.title}
        </h1>
        <div className="project-grid__layout">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={
                editorialCellClasses[index] ??
                "project-grid__cell project-grid__cell--layout-default"
              }
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
