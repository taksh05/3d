import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { XR, createXRStore, HitTest } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();

function ARModel({ rotationY }) {
  const { scene } = useGLTF("/models/model.glb");
  // Apply the rotation directly to the model inside the anchor
  return <primitive object={scene} rotation={[0, rotationY, 0]} scale={0.5} />;
}

function ARScene() {
  const [placed, setPlaced] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const anchorRef = useRef(); // This stays locked to the floor
  const lastTouchX = useRef(null);

  const onSelect = (hit) => {
    if (anchorRef.current) {
      // Decompose the hit matrix into the anchor's position
      // This "locks" the model to the physical world
      hit.matrix.decompose(
        anchorRef.current.position,
        anchorRef.current.quaternion,
        new THREE.Vector3() // We keep our own scale
      );
      setPlaced(true);
    }
  };

  // WebXR handles touch events differently. 
  // For simple rotation, we can track the movement delta.
  const handlePointerMove = (e) => {
    if (!placed) return;
    
    // One finger drag for 360 rotation
    if (lastTouchX.current !== null) {
      const deltaX = e.clientX - lastTouchX.current;
      setRotationY((prev) => prev + deltaX * 0.01);
    }
    lastTouchX.current = e.clientX;
  };

  const handlePointerUp = () => {
    lastTouchX.current = null;
  };

  return (
    <>
      {/* 1. THE RETICLE (Targeting) */}
      {!placed && (
        <HitTest onSelect={onSelect}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.07, 0.09, 32]} />
            <meshBasicMaterial color="#00ffcc" />
          </mesh>
        </HitTest>
      )}

      {/* 2. THE ANCHOR (Stability) */}
      <group 
        ref={anchorRef} 
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
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

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#111" }}>
      <button style={arButton} onClick={() => xrStore.enterAR()}>
        START AR
      </button>

      <Canvas gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <XR store={xrStore}>
          <ARScene />
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
  zIndex: 100,
  padding: "16px 32px",
  background: "#00ffcc",
  borderRadius: "50px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer"
};