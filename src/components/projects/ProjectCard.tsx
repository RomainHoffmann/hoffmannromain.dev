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
      className="group block h-full min-h-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
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
        className={`ds-card-depth relative flex h-full min-h-[min(76vw,23rem)] flex-col overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] ${className}`}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div ref={shiftRef} className="absolute -inset-[4%]">
              <div className="ds-media-reveal relative h-full w-full transition-transform duration-[var(--duration-emphasis)] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]">
                <Image
                  src={project.coverImage}
                  alt=""
                  role="presentation"
                  fill
                  priority={priority}
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 52vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_78%_72%_at_50%_88%,transparent_22%,rgba(0,0,0,0.78)_100%)] opacity-[0.4] transition-opacity duration-[var(--duration-emphasis)] ease-[var(--ease-out-expo)] group-hover:opacity-[0.58]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-black/17 transition-colors duration-[var(--duration-emphasis)] ease-[var(--ease-out-expo)] group-hover:bg-black/38"
            aria-hidden
          />
        </div>

        <div className="relative z-[3] mt-auto w-full p-6 pt-[38%] md:p-8 md:pt-[36%] lg:pt-[32%]">
          <div
            className="translate-y-0 opacity-100 transition-[transform,opacity] duration-[var(--duration-emphasis)] ease-[var(--ease-out-expo)] lg:translate-y-3 lg:opacity-[0.82] lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          >
            <h3 className="type-project-title text-[var(--fg)]">
              {project.title}
            </h3>
            <p className="type-meta mt-3 text-[var(--muted-strong)]">
              {project.type}
            </p>
            <p className="type-caption mt-2 tabular-nums tracking-[0.14em] text-[var(--muted)]">
              {project.year}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export const ProjectCard = memo(ProjectCardInner);
