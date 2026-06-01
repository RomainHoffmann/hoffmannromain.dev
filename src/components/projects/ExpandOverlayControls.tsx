"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { overlayMotion } from "@/lib/overlay-motion";

type ExpandOverlayControlsProps = {
  visible: boolean;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

function IconChevronLeft() {
  return (
    <svg
      className="expand-controls__svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 7l-5 5 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      className="expand-controls__svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      className="expand-controls__svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 7l10 10M17 7L7 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExpandOverlayControls({
  visible,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onClose,
}: ExpandOverlayControlsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !visible) return;

    const buttons = root.querySelectorAll<HTMLButtonElement>(
      "[data-control-btn]",
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(
        buttons,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: overlayMotion.controlsIn,
          stagger: 0.06,
          ease: overlayMotion.ease,
        },
      );
    }, root);

    return () => ctx.revert();
  }, [visible]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prev = root.querySelector<HTMLButtonElement>('[data-control="prev"]');
    const next = root.querySelector<HTMLButtonElement>('[data-control="next"]');

    if (prev) {
      gsap.to(prev, {
        opacity: canPrev ? 1 : 0.25,
        duration: overlayMotion.controlsHover,
        ease: "power2.out",
      });
    }
    if (next) {
      gsap.to(next, {
        opacity: canNext ? 1 : 0.25,
        duration: overlayMotion.controlsHover,
        ease: "power2.out",
      });
    }
  }, [canPrev, canNext]);

  return (
    <div
      ref={rootRef}
      className="expand-controls"
      data-visible={visible ? "true" : undefined}
      aria-hidden={!visible}
    >
      <button
        type="button"
        data-control-btn
        data-control="prev"
        className="expand-controls__btn expand-controls__btn--side expand-controls__btn--prev"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous project"
      >
        <span className="expand-controls__ring" aria-hidden />
        <span className="expand-controls__icon">
          <IconChevronLeft />
        </span>
      </button>

      <button
        type="button"
        data-control-btn
        data-control="next"
        className="expand-controls__btn expand-controls__btn--side expand-controls__btn--next"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next project"
      >
        <span className="expand-controls__ring" aria-hidden />
        <span className="expand-controls__icon">
          <IconChevronRight />
        </span>
      </button>

      <button
        type="button"
        data-control-btn
        data-control="close"
        className="expand-controls__btn expand-controls__btn--close"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="expand-controls__ring" aria-hidden />
        <span className="expand-controls__icon">
          <IconClose />
        </span>
      </button>
    </div>
  );
}
