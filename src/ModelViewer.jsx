import React, { useState, useEffect, useRef } from "react";

export default function ModelViewer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canAR, setCanAR] = useState(false);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Load Model Viewer script dynamically
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    script.type = 'module';
    script.onload = () => {
      console.log('Model Viewer loaded successfully');
      // Check AR support after script loads
      setTimeout(() => {
        if (modelViewerRef.current) {
          setCanAR(modelViewerRef.current.canActivateAR);
          console.log('AR Support:', modelViewerRef.current.canActivateAR);
        }
      }, 500);
    };
    document.head.appendChild(script);

    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      setIsLoading(false);
      console.log('Model loaded successfully');
    };

    const handleError = (e) => {
      console.error('Model Viewer Error:', e.detail);
      setIsLoading(false);
      alert('Failed to load 3D model. Please check the file path: /models/model.glb');
    };

    const handleARStatus = () => {
      setCanAR(modelViewer.canActivateAR);
      console.log('AR Available:', modelViewer.canActivateAR);
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);
    modelViewer.addEventListener('ar-status', handleARStatus);

    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('error', handleError);
      modelViewer.removeEventListener('ar-status', handleARStatus);
    };
  }, []);

  const handleARClick = () => {
    if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
      modelViewerRef.current.activateAR();
    }
  };

  return (
    <div style={page}>
      <div style={header}>
        <h1 style={title}>Cargo Drone Explorer</h1>
        <p style={subtitle}>360° Inspection & AR Space</p>
      </div>

      <div style={viewerContainer}>
        <model-viewer
          ref={modelViewerRef}
          src="/models/model.glb"
          alt="Cargo Drone 3D Model"
          
          ar
          ar-modes="scene-viewer quick-look webxr"
          ar-scale="fixed"
          ar-placement="floor"
          
          camera-controls
          touch-action="pan-y"
          
          camera-orbit="45deg 75deg 105%"
          min-camera-orbit="auto auto 50%" 
          max-camera-orbit="auto auto 200%"
          
          exposure={isMobile ? 0.8 : 0.35}
          environment-image="neutral"
          shadow-intensity="1.5"
          shadow-softness="0.5"
          
          auto-rotate
          auto-rotate-delay="1000"
          rotation-per-second="30deg"
          
          loading="eager"
          reveal="auto"
          
          style={viewer}
        >
          {isLoading && (
            <div style={loadingOverlay}>
              <div style={spinner}></div>
              <p style={loadingText}>Loading 3D Model...</p>
            </div>
          )}

          {!isLoading && isMobile && canAR && (
            <button 
              slot="ar-button" 
              style={arButton}
              onClick={handleARClick}
            >
              📦 DEPLOY & INSPECT IN AR
            </button>
          )}

          {!isLoading && isMobile && !canAR && (
            <div style={arNotAvailable}>
              AR not available on this device
            </div>
          )}
        </model-viewer>

        <div style={controls}>
          <div style={controlItem}>
            <span style={controlLabel}>Status:</span>
            <span style={{...controlValue, color: isLoading ? '#ff9900' : '#00ff00'}}>
              {isLoading ? 'Loading...' : 'Ready'}
            </span>
          </div>
          <div style={controlItem}>
            <span style={controlLabel}>Rotate:</span>
            <span style={controlValue}>Drag</span>
          </div>
          <div style={controlItem}>
            <span style={controlLabel}>Zoom:</span>
            <span style={controlValue}>Pinch/Scroll</span>
          </div>
          {canAR && (
            <div style={{...controlItem, color: '#00ff00'}}>
              <span style={controlLabel}>AR:</span>
              <span style={controlValue}>Ready ✓</span>
            </div>
          )}
        </div>
      </div>

      <div style={instructions}>
        <div style={instructionCard}>
          <div style={instructionIcon}>📱</div>
          <h3 style={instructionTitle}>iOS (iPhone/iPad)</h3>
          <p style={instructionText}>
            Tap "DEPLOY & INSPECT IN AR" → Model auto-converts to USDZ → Opens in AR Quick Look
          </p>
        </div>
        <div style={instructionCard}>
          <div style={instructionIcon}>🤖</div>
          <h3 style={instructionTitle}>Android</h3>
          <p style={instructionText}>
            Tap "DEPLOY & INSPECT IN AR" → Opens in Scene Viewer → Place in your space
          </p>
        </div>
        <div style={instructionCard}>
          <div style={instructionIcon}>💻</div>
          <h3 style={instructionTitle}>Desktop</h3>
          <p style={instructionText}>
            Drag to rotate • Scroll to zoom • Auto-rotates after 1 second
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        button[slot="ar-button"]:hover {
          transform: translateX(-50%) translateY(-2px) !important;
          box-shadow: 0 15px 40px rgba(0, 123, 255, 0.6) !important;
        }
        
        @media (max-width: 768px) {
          model-viewer {
            height: 450px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- STYLES ---------- */
const page = {
  width: "100%",
  minHeight: "100vh",
  background: "#0a0a0a",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
};

const header = {
  textAlign: "center",
  color: "#fff",
  padding: "20px",
  zIndex: 10,
};

const title = { 
  fontSize: "20px", 
  margin: "0", 
  letterSpacing: "1px",
};

const subtitle = { 
  fontSize: "10px", 
  color: "#666", 
  letterSpacing: "2px",
};

const viewerContainer = {
  position: "relative",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  flex: "1",
};

const viewer = {
  width: "100%",
  height: "600px",
  background: "transparent",
  borderRadius: "8px",
};

const loadingOverlay = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.8)",
  borderRadius: "8px",
  zIndex: "10",
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "4px solid rgba(255, 255, 255, 0.1)",
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const loadingText = {
  color: "#fff",
  marginTop: "20px",
  fontSize: "14px",
};

const arButton = {
  position: "absolute",
  bottom: "90px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "16px 32px",
  background: "#007bff",
  color: "white",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  fontSize: "12px",
  boxShadow: "0 10px 20px rgba(0, 123, 255, 0.3)",
  cursor: "pointer",
  zIndex: "999",
  whiteSpace: "nowrap",
  transition: "all 0.3s ease",
};

const arNotAvailable = {
  position: "absolute",
  bottom: "90px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 24px",
  background: "rgba(255, 153, 0, 0.2)",
  color: "#ff9900",
  borderRadius: "8px",
  fontSize: "11px",
  border: "1px solid rgba(255, 153, 0, 0.3)",
};

const controls = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(10px)",
  padding: "15px",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "11px",
  zIndex: "5",
  minWidth: "150px",
};

const controlItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
  gap: "15px",
};

const controlLabel = {
  color: "#888",
};

const controlValue = {
  fontWeight: "600",
  color: "#fff",
};

const instructions = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
};

const instructionCard = {
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  padding: "25px",
  textAlign: "center",
  transition: "all 0.3s ease",
};

const instructionIcon = {
  fontSize: "40px",
  marginBottom: "15px",
};

const instructionTitle = {
  color: "#fff",
  fontSize: "16px",
  marginBottom: "10px",
  fontWeight: "600",
};

const instructionText = {
  color: "#888",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: 0,
};