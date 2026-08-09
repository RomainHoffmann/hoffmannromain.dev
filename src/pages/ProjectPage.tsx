import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  AppStoreIcon,
  GitHubIcon,
  PlayStoreIcon,
} from "@/components/icons";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TechTags } from "@/components/TechTags";
import { getProjectBySlug } from "@/data/projects";
import { fadeUp } from "@/lib/animations";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);
  const pageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  usePageMeta({
    title: project
      ? `${project.title} — Romain Hoffmann`
      : "Romain Hoffmann — Full-stack Developer",
    description: project?.description ?? "",
    path: project ? `/projects/${project.slug}` : "/",
    image: project
      ? `https://hoffmannromain.dev${project.image}`
      : undefined,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

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
            <span className="title-line--dot">
              {project.title.toUpperCase()}
              <span className="accent-dot" aria-hidden />
            </span>
          </h1>

          <p className="project-page__role" data-reveal>
            {project.role}
          </p>

          <p className="project-page__tagline" data-reveal>
            {project.shortDescription}
          </p>

          <TechTags
            items={project.stack}
            className="project-page__stack"
            data-reveal
          />

          <p className="project-page__desc" data-reveal>
            {project.description}
          </p>

          {(project.links?.website ||
            project.links?.github ||
            project.links?.appStore ||
            project.links?.playStore) && (
            <div className="project-page__links" data-reveal>
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  Visit website
                  <ArrowUpRight
                    className="icon project-page__link-icon"
                    aria-hidden
                  />
                </a>
              )}
              {project.links.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline"
                >
                  <AppStoreIcon className="icon" />
                  App Store
                </a>
              )}
              {project.links.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline"
                >
                  <PlayStoreIcon className="icon" />
                  Google Play
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--outline"
                >
                  <GitHubIcon className="icon" aria-hidden />
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
