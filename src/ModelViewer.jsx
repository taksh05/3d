import React from "react";
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <model-viewer
        src="./models/model.glb"
        ios-src="./models/model.usdz"
        alt="A 3D drone model"

        /* ---------- AR ---------- */
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-placement="floor"
        ar-scale="fixed"          /* 🔥 KEY FIX */
        
        /* ---------- CAMERA ---------- */
        camera-controls
        camera-orbit="0deg 70deg 120%"
        min-camera-orbit="auto auto auto"
        camera-target="0m 0m 0m"

        /* ---------- VISUAL ---------- */
        auto-rotate
        rotation-per-second="15deg"
        environment-image="neutral"
        exposure="0.9"
        shadow-intensity="0.8"

        /* ---------- PERFORMANCE ---------- */
        interaction-prompt="none"
        loading="eager"

        style={{
          width: "100%",
          height: "100%",
          background: "transparent"
        }}
      >
        {/* AR Button */}
        <button slot="ar-button" style={arButtonStyle}>
          👋 View in Your Space
        </button>

        {/* AR Scan Prompt */}
        <div slot="ar-prompt">
          <img
            src="https://modelviewer.dev/shared-assets/icons/hand.png"
            alt="Move phone to scan"
          />
        </div>
      </model-viewer>
    </div>
  );
}

/* ---------- STYLES ---------- */
const arButtonStyle = {
  backgroundColor: "#ff0000",
  color: "#fff",
  borderRadius: "6px",
  border: "none",
  padding: "12px 24px",
  position: "absolute",
  top: "20px",
  left: "20px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  zIndex: 999
};
