import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  formatProjectNumber,
  type Project,
} from "@/data/projects";
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
      className="group grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-300 hover:border-black/10 hover:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)] focus-visible:border-accent md:grid-cols-[1.05fr_0.95fr]"
      aria-label={`Open case study: ${project.title}`}
    >
      <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
        <div>
          <p className="text-sm font-semibold text-accent">{number}</p>
          <h3
            className="mt-3 text-[clamp(1.6rem,3vw,2.15rem)] font-extrabold uppercase tracking-[-0.03em] text-ink"
            style={
              {
                viewTransitionName: `project-title-${project.slug}`,
              } as CSSProperties
            }
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {project.shortDescription}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Open case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>

      <div className="relative min-h-[220px] bg-neutral-50 md:min-h-[280px]">
        <ProjectVisual
          project={project}
          className="absolute inset-0 p-6 transition-transform duration-500 group-hover:scale-[1.02] sm:p-8"
          transitionName={`project-image-${project.slug}`}
        />
      </div>
    </Link>
  );
}
