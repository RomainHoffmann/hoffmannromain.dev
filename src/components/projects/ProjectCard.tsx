"use client";

import Image from "next/image";
import { useProjectSelection } from "@/components/projects/ProjectSelectionProvider";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { select, isSelected } = useProjectSelection();
  const selected = isSelected(project);

  return (
    <button
      type="button"
      className="project-card"
      onClick={() => select(project)}
      aria-label={project.title}
      aria-pressed={selected}
    >
      <div className="project-card__media">
        <Image
          src={project.coverImage}
          alt=""
          role="presentation"
          width={150}
          height={1200}
          sizes="400px"
          quality={90}
          className="project-card__image u-img-cover"
        />
      </div>
    </button>
  );
}
