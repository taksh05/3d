import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

/* ---------- XR STORE ---------- */
const xrStore = createXRStore();

/* ---------- MODEL ---------- */
function Model() {
  const { scene } = useGLTF("/models/model.glb");

  // 🔧 Small scale adjustment (keeps proportions)
  scene.scale.set(0.75, 0.75, 0.75);

  return <primitive object={scene} />;
}

/* ---------- DEVICE CHECK ---------- */
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* ---------- MAIN ---------- */
export default function ModelViewer() {
  return (
    <div style={container}>

      {/* ---------- AR BUTTON (MOBILE ONLY) ---------- */}
      {isMobile && navigator.xr && (
        <button style={arButton} onClick={() => xrStore.enterAR()}>
          VIEW IN AR
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }} // 🔧 start further back
        gl={{ antialias: true }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        {/* 🌫 GREYISH BACKGROUND */}
        <color attach="background" args={["#2a2a2a"]} />

        {/* ⚠️ SAME BRIGHTNESS AS BEFORE */}
        <ambientLight intensity={1} />

        <XR store={xrStore}>
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.6}>
              <Model />
            </Bounds>

            <OrbitControls
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
              zoomSpeed={0.8}
              minDistance={4}
              maxDistance={25}   // 🔥 ALLOW MORE ZOOM OUT
            />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  width: "100%",
  height: "88vh",
  background:
    "radial-gradient(circle at center, #3a3a3a 0%, #1b1b1b 70%)",
  position: "relative",
};

const arButton = {
  position: "absolute",
  bottom: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  padding: "14px 30px",
  background: "#00ffcc",
  color: "#000",
  border: "none",
  borderRadius: "32px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
};
