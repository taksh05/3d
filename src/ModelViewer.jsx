import React from 'react';
import "@google/model-viewer";

export default function ModelViewer() {
  // Detection for mobile to show/hide the QR code
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ width: '100%', height: '450px', background: '#000', borderRadius: '15px', overflow: 'hidden', position: 'relative', border: '1px solid #333' }}>
        <model-viewer
          src="/models/model.glb"
          /* Removed ios-src since you deleted the USDZ file */
          ar
          /* Prioritize Scene Viewer and WebXR for Android AR success */
          ar-modes="scene-viewer webxr quick-look" 
          camera-controls
          
          /* --- ZOOM & PAN SETTINGS --- */
          enable-pan               /* Allows users to right-click drag or two-finger pan */
          min-field-of-view="10deg" /* Enables deep zoom into small parts */
          max-field-of-view="auto"
          touch-action="pan-y"     /* Essential for mobile: allows page scroll OR 3D interaction */
          
          /* --- VISUAL SETTINGS --- */
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

      {!isMobile && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#00ffcc', fontWeight: 'bold', marginBottom: '10px' }}>Scan for Direct AR 📱</p>
          <div style={{ background: 'white', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://3d-nine-bay.vercel.app/autoar")}`} 
              alt="QR Code" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

const arBtnStyle = {
  background: '#00ffcc', color: '#000', padding: '12px 24px', borderRadius: '8px',
  fontWeight: 'bold', border: 'none', position: 'absolute', bottom: '20px',
  left: '50%', transform: 'translateX(-50%)', cursor: 'pointer',
  zIndex: 10
};