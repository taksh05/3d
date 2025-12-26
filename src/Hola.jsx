import ModelViewer from "./ModelViewer";
import "./App.css";

export default function Hola() {
  return (
    <div className="page">
      <header className="header">
        <h1 style={{ color: "#00ffcc", margin: 0 }}>Interactive 3D Demo</h1>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>React + WebXR Immersive</p>
      </header>

      <main className="main">
        <section className="textSection">
          <h2>Product Overview</h2>
          <p>
            Experience this model in 360° on your browser, in full VR using a headset, 
            or place it in your room using AR on your phone.
          </p>
        </section>

        <section className="modelSection">
          <ModelViewer />
        </section>
      </main>
    </div>
  );
}