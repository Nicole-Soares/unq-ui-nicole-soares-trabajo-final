import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./App.jsx";
import { DifficultyProvider } from "./context/DifficultyContext.jsx"; //para que cualquier cosa dentro de app pueda acceder al contexto

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <DifficultyProvider>
      <App />
    </DifficultyProvider>
    </BrowserRouter>
  </StrictMode>
);
