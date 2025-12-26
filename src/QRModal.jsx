export default function QRModal({ close }) {
  const url = "https://3d-nine-bay.vercel.app/arview";

  return (
    <div style={modal}>
      <div style={box}>
        <h3 style={{ marginBottom: "15px" }}>
          Scan to open AR 📱
        </h3>

        <img
          src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${url}`}
          alt="QR Code"
        />

        <p style={{ marginTop: "10px" }}>
          {url}
        </p>

        <button style={closeBtn} onClick={close}>
          Close
        </button>

      </div>
    </div>
  );
}

const modal = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const box = {
  background: "#111",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  color: "white",
};

const closeBtn = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#00ffcc",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};
