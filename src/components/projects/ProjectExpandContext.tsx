"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Project } from "@/types/project";

const ProjectExpandOverlay = dynamic(
  () =>
    import("@/components/projects/ProjectExpandOverlay").then(
      (m) => m.ProjectExpandOverlay,
    ),
  { ssr: false },
);

type ExpandPayload = {
  project: Project;
  rect: DOMRect;
};

type ProjectExpandContextValue = {
  expand: (project: Project, originEl: HTMLElement | null) => void;
  close: () => void;
};

const ProjectExpandContext = createContext<ProjectExpandContextValue | null>(
  null,
);

export function ProjectExpandProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<ExpandPayload | null>(null);

  const expand = useCallback(
    (project: Project, originEl: HTMLElement | null) => {
      const rect = originEl?.getBoundingClientRect();
      if (!rect?.width) return;
      setPayload({ project, rect });
      document.body.setAttribute("data-project-expand", "open");
      document.body.style.overflow = "hidden";
    },
    [],
  );

  const close = useCallback(() => {
    setPayload(null);
    document.body.removeAttribute("data-project-expand");
    document.body.style.overflow = "";
  }, []);

  /** Stable identity — cards must not rerender when overlay mounts (payload change). */
  const value = useMemo(
    () => ({
      expand,
      close,
    }),
    [expand, close],
  );

  return (
    <ProjectExpandContext.Provider value={value}>
      {children}
      {payload ? (
        <ProjectExpandOverlay
          key={payload.project.slug}
          project={payload.project}
          originRect={payload.rect}
          onDismiss={close}
        />
      ) : null}
    </ProjectExpandContext.Provider>
  );
}

export function useProjectExpand(): ProjectExpandContextValue {
  const ctx = useContext(ProjectExpandContext);
  if (!ctx) {
    throw new Error(
      "useProjectExpand must be used within ProjectExpandProvider",
    );
  }
  return ctx;
}
