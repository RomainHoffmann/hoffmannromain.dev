/**
 * Fixed background layers: gradients, vignette, film grain.
 * Keep pointer-events none — purely atmospheric.
 */
export function Atmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[var(--z-atmosphere)]"
      aria-hidden
    >
      <div className="ds-bg-atmosphere absolute inset-0" />
      <div className="ds-vignette absolute inset-0" />
      <div className="ds-noise absolute inset-0" />
    </div>
  );
}
