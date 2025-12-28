import React from "react";

export default function NativeARViewer() {
  // Replace these with your actual Vercel URLs
  const glbUrl = "https://your-site.vercel.app/models/model.glb";
  const usdzUrl = "https://your-site.vercel.app/models/model.usdz";
  const posterUrl = "/drone-preview.jpg"; // A static image of the drone

  // Google Scene Viewer Intent (Android)
  const androidIntent = `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#fff", textAlign: "center" }}>Drone AR Preview</h2>
      
      {/* Visual Preview Area */}
      <div style={previewBox}>
        <img src={posterUrl} alt="Drone Preview" style={imageStyle} />
      </div>

      <div style={buttonContainer}>
        {/* iOS Button (AR Quick Look) */}
        <a rel="ar" href={usdzUrl} style={buttonLink}>
          <img src="/ar-icon.png" style={{width: '20px', marginRight: '10px'}} alt="" />
          View AR on iPhone
        </a>

        {/* Android Button (Google Scene Viewer) */}
        <a href={androidIntent} style={buttonLinkAndroid}>
          View AR on Android
        </a>
      </div>

      <p style={noteStyle}>
        Note: If it says "Zero KB" on iPhone, ensure Vercel LFS is enabled and redeployed.
      </p>
    </div>
  );
}

const containerStyle = {
  display: "flex", flexDirection: "column", alignItems: "center",
  background: "#111", padding: "40px 20px", borderRadius: "20px"
};

const previewBox = {
  width: "100%", maxWidth: "500px", height: "300px", 
  background: "#000", borderRadius: "15px", overflow: "hidden", marginBottom: "30px"
};

const imageStyle = { width: "100%", height: "100%", objectFit: "cover" };

const buttonContainer = { display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" };

const buttonLink = {
  display: "flex", alignItems: "center", padding: "15px 25px",
  backgroundColor: "#fff", color: "#000", borderRadius: "50px",
  textDecoration: "none", fontWeight: "bold", fontSize: "16px"
};

const buttonLinkAndroid = {
  ...buttonLink, backgroundColor: "#00ffcc", color: "#000"
};

const noteStyle = { color: "#666", fontSize: "12px", marginTop: "20px" };