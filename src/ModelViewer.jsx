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
        
        /* FIX LOADING SPEED: Start downloading immediately */
        loading="eager"
        reveal="auto"

        /* FIX MOBILE ROTATION: Strict Left-to-Right Only */
        /* This prevents seeing the top/bottom on mobile browsers */
        camera-orbit="0deg 90deg 2.5m"
        min-polar-angle="90deg"
        max-polar-angle="90deg"
        min-camera-orbit="auto 90deg auto"
        max-camera-orbit="auto 90deg auto"

        /* AR SETTINGS: Fixed to floor so you can walk toward it */
        ar
        ar-modes="quick-look scene-viewer webxr" // Priority to native players for stability
        ar-placement="floor" // Anchors drone to ground
        ar-scale="auto"     // Allows you to set initial size
        
        /* MOVEMENT CONTROLS */
        camera-controls
        enable-pan         // Lets you move drone in 3D view
        
        /* VISUAL QUALITY */
        shadow-intensity="2" // Makes it look grounded in AR
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