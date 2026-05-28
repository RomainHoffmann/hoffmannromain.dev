import type { Project } from "@/types/project";

export type { Project, ProjectTheme } from "@/types/project";

const mangeznotez: Project = {
  id: "mangeznotez",
  slug: "mangeznotez",
  title: "mangeznotez",
  description:
    "Produit autour des expériences culinaires partagées. Interface sobre, focus sur la mise en scène des contenus et le rythme de lecture.",
  year: "2024",
  status: "shipped",
  type: "Website",
  role: "Full stack developer",
  context: "Startup — produit autour des expériences culinaires partagées.",
  liveUrl: "https://example.com",
  coverImage:
    "https://images.freeimages.com/images/large-previews/d9d/festive-family-meal-0410-5702854.jpg?w=1500",
  galleryImages: [],
  theme: {
    textColor: "#ff5321",
    sceneBackground: "#111111",
  },
};

export const projects: Project[] = [mangeznotez, mangeznotez, mangeznotez];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
