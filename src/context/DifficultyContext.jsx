/* eslint-disable react-refresh/only-export-components */

//para tener de forma global la dificultad
import { createContext, useState } from "react";

export const DifficultyContext = createContext(null);

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}
