import React from 'react';
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <model-viewer
        /* 1. Ensure these paths are correct. If model.glb is in public/models/ use this: */
        src="./models/model.glb" 
        ios-src="./models/model.usdz"
        alt="A 3D drone model"
        
        /* 2. Fixes the "floating" issue: scene-viewer is best for Android floor-locking */
        ar
        ar-modes="scene-viewer webxr quick-look" 
        ar-placement="floor"
        ar-scale="auto"
        
        /* 3. Interaction settings */
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        
        style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
      >
        {/* The slot="ar-button" must be a direct child of model-viewer */}
        <button slot="ar-button" style={arButtonStyle}>
          👋 VIEW IN YOUR SPACE
        </button>

        {/* This displays the hand icon to tell users to move their phone */}
        <div slot="ar-prompt" id="ar-prompt">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="Scanning prompt" />
        </div>
      </model-viewer>
    </div>
  );
}

const arButtonStyle = {
  backgroundColor: '#ff0000', // Red color to match your Cargo Drone theme
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  padding: '12px 24px',
  position: 'absolute',
  top: '20px',  // Moved to top as seen in your video
  left: '20px',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  zIndex: 999,
  display: 'block' // Ensures it's not hidden
};