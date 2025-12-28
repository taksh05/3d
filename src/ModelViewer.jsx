import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Bounds } from "@react-three/drei";
import { XR, createXRStore, HitTest, useXR } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();

/* ---------- MODEL ---------- */
function ARModel() {
  const { scene } = useGLTF("/models/model.glb");
  const ref = useRef();

  return <primitive ref={ref} object={scene} scale={0.5} />;
}

/* ---------- AR CONTENT ---------- */
function ARScene() {
  const [placed, setPlaced] = useState(false);
  const modelRef = useRef();
  const { isPresenting } = useXR();

  /* ---------- TAP TO PLACE ---------- */
  const onSelect = (hit) => {
    if (!placed && modelRef.current) {
      hit.matrix.decompose(
        modelRef.current.position,
        modelRef.current.quaternion,
        modelRef.current.scale
      );
      setPlaced(true);
    }
  };

  /* ---------- PINCH & ROTATE ---------- */
  const onTouchMove = (e) => {
    if (!placed || !modelRef.current) return;

    if (e.touches.length === 2) {
      const dx = e.touches[0].pageX - e.touches[1].pageX;
      const dy = e.touches[0].pageY - e.touches[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      modelRef.current.scale.setScalar(
        THREE.MathUtils.clamp(distance / 200, 0.2, 2)
      );

      modelRef.current.rotation.y += dx * 0.005;
    }
  };

  return (
    <>
      {!placed && (
        <HitTest onSelect={onSelect}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.07, 0.09, 32]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </HitTest>
      )}

      <group ref={modelRef} onTouchMove={onTouchMove}>
        <Bounds fit observe margin={1.5}>
          <ARModel />
        </Bounds>
      </group>
    </>
  );
}

/* ---------- MAIN ---------- */
export default function ModelViewer() {
  const isMobile = /Android/i.test(navigator.userAgent);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#222" }}>
      {isMobile && (
        <button
          style={arButton}
          onClick={() => xrStore.enterAR()}
        >
          VIEW IN AR
        </button>
      )}

      <Canvas
        gl={{ antialias: true }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        <ambientLight intensity={1} />

        <XR store={xrStore}>
          <Suspense fallback={null}>
            <ARScene />
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
  padding: "14px 30px",
  background: "#00ffcc",
  border: "none",
  borderRadius: "32px",
  fontWeight: "bold",
};
