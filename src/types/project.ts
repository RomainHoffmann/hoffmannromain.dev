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

/** Where the work lives — multi-select */
export type ProjectPlatform =
  | "web"
  | "mobile"
  | "desktop"
  | "install"
  | "embedded"
  | "other";

export interface Project {
  /** Stable document id (UUID or slug-like id for keys) */
  readonly id: string;
  /** URL segment — unique, kebab-case */
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly year: number;
  readonly status: ProjectStatus;
  /** Editorial category label (e.g. “Product · Marketing”) */
  readonly type: string;
  readonly platform: readonly ProjectPlatform[];
  readonly role: string;
  /** Brief / constraints / client context */
  readonly context: string;
  readonly stack: readonly string[];
  readonly features: readonly string[];
  readonly liveUrl: string | null;
  readonly githubUrl: string | null;
  readonly videoUrl: string | null;
  /** Primary cover — path under `/public` or absolute URL */
  readonly coverImage: string;
  readonly galleryImages: readonly string[];
  /** Brand tint for this case — CSS hex */
  readonly accentColor: string;
}
