import { useState, type CSSProperties } from "react";
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
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={["project-visual", className].filter(Boolean).join(" ")}
      style={
        transitionName
          ? ({ viewTransitionName: transitionName } as CSSProperties)
          : undefined
      }
    >
      {!failed ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="project-visual__img"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="project-visual__fallback" aria-hidden>
          <div className="project-visual__fallback-card">
            <p className="project-visual__fallback-number">
              {String(project.id).padStart(2, "0")}
            </p>
            <p className="project-visual__fallback-title">{project.title}</p>
            <p className="project-visual__fallback-hint">
              Drop image at {project.image}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
