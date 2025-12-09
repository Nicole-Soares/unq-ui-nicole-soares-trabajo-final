import { useEffect, useState, useRef } from "react";
import { useDifficulty } from "../../hooks/useDifficulty";
import Loader from "../../components/Loader/Loader";
import PreguntaActual from "../../components/PreguntaActual";
import "./GamePage.css";
import { useTheme } from "../../hooks/useTheme";
import ThemeButtons from "../../components/ThemeButtons";
import {
  checkAnswer,
  getQuestionsByDifficulty,
} from "../../services/triviaApi";
import { useNavigate } from "react-router-dom";
import { addResult } from "../../utils/resultsLocalStorage";
import Menu from "../../components/menu/Menu";

export default function GamePage() {
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
  const [errorMsg, setErrorMsg] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const navigate = useNavigate();
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
        const result = await getQuestionsByDifficulty(difficulty);
        setPreguntas(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMsg("Sorry, we couldn't load the questions. Please try again.");
        setLoading(false);
      }
    };

    //no se puede acceder a las preguntas sin antes haber elegido una dificultad
    if (difficulty === null) {
      navigate("/");
    }

    fetchPreguntas();
  }, [difficulty]);

  const fetchRespuesta = async (questionId, option) => {
    try {
      const data = await checkAnswer(questionId, option);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Sorry, we couldn't load the answer. Please try again.");
      return null;
    }
  };

  // cuando se termina el tiempo

  const handleTimeout = () => {
    // tiempo agotado = incorrecta
    setCantidadDePreguntasIncorrectas((prev) => prev + 1);
    setCantidadDePreguntasHechas((prev) => prev + 1);
    setRespuesta(null);
    setOpcionSeleccionada(null);
    setTimeLeft(10);
    setCurrentIndex((prev) => prev + 1);
  };

  // timer

  useEffect(() => {
    if (loading || preguntas.length === 0) return;
    if (cantidadDePreguntasHechas >= preguntas.length) return;

    // limpiar timers anteriores
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, loading, preguntas.length, cantidadDePreguntasHechas]);

  // Usuario responde
  const handleAnswer = async (questionId, option) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setOpcionSeleccionada(option);
    const data = await fetchRespuesta(questionId, option);

    if (data) {
      setRespuesta(data);

      setTimeout(() => {
        if (data.answer) {
          setCantidadDePreguntasCorrectas((prev) => prev + 1);
          console.log(difficulty);
          addResult(difficulty, 1, 0);
        } else {
          setCantidadDePreguntasIncorrectas((prev) => prev + 1);
          addResult(difficulty, 0, 1);
        }

        setCantidadDePreguntasHechas((prev) => prev + 1);
        setRespuesta(null);
        setOpcionSeleccionada(null);
        setTimeLeft(10);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    } else {
      setOpcionSeleccionada(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMsg) {
    return (
      <div className={`preguntas-background error-state ${theme}`}>
        <div className="theme-toggle-wrapper">
          <ThemeButtons />
        </div>
        <h2 className="error-message">{errorMsg}</h2>
      </div>
    );
  }

  if (cantidadDePreguntasHechas >= preguntas.length) {
    navigate("/resultados", {
      replace: true,
      state: {
        cantidadDePreguntasCorrectas,
        cantidadDePreguntasIncorrectas,
      },
    });
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
      <div className="menu">
        <Menu />
      </div>

      <div className="theme-toggle-wrapper">
        <ThemeButtons />
      </div>

      <div className="top-bar">
        <h1 className="cantidad-preguntas">
          {currentIndex + 1}/{preguntas.length}
        </h1>
        <span className="timer">{timeLeft}s</span>
      </div>

      <PreguntaActual
        key={currentIndex}
        pregunta={preguntas[currentIndex]}
        onAnswer={handleAnswer}
        respuesta={respuesta}
        opcionSeleccionada={opcionSeleccionada}
      />
    </div>
  );
}
