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
import { overlayMotion } from "@/lib/motion/config";
import type { Project, ProjectStatus } from "@/types/project";

type ProjectExpandOverlayProps = {
  project: Project;
  originRect: DOMRect;
  onDismiss: () => void;
};

function excerptDescription(text: string, max = 200): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

function formatStatus(status: ProjectStatus): string {
  return status.replaceAll("_", " ");
}

export function ProjectExpandOverlay({
  project,
  originRect,
  onDismiss,
}: ProjectExpandOverlayProps) {
  const lenisRef = useLenisRef();
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const heroDetailsRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
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
    const lead = leadRef.current;
    const heroDetails = heroDetailsRef.current;
    const gallerySection = gallerySectionRef.current;
    if (!stage || !backdrop) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const rx = originRect.left;
      const ry = originRect.top;
      const sx = originRect.width / vw;
      const sy = originRect.height / window.innerHeight;

      const flipDur = reduceMotion ? 0.01 : overlayMotion.flipIn;
      const bdDur = reduceMotion ? 0.01 : overlayMotion.backdropIn;

      gsap.set(stage, {
        x: rx,
        y: ry,
        scaleX: sx,
        scaleY: sy,
        transformOrigin: "0 0",
        force3D: true,
      });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set([title, lead, heroDetails].filter(Boolean), {
        opacity: 0,
        y: 22,
        force3D: true,
      });
      const galleryItems =
        gallerySection?.querySelectorAll("[data-expand-gallery-item]");
      if (galleryItems?.length) {
        gsap.set(galleryItems, { opacity: 0, y: 18, force3D: true });
      }

      const tl = gsap.timeline({
        defaults: { ease: overlayMotion.easeFlip },
      });

      tl.to(
        stage,
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: flipDur,
          ease: overlayMotion.easeFlip,
          force3D: true,
        },
        0,
      );

      tl.to(
        backdrop,
        {
          opacity: reduceMotion ? 0.82 : 0.94,
          duration: bdDur,
          ease: overlayMotion.easeContent,
        },
        0,
      );

      const tOff = reduceMotion ? 0 : overlayMotion.contentEnterAt;
      tl.to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : overlayMotion.titleIn,
          ease: overlayMotion.easeContent,
          force3D: true,
        },
        tOff,
      );

      tl.to(
        lead,
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : overlayMotion.leadIn,
          ease: overlayMotion.easeContent,
          force3D: true,
        },
        tOff + 0.06,
      );

      tl.to(
        heroDetails,
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : overlayMotion.detailsIn,
          ease: overlayMotion.easeContent,
          force3D: true,
        },
        tOff + 0.14,
      );

      const galleryStart = reduceMotion
        ? 0.01
        : tOff + overlayMotion.galleryWaveDelay;

      if (galleryItems?.length && !reduceMotion) {
        tl.to(
          galleryItems,
          {
            opacity: 1,
            y: 0,
            duration: overlayMotion.galleryItemIn,
            stagger: overlayMotion.galleryStaggerIn,
            ease: overlayMotion.easeContent,
            force3D: true,
          },
          galleryStart,
        );
      } else if (galleryItems?.length && reduceMotion) {
        gsap.set(galleryItems, { opacity: 1, y: 0 });
      }
    }, stage);

    return () => {
      ctx.revert();
    };
  }, [originRect, project.slug]);

  const runExit = useCallback(() => {
    if (exitingRef.current || dismissedRef.current) return;
    exitingRef.current = true;

    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    const title = titleRef.current;
    const lead = leadRef.current;
    const heroDetails = heroDetailsRef.current;
    const gallerySection = gallerySectionRef.current;
    if (!stage || !backdrop) {
      dismissAfterExit();
      return;
    }

    const vw = window.innerWidth;
    const rx = originRect.left;
    const ry = originRect.top;
    const sx = originRect.width / vw;
    const sy = originRect.height / window.innerHeight;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const galleryItems =
      gallerySection?.querySelectorAll("[data-expand-gallery-item]");

    const exit = gsap.timeline({
      onComplete: dismissAfterExit,
    });

    if (galleryItems?.length) {
      exit.to(
        galleryItems,
        {
          opacity: 0,
          y: 14,
          duration: reduceMotion ? 0.01 : overlayMotion.exitGalleryDur,
          stagger: overlayMotion.exitGalleryStagger,
          ease: overlayMotion.easeExit,
        },
        0,
      );
    }

    exit.to(
      [heroDetails, lead, title].filter(Boolean),
      {
        opacity: 0,
        y: 14,
        duration: reduceMotion ? 0.01 : overlayMotion.exitContentDur,
        ease: overlayMotion.easeExit,
      },
      overlayMotion.exitContentAt,
    );

    exit.to(
      backdrop,
      {
        opacity: 0,
        duration: reduceMotion ? 0.01 : overlayMotion.exitBackdropDur,
      },
      overlayMotion.exitBackdropAt,
    );

    exit.to(
      stage,
      {
        x: rx,
        y: ry,
        scaleX: sx,
        scaleY: sy,
        duration: reduceMotion ? 0.01 : overlayMotion.exitFlipDur,
        ease: overlayMotion.easeFlip,
        force3D: true,
      },
      overlayMotion.exitFlipAt,
    );
  }, [dismissAfterExit, originRect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") runExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runExit]);

  const mediaFrames =
    project.galleryImages.length > 0
      ? [...project.galleryImages]
      : [project.coverImage];
  const previewSrc = mediaFrames[0];
  const thumbFrames =
    mediaFrames.length > 1 ? mediaFrames.slice(1) : [mediaFrames[0]];

  const stageStyle = {
    "--project-accent": project.theme.textColor,
    "--project-scene": project.theme.sceneBackground,
  } as CSSProperties;

  return createPortal(
    <div className="expand-overlay">
      <div
        ref={backdropRef}
        className="expand-overlay__backdrop"
        style={{ opacity: 0 }}
        aria-hidden
      />

      <div
        ref={stageRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expand-project-title"
        className="expand-overlay__stage"
        style={stageStyle}
      >
        <div className="expand-overlay__atmos">
          <div className="expand-overlay__hero-img-wrap">
            <Image
              src={project.coverImage}
              alt=""
              fill
              priority
              fetchPriority="high"
              decoding="async"
              className="u-img-cover"
              sizes="100vw"
            />
          </div>
          <div className="expand-overlay__grad-v" aria-hidden />
          <div className="expand-overlay__grad-h" aria-hidden />
          <div className="expand-overlay__grad-radial" aria-hidden />
          <div className="ds-edge-dim" aria-hidden />
          <div className="ds-noise ds-noise--animated" aria-hidden />
        </div>

        <div className="expand-overlay__chrome">
          <button type="button" onClick={runExit} className="expand-overlay__close type-nav">
            Close — Esc
          </button>
        </div>

        <div className="expand-overlay__scroll">
          <div className="expand-overlay__content">
            <div ref={gallerySectionRef} className="expand-overlay__gallery-wrap">
              <div className="expand-overlay__gallery-grid">
                <div data-expand-gallery-item className="expand-overlay__preview">
                  <Image
                    src={previewSrc}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={previewSrc !== project.coverImage}
                    fetchPriority="high"
                    decoding="async"
                    className="u-img-cover"
                  />
                </div>

                <div className="expand-overlay__thumbs-shell">
                  <div className="expand-overlay__thumbs expand-thumb-strip">
                    {thumbFrames.map((src, i) => (
                      <div
                        key={`${src}-${i}`}
                        data-expand-gallery-item
                        className="expand-overlay__thumb"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="u-img-cover"
                          sizes="(max-width: 1023px) 120px, 88px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="expand-overlay__intro">
              <h2 id="expand-project-title" ref={titleRef} className="expand-overlay__title type-expand-title">
                {project.title}
              </h2>

              <p ref={leadRef} className="expand-overlay__lead type-lead">
                {excerptDescription(project.description)}
              </p>
            </div>

            <div ref={heroDetailsRef} className="expand-overlay__details">
              <div className="expand-overlay__meta-row type-meta">
                <span>{project.type}</span>
                <span className="expand-overlay__meta-sep">·</span>
                <span className="u-tabular-nums">{project.year}</span>
                <span className="expand-overlay__meta-sep">·</span>
                <span>{formatStatus(project.status)}</span>
              </div>

              <p className="expand-overlay__context type-body">{project.context}</p>
              <p className="expand-overlay__role type-caption">{project.role}</p>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="expand-overlay__live-link type-nav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="expand-overlay__live-line" aria-hidden />
                  View live
                </a>
              ) : (
                <p className="type-meta expand-overlay__link-muted">Live link coming soon</p>
              )}
            </div>

            <p className="expand-overlay__description type-body">{project.description}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
