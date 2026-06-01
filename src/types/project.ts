export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly coverImage: string;
  readonly galleryImages: { src: string; alt: string }[];
  readonly theme: ProjectTheme;
  readonly year: string;
  readonly status: string;
  readonly type: string;
  readonly role: string;
  readonly context: string;
  readonly liveUrl: string;
}

export type ProjectTheme = {
  readonly textColor: string;
  readonly sceneBackground: string;
};
