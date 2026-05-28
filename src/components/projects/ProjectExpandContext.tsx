"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { markExpandGridHidden } from "@/lib/expand-frame";
import { ProjectExpandOverlay } from "@/components/projects/ProjectExpandOverlay";
import type { RectSnapshot } from "@/lib/expand-frame";
import type { Project } from "@/types/project";

export type TileSnapshot = {
  project: Project;
  rect: RectSnapshot;
  objectPosition: string;
};

export type ExpandPayload = {
  id: string;
  activeIndex: number;
  tiles: TileSnapshot[];
};

type ProjectExpandContextValue = {
  expand: (activeIndex: number, tiles: TileSnapshot[]) => void;
  close: () => void;
  isOpen: boolean;
  activeIndex: number | null;
};

const ProjectExpandContext = createContext<ProjectExpandContextValue | null>(
  null,
);

export function ProjectExpandProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<ExpandPayload | null>(null);

  const expand = useCallback((activeIndex: number, tiles: TileSnapshot[]) => {
    if (!tiles.length) return;
    markExpandGridHidden(false);
    setPayload({
      id: crypto.randomUUID(),
      activeIndex,
      tiles,
    });
    document.body.setAttribute("data-project-expand", "open");
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setPayload(null);
    document.body.removeAttribute("data-project-expand");
    document.body.style.removeProperty("overflow");
    markExpandGridHidden(false);
  }, []);

  const value = useMemo(
    () => ({
      expand,
      close,
      isOpen: payload !== null,
      activeIndex: payload?.activeIndex ?? null,
    }),
    [expand, close, payload],
  );

  return (
    <ProjectExpandContext.Provider value={value}>
      {children}
      {payload ? (
        <ProjectExpandOverlay
          key={payload.id}
          activeIndex={payload.activeIndex}
          tiles={payload.tiles}
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
