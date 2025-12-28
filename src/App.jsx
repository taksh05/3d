import ModelViewer from "./ModelViewer";

function App() {
  return (
    <div style={appWrapperStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Interactive 3D Demo</h1>
        <p style={{ color: "#888" }}>React + WebXR Immersive</p>
      </header>

      {/* This is your proper display area container */}
      <div style={viewerContainerStyle}>
        <ModelViewer />
      </div>

      <div style={statusBarStyle}>
        <span>360° View Enabled</span>
        <span style={{ color: "#00ffcc" }}>● Live AR Ready</span>
      </div>
    </div>
  );
}

const appWrapperStyle = {
  backgroundColor: "#000",
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px"
};

const viewerContainerStyle = {
  width: "95%",
  maxWidth: "1100px",
  height: "550px", // Increased height for better visibility
  borderRadius: "24px",
  border: "1px solid #333",
  background: "#0a0a0a",
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
};

const headerStyle = { textAlign: "center", marginBottom: "30px" };
const titleStyle = { color: "#00ffcc", fontSize: "2rem", marginBottom: "5px" };
const statusBarStyle = { marginTop: "15px", display: "flex", gap: "20px", color: "#555", fontSize: "14px" };

export default App;