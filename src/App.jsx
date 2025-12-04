import './App.css'
import { Routes, Route } from "react-router-dom";
import DifficultyPage from "./pages/Difficulty/DifficultyPage";
import GamePage from './pages/Game/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DifficultyPage />} />
      <Route path="/preguntas" element={<GamePage />} />
    </Routes>
  )
}

export default App
