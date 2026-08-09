import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatProjectNumber, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const number = formatProjectNumber(project.id);

  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      className="project-card"
      aria-label={`Open project: ${project.title}`}
    >
      <div className="project-card__body">
        <div>
          <p className="project-card__number">{number}</p>
          <h3
            className="project-card__title"
            style={
              {
                viewTransitionName: `project-title-${project.slug}`,
              } as CSSProperties
            }
          >
            {project.title}
          </h3>
          <p className="project-card__desc">{project.shortDescription}</p>
          <ul className="project-card__stack">
            {project.stack.map((tech) => (
              <li key={tech} className="project-card__tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <span className="project-card__cta">
          Open project
          <ArrowRight className="icon" />
        </span>
      </div>

      <div className="project-card__media">
        <ProjectVisual
          project={project}
          className="project-card__visual"
          transitionName={`project-image-${project.slug}`}
        />
      </div>
    </Link>
  );
}
