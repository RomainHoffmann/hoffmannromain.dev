import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  transitionName?: string;
};

export function ProjectVisual({
  project,
  className = "",
  priority = false,
  transitionName,
}: ProjectVisualProps) {
  return (
    <div
      className={["project-visual", className].filter(Boolean).join(" ")}
      style={
        transitionName
          ? ({ viewTransitionName: transitionName } as CSSProperties)
          : undefined
      }
    >
      <img
        src={project.image}
        alt={`${project.title} product preview`}
        width={project.imageWidth}
        height={project.imageHeight}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="project-visual__img"
      />
    </div>
  );
}
