import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { XR, createXRStore, useHitTest, Interactive } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();

/* ---------- MODEL COMPONENT ---------- */
function ARModel({ rotationY }) {
  const { scene } = useGLTF("/models/model.glb");
  // Applying rotation to the model inside the stable anchor
  return <primitive object={scene} rotation={[0, rotationY, 0]} scale={0.5} />;
}

/* ---------- AR SCENE LOGIC ---------- */
function ARScene() {
  const [placed, setPlaced] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const anchorRef = useRef();   // The stable point on the floor
  const reticleRef = useRef();  // The targeting ring
  const lastTouchX = useRef(null);

  // This hook runs every frame in AR to position the reticle on the floor
  useHitTest((hitMatrix) => {
    if (!placed && reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
    }
  });

  const handleSelect = () => {
    if (!placed && reticleRef.current) {
      // Copy the reticle's position to our anchor to "lock" it in the real world
      anchorRef.current.position.copy(reticleRef.current.position);
      anchorRef.current.quaternion.copy(reticleRef.current.quaternion);
      setPlaced(true);
    }
  };

  const handlePointerMove = (e) => {
    if (!placed) return;
    // Calculation for 360 rotation based on finger swipe
    if (lastTouchX.current !== null) {
      const deltaX = e.clientX - lastTouchX.current;
      setRotationY((prev) => prev + deltaX * 0.01);
    }
    lastTouchX.current = e.clientX;
  };

  return (
    <>
      <ambientLight intensity={1.5} />

      {/* 1. THE TARGETING RETICLE */}
      {!placed && (
        <Interactive onSelect={handleSelect}>
          <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.05, 0.06, 32]} />
            <meshBasicMaterial color="#00ffcc" />
          </mesh>
        </Interactive>
      )}

      {/* 2. THE STABLE ANCHOR GROUP */}
      <group 
        ref={anchorRef} 
        onPointerMove={handlePointerMove}
        onPointerUp={() => (lastTouchX.current = null)}
        onPointerOut={() => (lastTouchX.current = null)}
      >
        {placed && (
          <Suspense fallback={null}>
            <ARModel rotationY={rotationY} />
          </Suspense>
        )}
      </group>
    </>
  );
}

/* ---------- MAIN VIEWPORT ---------- */
export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#000" }}>
      <button 
        style={arButtonStyle} 
        onClick={() => xrStore.enterAR()}
      >
        START AR EXPERIENCE
      </button>

      <Canvas>
        <XR store={xrStore}>
          <ARScene />
        </XR>
      </Canvas>
    </div>
  );
}

const arButtonStyle = {
  position: "absolute", bottom: "30px", left: "50%",
  transform: "translateX(-50%)", zIndex: 100,
  padding: "15px 30px", background: "#00ffcc",
  border: "none", borderRadius: "50px", fontWeight: "bold",
  cursor: "pointer"
};