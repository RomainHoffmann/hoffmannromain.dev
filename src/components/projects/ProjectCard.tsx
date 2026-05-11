"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useProjectExpand } from "@/components/projects/ProjectExpandContext";
import type { Project } from "@/data/projects";
import { rafPointerHandler } from "@/lib/pointerFrame";

type ProjectCardProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

const parallaxMax = 5;

function ProjectCardInner({
  project,
  className = "",
  priority = false,
}: ProjectCardProps) {
  const { expand } = useProjectExpand();
  const root = useRef<HTMLElement>(null);
  const shiftRef = useRef<HTMLDivElement>(null);
  const prefetchOnce = useRef(false);

  const warmExpandChunk = useCallback(() => {
    if (prefetchOnce.current) return;
    prefetchOnce.current = true;
    void import("@/components/projects/ProjectExpandOverlay");
  }, []);

  useGSAP(
    () => {
      const card = root.current;
      const shift = shiftRef.current;
      if (!card || !shift) return;

      gsap.set(shift, { force3D: true });

      const xTo = gsap.quickTo(shift, "x", {
        duration: 1.45,
        ease: "power3.out",
        force3D: true,
      });
      const yTo = gsap.quickTo(shift, "y", {
        duration: 1.45,
        ease: "power3.out",
        force3D: true,
      });

      const onMove = rafPointerHandler((event: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = (event.clientX - r.left) / r.width - 0.5;
        const ny = (event.clientY - r.top) / r.height - 0.5;
        xTo(nx * 2 * parallaxMax);
        yTo(ny * 2 * parallaxMax);
      });

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("pointermove", onMove, { passive: true });
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [project.slug] },
  );

  const open = () => {
    if (!root.current) return;
    expand(project, root.current);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      className="project-card__hitbox"
      onPointerEnter={warmExpandChunk}
      onClick={open}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
    >
      <article
        ref={root}
        data-project-card
        style={
          { "--project-accent": project.accentColor } as CSSProperties
        }
        className={`project-card__article ds-card-depth ${className}`}
      >
        <div className="project-card__media-stack">
          <div className="project-card__media-clip">
            <div ref={shiftRef} className="project-card__media-shift">
              <div className="project-card__media-inner ds-media-reveal">
                <Image
                  src={project.coverImage}
                  alt=""
                  role="presentation"
                  fill
                  priority={priority}
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 52vw, 42vw"
                  className="u-img-cover"
                />
              </div>
            </div>
          </div>

          <div className="project-card__vignette-radial" aria-hidden />
          <div className="project-card__vignette-flat" aria-hidden />
        </div>

        <div className="project-card__body">
          <div className="project-card__body-inner">
            <h3 className="project-card__title type-project-title">
              {project.title}
            </h3>
            <p className="project-card__type type-meta">{project.type}</p>
            <p className="project-card__year type-caption u-tabular-nums">
              {project.year}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export const ProjectCard = memo(ProjectCardInner);
