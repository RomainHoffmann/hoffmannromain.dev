"use client";

import { useProjectSelection } from "@/components/projects/ProjectSelectionProvider";

export function ProjectExpandedOverlay() {
  const { selected, clear } = useProjectSelection();

  if (!selected) return null;

  return (
    <div className="project-expanded" role="dialog" aria-modal="true">
      <p className="project-expanded__title">{selected.title}</p>
      <button type="button" onClick={clear} aria-label="Close">
        Close
      </button>
    </div>
  );
}
