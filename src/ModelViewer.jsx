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
        /* 1. Android FIX: Move scene-viewer to the front for one-finger movement */
        /* 2. iOS FIX: Remove webxr to prevent experimental crashes on iPhone */
        ar-modes="scene-viewer quick-look"
        ar-placement="floor"
        camera-controls
        touch-action="none"

        /* 3. PERFORMANCE FIX: loading lazy prevents blocking the UI */
        loading="lazy"
        powerPreference="high-performance" // Prioritizes GPU resources

        /* ---------- ZOOM LIMITS ---------- */
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        /* ---------- DARKNESS SETTINGS ---------- */
        /* Darker exposure for Desktop (0.35) vs Mobile (0.8) */
        exposure={isMobile ? "0.8" : "0.35"} 
        environment-intensity="0.3" // Prevents the model from looking "blown out"
        environment-image="neutral"
        
        /* ---------- REALISM ---------- */
        shadow-intensity="1.5"
        shadow-softness="0.5"

        auto-rotate
        auto-rotate-delay="1000"
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
  /* Moved to 90px to clear mobile browser bars and prevent cutting */
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
  boxShadow: "0 10px 20px rgba(0, 102, 255, 0.3)",
  zIndex: 999,
  whiteSpace: "nowrap",
  cursor: "pointer",
};