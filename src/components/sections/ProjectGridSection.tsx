"use client";

import { useRef, type MouseEvent } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjectExpand } from "@/components/projects/ProjectExpandContext";
import type { TileSnapshot } from "@/components/projects/ProjectExpandContext";
import type { Project } from "@/types/project";

type ProjectGridSectionProps = {
  projects: Project[];
};

function collectTiles(
  list: HTMLElement,
  projects: Project[],
): TileSnapshot[] {
  const nodes = list.querySelectorAll<HTMLElement>("[data-project-tile]");

  return Array.from(nodes).map((media, index) => {
    const rect = media.getBoundingClientRect();
    const img = media.querySelector("img");
    const project = projects[index];
    if (!project) {
      throw new Error(`Missing project for tile index ${index}`);
    }

    return {
      project,
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
      objectPosition: img
        ? getComputedStyle(img).objectPosition
        : "50% 50%",
    };
  });
}

export function ProjectGridSection({ projects }: ProjectGridSectionProps) {
  const { expand } = useProjectExpand();
  const listRef = useRef<HTMLUListElement>(null);

  const openAt = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const tiles = collectTiles(list, projects);
    if (!tiles.length) return;
    expand(index, tiles);
  };

  const preventSelectFlash = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section className="home" aria-label="Projects">
      <ul
        ref={listRef}
        className="home__list"
        onMouseDown={preventSelectFlash}
      >
        {projects.map((project, index) => (
          <li key={`${project.slug}-${index}`}>
            <ProjectCard
              project={project}
              priority={index === 0}
              onOpen={() => openAt(index)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
