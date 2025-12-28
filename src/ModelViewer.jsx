import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();
const isAndroid = /Android/i.test(navigator.userAgent);

/* ---------------- MODEL ---------------- */
function Model({ visible, modelRef }) {
  const { scene } = useGLTF("/models/model.glb");

  return visible ? (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.35} // ✅ NOT TOO BIG
    />
  ) : null;
}

/* ---------------- AR SCENE ---------------- */
function ARScene() {
  const modelRef = useRef();
  const [placed, setPlaced] = useState(false);
  const [visible, setVisible] = useState(false);

  const lastDist = useRef(null);
  const lastAngle = useRef(null);
  const lastPos = useRef(null);

  /* ---- PLACE MODEL IN FRONT OF CAMERA ---- */
  const placeModel = (camera) => {
    if (!modelRef.current) return;

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const position = camera.position.clone().add(direction.multiplyScalar(1.2));
    modelRef.current.position.copy(position);

    setPlaced(true);
    setVisible(true);
  };

  /* ---- TOUCH CONTROLS ---- */
  const onTouchMove = (e, camera) => {
    if (!placed || !modelRef.current) return;

    // MOVE (single finger)
    if (e.touches.length === 1) {
      if (!lastPos.current) {
        lastPos.current = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        };
        return;
      }

      const dx = e.touches[0].pageX - lastPos.current.x;
      const dz = e.touches[0].pageY - lastPos.current.y;

      modelRef.current.position.x += dx * 0.002;
      modelRef.current.position.z += dz * 0.002;

      lastPos.current = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
    }

    // SCALE + ROTATE (two fingers)
    if (e.touches.length === 2) {
      const dx = e.touches[0].pageX - e.touches[1].pageX;
      const dy = e.touches[0].pageY - e.touches[1].pageY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (lastDist.current) {
        const scale = dist / lastDist.current;
        modelRef.current.scale.multiplyScalar(scale);
        modelRef.current.scale.clampScalar(0.25, 1.5);
      }
      lastDist.current = dist;

      const angle = Math.atan2(dy, dx);
      if (lastAngle.current !== null) {
        modelRef.current.rotation.y += angle - lastAngle.current;
      }
      lastAngle.current = angle;
    }
  };

  const onTouchEnd = () => {
    lastDist.current = null;
    lastAngle.current = null;
    lastPos.current = null;
  };

  return (
    <>
      <ambientLight intensity={1} />

      <Suspense fallback={null}>
        <Model modelRef={modelRef} visible={visible} />
      </Suspense>

      {/* TAP TO PLACE */}
      {!placed && (
        <mesh
          onClick={(e) => placeModel(e.camera)}
          visible={false}
        >
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      )}

      <group
        onTouchMove={(e) => onTouchMove(e, e.camera)}
        onTouchEnd={onTouchEnd}
      />
    </>
  );
}

/* ---------------- MAIN VIEW ---------------- */
export default function ModelViewer() {
  const [inAR, setInAR] = useState(false);

  const startAR = async () => {
    try {
      await xrStore.enterAR();
      setInAR(true);
    } catch {
      alert("AR not supported on this device");
    }
  };

  return (
    <div style={pageStyle}>
      {/* UI SECTION */}
      {!inAR && (
        <div style={uiStyle}>
          <h1>Interactive 3D Experience</h1>
          <p>Built with React + WebXR</p>

          {isAndroid && (
            <button style={enterBtn} onClick={startAR}>
              📱 Enter AR
            </button>
          )}
        </div>
      )}

      {/* CANVAS */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        <XR store={xrStore}>
          {isAndroid && inAR ? (
            <ARScene />
          ) : (
            <Suspense fallback={null}>
              <Model visible />
              <OrbitControls />
            </Suspense>
          )}
        </XR>
      </Canvas>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const pageStyle = {
  width: "100%",
  height: "100vh",
  background: "black",
};

const uiStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  zIndex: 10,
  color: "white",
};

const enterBtn = {
  marginTop: "20px",
  padding: "14px 28px",
  background: "#00ffcc",
  border: "none",
  borderRadius: "30px",
  fontSize: "16px",
  fontWeight: "bold",
};
