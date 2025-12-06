import './App.css'
import { Routes, Route } from "react-router-dom";
import DifficultyPage from "./pages/Difficulty/DifficultyPage";
import GamePage from './pages/Game/GamePage';
import ResultadosPage from './pages/Result/ResultPage';
import ScorePage from './pages/Score/ScorePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DifficultyPage />} />
      <Route path="/preguntas" element={<GamePage />} />
      <Route path='/resultados' element={<ResultadosPage/>} />
      <Route path='/resultados' element={<ResultadosPage/>} />
      <Route path='/score' element={<ScorePage/>} />
    </Routes>
  )
}

export default App
