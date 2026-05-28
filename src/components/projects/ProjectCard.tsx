"use client";

import Image from "next/image";
import { memo, useCallback, useRef } from "react";
import { useProjectExpand } from "@/components/projects/ProjectExpandContext";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function ProjectCardInner({ project, priority = false }: ProjectCardProps) {
  const { expand } = useProjectExpand();
  const root = useRef<HTMLButtonElement>(null);
  const prefetchOnce = useRef(false);

  const warmExpandChunk = useCallback(() => {
    if (prefetchOnce.current) return;
    prefetchOnce.current = true;
    void import("@/components/projects/ProjectExpandOverlay");
  }, []);

  const open = () => {
    if (!root.current) return;
    expand(project, root.current);
  };

  return (
    <button
      ref={root}
      type="button"
      className="project-card"
      onPointerEnter={warmExpandChunk}
      onClick={open}
      aria-label={`Open ${project.title}`}
    >
      <span className="project-card__media">
        <Image
          src={project.coverImage}
          alt=""
          role="presentation"
          fill
          priority={priority}
          decoding="async"
          sizes="100vw"
          className="u-img-cover"
        />
      </span>
    </button>
  );
}

export const ProjectCard = memo(ProjectCardInner);
