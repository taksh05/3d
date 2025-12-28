import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Only keep this if you still have pages using <model-viewer>
import "@google/model-viewer/dist/model-viewer.min.js";

import Hola from "./Hola.jsx";
import ARView from "./pages/ARView.jsx";
import AutoAR from "./pages/AutoAR.jsx";

// Performance Tip: R3F canvases are best rendered in physical devices, 
// so avoid heavy processing in this main entry file.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hola />} />
        {/* Your new R3F AR component will live inside these pages */}
        <Route path="/arview" element={<ARView />} />
        <Route path="/autoar" element={<AutoAR />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);