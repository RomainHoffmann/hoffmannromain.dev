import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectExpandedOverlay } from "@/components/sections/ProjectExpandedOverlay";
import type { Project } from "@/types/project";

type ProjectGridSectionProps = {
  projects: Project[];
};

export function ProjectGridSection({ projects }: ProjectGridSectionProps) {
  return (
    <section className="home" aria-label="Projects">
      <ul className="home__list">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <ProjectExpandedOverlay />
    </section>
  );
}
