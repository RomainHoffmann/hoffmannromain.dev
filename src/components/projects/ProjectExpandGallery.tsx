"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/** Largeur thumb affichée (~9.5rem max) — intrinsic 2× pour écrans retina */
const THUMB_DISPLAY_W = 152;
const THUMB_DISPLAY_H = Math.round((THUMB_DISPLAY_W * 9) / 16);
const THUMB_INTRINSIC_W = THUMB_DISPLAY_W * 2;
const THUMB_INTRINSIC_H = THUMB_DISPLAY_H * 2;

type ProjectExpandGalleryProps = {
  images: readonly string[];
  projectTitle: string;
  visible: boolean;
};

export function ProjectExpandGallery({
  images,
  projectTitle,
  visible,
}: ProjectExpandGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const selectImage = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  if (!images.length) return null;

  const activeSrc = images[selectedIndex] ?? images[0];

  return (
    <div
      className="expand-gallery"
      data-visible={visible ? "true" : undefined}
      aria-hidden={!visible}
    >
      <div className="expand-gallery__preview">
        <Image
          key={activeSrc}
          src={activeSrc}
          alt={`${projectTitle} — screen ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 720px) 92vw, min(85vw, 1200px)"
          quality={100}
          className="expand-gallery__preview-image"
          priority
        />
      </div>

      <ul
        className="expand-gallery__thumbs"
        aria-label={`${projectTitle} screens`}
      >
        {images.map((src, index) => {
          const isActive = index === selectedIndex;
          return (
            <li key={src}>
              <button
                type="button"
                className="expand-gallery__thumb"
                data-active={isActive ? "true" : undefined}
                onClick={() => selectImage(index)}
                aria-label={`Screen ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
              >
                <Image
                  src={src}
                  alt=""
                  role="presentation"
                  width={THUMB_INTRINSIC_W}
                  height={THUMB_INTRINSIC_H}
                  sizes={`${THUMB_DISPLAY_W}px`}
                  quality={100}
                  className="expand-gallery__thumb-image"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
