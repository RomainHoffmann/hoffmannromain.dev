import { getProjectGalleryImages } from "@/lib/project-gallery";
import type { Project } from "@/types/project";

export type { Project, ProjectTheme } from "@/types/project";

const mangeznotezGallery = getProjectGalleryImages("mangeznotez");

const mangeznotez: Project = {
  id: "mangeznotez",
  slug: "mangeznotez",
  title: "mangeznotez",
  year: "2024",
  status: "shipped",
  type: "Website",
  role: "Full stack developer",
  context: "Agency",
  liveUrl: "https://example.com",
  coverImage:
    "https://images.freeimages.com/images/large-previews/d9d/festive-family-meal-0410-5702854.jpg?w=1500",
  galleryImages: mangeznotezGallery,
  theme: {
    textColor: "#ff5321",
    sceneBackground: "#f8f8f8",
  },
};

export const projects: Project[] = [
  mangeznotez,
  {
    ...mangeznotez,
    id: "mangeznotez-2",
    title: "mangeznotez 2",
    theme: { textColor: "#663131", sceneBackground: "#EDCECE" },
    galleryImages: mangeznotezGallery,
  },
  mangeznotez,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
