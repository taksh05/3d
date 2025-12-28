import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    // Standard check to ensure the 3D engine is ready
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
      return;
    }
    import("@google/model-viewer").then(() => setIsLibraryLoaded(true));
  }, []);

  if (!isLibraryLoaded) return null;

  return (
    <div style={containerStyle}>
      {/* PROGRESS BAR REMOVED: 
          The 9MB model will now load directly without the loading line.
      */}
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        
        /* AXIS LOCKING: Side-view only, no top or bottom viewing */
        camera-orbit="0deg 90deg 2.5m"
        min-polar-angle="90deg"
        max-polar-angle="90deg"
        min-camera-orbit="auto 90deg auto"
        max-camera-orbit="auto 90deg auto"

        /* SLOW AUTO-ROTATE */
        auto-rotate
        rotation-per-second="2deg"
        
        /* AR CONFIGURATION */
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        enable-pan={false}
        
        style={viewerStyle}
      >
        {/* AR Button: Only displays on compatible mobile devices */}
        <button slot="ar-button" style={arButtonStyle}>
          View in Your Space
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
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  border: "1px solid #222"
};

const viewerStyle = { 
  width: "100%", 
  height: "100%", 
  outline: "none" 
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