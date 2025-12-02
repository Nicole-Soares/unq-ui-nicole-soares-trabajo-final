import './App.css'
import { Routes, Route } from "react-router-dom";
import DificultadPage from "./pages/DificultadPage";
import PreguntasPage from './pages/PreguntasPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DificultadPage />} />
      <Route path="/preguntas" element={<PreguntasPage />} />
    </Routes>
  )
}

export default App
