"use client";

import Image from "next/image";
import { memo, type MouseEvent } from "react";
import type { Project } from "@/types/project";

const TILE_W = 150;
const TILE_H = 1200;

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
  const preventSelectFlash = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      type="button"
      className="project-card"
      onMouseDown={preventSelectFlash}
      onClick={onOpen}
      aria-label={`Open ${project.title}`}
    >
      <div data-project-tile className="project-card__media">
        <Image
          src={project.coverImage}
          alt=""
          role="presentation"
          width={TILE_W}
          height={TILE_H}
          priority={priority}
          quality={100}
          decoding="async"
          sizes="100vw"
          className="project-card__image u-img-cover"
        />
      </div>
    </button>
  );
}

export const ProjectCard = memo(ProjectCardInner);
