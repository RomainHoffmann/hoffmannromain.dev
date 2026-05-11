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

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly year: string;
  readonly status: ProjectStatus;
  readonly type: string;
  readonly role: string;
  readonly context: string;
  readonly liveUrl: string | null;
  readonly coverImage: string;
  readonly galleryImages: readonly string[];
  readonly theme: ProjectTheme;
}
