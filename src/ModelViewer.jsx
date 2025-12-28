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
        
        /* PERFORMANCE & LOADING */
        loading="eager"
        reveal="auto"

        /* WEB VIEW: LOCKS HORIZONTAL ROTATION ONLY */
        camera-orbit="0deg 90deg 2.5m"
        min-polar-angle="90deg"
        max-polar-angle="90deg"

        /* AR SETTINGS: ANCHOR TO FLOOR SO YOU CAN WALK AROUND IT */
        ar
        ar-modes="quick-look scene-viewer webxr"
        ar-placement="floor"
        ar-scale="auto" // Allows initial scaling if needed
        
        /* INTERACTION: FIXES "STUCK" FEELING */
        camera-controls
        enable-pan // Allows you to manually move/adjust the drone
        min-camera-orbit="auto auto 0.5m" // Allows close zoom
        max-camera-orbit="auto auto 20m"  // Allows far zoom
        
        /* VISUAL QUALITY */
        shadow-intensity="2" // Grounded appearance in AR
        environment-image="neutral"
        exposure="1.2"
        
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