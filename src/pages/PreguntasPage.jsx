import { useEffect, useState } from "react";
import { useDifficulty } from "../hooks/useDifficulty";
import Loader from "../components/Loader";
import PreguntaActual from "../components/PreguntaActual";
import "../style/PreguntaActual.css";
import ResultadosPage from "./ResultadosPage";
import { useTheme } from "../hooks/useTheme";
import ThemeButtons from "../components/ThemeButtons";

export default function PreguntasPage() {
  const [preguntas, setPreguntas] = useState([]);
  const { difficulty } = useDifficulty();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [cantidadDePreguntasHechas, setCantidadDePreguntasHechas] = useState(0);
  const [cantidadDePreguntasCorrectas, setCantidadDePreguntasCorrectas] =
    useState(0);
  const [cantidadDePreguntasIncorrectas, setCantidadDePreguntasIncorrectas] =
    useState(0);
  const listaDeFondos = [
    "fondo1",
    "fondo2",
    "fondo3",
    "fondo4",
    "fondo5",
    "fondo6",
    "fondo7",
    "fondo8",
    "fondo9",
    "fondo10",
  ];

  const listaDeFondosDark = [
    "fondo1Dark",
    "fondo2Dark",
    "fondo3Dark",
    "fondo4Dark",
    "fondo5Dark",
    "fondo6Dark",
    "fondo7Dark",
    "fondo8Dark",
    "fondo9Dark",
    "fondo10Dark",
  ];

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch(
          `https://preguntados-api.vercel.app/api/questions?difficulty=${difficulty}`
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
      const response = await fetch(
        "https://preguntados-api.vercel.app/api/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: questionId,
            option: option,
          }),
        }
      );

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
        if (data.answer) {
          setCantidadDePreguntasCorrectas((prev) => prev + 1);
        } else {
          setCantidadDePreguntasIncorrectas((prev) => prev + 1);
        }

        setCantidadDePreguntasHechas((prev) => prev + 1);

        setRespuesta(null);
        setOpcionSeleccionada(null);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    } else {
      setOpcionSeleccionada(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (cantidadDePreguntasHechas >= preguntas.length) {
    return (
      <ResultadosPage
        cantidadDePreguntasCorrectas={cantidadDePreguntasCorrectas}
        cantidadDePreguntasIncorrectas={cantidadDePreguntasIncorrectas}
      />
    );
  }

  const fondoActualClass = listaDeFondos[currentIndex % listaDeFondos.length];
  const fondoActualClassDark =
    listaDeFondosDark[currentIndex % listaDeFondosDark.length];

  return (
    <div
      className={
        theme === "light"
          ? `preguntas-background ${fondoActualClass}`
          : `preguntas-background ${fondoActualClassDark}`
      }
    >
      <div className="theme-toggle-wrapper">
        <ThemeButtons />
      </div>
      <h1 className="cantidad-preguntas">
        {cantidadDePreguntasHechas}/{preguntas.length - 1}
      </h1>
      <PreguntaActual
        key={currentIndex} // para renderizar de nuevo el componente cuando se cambia de pregunta
        pregunta={preguntas[currentIndex]} //para que pase a la siguiente pregunta
        onAnswer={handleAnswer}
        respuesta={respuesta}
        opcionSeleccionada={opcionSeleccionada}
      />
    </div>
  );
}
