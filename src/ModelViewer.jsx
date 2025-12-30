import React, { useState, useEffect } from "react";

export default function CargoDroneViewer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load Model Viewer script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.type = 'module';
    document.head.appendChild(script);

    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      document.head.removeChild(script);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div style={page}>
      <div style={header}>
        <h1 style={title}>Cargo Drone Explorer</h1>
        <p style={subtitle}>360° Inspection & AR Space</p>
      </div>

      <model-viewer
        src="/models/model.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"  // Prioritize webxr for iOS inline AR
        ar-placement="floor"
        
        camera-controls
        // Removed touch-action="none" as it can interfere with gestures
        
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        exposure={isMobile ? "0.8" : "0.35"} 
        environment-intensity="0.3" 
        environment-image="neutral"
        
        shadow-intensity="1.5"
        shadow-softness="0.5"

        auto-rotate
        auto-rotate-delay="1000"
        interaction-prompt="auto"  // Changed to auto to ensure AR prompt shows
        // Removed powerPreference as it's not widely supported
        
        style={viewer}
        onError={(e) => console.error('Model Viewer Error:', e)}  // Add error logging
      >
        {isMobile && (
          <button slot="ar-button" style={arButton}>
            📦 DEPLOY & INSPECT IN AR
          </button>
        )}
      </model-viewer>
    </div>
  );
}

/* ---------- STYLES ---------- */
const page = {
  width: "100%",
  height: "100vh",
  background: "#0a0a0a",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const header = {
  textAlign: "center",
  color: "#fff",
  padding: "20px",
  zIndex: 10,
};

const title = { fontSize: "20px", margin: "0", letterSpacing: "1px" };
const subtitle = { fontSize: "10px", color: "#666", letterSpacing: "2px" };

const viewer = {
  width: "100%",
  flex: "1",
  background: "transparent",
};

const arButton = {
  position: "absolute",
  bottom: "90px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "16px 32px",
  background: "#007bff",
  color: "white",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  fontSize: "12px",
  boxShadow: "0 10px 20px rgba(0, 123, 255, 0.3)",
  zIndex: 999,
  whiteSpace: "nowrap",
};