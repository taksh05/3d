import { useEffect } from "react";

export default function AutoAR() {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const host = window.location.origin;

    // IMPORTANT — your model path
    const modelUrl = `${host}/models/model.glb`;
    const usdzUrl = `${host}/models/model.usdz`;

    if (/android/.test(userAgent)) {
      window.location.href =
        `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrl}` +
        `&mode=ar_preferred` +
        `&resizable=true` +
        `&enable_vertical_placement=true` +
        `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
      return;
    }

    if (/iphone|ipad|ipod/.test(userAgent)) {
      const a = document.createElement("a");
      a.setAttribute("rel", "ar");
      a.setAttribute("href", usdzUrl);
      const img = document.createElement("img");
      a.appendChild(img);

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    window.location.href = "/";
  }, []);

  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          color: "#00ffcc",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        🚀 Launching AR Camera…
      </h2>
      <p style={{ color: "#888" }}>
        If the screen is black, check your model path:
      </p>
      <code style={{ color: "#fff" }}>
        /public/models/model.glb + model.usdz
      </code>
    </div>
  );
}
