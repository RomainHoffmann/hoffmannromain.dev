"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/types/project";

type ProjectSelectionContextValue = {
  selected: Project | null;
  select: (project: Project) => void;
  clear: () => void;
  isSelected: (project: Project) => boolean;
};

const ProjectSelectionContext =
  createContext<ProjectSelectionContextValue | null>(null);

export function ProjectSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Project | null>(null);

  const select = useCallback((project: Project) => {
    setSelected(project);
  }, []);

  const clear = useCallback(() => {
    setSelected(null);
  }, []);

  const isSelected = useCallback(
    (project: Project) => selected?.id === project.id,
    [selected],
  );

  const value = useMemo(
    () => ({ selected, select, clear, isSelected }),
    [selected, select, clear, isSelected],
  );

  return (
    <ProjectSelectionContext.Provider value={value}>
      {children}
    </ProjectSelectionContext.Provider>
  );
}

export function useProjectSelection(): ProjectSelectionContextValue {
  const ctx = useContext(ProjectSelectionContext);
  if (!ctx) {
    throw new Error(
      "useProjectSelection must be used within ProjectSelectionProvider",
    );
  }
  return ctx;
}
