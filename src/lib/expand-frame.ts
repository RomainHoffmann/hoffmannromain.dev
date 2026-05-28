export type FrameRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function tileFrameFromRect(rect: DOMRect): FrameRect {
  return {
    left: rect.left,
    top: rect.top,
    width: Math.max(rect.width, 1),
    height: Math.max(rect.height, 1),
  };
}

export function fullViewportFrame(): FrameRect {
  return {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
