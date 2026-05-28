"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { ExpandShellImage } from "@/components/projects/ExpandShellImage";
import type { TileSnapshot } from "@/components/projects/ProjectExpandContext";
import {
  expandedSlideLayout,
  markExpandGridHidden,
  mountShellImagesFromGrid,
  shellStartInTrack,
  trackTranslateX,
  viewportSize,
} from "@/lib/expand-frame";
import { gsap } from "@/lib/gsap";
import { overlayMotion } from "@/lib/overlay-motion";

type ProjectExpandOverlayProps = {
  activeIndex: number;
  tiles: TileSnapshot[];
  onDismiss: () => void;
};

function shellInitialStyle(
  rect: TileSnapshot["rect"],
  activeIndex: number,
): CSSProperties {
  const start = shellStartInTrack(rect, activeIndex);
  return {
    left: start.left,
    top: start.top,
    width: start.width,
    height: start.height,
  };
}

export function ProjectExpandOverlay({
  activeIndex,
  tiles,
  onDismiss,
}: ProjectExpandOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const dismissedRef = useRef(false);
  const exitingRef = useRef(false);
  const hasEnteredRef = useRef(false);

  const dismissAfterExit = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    onDismiss();
  }, [onDismiss]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const shells = track.querySelectorAll<HTMLElement>("[data-expand-shell]");
    if (!shells.length) return;

    mountShellImagesFromGrid(track, tiles);

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const duration = reduceMotion ? 0.01 : overlayMotion.expandIn;

      gsap.set(track, { x: trackTranslateX(activeIndex) });

      shells.forEach((shell, index) => {
        const tile = tiles[index];
        if (!tile) return;

        const start = shellStartInTrack(tile.rect, activeIndex);

        gsap.set(shell, {
          left: start.left,
          top: start.top,
          width: start.width,
          height: start.height,
        });
      });

      markExpandGridHidden(true);

      shells.forEach((shell, index) => {
        const tile = tiles[index];
        if (!tile) return;

        const end = expandedSlideLayout(index);

        gsap.to(shell, {
          left: end.left,
          top: end.top,
          width: end.width,
          height: end.height,
          duration,
          ease: overlayMotion.ease,
        });
      });

      hasEnteredRef.current = true;
    }, root);

    return () => {
      ctx.revert();
      markExpandGridHidden(false);
    };
  }, [activeIndex, tiles]);

  const slideTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || !hasEnteredRef.current) return;

      const clamped = Math.max(0, Math.min(index, tiles.length - 1));
      setCurrentIndex(clamped);

      gsap.to(track, {
        x: trackTranslateX(clamped),
        duration: overlayMotion.slide,
        ease: overlayMotion.ease,
      });
    },
    [tiles.length],
  );

  const goPrev = useCallback(() => {
    slideTo(currentIndex - 1);
  }, [currentIndex, slideTo]);

  const goNext = useCallback(() => {
    slideTo(currentIndex + 1);
  }, [currentIndex, slideTo]);

  const runExit = useCallback(() => {
    if (exitingRef.current || dismissedRef.current) return;
    exitingRef.current = true;

    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) {
      dismissAfterExit();
      return;
    }

    const shells = track.querySelectorAll<HTMLElement>("[data-expand-shell]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 0.01 : overlayMotion.expandOut;

    gsap.set(track, { x: trackTranslateX(currentIndex) });

    const tl = gsap.timeline({ onComplete: dismissAfterExit });

    shells.forEach((shell, index) => {
      const tile = tiles[index];
      if (!tile) return;
      const end = shellStartInTrack(tile.rect, currentIndex);

      tl.to(
        shell,
        {
          left: end.left,
          top: end.top,
          width: end.width,
          height: end.height,
          duration,
          ease: overlayMotion.ease,
        },
        0,
      );
    });
  }, [currentIndex, dismissAfterExit, tiles]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        runExit();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, runExit]);

  const { width: vw } = viewportSize();
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < tiles.length - 1;
  const currentProject = tiles[currentIndex]?.project;
  const overlayThemeStyle = currentProject
    ? ({
        "--expand-bg": currentProject.theme.sceneBackground,
        "--expand-fg": currentProject.theme.textColor,
      } as CSSProperties)
    : undefined;

  return createPortal(
    <div ref={rootRef} className="expand-overlay" style={overlayThemeStyle}>
      <div
        className="expand-overlay__viewport"
        role="dialog"
        aria-modal="true"
        aria-label="Projects"
      >
        <div
          ref={trackRef}
          className="expand-overlay__track"
          style={{
            width: tiles.length * vw,
            transform: `translate3d(${trackTranslateX(activeIndex)}px, 0, 0)`,
          }}
        >
          {tiles.map((tile, index) => (
            <div
              key={`${tile.project.slug}-${index}`}
              data-expand-shell
              data-active={index === currentIndex ? "true" : undefined}
              className="expand-overlay__shell"
              style={shellInitialStyle(tile.rect, activeIndex)}
            >
              <ExpandShellImage objectPosition={tile.objectPosition} />
            </div>
          ))}
        </div>
      </div>

      {currentProject ? (
        <p className="expand-overlay__title">{currentProject.title}</p>
      ) : null}

      <button
        type="button"
        className="expand-overlay__nav expand-overlay__nav--prev"
        onClick={goPrev}
        disabled={!canPrev}
        aria-label="Previous project"
      >
        Prev
      </button>

      <button
        type="button"
        className="expand-overlay__nav expand-overlay__nav--next"
        onClick={goNext}
        disabled={!canNext}
        aria-label="Next project"
      >
        Next
      </button>

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
