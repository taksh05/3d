import React, { useState, useEffect } from "react";

export default function DroneViewer() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to show/hide the AR button
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h1 style={{ margin: "0", fontSize: "20px" }}>Cargo Drone Explorer</h1>
        <p style={{ margin: "5px 0 0", opacity: 0.6, fontSize: "14px" }}>360° Inspection & AR</p>
      </div>

      {/* 3D VIEWER */}
      <model-viewer
        src="/models/model.glb"
        ar
        ar-modes="webxr scene-viewer quick-look" // 'quick-look' triggers auto-usdz for iOS
        camera-controls
        touch-action="pan-y"
        
        /* --- STABILITY TUNING FOR IOS --- */
        interpolation-decay="200"
        powerPreference="high-performance" // Hints the browser to use the GPU efficiently
        
        /* --- LIGHTING & SHADOWS (Reduced for Performance) --- */
        shadow-intensity="0.4"   // Kept low to prevent GPU crashes
        shadow-softness="0.5"
        exposure="0"             // Standard brightness
        environment-image="neutral" // Basic reflections for metallic drone parts
        
        /* --- INTERACTION --- */
        auto-rotate
        auto-rotate-delay="2000"
        
        style={viewer}
      >
        {/* AR BUTTON: Only renders on Mobile/Tablet */}
        {isMobile && (
          <button slot="ar-button" style={arButton}>
            📦 VIEW DRONE IN AR
          </button>
        )}
      </model-viewer>
    </div>
  );
}

/* --- STYLES --- */

const page = {
  width: "100%",
  height: "100vh",
  background: "#0a0a0a", // Dark tech theme
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const header = {
  textAlign: "center",
  color: "white",
  padding: "20px 10px",
  borderBottom: "1px solid #333",
};

const viewer = {
  width: "100%",
  flex: "1",
  background: "radial-gradient(circle, #1a1a1a 0%, #000 100%)",
};

const arButton = {
  position: "absolute",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "15px 30px",
  background: "#007bff", // Cargo Blue
  color: "white",
  borderRadius: "8px",
  fontWeight: "bold",
  border: "none",
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(0, 123, 255, 0.4)",
  cursor: "pointer",
};