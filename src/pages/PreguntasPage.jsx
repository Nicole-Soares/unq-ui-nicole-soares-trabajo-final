import { useEffect, useState } from "react";
import { useDifficulty } from "../hooks/useDifficulty";
import Loader from "../components/Loader";
import PreguntaActual from "../components/PreguntaActual";
import "../style/PreguntaActual.css";
import ResultadosPage from "./ResultadosPage";

export default function PreguntasPage() {
  const [preguntas, setPreguntas] = useState([]);
  const { difficulty } = useDifficulty();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuesta, setRespuesta] = useState(null); 
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [cantidadDePreguntasHechas, setCantidadDePreguntasHechas] = useState(0);
  const [cantidadDePreguntasCorrectas, setCantidadDePreguntasCorrectas] = useState(0);
  const [cantidadDePreguntasIncorrectas, setCantidadDePreguntasIncorrectas] = useState(0);
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
      console.error(err);
      return null;
    } 
  };

  //cuando seleccionan una respuesta
  const handleAnswer = async (questionId, option) => {
 
    setOpcionSeleccionada(option);
    const data = await fetchRespuesta(questionId, option);
    
    if (data) {
        setRespuesta(data);       
        setTimeout(() => {
           if(data.answer){
           // 💡 FORMA FUNCIONAL: Usar el valor actual (prev)
             setCantidadDePreguntasCorrectas(prev => prev + 1);
           }
           else{
            // 💡 FORMA FUNCIONAL: Usar el valor actual (prev)
             setCantidadDePreguntasIncorrectas(prev => prev + 1);
            }
           
             // Puedes usar una sola actualización para las preguntas hechas
            setCantidadDePreguntasHechas(prev => prev + 1);
            
          // Resto del código
            setRespuesta(null);
            setOpcionSeleccionada(null);
            setCurrentIndex(prev => prev + 1); // También es buena práctica usar prev aquí
           }, 2000);
    }
    else{
        setOpcionSeleccionada(null);
    }
};

  if (loading) {
    return( <Loader />);
  }

  // si ya pasaste las 10 → mostrar pantalla de resultados
  if (cantidadDePreguntasHechas >= preguntas.length) {
    return <ResultadosPage cantidadDePreguntasCorrectas={cantidadDePreguntasCorrectas} cantidadDePreguntasIncorrectas={cantidadDePreguntasIncorrectas} />;
  }
    
  return (
    <div className="preguntas-background">
        <h1>{cantidadDePreguntasHechas}/{preguntas.length}</h1>
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
