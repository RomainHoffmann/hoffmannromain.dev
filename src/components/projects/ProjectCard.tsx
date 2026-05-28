import Image from "next/image";
import { memo } from "react";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function ProjectCardInner({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__media">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={priority}
          decoding="async"
          sizes="50px"
          className="u-img-cover"
        />
      </div>
    </article>
  );
}

export const ProjectCard = memo(ProjectCardInner);
