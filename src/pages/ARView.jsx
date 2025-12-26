import ModelViewer from "../ModelViewer";

export default function ARView() {
  return (
    <div style={styles.page}>
      <header style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ color: '#00ffcc' }}>Augmented Reality</h2>
        <p>Interact with the model below</p>
      </header>
      
      <div style={styles.box}>
        <ModelViewer />
      </div>

      <a href="/" style={styles.back}>⬅ Back to Home</a>
    </div>
  );
}
// ... Keep your existing styles