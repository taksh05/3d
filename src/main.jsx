import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Hola from "./Hola.jsx";
import ARView from "./pages/ARView.jsx";
import AutoAR from "./pages/AutoAR.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hola />} />
        <Route path="/arview" element={<ARView />} />
        <Route path="/autoar" element={<AutoAR />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
