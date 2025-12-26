import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hola from './pages/Hola';
import AutoAR from './pages/AutoAR';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hola />} />
        {/* Register the path used by your QR code */}
        <Route path="/openar" element={<AutoAR />} />
      </Routes>
    </Router>
  );
}