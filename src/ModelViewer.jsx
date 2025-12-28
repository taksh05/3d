import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    // Component already registered globally in main.jsx, 
    // but we check for library state to ensure smooth UI
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
    }
  }, []);

  if (!isLibraryLoaded) return null;

  return (
    <div style={containerStyle}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        
        /* FIX ZOOM: 'auto' frames the drone perfectly regardless of its size */
        camera-orbit="0deg 90deg auto" 
        camera-controls
        enable-pan
        
        /* LOCK ROTATION: Strict horizontal view for web users */
        min-polar-angle="90deg"
        max-polar-angle="90deg"
        min-camera-orbit="auto 90deg auto"
        max-camera-orbit="auto 90deg auto"

        /* AR CONFIG: Pinned to floor, auto-scaling allowed */
        ar
        ar-modes="scene-viewer quick-look webxr" // Prioritize Scene Viewer for Android stability
        ar-placement="floor"
        ar-scale="auto" 
        
        /* VISUALS & PERFORMANCE */
        shadow-intensity="2"
        environment-image="neutral"
        exposure="1.2"
        loading="eager"
        reveal="auto"
        
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