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
import type { Project } from "@/types/project";

type ProjectExpandOverlayProps = {
  project: Project;
  originRect: DOMRect;
  onDismiss: () => void;
};

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="expand-project-title"
        className="absolute inset-0 z-[1] flex max-h-[100dvh] flex-col overflow-hidden bg-[var(--bg)] will-change-transform"
        style={
          {
            "--project-accent": project.accentColor,
          } as CSSProperties
        }
      >
        {/* Immersive atmosphere — low-opacity hero, gradients, grain, vignette */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.42]">
            <Image
              src={project.coverImage}
              alt=""
              fill
              priority
              fetchPriority="high"
              decoding="async"
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)]/95 via-black/55 to-[var(--bg-deep)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/65"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_78%_68%_at_50%_54%,transparent_26%,rgba(0,0,0,0.55)_100%)]"
            aria-hidden
          />
          <div className="ds-edge-dim absolute inset-0" aria-hidden />
          <div className="ds-noise ds-noise--animated absolute inset-0" aria-hidden />
        </div>

        {/* Chrome */}
        <div className="relative z-[3] flex shrink-0 items-start justify-between gap-4 px-gutter pb-3 pt-[calc(env(safe-area-inset-top)+var(--space-md))] md:gap-6 md:pb-4 md:pt-[calc(env(safe-area-inset-top)+var(--space-lg))] lg:px-gutter-lg">
          <button
            type="button"
            onClick={runExit}
            className="type-nav text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Close — Esc
          </button>
          <div className="type-nav flex items-center gap-6">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        {/* Scrollable body — mobile: gallery first (cinematic); lg: editorial → gallery */}
        <div className="relative z-[2] flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="flex flex-1 flex-col px-gutter pb-[calc(env(safe-area-inset-bottom)+var(--space-3xl))] pt-0 md:px-gutter-lg md:pb-[calc(env(safe-area-inset-bottom)+var(--space-5xl))] md:pt-[var(--space-md)] lg:pt-[var(--space-md)]">
            {/* Gallery — order 1 on mobile, order 3 on desktop */}
            <div
              ref={gallerySectionRef}
              className="order-1 -mx-gutter mb-[var(--space-2xl)] lg:order-3 lg:mx-0 lg:mb-0 lg:mt-[var(--space-4xl)]"
            >
              <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[1fr_minmax(4.5rem,5.5rem)] lg:gap-x-[var(--space-2xl)] lg:gap-y-[var(--space-xl)]">
                <div
                  data-expand-gallery-item
                  className="relative aspect-[16/11] min-h-[min(58vw,17.5rem)] overflow-hidden border-y border-[var(--border)] bg-[var(--surface)]/40 md:min-h-[min(52vw,22rem)] lg:aspect-[16/10] lg:min-h-[min(42vh,28rem)] lg:border lg:border-[var(--border)]"
                >
                  <Image
                    src={previewSrc}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={previewSrc !== project.coverImage}
                    fetchPriority="high"
                    decoding="async"
                    className="object-cover"
                  />
                </div>

                <div className="-mx-gutter border-t border-[var(--border)] bg-[var(--bg-elevated)]/55 px-gutter py-[var(--space-md)] lg:mx-0 lg:h-full lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
                  <div className="expand-thumb-strip flex flex-row gap-3 lg:max-h-[min(52vh,28rem)] lg:flex lg:w-full lg:flex-col lg:gap-3 lg:overflow-y-auto lg:overflow-x-visible lg:pb-0">
                    {thumbFrames.map((src, i) => (
                      <div
                        key={`${src}-${i}`}
                        data-expand-gallery-item
                        className="relative aspect-[4/5] w-[5rem] shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] sm:w-[5.25rem] lg:aspect-square lg:h-auto lg:w-full"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="object-cover"
                          sizes="(max-width: 1023px) 120px, 88px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Title + tagline */}
            <div className="order-2 max-w-[42rem] lg:order-1 lg:max-w-[48rem]">
              <h2
                id="expand-project-title"
                ref={titleRef}
                className="type-expand-title text-[var(--fg)]"
              >
                {project.title}
              </h2>

              <p
                ref={leadRef}
                className="type-lead mt-[var(--space-lg)] max-w-[38rem] text-[var(--muted-strong)] md:mt-[var(--space-xl)]"
              >
                {project.tagline}
              </p>
            </div>

            {/* Meta, stack, links */}
            <div
              ref={heroDetailsRef}
              className="order-3 mt-[var(--space-2xl)] max-w-[42rem] space-y-[var(--space-xl)] border-t border-[var(--border)] pt-[var(--space-2xl)] lg:order-2 lg:max-w-[48rem]"
            >
              <div className="type-meta flex flex-wrap items-baseline gap-x-[var(--space-lg)] gap-y-2 text-[var(--muted)]">
                <span>{project.type}</span>
                <span className="text-[var(--border-strong)]">·</span>
                <span className="tabular-nums">{project.year}</span>
              </div>

              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="type-tag border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-1.5 text-[var(--muted-strong)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  className="type-nav inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--project-accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="h-px w-10 bg-[color:var(--project-accent,var(--accent))] opacity-90" />
                  View live
                </a>
              ) : (
                <p className="type-meta text-[var(--muted)]">
                  Live link coming soon
                </p>
              )}
            </div>

            <p className="type-body order-4 mt-[var(--space-3xl)] max-w-[38rem] text-[var(--muted-strong)] lg:max-w-[42rem]">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
