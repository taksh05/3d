import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();
const isAndroid = /Android/i.test(navigator.userAgent);

/* -------- MODEL -------- */
function Model() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} scale={0.35} />;
}

/* -------- AR POSITION FIX -------- */
function ARFix() {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!ref.current) return;

    // Lock model 1.2m in front of camera ONCE
    if (!ref.current.userData.placed) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      ref.current.position.copy(camera.position).add(dir.multiplyScalar(1.2));
      ref.current.userData.placed = true;
    }
  });

  return (
    <group ref={ref}>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </group>
  );
}

/* -------- MAIN -------- */
export default function ModelViewer() {
  return (
    <div style={container}>
      {/* UI */}
      <div style={ui}>
        <h1>Interactive 3D Experience</h1>
        <p>Built with React + WebXR</p>

        {isAndroid && (
          <button style={btn} onClick={() => xrStore.enterAR()}>
            📱 Enter AR
          </button>
        )}
      </div>

      {/* CANVAS */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        <ambientLight intensity={1} />

        <XR store={xrStore}>
          {isAndroid ? (
            <ARFix />
          ) : (
            <Suspense fallback={null}>
              <Model />
              <OrbitControls />
            </Suspense>
          )}
        </XR>
      </Canvas>
    </div>
  );
}

/* -------- STYLES -------- */
const container = {
  width: "100%",
  height: "100vh",
  background: "black",
};

const ui = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  color: "white",
  zIndex: 10,
};

const btn = {
  marginTop: "24px",
  padding: "16px 36px",
  background: "#00ffcc",
  border: "none",
  borderRadius: "40px",
  fontSize: "18px",
  fontWeight: "bold",
};
