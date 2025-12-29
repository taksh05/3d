import React, { useState, useEffect } from "react";

export default function CargoDroneViewer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
        /* 'scene-viewer' is lighter for Android; 'quick-look' handles iOS */
        ar-modes="scene-viewer quick-look"
        ar-placement="floor"
        camera-controls
        touch-action="none"

        /* ---------- PERFORMANCE & STABILITY ---------- */
        /* 'lazy' prevents the model from blocking the rest of the page load */
        loading="lazy"
        /* 'high-performance' helps the browser prioritize GPU resources */
        powerPreference="high-performance"

        /* ---------- ZOOM LIMITS ---------- */
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        /* ---------- DARKNESS & LIGHTING ---------- */
        /* Lowering exposure reduces the rendering overhead on mobile */
        exposure={isMobile ? "0.7" : "0.3"} 
        environment-intensity="0.3" 
        environment-image="neutral"
        
        /* ---------- REALISM ---------- */
        shadow-intensity="1"
        shadow-softness="0.5"

        auto-rotate
        interaction-prompt="none"
        style={viewer}
      >
        {isMobile && (
          <button slot="ar-button" style={arButton}>
            📦 DEPLOY & MOVE IN AR
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
  position: "relative",
};

const header = {
  textAlign: "center",
  color: "#fff",
  padding: "20px",
  zIndex: 10,
};

const title = { fontSize: "20px", margin: "0", letterSpacing: "1px" };
const subtitle = { fontSize: "12px", color: "#666", letterSpacing: "2px" };

const viewer = {
  width: "100%",
  flex: "1",
  background: "transparent",
};

const arButton = {
  position: "absolute",
  /* Moved to 90px to sit safely above mobile browser bars */
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
  whiteSpace: "nowrap",
  zIndex: 999,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
  cursor: "pointer",
};