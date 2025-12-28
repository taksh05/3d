import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
      return;
    }
    import("@google/model-viewer").then(() => setIsLibraryLoaded(true));
  }, []);

  if (!isLibraryLoaded) return null;

  return (
    <div style={containerStyle}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        
        /* 1. FIX AR "STUCK" ISSUE: Enable Gestures */
        ar
        ar-modes="webxr quick-look scene-viewer"
        ar-scale="auto"       // Allows pinching to resize in AR
        ar-placement="floor"
        
        /* 2. LOOSEN CONTROLS FOR SMOOTHER INTERACTION */
        camera-controls       // Enables rotation and zoom
        enable-pan            // Fixes "stuck" feeling by allowing movement
        interaction-prompt="auto"

        /* 3. SET ZOOM LIMITS (Prevents getting stuck) */
        min-camera-orbit="auto auto 0.5m" 
        max-camera-orbit="auto auto 20m"

        /* 4. DESKTOP VIEWING (Locked horizontally as requested) */
        min-polar-angle="90deg"
        max-polar-angle="90deg"
        auto-rotate
        rotation-per-second="2deg"
        
        /* 5. VISUAL QUALITY */
        shadow-intensity="1.5"
        exposure="1.1"
        environment-image="neutral"
        
        style={viewerStyle}
      >
        <button slot="ar-button" style={arButtonStyle}>
          View in Your Space
        </button>
      </model-viewer>
    </div>
  );
}

const containerStyle = {
  width: "100%", maxWidth: "1100px", height: "520px", margin: "20px auto",
  background: "#000", borderRadius: "16px", position: "relative",
  display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
};

const viewerStyle = { width: "100%", height: "100%", outline: "none" };

const arButtonStyle = {
  backgroundColor: "#00ffcc", color: "#000", borderRadius: "30px", border: "none",
  padding: "12px 28px", position: "absolute", bottom: "25px", left: "50%",
  transform: "translateX(-50%)", fontWeight: "bold", fontSize: "14px",
  cursor: "pointer", zIndex: 10, boxShadow: "0 4px 15px rgba(0, 255, 204, 0.4)"
};