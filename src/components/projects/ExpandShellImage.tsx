"use client";

import type { CSSProperties } from "react";

type ExpandShellImageProps = {
  objectPosition: string;
};

/** Hôte vide : l’image est clonée depuis la grille dans le layout effect parent. */
export function ExpandShellImage({ objectPosition }: ExpandShellImageProps) {
  const mediaStyle = {
    "--expand-object-position": objectPosition,
  } as CSSProperties;

  return <div data-shell-media className="expand-overlay__media" style={mediaStyle} />;
}
