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
        ar-modes="webxr scene-viewer quick-look"
        ar-placement="floor"
        camera-controls
        touch-action="none"

        /* ---------- ZOOM & SCALE LIMITS ---------- */
        /* min-camera-orbit: How close you can zoom (e.g., "auto 0m") */
        /* max-camera-orbit: How far you can zoom out (e.g., "auto 10m") */
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        /* ---------- DARKNESS SETTINGS ---------- */
        exposure={isMobile ? "0.8" : "0.35"} 
        environment-intensity="0.3" 
        environment-image="neutral"
        
        /* ---------- SHADOWS & REALISM ---------- */
        shadow-intensity="1.5"
        shadow-softness="0.5"

        /* ---------- BEHAVIOR ---------- */
        auto-rotate
        auto-rotate-delay="1000"
        interaction-prompt="none"
        powerPreference="high-performance"
        style={viewer}
      >
        {isMobile && (
          <button slot="ar-button" style={arButton}>
            📦 DEPLOY & ROTATE IN AR
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
  bottom: "40px",
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
};