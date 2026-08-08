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
      className={`relative overflow-hidden ${className}`}
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
          className="h-full w-full object-contain object-center"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
          aria-hidden
        >
          <div className="rounded-2xl border border-line bg-surface px-5 py-8 text-center shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] text-subtle">
              {String(project.id).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-ink">
              {project.title}
            </p>
            <p className="mt-2 max-w-[12rem] text-xs text-muted">
              Drop image at {project.image}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
