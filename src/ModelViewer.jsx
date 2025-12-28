import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

const xrStore = createXRStore();
const isAndroid = /Android/i.test(navigator.userAgent);

/* ---------- MODEL ---------- */
function Model() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} scale={0.4} />;
}

/* ---------- MAIN ---------- */
export default function ModelViewer() {
  const [inAR, setInAR] = useState(false);

  const startAR = async () => {
    try {
      await xrStore.enterAR();
      setInAR(true);
    } catch (e) {
      alert("AR not supported on this device/browser");
      console.error(e);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {isAndroid && !inAR && (
        <button style={arButton} onClick={startAR}>
          START AR
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        <ambientLight intensity={1} />

        <XR store={xrStore}>
          <Suspense fallback={null}>
            <Model />
            {!inAR && <OrbitControls />}
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}

const arButton = {
  position: "absolute",
  bottom: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  padding: "14px 28px",
  background: "#00ffcc",
  border: "none",
  borderRadius: "30px",
  fontWeight: "bold",
};
