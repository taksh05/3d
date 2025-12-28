import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { XR, createXRStore, useHitTest, Interactive } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();

function ARModel({ rotationY }) {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} rotation={[0, rotationY, 0]} scale={0.5} />;
}

function ARScene() {
  const [placed, setPlaced] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const anchorRef = useRef();
  const reticleRef = useRef();
  const lastTouchX = useRef(null);

  // V6 Hit Test logic: This runs every frame to move the reticle
  useHitTest((hitMatrix) => {
    if (!placed && reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
    }
  });

  const handleSelect = (e) => {
    if (!placed && reticleRef.current) {
      anchorRef.current.position.copy(reticleRef.current.position);
      anchorRef.current.quaternion.copy(reticleRef.current.quaternion);
      setPlaced(true);
    }
  };

  const handlePointerMove = (e) => {
    if (!placed) return;
    if (lastTouchX.current !== null) {
      const deltaX = e.clientX - lastTouchX.current;
      setRotationY((prev) => prev + deltaX * 0.01); // Smooth 360 rotation
    }
    lastTouchX.current = e.clientX;
  };

  return (
    <>
      {/* Reticle: Only shows until you tap to place */}
      {!placed && (
        <Interactive onSelect={handleSelect}>
          <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.05, 0.06, 32]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </Interactive>
      )}

      {/* Anchor: Stays fixed in the real world */}
      <group 
        ref={anchorRef} 
        onPointerMove={handlePointerMove}
        onPointerUp={() => (lastTouchX.current = null)}
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
    <div style={{ width: "100%", height: "100vh" }}>
      <button 
        style={arButton} 
        onClick={() => xrStore.enterAR()}
      >
        VIEW IN AR
      </button>

      <Canvas>
        <XR store={xrStore}>
          <ambientLight intensity={1} />
          <ARScene />
        </XR>
      </Canvas>
    </div>
  );
}

const arButton = {
  position: "absolute", bottom: "20px", left: "50%",
  transform: "translateX(-50%)", zIndex: 1000,
  padding: "12px 24px", borderRadius: "20px",
  backgroundColor: "#00ffcc", border: "none", fontWeight: "bold"
};