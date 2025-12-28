import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Center, ARButton, XR } from "@react-three/drei";

function DroneModel() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  const [interacting, setInteracting] = useState(false);

  return (
    <div style={displayBoxStyle}>
      {/* 1. AR BUTTON: This must be present for the 'View in AR' button to show on phones */}
      <ARButton sessionInit={{ requiredFeatures: ['hit-test'] }} />

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* 2. XR WRAPPER: Required for R3F to handle the AR session */}
        <XR>
          <Suspense fallback={null}>
            <Stage 
              environment="studio" 
              intensity={0.4} 
              contactShadow={{ opacity: 0.6, blur: 2 }} 
              adjustCamera={true} 
            >
              <Center>
                <DroneModel />
              </Center>
            </Stage>

            <OrbitControls 
              makeDefault 
              enableDamping={true}
              autoRotate={!interacting} 
              autoRotateSpeed={1.8} 
              minPolarAngle={Math.PI / 2} 
              maxPolarAngle={Math.PI / 2}
              onStart={() => setInteracting(true)} 
            />
          </Suspense>
        </XR>
      </Canvas>

      {/* 3. CLEAN OVERLAY: Removed yellow emoji, kept simple text */}
      {!interacting && (
        <div style={promptOverlayStyle}>
          <div style={circleIconStyle}></div>
          <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>
            DRAG TO ROTATE
          </p>
        </div>
      )}
    </div>
  );
}

const displayBoxStyle = {
  width: "100%",
  height: "500px",
  background: "radial-gradient(circle, #1a1a1a 0%, #000 100%)",
  borderRadius: "24px",
  border: "1px solid #333",
  overflow: "hidden",
  position: "relative",
  cursor: "grab"
};

const promptOverlayStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  pointerEvents: 'none',
  opacity: 0.8
};

const circleIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.4)',
  margin: '0 auto',
  backgroundColor: 'rgba(255,255,255,0.1)'
};