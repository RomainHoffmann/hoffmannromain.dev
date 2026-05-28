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

/** Masque la grille après que l’overlay ait été peint (évite une frame vide). */
export function scheduleExpandGridHidden() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      markExpandGridHidden(true);
    });
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
