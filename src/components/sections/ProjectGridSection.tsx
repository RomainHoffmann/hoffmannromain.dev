import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

type ProjectGridSectionProps = {
  projects: Project[];
};

export function ProjectGridSection({ projects }: ProjectGridSectionProps) {
  return (
    <section className="home" aria-label="Projects">
      <ul className="home__list">
        {projects.map((project, index) => (
          <li key={`${project.slug}-${index}`} className="home__item">
            <ProjectCard project={project} priority={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
