import React, { useState, useEffect } from "react";

export default function ModelViewer() {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size to toggle AR button visibility
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={page}>
      {/* HEADER UI */}
      <div style={header}>
        <h1 style={{ margin: "0 0 8px 0" }}>Interactive 3D Experience</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>Experience the Ride in AR</p>
      </div>

      {/* MODEL VIEWER */}
      <model-viewer
        src="/models/model.glb"
        // REMOVED ios-src: model-viewer will now auto-generate USDZ for iOS
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        interaction-prompt="none"
        
        /* ---------- APPEARANCE ---------- */
        auto-rotate
        shadow-intensity="1.5"
        shadow-softness="1"
        environment-image="neutral"
        exposure="1"
        
        style={viewer}
      >
        {/* Only show the button if on a mobile device */}
        {isMobile && (
          <button slot="ar-button" style={arButton}>
            🏍️ VIEW IN YOUR SPACE
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
  background: "#000",
  display: "flex",
  flexDirection: "column",
};

const header = {
  textAlign: "center",
  color: "white",
  padding: "30px 16px",
  zIndex: 10,
};

const viewer = {
  width: "100%",
  flex: 1, // Fills remaining space
  background: "radial-gradient(circle, #2a2a2a 0%, #000 80%)",
};

const arButton = {
  position: "absolute",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "16px 32px",
  background: "#e31837", // Royal Enfield Signature Red
  color: "#fff",
  borderRadius: "50px",
  fontWeight: "bold",
  border: "none",
  fontSize: "14px",
  letterSpacing: "1px",
  boxShadow: "0 10px 20px rgba(227, 24, 55, 0.4)",
};