import React from 'react';
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        ar
        ar-modes="webxr scene-viewer quick-look" 
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        {/* On Mobile: This activates AR. On Desktop: This triggers the QR code */}
        <button slot="ar-button" style={arButtonStyle}>
          👋 View in your space
        </button>

        {/* This slot ensures the QR code appears for desktop users */}
        <div slot="ar-prompt" id="ar-prompt" style={{ display: 'none' }}>
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="Scanning prompt" />
        </div>
      </model-viewer>
    </div>
  );
}

const arButtonStyle = {
  backgroundColor: '#00ffcc',
  color: '#000',
  borderRadius: '8px',
  border: 'none',
  padding: '12px 24px',
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  zIndex: 10
};