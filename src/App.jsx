import ModelViewer from "./ModelViewer";

function App() {
  return (
    // Add a minHeight and background to the whole app so it's not a white void
    <div style={appWrapperStyle}>
      <h1 style={{ color: "#00ffcc", textAlign: "center", marginTop: "20px" }}>
        Interactive 3D Demo
      </h1>
      <p style={{ color: "#aaa", textAlign: "center" }}>
        Rotate in 3D or view in AR on your phone
      </p>

      {/* This must be inside a div that has a defined width/height */}
      <ModelViewer />
    </div>
  );
}

const appWrapperStyle = {
  backgroundColor: "#000",
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  padding: "20px",
  boxSizing: "border-box",
  fontFamily: "sans-serif"
};

export default App;