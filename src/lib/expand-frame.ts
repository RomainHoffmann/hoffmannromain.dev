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
