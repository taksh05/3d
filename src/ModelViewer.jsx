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
        
        /* FIX THE ZOOM: Let the model fit the screen automatically */
        camera-orbit="0deg 90deg auto" 
        camera-controls
        enable-pan
        
        /* LOCK ROTATION: Left-to-Right only on Web */
        min-polar-angle="90deg"
        max-polar-angle="90deg"

        /* AR SETTINGS: Fixed to floor so you can walk toward it */
        ar
        ar-modes="quick-look scene-viewer webxr"
        ar-placement="floor"
        ar-scale="auto" 
        
        /* VISUALS */
        shadow-intensity="2"
        environment-image="neutral"
        exposure="1.2"
        loading="eager"
        
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
  cursor: "pointer", zIndex: 10
};