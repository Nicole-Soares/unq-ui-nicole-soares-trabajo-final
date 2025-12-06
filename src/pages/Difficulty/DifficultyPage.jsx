import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./DifficultyPage.css";
import Arte from "../../assets/Arte.png";
import Ciencia from "../../assets/Ciencia.png";
import Deportes from "../../assets/Deportes.png";
import Historia from "../../assets/Historia.png";
import Willy from "../../assets/Willy.png";
import Entrenemiento from "../../assets/Entretenimiento.png";
import Geografia from "../../assets/Geografia.png";
import { useDifficulty } from "../../hooks/useDifficulty";
import ThemeButtons from "../../components/ThemeButtons";
import { useTheme } from "../../hooks/useTheme";
import { getDifficulties } from "../../services/triviaApi";
import Menu from "../../components/menu/Menu";

export default function DifficultyPage() {
  const [dificultades, setDificultades] = useState([]);
  const { difficulty, setDifficulty } = useDifficulty(); // se podría usar useContext(y el contexto)
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const MIN_LOADING_MS = 2050; // mínimo que querés ver el loader
    const start = Date.now(); // el tiempo en el que empezo a montarse el componente

    const fetchData = async () => {
      try {
        const result = await getDifficulties();
        setDificultades(result);
        // cuánto tardó realmente
        const elapsed = Date.now() - start;
        const remaining = Math.max(MIN_LOADING_MS - elapsed, 0);
        setTimeout(() => {
          setLoading(false);
        }, remaining);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMsg(
          "Sorry, we couldn't load the difficulties. Please try again."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickDificultad = (dificultad) => {
    setDifficulty(dificultad);
  };

  const handleJugar = () => {
    if (!difficulty) return;
    navigate("/preguntas");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`difficulty-background ${theme}`}>
      <div className="menu">
        <Menu/>
      </div>
      <div className="theme-toggle-wrapper">
        <ThemeButtons />
      </div>
      <div className="content-wrapper">
      <div className="container-difficulty-character">
      <div>
        <h1 className="title-trivia">Trivia Game</h1>
      </div>
      <div className="contenedor-personajes">
        <img
          src={Ciencia}
          className="personajes-top personajes-animados"
          alt="ciencia"
        />
        <img
          src={Deportes}
          className="personajes-top personajes-animados"
          alt="deportes"
        />
        <img
          src={Historia}
          className="personajes-top personajes-animados"
          alt="historia"
        />
        <img
          src={Willy}
          className="personajes-top personajes-animados personaje-willy"
          alt="personajes"
        />
        <img
          src={Entrenemiento}
          className="personajes-top personajes-animados"
          alt="entetenimiento"
        />
        <img
          src={Geografia}
          className="personajes-top personajes-animados"
          alt="geografia"
        />
        <img
          src={Arte}
          className="personajes-top personajes-animados"
          alt="arte"
        />
      </div>
      <div className={`modal-difficulty ${theme}`}>
        <h1 className="modal-title">Choose a difficulty level</h1>

        {errorMsg ? (
          <h2 className="error-message">{errorMsg}</h2>
        ) : dificultades.length === 0 ? (
          <h1>No difficulties available at the moment.</h1>
        ) : (
          dificultades.map((dificultad) => (
            <button
              key={dificultad}
              className={`difficulty-btn ${
                difficulty === dificultad ? `seleccionado ${difficulty}` : ""
              }`}
              onClick={() => handleClickDificultad(dificultad)}
            >
              {dificultad}
            </button>
          ))
        )}

        <button
          className={`play-btn ${theme}`}
          disabled={!difficulty}
          onClick={handleJugar}
        >
          Let’s play!
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}
