import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
    }
  }, []);

  // Stable Android Intent for 360° Interaction
  const glbUrl = "https://3d-nine-bay.vercel.app/models/model.glb";
  const androidArIntent = `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}&mode=ar_only&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;

  if (!isLibraryLoaded) return null;

  return (
    <div style={containerStyle}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        
        /* WEB VIEW: Frames the drone automatically */
        camera-orbit="0deg 90deg auto" 
        camera-controls
        enable-pan
        
        /* LOCK WEB ROTATION (Desktop Only) */
        min-polar-angle="90deg"
        max-polar-angle="90deg"

        /* AR CONFIG: Enable all interactions */
        ar
        ar-modes="quick-look webxr" 
        ar-placement="floor"
        ar-scale="auto"  // 'auto' is required for 360 movement & scaling
        
        /* VISUAL QUALITY */
        shadow-intensity="2"
        environment-image="neutral"
        exposure="1.2"
        
        style={viewerStyle}
      >
        <div slot="ar-button" style={buttonGroupStyle}>
           {/* Android: Native Scene Viewer with 360 movement enabled */}
           <a href={androidArIntent} style={androidBtnStyle}>
             Launch AR (Android)
           </a>
           {/* iOS: Native Quick Look trigger */}
           <button style={iosBtnStyle}>
             Launch AR (iPhone)
           </button>
        </div>
      </model-viewer>
    </div>
  );
}

const containerStyle = {
  width: "100%", maxWidth: "1100px", height: "520px", margin: "20px auto",
  background: "#000", borderRadius: "16px", position: "relative",
  display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
};

const viewerStyle = { width: "100%", height: "100%", outline: "none" };

const buttonGroupStyle = {
  position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: "10px", zIndex: 10
};

const baseBtn = {
  padding: "12px 20px", borderRadius: "30px", border: "none", fontWeight: "bold",
  fontSize: "14px", cursor: "pointer", textDecoration: "none"
};

const androidBtnStyle = { ...baseBtn, backgroundColor: "#00ffcc", color: "#000" };
const iosBtnStyle = { ...baseBtn, backgroundColor: "#fff", color: "#000" };
