//el hook maneja un estado compartido con el contexto, se puede usar useContext
import { useContext } from "react";
import { DifficultyContext } from "../context/DifficultyContext";

export function useDifficulty() {
  const context = useContext(DifficultyContext); // se podria directamente hacer esto en donde se quiere usar el contexto
  return context; // { difficulty, setDifficulty }
}
