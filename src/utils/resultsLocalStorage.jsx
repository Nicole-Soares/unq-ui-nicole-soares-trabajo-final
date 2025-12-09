const KEY = "trivia_scores";

const BASE = {
  easy: { correct: 0, wrong: 0 },
  normal: { correct: 0, wrong: 0 },
  hard: { correct: 0, wrong: 0 },
  extreme: { correct: 0, wrong: 0 },
};

export function getScores() {
  const data = localStorage.getItem(KEY);
  const parsed = data ? JSON.parse(data) : {};

  // para tener los cuatro niveles de base
  return {
    easy: parsed.easy ?? BASE.easy,
    normal: parsed.normal ?? BASE.normal,
    hard: parsed.hard ?? BASE.hard,
    extreme: parsed.extreme ?? BASE.extreme,
  };
}

export function addResult(difficulty, correctIncrement, wrongIncrement) {
  const scores = getScores();

  const current = scores[difficulty];

  scores[difficulty] = {
    correct: current.correct + correctIncrement,
    wrong: current.wrong + wrongIncrement,
  };

  localStorage.setItem(KEY, JSON.stringify(scores));
}

export function resetScores() {
  localStorage.removeItem(KEY);
}
