import React, { useEffect, useState } from "react";

export default function ModelViewer() {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setIsLibraryLoaded(true);
      return;
    }
    import("@google/model-viewer").then(() => setIsLibraryLoaded(true));
  }, []);

  // Use absolute URLs for Android Scene Viewer to ensure it finds the file
  const glbUrl = "https://3d-nine-bay.vercel.app/models/model.glb";
  
  // This is the "Magic Link" for Android that bypasses the green blink bug
  const androidArIntent = `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;

  if (!isLibraryLoaded) return null;

  return (
    <div style={containerStyle}>
      <model-viewer
        src="/models/model.glb"
        ios-src="/models/model.usdz"
        
        /* FIX THE ZOOM: auto distance frames the drone perfectly */
        camera-orbit="0deg 90deg auto" 
        camera-controls
        enable-pan
        
        /* LOCK WEB VIEW: Horizontal only */
        min-polar-angle="90deg"
        max-polar-angle="90deg"

        /* AR CONFIG: iOS will use this natively */
        ar
        ar-modes="quick-look webxr" 
        ar-placement="floor"
        ar-scale="auto" 
        
        /* VISUALS */
        shadow-intensity="2"
        environment-image="neutral"
        exposure="1.2"
        loading="eager"
        
        style={viewerStyle}
      >
        {/* CUSTOM AR BUTTONS */}
        <div slot="ar-button" style={buttonGroupStyle}>
           {/* Android-specific stable trigger */}
           <a href={androidArIntent} style={androidBtnStyle}>
             View in AR (Android)
           </a>
           {/* Default trigger for iOS */}
           <button style={iosBtnStyle}>
             View in AR (iPhone)
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
  fontSize: "14px", cursor: "pointer", textDecoration: "none", display: "inline-block"
};

const androidBtnStyle = { ...baseBtn, backgroundColor: "#00ffcc", color: "#000" };
const iosBtnStyle = { ...baseBtn, backgroundColor: "#fff", color: "#000" };