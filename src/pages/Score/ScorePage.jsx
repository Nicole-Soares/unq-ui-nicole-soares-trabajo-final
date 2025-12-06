import { getScores } from "../../utils/resultsLocalStorage";
import Menu from "../../components/menu/Menu";
import "./ScorePage.css";
import ThemeButtons from "../../components/ThemeButtons";
import { useTheme } from "../../hooks/useTheme";
export default function ScorePage() {
  const scores = getScores();
  const { theme } = useTheme();

  return (
    <div className={`score-container ${theme}`}>
      <div className="menu">
        <Menu />
      </div>
      <div className="theme-toggle-wrapper">
        <ThemeButtons />
      </div>
      <h1 className="score-title">Your Score</h1>

      <div className="score-grid">
        <div className="score-card easy">
          <h2>Easy</h2>
          <p>✔ Correct: {scores.easy.correct}</p>
          <p>✖ Wrong: {scores.easy.wrong}</p>
        </div>

        <div className="score-card normal">
          <h2>Normal</h2>
          <p>✔ Correct: {scores.normal.correct}</p>
          <p>✖ Wrong: {scores.normal.wrong}</p>
        </div>

        <div className="score-card hard">
          <h2>Hard</h2>
          <p>✔ Correct: {scores.hard.correct}</p>
          <p>✖ Wrong: {scores.hard.wrong}</p>
        </div>

        <div className="score-card extreme">
          <h2>Extreme</h2>
          <p>✔ Correct: {scores.extreme.correct}</p>
          <p>✖ Wrong: {scores.extreme.wrong}</p>
        </div>
      </div>
    </div>
  );
}
