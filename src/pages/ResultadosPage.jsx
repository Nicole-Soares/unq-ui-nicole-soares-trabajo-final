import { MdOutlineReplay } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from 'react'; 
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize'; 
import "../style/ResultadosPage.css"; 

export default function ResultadosPage({
  cantidadDePreguntasCorrectas,
  cantidadDePreguntasIncorrectas,
}) {
  const navigate = useNavigate();
  //hook del tamaño de la ventana actual
  const { width, height } = useWindowSize(); 

  const handlerRepetir = () => {
    navigate("/"); 
  };

  return (
    <div className="resultados-background">
      {/* Esquina Superior Izquierda */}
      <Confetti
        width={width}
        height={height}
        origin={{ x: 0, y: 0 }}
        numberOfPieces={150} 
        gravity={0.1} //  más lento o rápido
        wind={0.05} 
      />

      {/* Esquina Superior Derecha */}
      <Confetti
        width={width}
        height={height}
        origin={{ x: 1, y: 0 }} 
        numberOfPieces={150} 
        gravity={0.1}
        wind={-0.05} 
      />

      {/* Contenido de los resultados */}
      <div className="resultados-container"> 
        <h1>Correct answers: {cantidadDePreguntasCorrectas}</h1>
        <h1>Wrong answers: {cantidadDePreguntasIncorrectas}</h1>
      </div>

      {/* Botón para volver a jugar */}
      <div className="boton-replay">
        <button onClick={handlerRepetir}>
        Play again! <MdOutlineReplay />
        </button>
      </div>
    </div>
  );
}