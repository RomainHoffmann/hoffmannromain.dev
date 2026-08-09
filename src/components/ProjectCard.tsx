import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatProjectNumber, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TechTags } from "@/components/TechTags";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const number = formatProjectNumber(project.id);
  const reverse = Boolean(project.visualStart);

  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      className={["project-card", reverse ? "project-card--reverse" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Open project: ${project.title}`}
    >
      <div className="project-card__body">
        <div>
          <div className="project-card__meta">
            <p className="project-card__number">{number}</p>
            <p className="project-card__role">{project.role}</p>
          </div>
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
          <TechTags items={project.stack} className="project-card__stack" />
        </div>

        <span className="project-card__cta">
          Open project
          <ArrowRight className="icon" aria-hidden />
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
