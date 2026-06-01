import { Project } from "@/types/project";
import fs from "fs";

export const getProjectGalleryImages = (projectSlug: Project["slug"]) => {
  const projectScreens = fs.readdirSync(
    `public/projects/screens/${projectSlug}`,
  );
  return projectScreens.map((screen) => {
    return {
      src: `/projects/screens/${projectSlug}/${screen}`,
      alt: screen,
    };
  });
};
