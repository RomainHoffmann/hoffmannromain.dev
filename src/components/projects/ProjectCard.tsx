"use client";

import Image from "next/image";
import { memo, useCallback, useRef } from "react";
import { useProjectExpand } from "@/components/projects/ProjectExpandContext";
import type { Project } from "@/types/project";

const TILE_W = 100;
const TILE_H = 800;

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function ProjectCardInner({ project, priority = false }: ProjectCardProps) {
  const { expand } = useProjectExpand();
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefetchOnce = useRef(false);

  const warmExpandChunk = useCallback(() => {
    if (prefetchOnce.current) return;
    prefetchOnce.current = true;
    void import("@/components/projects/ProjectExpandOverlay");
  }, []);

  const open = () => {
    const media = mediaRef.current;
    if (!media) return;

    const img = media.querySelector("img");
    const objectPosition = img
      ? getComputedStyle(img).objectPosition
      : "50% 50%";

    expand(project, media, objectPosition);
  };

  return (
    <button
      type="button"
      className="project-card"
      onPointerEnter={warmExpandChunk}
      onClick={open}
      aria-label={`Open ${project.title}`}
    >
      <div ref={mediaRef} className="project-card__media">
        <Image
          src={project.coverImage}
          alt=""
          role="presentation"
          width={TILE_W}
          height={TILE_H}
          priority={priority}
          quality={90}
          decoding="async"
          sizes="50px"
          className="project-card__image u-img-cover"
        />
      </div>
    </button>
  );
}

export const ProjectCard = memo(ProjectCardInner);
