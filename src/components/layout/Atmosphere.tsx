/**
 * Fixed atmospheric stack: depth gradients, slow drift, vignette, edge falloff,
 * animated grain. All pointer-events none.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden>
      <div className="atmosphere__fill ds-bg-atmosphere" />
      <div className="atmosphere__fill ds-ambient-breathe" />
      <div className="atmosphere__drift ds-atmosphere-drift" />
      <div className="atmosphere__fill ds-vignette" />
      <div className="atmosphere__fill ds-edge-dim" />
      <div className="atmosphere__fill ds-noise ds-noise--animated" />
    </div>
  );
}
