"use client";

import Image from "next/image";
import { useProjectSelection } from "@/components/projects/ProjectSelectionProvider";

export function ProjectExpandedOverlay() {
  const { selected } = useProjectSelection();

  if (!selected) return null;

  return (
    <div className="project-expanded" role="dialog" aria-modal="true">
      <Image
        src={selected.coverImage}
        alt={selected.title}
        quality={100}
        layout="fill"
        className="project-expanded__image"
      />
    </div>
  );
}
