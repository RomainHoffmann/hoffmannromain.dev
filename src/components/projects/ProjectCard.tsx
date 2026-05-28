"use client";

import Image from "next/image";
import { memo, useCallback, useRef, type MouseEvent } from "react";
import type { Project } from "@/types/project";

const TILE_W = 100;
const TILE_H = 800;

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  onOpen: () => void;
};

function ProjectCardInner({
  project,
  priority = false,
  onOpen,
}: ProjectCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefetchOnce = useRef(false);

  const warmExpandChunk = useCallback(() => {
    if (prefetchOnce.current) return;
    prefetchOnce.current = true;
    void import("@/components/projects/ProjectExpandOverlay");
  }, []);

  const preventSelectFlash = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      type="button"
      className="project-card"
      onPointerEnter={warmExpandChunk}
      onMouseDown={preventSelectFlash}
      onClick={onOpen}
      aria-label={`Open ${project.title}`}
    >
      <div ref={mediaRef} data-project-tile className="project-card__media">
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
