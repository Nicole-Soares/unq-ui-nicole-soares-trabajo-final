import { useEffect, useState } from "react";
import { useDifficulty } from "../hooks/useDifficulty";
import Loader from "../components/Loader";
import PreguntaActual from "../components/PreguntaActual";
import "../style/PreguntaActual.css";

export default function PreguntasPage() {
  const [preguntas, setPreguntas] = useState([]);
  const { difficulty } = useDifficulty();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuesta, setRespuesta] = useState(null); 
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch(
          `https://preguntados-api.vercel.app/api/questions?difficulty=easy`
        );
        const result = await response.json();
        setPreguntas(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPreguntas();
  }, [difficulty]);


  const fetchRespuesta = async (questionId, option) => {
    try {
        setOpcionSeleccionada(option);
      const response = await fetch('https://preguntados-api.vercel.app/api/answer', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questionId,
          option: option
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.err(err);
    } 
  };

  const handleAnswer = async (questionId, option) => {
 
    const data = await fetchRespuesta(questionId, option);
    
    if (data) {
        setRespuesta(data);       
        setTimeout(() => {
            setRespuesta(null);
            setCurrentIndex(currentIndex + 1);
        }, 1500); 
    }
};

  if (loading) {
    return( <Loader />);
  }
/*
  // si ya pasaste las 10 → mostrar pantalla de resultados
  if (currentIndex >= preguntas.length) {
    return <ResultadosPage />;
  }
    */
  return (
    <div className="preguntas-background">
    <PreguntaActual
      key={currentIndex} // para renderizar de nuevo el componente cuando se cambia de pregunta
      pregunta={preguntas[currentIndex]}
      onAnswer={handleAnswer}
      respuesta={respuesta}
      opcionSeleccionada={opcionSeleccionada}
    />
    </div>
  );
}
