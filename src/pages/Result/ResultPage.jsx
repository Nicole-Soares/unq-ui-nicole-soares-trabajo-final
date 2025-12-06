import { MdOutlineReplay } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "../../hooks/useWindowSize";
import "./ResultPage.css";
import ModalShare from "../../components/modales/ModalShare";
import Menu from "../../components/menu/Menu";

export default function ResultadosPage() {
const { state } = useLocation();
  const navigate = useNavigate();
  //hook del tamaño de la ventana actual
  const { width, height } = useWindowSize();

  const [shareMenuOpen, setShareMenuOpen] = useState(false);


  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null; 

  
  const { cantidadDePreguntasCorrectas, cantidadDePreguntasIncorrectas } =
    state;


  const openShareMenu = () => {
    setShareMenuOpen(true);
  };

  const closeShareMenu = () => {
    setShareMenuOpen(false);
  };

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
        style={{ pointerEvents: "none" }}
      />

      {/* Esquina Superior Derecha */}
      <Confetti
        width={width}
        height={height}
        origin={{ x: 1, y: 0 }}
        numberOfPieces={150}
        gravity={0.1}
        wind={-0.05}
        style={{ pointerEvents: "none" }}
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

        <button className="share-btn" onClick={openShareMenu}>
          Share score
        </button>

        {shareMenuOpen && (
          <ModalShare
            cantidadDePreguntasCorrectas={cantidadDePreguntasCorrectas}
            cantidadDePreguntasIncorrectas={cantidadDePreguntasIncorrectas}
            onClose={closeShareMenu}
          />
        )}
      </div>
    </div>
  );
}
