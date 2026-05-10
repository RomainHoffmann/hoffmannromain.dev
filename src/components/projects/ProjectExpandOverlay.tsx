"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { useLenisRef } from "@/components/providers/SmoothScrollProvider";
import type { Project } from "@/types/project";

type ProjectExpandOverlayProps = {
  project: Project;
  originRect: DOMRect;
  onDismiss: () => void;
};

const EASE_FLIP = "power4.inOut";
const EASE_CONTENT = "power3.out";
const DUR_FLIP = 0.82;
const DUR_BACKDROP = 0.42;
const DUR_TITLE = 0.34;
const DUR_META = 0.28;
const DUR_GALLERY_ITEM = 0.26;
const GALLERY_STAGGER = 0.055;

export function ProjectExpandOverlay({
  project,
  originRect,
  onDismiss,
}: ProjectExpandOverlayProps) {
  const lenisRef = useLenisRef();
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);
  const exitingRef = useRef(false);

  const dismissAfterExit = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    const lenis = lenisRef?.current;
    lenis?.stop?.();
    return () => {
      lenis?.start?.();
    };
  }, [lenisRef]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const meta = metaRef.current;
    const gallery = galleryRef.current;
    if (!stage || !backdrop) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rx = originRect.left;
    const ry = originRect.top;
    const sx = originRect.width / vw;
    const sy = originRect.height / vh;

    const flipDur = reduceMotion ? 0.01 : DUR_FLIP;
    const bdDur = reduceMotion ? 0.01 : DUR_BACKDROP;

    gsap.set(stage, {
      x: rx,
      y: ry,
      scaleX: sx,
      scaleY: sy,
      transformOrigin: "0 0",
    });
    gsap.set(backdrop, { opacity: 0 });
    gsap.set([title, tagline, meta].filter(Boolean), {
      opacity: 0,
      y: 28,
    });
    const galleryItems = gallery?.querySelectorAll("[data-expand-gallery-item]");
    if (galleryItems?.length) {
      gsap.set(galleryItems, { opacity: 0, y: 22 });
    }

    const tl = gsap.timeline({ defaults: { ease: EASE_FLIP } });

    tl.to(
      stage,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: flipDur,
        ease: EASE_FLIP,
      },
      0,
    );

    tl.to(
      backdrop,
      {
        opacity: reduceMotion ? 0.82 : 0.94,
        duration: bdDur,
        ease: EASE_CONTENT,
      },
      0,
    );

    const tOffset = reduceMotion ? 0 : 0.34;
    tl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : DUR_TITLE,
        ease: EASE_CONTENT,
      },
      tOffset,
    );

    tl.to(
      tagline,
      {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : DUR_TITLE * 0.95,
        ease: EASE_CONTENT,
      },
      tOffset + 0.06,
    );

    tl.to(
      meta,
      {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : DUR_META,
        ease: EASE_CONTENT,
      },
      tOffset + 0.14,
    );

    if (galleryItems?.length && !reduceMotion) {
      tl.to(
        galleryItems,
        {
          opacity: 1,
          y: 0,
          duration: DUR_GALLERY_ITEM,
          stagger: GALLERY_STAGGER,
          ease: EASE_CONTENT,
        },
        tOffset + 0.26,
      );
    } else if (galleryItems?.length && reduceMotion) {
      gsap.set(galleryItems, { opacity: 1, y: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [originRect, project.slug]);

  const runExit = useCallback(() => {
    if (exitingRef.current || dismissedRef.current) return;
    exitingRef.current = true;

    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const meta = metaRef.current;
    const gallery = galleryRef.current;
    if (!stage || !backdrop) {
      dismissAfterExit();
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rx = originRect.left;
    const ry = originRect.top;
    const sx = originRect.width / vw;
    const sy = originRect.height / vh;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const galleryItems = gallery?.querySelectorAll("[data-expand-gallery-item]");

    const exit = gsap.timeline({
      onComplete: dismissAfterExit,
    });

    if (galleryItems?.length) {
      exit.to(
        galleryItems,
        {
          opacity: 0,
          y: 16,
          duration: reduceMotion ? 0.01 : 0.18,
          stagger: 0.03,
          ease: "power2.in",
        },
        0,
      );
    }

    exit.to(
      [meta, tagline, title].filter(Boolean),
      {
        opacity: 0,
        y: 16,
        duration: reduceMotion ? 0.01 : 0.22,
        ease: "power2.in",
      },
      0.02,
    );

    exit.to(
      backdrop,
      { opacity: 0, duration: reduceMotion ? 0.01 : 0.28 },
      0.06,
    );

    exit.to(
      stage,
      {
        x: rx,
        y: ry,
        scaleX: sx,
        scaleY: sy,
        duration: reduceMotion ? 0.01 : 0.52,
        ease: EASE_FLIP,
      },
      0.04,
    );
  }, [dismissAfterExit, originRect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") runExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runExit]);

  const gallerySources =
    project.galleryImages.length > 0 ? [...project.galleryImages] : [];

  const showPlaceholderFrames = gallerySources.length === 0;

  return createPortal(
    <div className="fixed inset-0 z-[var(--z-modal)]">
      <div
        ref={backdropRef}
        className="absolute inset-0 z-0 bg-[var(--bg-deep)]"
        style={{ opacity: 0 }}
        aria-hidden
      />

      <div
        ref={stageRef}
        className="absolute inset-0 z-[1] h-[100dvh] w-screen overflow-hidden bg-[var(--bg)] will-change-transform"
        style={
          {
            "--project-accent": project.accentColor,
          } as CSSProperties
        }
      >
        <div className="absolute inset-0">
          <Image
            src={project.coverImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_72%,transparent_18%,rgba(0,0,0,0.75)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/25"
            aria-hidden
          />
        </div>

        <div className="relative z-[2] flex max-h-[100dvh] flex-col overflow-y-auto overscroll-contain">
          <div className="flex items-start justify-between gap-4 px-gutter pb-6 pt-[calc(env(safe-area-inset-top)+var(--space-xl))] md:px-gutter-lg">
            <button
              type="button"
              onClick={runExit}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              Close — Esc
            </button>
            <div className="flex flex-wrap items-center justify-end gap-4 font-mono text-[10px] uppercase tracking-[0.22em]">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="text-[var(--muted-strong)] underline-offset-4 hover:text-[var(--accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  className="text-[var(--muted-strong)] underline-offset-4 hover:text-[var(--accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-auto flex flex-col px-gutter pb-[calc(env(safe-area-inset-bottom)+var(--space-4xl))] pt-[min(18vh,8rem)] md:px-gutter-lg md:pb-[var(--space-5xl)]">
            <h2
              ref={titleRef}
              className="font-display text-[clamp(2rem,6.5vw,3.75rem)] leading-[1.05] tracking-[var(--tracking-tight)] text-[var(--fg)]"
            >
              {project.title}
            </h2>
            <p
              ref={taglineRef}
              className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-strong)] md:text-lg"
            >
              {project.tagline}
            </p>

            <div
              ref={metaRef}
              className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-[var(--border)] pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]"
            >
              <span>{project.type}</span>
              <span className="tabular-nums">{project.year}</span>
              <span>{project.role}</span>
              <span>{project.status.replace("_", " ")}</span>
              <span>{project.platform.join(" · ")}</span>
            </div>

            <div
              ref={galleryRef}
              className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5"
            >
              {showPlaceholderFrames ? (
                <>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      data-expand-gallery-item
                      className="relative aspect-[16/10] overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)",
                        }}
                      />
                      <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                        Frame {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                gallerySources.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    data-expand-gallery-item
                    className="relative aspect-[16/10] overflow-hidden border border-[var(--border)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))
              )}
            </div>

            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted-strong)] md:text-base">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
