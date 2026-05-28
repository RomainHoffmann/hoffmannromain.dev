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
import { fullViewportFrame, tileFrameFromRect } from "@/lib/expand-frame";
import { gsap } from "@/lib/gsap";
import { overlayMotion } from "@/lib/overlay-motion";
import type { Project } from "@/types/project";

type ProjectExpandOverlayProps = {
  project: Project;
  originRect: DOMRect;
  objectPosition: string;
  onDismiss: () => void;
};

function tileShellStyle(rect: DOMRect): CSSProperties {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export function ProjectExpandOverlay({
  project,
  originRect,
  objectPosition,
  onDismiss,
}: ProjectExpandOverlayProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);
  const exitingRef = useRef(false);

  const dismissAfterExit = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    onDismiss();
  }, [onDismiss]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const duration = reduceMotion ? 0.01 : overlayMotion.expandIn;
      const start = tileFrameFromRect(originRect);
      const end = fullViewportFrame();

      gsap.set(shell, {
        left: start.left,
        top: start.top,
        width: start.width,
        height: start.height,
      });

      gsap.to(shell, {
        left: end.left,
        top: end.top,
        width: end.width,
        height: end.height,
        duration,
        ease: overlayMotion.ease,
      });
    }, shell);

    return () => ctx.revert();
  }, [originRect, project.slug]);

  const runExit = useCallback(() => {
    if (exitingRef.current || dismissedRef.current) return;
    exitingRef.current = true;

    const shell = shellRef.current;
    if (!shell) {
      dismissAfterExit();
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const end = tileFrameFromRect(originRect);

    gsap.to(shell, {
      left: end.left,
      top: end.top,
      width: end.width,
      height: end.height,
      duration: reduceMotion ? 0.01 : overlayMotion.expandOut,
      ease: overlayMotion.ease,
      onComplete: dismissAfterExit,
    });
  }, [dismissAfterExit, originRect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") runExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runExit]);

  const imageStyle = {
    "--expand-object-position": objectPosition,
  } as CSSProperties;

  return createPortal(
    <div className="expand-overlay" onClick={runExit}>
      <div
        ref={shellRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="expand-overlay__shell"
        style={tileShellStyle(originRect)}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={project.coverImage}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="expand-overlay__image u-img-cover"
          style={imageStyle}
        />
      </div>

      <button
        type="button"
        onClick={runExit}
        className="expand-overlay__close"
        aria-label="Close"
      >
        Close — Esc
      </button>
    </div>,
    document.body,
  );
}
