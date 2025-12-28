import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { XR, createXRStore, useXR } from "@react-three/xr";
import * as THREE from "three";

const xrStore = createXRStore();
const isAndroid = /Android/i.test(navigator.userAgent);

/* ---------------- MODEL ---------------- */
function Model({ refObj }) {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive ref={refObj} object={scene} scale={0.4} />;
}

/* ---------------- AR SCENE ---------------- */
function ARScene() {
  const { gl } = useThree();
  const { session } = useXR();

  const modelRef = useRef();
  const hitTestSource = useRef(null);
  const refSpace = useRef(null);

  const [placed, setPlaced] = useState(false);

  const lastDist = useRef(null);
  const lastAngle = useRef(null);
  const lastPos = useRef(null);

  /* ---- HIT TEST SETUP ---- */
  useEffect(() => {
    if (!session) return;

    session.requestReferenceSpace("viewer").then((space) => {
      session.requestHitTestSource({ space }).then((source) => {
        hitTestSource.current = source;
      });
    });

    session.requestReferenceSpace("local").then((space) => {
      refSpace.current = space;
    });

    return () => hitTestSource.current?.cancel();
  }, [session]);

  /* ---- PREVIEW POSITION (ONLY BEFORE PLACEMENT) ---- */
  useFrame((_, frame) => {
    if (!frame || placed || !hitTestSource.current) return;

    const hits = frame.getHitTestResults(hitTestSource.current);
    if (hits.length > 0 && modelRef.current) {
      const pose = hits[0].getPose(refSpace.current);
      modelRef.current.position.set(
        pose.transform.position.x,
        pose.transform.position.y,
        pose.transform.position.z
      );
    }
  });

  /* ---- TAP TO PLACE ---- */
  useEffect(() => {
    if (!gl || placed) return;
    const place = () => setPlaced(true);
    gl.domElement.addEventListener("click", place);
    return () => gl.domElement.removeEventListener("click", place);
  }, [gl, placed]);

  /* ---- TOUCH CONTROLS ---- */
  const onTouchMove = (e) => {
    if (!placed || !modelRef.current) return;

    // MOVE (single finger)
    if (e.touches.length === 1) {
      if (!lastPos.current) {
        lastPos.current = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        };
        return;
      }

      const dx = e.touches[0].pageX - lastPos.current.x;
      const dz = e.touches[0].pageY - lastPos.current.y;

      modelRef.current.position.x += dx * 0.002;
      modelRef.current.position.z += dz * 0.002;

      lastPos.current = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
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
        modelRef.current.scale.clampScalar(0.2, 2);
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
    <group onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Suspense fallback={null}>
        <Model refObj={modelRef} />
      </Suspense>
    </group>
  );
}

/* ---------------- MAIN VIEWER ---------------- */
export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {isAndroid && (
        <button style={arBtn} onClick={() => xrStore.enterAR()}>
          OPEN AR
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => (gl.xr.enabled = true)}
      >
        <ambientLight intensity={1} />

        <XR store={xrStore}>
          {isAndroid ? (
            <ARScene />
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

/* ---------------- STYLES ---------------- */
const arBtn = {
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
