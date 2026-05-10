/**
 * Fixed atmospheric stack: depth gradients, slow drift, vignette, edge falloff,
 * animated grain. All pointer-events none.
 */
export function Atmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[var(--z-atmosphere)]"
      aria-hidden
    >
      <div className="ds-bg-atmosphere absolute inset-0" />
      <div className="ds-atmosphere-drift absolute inset-[-28%]" />
      <div className="ds-vignette absolute inset-0" />
      <div className="ds-edge-dim absolute inset-0" />
      <div className="ds-noise ds-noise--animated absolute inset-0" />
    </div>
  );
}
