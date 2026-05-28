"use client";

import { useCallback, type CSSProperties } from "react";

type ExpandShellImageProps = {
  clone: HTMLImageElement | null;
  fallbackSrc: string;
  objectPosition: string;
};

export function ExpandShellImage({
  clone,
  fallbackSrc,
  objectPosition,
}: ExpandShellImageProps) {
  const mediaStyle = {
    "--expand-object-position": objectPosition,
  } as CSSProperties;

  const mountClone = useCallback(
    (host: HTMLDivElement | null) => {
      if (!host || !clone) return;
      if (clone.parentElement !== host) {
        host.replaceChildren(clone);
      }
    },
    [clone],
  );

  if (clone) {
    return (
      <div
        ref={mountClone}
        className="expand-overlay__media"
        style={mediaStyle}
      />
    );
  }

  return (
    <div className="expand-overlay__media" style={mediaStyle}>
      <img
        src={fallbackSrc}
        alt=""
        role="presentation"
        draggable={false}
        className="expand-overlay__image u-img-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
