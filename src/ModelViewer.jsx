import React from 'react';
import "@google/model-viewer";

export default function ModelViewer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      
      <div style={{ width: '100%', height: '500px', background: '#000', borderRadius: '15px', overflow: 'hidden', position: 'relative', border: '1px solid #333' }}>
        <model-viewer
          src="/models/model.glb"
          ar
          /* Prioritizing webxr to avoid the Scene Viewer green screen bug */
          ar-modes="webxr scene-viewer" 
          camera-controls
          
          /* Interaction & Zoom Settings */
          enable-pan               /* Allows dragging the model */
          min-field-of-view="10deg" /* Allows deep zoom-in */
          max-field-of-view="auto"
          touch-action="pan-y"     /* Fixes mobile scrolling */
          
          /* Visual Settings */
          auto-rotate
          interaction-prompt="auto"
          environment-image="neutral"
          shadow-intensity="1"
          exposure="1.2"
          style={{ width: "100%", height: "100%" }}
        >
          <button slot="ar-button" style={arBtnStyle}>
              👋 View in AR
          </button>
        </model-viewer>
      </div>
      
      {/* QR Code section has been removed */}
    </div>
  );
}

const arBtnStyle = {
  background: '#00ffcc', 
  color: '#000', 
  padding: '12px 24px', 
  borderRadius: '8px',
  fontWeight: 'bold', 
  border: 'none', 
  position: 'absolute', 
  bottom: '20px',
  left: '50%', 
  transform: 'translateX(-50%)', 
  cursor: 'pointer',
  zIndex: 10,
  boxShadow: '0px 4px 10px rgba(0, 255, 204, 0.3)'
};