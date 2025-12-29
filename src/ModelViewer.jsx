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
        /* 'webxr' is preferred for fixed placement where users walk around the model */
        ar-modes="webxr scene-viewer quick-look"
        ar-placement="floor"
        
        /* Enables rotation and zoom in 3D view */
        camera-controls
        touch-action="none"

        /* ---------- FIXED AR BEHAVIOR ---------- */
        /* To make the model feel fixed, we allow users to rotate it 
           manually in 3D view, but in AR, it anchors to the real world */

        /* ---------- ZOOM LIMITS ---------- */
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        /* ---------- DARKNESS SETTINGS ---------- */
        exposure={isMobile ? "0.8" : "0.35"} 
        environment-intensity="0.3" 
        environment-image="neutral"
        
        /* ---------- REALISM ---------- */
        shadow-intensity="1.5"
        shadow-softness="0.5"

        auto-rotate
        auto-rotate-delay="1000"
        interaction-prompt="none"
        powerPreference="high-performance"
        style={viewer}
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