import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Center } from "@react-three/drei";

function DroneModel() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  const [interacting, setInteracting] = useState(false);

  return (
    <div style={displayBoxStyle}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          {/* DIMMED BRIGHTNESS: Reduced intensity to 0.4 for a natural look */}
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

          {/* MODERATE ROTATION: 
              1. autoRotateSpeed={1.8} is moderate (not too fast, not too slow).
              2. min/max PolarAngle locks vertical movement.
          */}
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
      </Canvas>

      {/* CURSOR PROMPT: The 'hand' indicator from your image */}
      {!interacting && (
        <div style={promptOverlayStyle}>
          <div style={handIconStyle}>
            <span style={{ fontSize: '24px' }}>🖐️</span>
          </div>
          <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#ccc' }}>Drag to rotate</p>
        </div>
      )}
    </div>
  );
}

// STYLES
const displayBoxStyle = {
  width: "100%",
  height: "500px",
  background: "radial-gradient(circle, #1a1a1a 0%, #000 100%)", // Darker background to help dimming
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

const handIconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.3)',
  margin: '0 auto'
};