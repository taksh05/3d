import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
      return;
    }
    import("@google/model-viewer")
      .then(() => setIsLibraryLoaded(true))
      .catch((err) => console.error("3D Engine failed to load:", err));
  }, []);

  if (!isLibraryLoaded) {
    return (
      <div style={containerStyle}>
        <div style={{ color: "#00ffcc" }}>Initializing 3D Engine...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        alt="Centrally locked 3D model"
        
        /* 1. HARD-LOCK VERTICAL AXIS */
        /* This ensures the camera stays at exactly 90 degrees (eye level) */
        camera-orbit="0deg 90deg 2.5m" 
        min-polar-angle="90deg" 
        max-polar-angle="90deg"
        
        /* 2. PREVENT VERTICAL BOUNCE DURING ZOOM */
        /* This locks the vertical limit even when zooming in/out */
        min-camera-orbit="auto 90deg auto"
        max-camera-orbit="auto 90deg auto"

        /* 3. SLOWER AUTO-ROTATE */
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="3deg" // Reduced to 3deg for a very smooth, slow spin
        
        /* 4. CONTROLS */
        camera-controls
        enable-pan={false} // Prevents moving the model off-center
        
        /* 5. INTERACTION HINT */
        interaction-prompt="auto"
        interaction-prompt-threshold="2000"
        interaction-prompt-style="basic"

        /* AR & VISUALS */
        ar
        ar-modes="webxr scene-viewer quick-look"
        environment-image="neutral"
        exposure="1.1"
        shadow-intensity="1.5"
        style={viewerStyle}
      >
        <button slot="ar-button" style={arButtonStyle}>
          View in AR
        </button>
      </model-viewer>
    </div>
  );
}

/* --- STYLES --- */
const containerStyle = {
  width: "100%",
  maxWidth: "1100px",
  height: "520px",
  margin: "20px auto",
  background: "#000",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #222"
};

const viewerStyle = {
  width: "100%",
  height: "100%",
  outline: "none",
};

const arButtonStyle = {
  backgroundColor: "#00ffcc",
  color: "#000",
  borderRadius: "30px",
  border: "none",
  padding: "12px 28px",
  position: "absolute",
  bottom: "25px",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 4px 15px rgba(0, 255, 204, 0.4)"
};