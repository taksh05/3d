import React from "react";
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <model-viewer
        src="./models/model.glb"
        ios-src="./models/model.usdz"
        alt="3D Drone Model"

        /* ---------- 360 VIEW (RESTORED) ---------- */
        camera-controls
        auto-rotate
        rotation-per-second="10deg"
        auto-rotate-delay="0"

        /* KEEP ORIGINAL CENTER BEHAVIOR */
        camera-orbit="0deg 75deg auto"
        min-camera-orbit="auto auto auto"
        camera-target="auto"

        /* ---------- AR (FIXED, NOT CHANGED) ---------- */
        ar
        ar-modes="quick-look webxr scene-viewer"
        ar-placement="floor"
        ar-scale="fixed"

        /* ---------- VISUAL ---------- */
        environment-image="neutral"
        exposure="1"
        shadow-intensity="0.8"
        interaction-prompt="auto"

        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          touchAction: "pan-y"
        }}
      >
        <button slot="ar-button" style={arButtonStyle}>
          👋 View in Your Space
        </button>
      </model-viewer>
    </div>
  );
}

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
