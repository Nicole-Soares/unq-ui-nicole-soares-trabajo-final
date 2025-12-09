const API_BASE_URL = "https://preguntados-api.vercel.app/api"; 

async function handleResponse(response) {
  if (!response.ok) {
    const message = `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

// GET /difficulty
export async function getDifficulties() {
  const res = await fetch(`${API_BASE_URL}/difficulty`);
  return handleResponse(res);
}

// GET /questions?difficulty=...
export async function getQuestionsByDifficulty(difficulty) {
  const res = await fetch(
    `${API_BASE_URL}/questions?difficulty=${difficulty}`
  );
  return handleResponse(res);
}

// POST /answer
export async function checkAnswer(questionId, option) {
  const res = await fetch(`${API_BASE_URL}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, option }),
  });
  return handleResponse(res);
}
