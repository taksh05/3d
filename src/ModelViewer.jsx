import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { XR, createXRStore, useXR } from "@react-three/xr";
import * as THREE from "three";

/* ---------- XR STORE ---------- */
const xrStore = createXRStore();

/* ---------- DEVICE CHECK ---------- */
const isAndroid = /Android/i.test(navigator.userAgent);

/* ---------- MODEL ---------- */
function Model({ modelRef }) {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive ref={modelRef} object={scene} scale={0.4} />;
}

/* ---------- AR SCENE ---------- */
function ARScene() {
  const { gl } = useThree();
  const { session } = useXR();

  const modelRef = useRef();
  const hitTestSource = useRef(null);
  const referenceSpace = useRef(null);
  const [placed, setPlaced] = useState(false);

  const lastDistance = useRef(null);
  const lastAngle = useRef(null);

  /* ----- Setup native WebXR hit test ----- */
  useEffect(() => {
    if (!session) return;

    session.requestReferenceSpace("viewer").then((space) => {
      session.requestHitTestSource({ space }).then((source) => {
        hitTestSource.current = source;
      });
    });

    session.requestReferenceSpace("local").then((space) => {
      referenceSpace.current = space;
    });

    return () => {
      hitTestSource.current?.cancel();
      hitTestSource.current = null;
    };
  }, [session]);

  /* ----- Update model position before placement ----- */
  useFrame((_, frame) => {
    if (!frame || placed || !hitTestSource.current) return;

    const hits = frame.getHitTestResults(hitTestSource.current);
    if (hits.length > 0 && modelRef.current) {
      const pose = hits[0].getPose(referenceSpace.current);
      modelRef.current.position.set(
        pose.transform.position.x,
        pose.transform.position.y,
        pose.transform.position.z
      );
    }
  });

  /* ----- Tap to place model ----- */
  useEffect(() => {
    if (!gl || placed) return;

    const place = () => setPlaced(true);
    gl.domElement.addEventListener("click", place);

    return () => gl.domElement.removeEventListener("click", place);
  }, [gl, placed]);

  /* ----- Pinch zoom + rotate ----- */
  const onTouchMove = (e) => {
    if (!placed || e.touches.length !== 2) return;

    const dx = e.touches[0].pageX - e.touches[1].pageX;
    const dy = e.touches[0].pageY - e.touches[1].pageY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (lastDistance.current) {
      const scale = distance / lastDistance.current;
      modelRef.current.scale.multiplyScalar(scale);
      modelRef.current.scale.clampScalar(0.25, 2);
    }
    lastDistance.current = distance;

    const angle = Math.atan2(dy, dx);
    if (lastAngle.current !== null) {
      modelRef.current.rotation.y += angle - lastAngle.current;
    }
    lastAngle.current = angle;
  };

  const onTouchEnd = () => {
    lastDistance.current = null;
    lastAngle.current = null;
  };

  return (
    <group onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Suspense fallback={null}>
        <Model modelRef={modelRef} />
      </Suspense>
    </group>
  );
}

/* ---------- MAIN VIEWER ---------- */
export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* AR BUTTON – ANDROID ONLY */}
      {isAndroid && (
        <button style={arButton} onClick={() => xrStore.enterAR()}>
          OPEN AR CAMERA
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
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

/* ---------- BUTTON STYLE ---------- */
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
