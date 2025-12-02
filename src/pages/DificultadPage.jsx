import React,{ useEffect, useState } from "react";
import Loader from "../components/Loader";
import "../style/DificultadPage.css";
import personajes from "../assets/personajesPreguntados.png"

export default function DificultadPage(){
    const [dificultades, setDificultades] = useState([]);
    const [dificultadSeleccionada, setDifilcultadSeleccionada] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://preguntados-api.vercel.app/api/difficulty');
                const result = await response.json();
                setDificultades(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleClickDificultad = (dificultad) => {
        setDifilcultadSeleccionada(dificultad);
    }

    return(
        <div className="dificultad-background">
            <img src={personajes} className="personajes-top" />
           <div className="modal-dificultad">
                <h1 className="modal-title">Seleccioná la dificultad</h1>

                {dificultades.length > 0 ? (
                    dificultades.map(dificultad => (
                        <button 
                            key={dificultad} 
                            className={`dificultad-btn ${dificultadSeleccionada === dificultad ? "seleccionado" : ""}`}
                            onClick={() => handleClickDificultad(dificultad)}
                        >
                            {dificultad}
                        </button>
                    ))
                ) : (
                    <Loader/>
                )}

                <button 
                    className="jugar-btn" 
                    disabled={!dificultadSeleccionada}
                >
                    ¡A jugar!
                </button>
            </div>

        </div>
    )
}
