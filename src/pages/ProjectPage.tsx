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
      className="min-h-dvh pb-32 pt-24 lg:pb-20 lg:pt-28"
      aria-labelledby="project-title"
    >
      <div className="page-shell content-pad-right grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)] lg:gap-8">
        <div className="max-w-xl">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            data-reveal
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to projects
          </Link>

          <p className="mt-8 text-sm font-semibold text-accent" data-reveal>
            {formatProjectNumber(project.id)}
          </p>

          <h1
            id="project-title"
            className="mt-3 section-title"
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

          <p
            className="mt-5 text-[clamp(1.05rem,2vw,1.25rem)] font-medium leading-snug text-ink"
            data-reveal
          >
            {project.shortDescription}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" data-reveal>
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {tech}
              </li>
            ))}
          </ul>

          <p
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted"
            data-reveal
          >
            {project.description}
          </p>

          {(project.links?.website || project.links?.github) && (
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Visit website
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-subtle"
                >
                  <GitHubIcon className="size-4" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        <div
          className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
          data-reveal
        >
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-100 sm:aspect-[5/6]">
            <ProjectVisual
              project={project}
              priority
              className="h-full w-full p-6 sm:p-10"
              transitionName={`project-image-${project.slug}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
