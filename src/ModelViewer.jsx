export default function ModelViewer() {
  return (
    <div style={page}>
      {/* UI */}
      <div style={header}>
        <h1>Interactive 3D Experience</h1>
        <p>Built with React + Native AR</p>
      </div>

      {/* MODEL VIEWER */}
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        ar
        ar-modes="scene-viewer quick-look"

        /* ---------- INTERACTION ---------- */
        camera-controls
        touch-action="pan-y"
        interaction-prompt="none"

        /* ---------- SMOOTHNESS ---------- */
        enable-pan
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="15deg"

        /* ---------- LIGHTING / BRIGHTNESS ---------- */
        exposure="0.85"
        environment-image="neutral"
        shadow-intensity="0.6"

        /* ---------- PERFORMANCE ---------- */
        interpolation-decay="200"
        disable-tap

        style={viewer}
      >
        <button slot="ar-button" style={arButton}>
          📱 View in AR
        </button>
      </model-viewer>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  width: "100%",
  height: "100vh",
  background: "#000",
  display: "flex",
  flexDirection: "column",
};

const header = {
  textAlign: "center",
  color: "white",
  padding: "24px 16px",
};

const viewer = {
  width: "100%",
  height: "100%",
  maxHeight: "85vh",
  background: "radial-gradient(circle, #1f1f1f 0%, #000 70%)",
};

const arButton = {
  padding: "14px 28px",
  background: "#00ffcc",
  color: "#000",
  borderRadius: "30px",
  fontWeight: "bold",
  border: "none",
  fontSize: "16px",
};
