// Full-screen animated film-grain texture. Pure CSS (SVG noise data-URI in
// index.css). pointer-events:none so it never blocks interaction; the
// prefers-reduced-motion media query stops the jitter for sensitive users.
const GrainOverlay = () => (
    <div className="grain-overlay animate-grain" aria-hidden="true" />
)

export default GrainOverlay
