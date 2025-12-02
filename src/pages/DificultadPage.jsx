import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import "../style/DificultadPage.css";
import Arte from "../assets/Arte.png";
import Ciencia from "../assets/Ciencia.png";
import Deportes from "../assets/Deportes.png";
import Historia from "../assets/Historia.png";
import Willy from "../assets/Willy.png";
import Entrenemiento from "../assets/Entretenimiento.png";
import Geografia from "../assets/Geografia.png";
import { useDifficulty } from "../hooks/useDifficulty";

export default function DificultadPage() {
  const [dificultades, setDificultades] = useState([]);
  const { difficulty, setDifficulty } = useDifficulty(); // se podría usar useContext(y el contexto)
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  
    useEffect(() => {
    const MIN_LOADING_MS = 2050; // mínimo que querés ver el loader
    const start = Date.now(); // el tiempo en el que empezo a montarse el componente

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://preguntados-api.vercel.app/api/difficulty"
        );
        const result = await response.json();


        setDificultades(result);

        // cuánto tardó realmente
        const elapsed = Date.now() - start;
        const remaining = Math.max(MIN_LOADING_MS - elapsed, 0);

        // terminamos el loading después de completar el mínimo
        setTimeout(() => {
          setLoading(false);
        }, remaining);

      } catch (error) {
        console.error("Error fetching data:", error);
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
    setTimeout(() => {
        navigate("/preguntas");
      }, 0);
      
  };

  if (loading) {
    return <Loader />;
  };

  return (
    <div className="dificultad-background">
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
      <div className="modal-dificultad">
        <h1 className="modal-title">Seleccioná la dificultad</h1>

        {dificultades.length === 0 ? (
          <div>
            <h1>No hay dificultades disponibles</h1>
          </div>
        ) : (
          dificultades.map((dificultad) => (
            <button
              key={dificultad}
              className={`dificultad-btn ${
                difficulty === dificultad ? "seleccionado" : ""
              }`}
              onClick={() => handleClickDificultad(dificultad)}
            >
              {dificultad}
            </button>
          ))
        )}

        <button className="jugar-btn" disabled={!difficulty} onClick={handleJugar}>
          ¡A jugar!
        </button>
      </div>
    </div>
  );
}
