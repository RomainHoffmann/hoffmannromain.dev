"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SITE } from "@/constants/site";
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
      className="flex min-h-[100dvh] flex-col px-gutter py-section md:px-gutter-lg md:py-section-lg"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto flex w-full max-w-[120rem] flex-1 flex-col">
        <h1 id="work-heading" className="sr-only">
          {SITE.title}
        </h1>
        <div className="grid flex-1 grid-cols-1 gap-y-[var(--space-2xl)] lg:grid-cols-12 lg:gap-x-[var(--space-xl)] lg:gap-y-[var(--space-2xl)]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
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
