"use client";

import { ProjectSelectionProvider } from "@/components/projects/ProjectSelectionProvider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ProjectSelectionProvider>{children}</ProjectSelectionProvider>;
}
