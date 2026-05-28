export type FrameRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type RectSnapshot = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function tileFrameFromRect(rect: RectSnapshot | DOMRect): FrameRect {
  return {
    left: rect.left,
    top: rect.top,
    width: Math.max(rect.width, 1),
    height: Math.max(rect.height, 1),
  };
}

export function viewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/** Une diapositive = 100 % de la largeur du viewport. */
export function expandedSlideLayout(slideIndex: number): FrameRect {
  const { width: vw, height: vh } = viewportSize();
  return {
    left: slideIndex * vw,
    top: 0,
    width: vw,
    height: vh,
  };
}

export function trackTranslateX(slideIndex: number): number {
  return -slideIndex * viewportSize().width;
}

/** Position initiale d'une tuile dans le repère du track (offset actif). */
export function shellStartInTrack(
  rect: RectSnapshot,
  activeSlideIndex: number,
): FrameRect {
  const offset = trackTranslateX(activeSlideIndex);
  return {
    left: rect.left - offset,
    top: rect.top,
    width: Math.max(rect.width, 1),
    height: Math.max(rect.height, 1),
  };
}

export function markExpandGridHidden(hidden: boolean) {
  if (hidden) {
    document.body.setAttribute("data-project-expand-ready", "");
  } else {
    document.body.removeAttribute("data-project-expand-ready");
  }
}

export function markExpandExiting(exiting: boolean) {
  if (exiting) {
    document.body.setAttribute("data-project-expand-exiting", "");
  } else {
    document.body.removeAttribute("data-project-expand-exiting");
  }
}

export function clearExpandBodyState() {
  document.body.removeAttribute("data-project-expand-ready");
  document.body.removeAttribute("data-project-expand-exiting");
}

export function mountShellImagesFromGrid(
  track: HTMLElement,
  tiles: ReadonlyArray<{ objectPosition: string }>,
): void {
  const shells = track.querySelectorAll<HTMLElement>("[data-expand-shell]");
  const gridMedias = document.querySelectorAll<HTMLElement>(
    "[data-project-tile]",
  );

  shells.forEach((shell, index) => {
    const host = shell.querySelector<HTMLElement>("[data-shell-media]");
    const gridMedia = gridMedias[index];
    const objectPosition = tiles[index]?.objectPosition ?? "50% 50%";
    if (!host || !gridMedia) return;

    const clone = cloneTileCoverImage(gridMedia, objectPosition);
    if (clone) {
      host.replaceChildren(clone);
    }
  });
}

export function cloneTileCoverImage(
  media: HTMLElement,
  objectPosition: string,
): HTMLImageElement | null {
  const img = media.querySelector("img");
  if (!img) return null;

  const clone = img.cloneNode(true) as HTMLImageElement;
  clone.className = "expand-overlay__image u-img-cover";
  clone.style.objectPosition = objectPosition;
  clone.alt = "";
  clone.setAttribute("role", "presentation");
  clone.draggable = false;
  return clone;
}
