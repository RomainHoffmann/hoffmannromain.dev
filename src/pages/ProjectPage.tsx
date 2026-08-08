import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GitHubIcon } from "@/components/icons";
import { ProjectVisual } from "@/components/ProjectVisual";
import {
  formatProjectNumber,
  getProjectBySlug,
} from "@/data/projects";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);
  const pageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} — Romain Hoffmann`;
    return () => {
      document.title = "Romain Hoffmann — Full-stack Developer";
    };
  }, [project]);

  useEffect(() => {
    if (reducedMotion || !pageRef.current || !project) return;

    const ctx = fadeUp(pageRef.current.querySelectorAll("[data-reveal]"), {
      stagger: 0.08,
      y: 16,
      duration: 0.45,
    });

    return () => {
      ctx.kill();
    };
  }, [project, reducedMotion]);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return (
    <main
      ref={pageRef}
      className="project-page"
      aria-labelledby="project-title"
    >
      <div className="page-shell content-pad-right project-page__grid">
        <div className="project-page__copy">
          <Link to="/#projects" className="project-page__back" data-reveal>
            <ArrowLeft className="icon" aria-hidden />
            Back to projects
          </Link>

          <p className="project-page__number" data-reveal>
            {formatProjectNumber(project.id)}
          </p>

          <h1
            id="project-title"
            className="section-title project-page__title"
            data-reveal
            style={
              {
                viewTransitionName: `project-title-${project.slug}`,
              } as CSSProperties
            }
          >
            {project.title.toUpperCase()}.
            <span className="accent-dot" aria-hidden />
          </h1>

          <p className="project-page__tagline" data-reveal>
            {project.shortDescription}
          </p>

          <ul className="project-page__stack" data-reveal>
            {project.stack.map((tech) => (
              <li key={tech} className="project-page__tag">
                {tech}
              </li>
            ))}
          </ul>

          <p className="project-page__desc" data-reveal>
            {project.description}
          </p>

          {(project.links?.website || project.links?.github) && (
            <div className="project-page__links" data-reveal>
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  Visit website
                  <ArrowUpRight className="icon" aria-hidden />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--secondary"
                >
                  <GitHubIcon className="icon" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        <div className="project-page__visual-wrap" data-reveal>
          <div className="project-page__visual">
            <ProjectVisual
              project={project}
              priority
              transitionName={`project-image-${project.slug}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
