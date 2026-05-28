/**
 * Canonical project model for portfolio content (CMS-ready shape).
 */

/** Lifecycle for filtering / badges */
export type ProjectStatus =
  | "concept"
  | "draft"
  | "in_progress"
  | "shipped"
  | "archived";

export type ProjectTheme = {
  textColor: string;
  sceneBackground: string;
};

type ProjectType =
  | "Website"
  | "Mobile app"
  | "SaaS"
  | "Landing page"
  | "Dashboard"
  | "Portfolio"
  | "Game"
  | "Creative dev"
  | "3D Experience"
  | "AI tool"
  | "Automation"
  | "E-commerce"
  | "CMS"
  | "Browser extension"
  | "Other";

type ProjectContext =
  | "Personal"
  | "Client"
  | "Freelance"
  | "Startup"
  | "Agency"
  | "Open source";

type ProjectRole =
  | "Full stack developer"
  | "Frontend developer"
  | "Backend developer"
  | "Solo developer";

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly year: string;
  readonly status: ProjectStatus;
  readonly type: ProjectType;
  readonly role: ProjectRole;
  readonly context: ProjectContext;
  readonly liveUrl: string | null;
  readonly coverImage: string;
  readonly galleryImages: readonly string[];
  readonly theme: ProjectTheme;
}
