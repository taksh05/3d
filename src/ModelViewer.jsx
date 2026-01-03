import React from 'react';
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <model-viewer
        src="./models/model.glb" 
        ios-src="./models/model.usdz"
        alt="A 3D drone model"
        
        ar
        ar-modes="scene-viewer webxr quick-look" 
        ar-placement="floor"
        ar-scale="auto"
        
        /* FIX FOR iOS ZOOM: This forces the initial view to be further away */
        camera-orbit="0deg 75deg 105%"
        min-camera-orbit="auto auto auto"
        camera-target="0m 0m 0m"
        
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        <button slot="ar-button" style={arButtonStyle}>
          👋 VIEW IN YOUR SPACE
        </button>

        <div slot="ar-prompt" id="ar-prompt">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="Scanning prompt" />
        </div>
      </model-viewer>
    </div>
  );
}

const arButtonStyle = {
  backgroundColor: '#ff0000',
  color: '#fff',
  borderRadius: '4px',
  border: 'none',
  padding: '12px 24px',
  position: 'absolute',
  top: '20px', 
  left: '20px',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  zIndex: 999,
};