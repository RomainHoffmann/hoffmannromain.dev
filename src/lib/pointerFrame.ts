/**
 * Coalesce pointer moves to animation frames — avoids layout reads / GSAP work
 * beyond display refresh (smoother scroll + paint interaction).
 */
export function rafPointerHandler(
  handler: (event: PointerEvent) => void,
): (event: PointerEvent) => void {
  let rafId = 0;
  let pending: PointerEvent | null = null;

  return (event: PointerEvent) => {
    pending = event;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const e = pending;
      pending = null;
      if (e) handler(e);
    });
  };
}
