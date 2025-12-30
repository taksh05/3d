import React, { useState, useEffect } from "react";

export default function CargoDroneViewer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Added for loading state

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

      {isLoading && (
        <div style={loadingSpinner}>
          <div>Loading Drone Model...</div>
          <div style={spinner}></div>
        </div>
      )}

      <model-viewer
        src="/models/model.glb"
        preload  // Loads model in background for faster access
        loading="eager"  // Forces immediate loading to speed up
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-placement="floor"
        
        camera-controls
        
        min-camera-orbit="auto auto 50%" 
        max-camera-orbit="auto auto 200%"
        
        exposure={isMobile ? "0.8" : "0.35"} 
        environment-intensity="0.3" 
        environment-image="neutral"
        
        shadow-intensity="1.5"
        shadow-softness="0.5"

        auto-rotate
        auto-rotate-delay="1000"
        interaction-prompt="auto"
        
        style={viewer}
        onLoad={() => setIsLoading(false)}  // Hide spinner when loaded
        onProgress={(e) => console.log('Loading progress:', e.detail.totalProgress)}  // Optional: log progress
        onError={(e) => console.error('Model Viewer Error:', e)}  // Log errors
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

const loadingSpinner = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  textAlign: "center",
  zIndex: 1000,
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #666",
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "10px auto",
};

// Add CSS for spinner animation (include in your global CSS or add to component)
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject global styles if needed (optional, or add to your CSS file)
useEffect(() => {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);