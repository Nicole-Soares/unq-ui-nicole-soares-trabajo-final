export default function PreguntaActual({
  pregunta,
  onAnswer,
  respuesta,
  opcionSeleccionada,
}) {
  //  para saber que boton se toco y que se pinte solo ese
  const obtenerClase = (opcionActual) => {
    if (respuesta && opcionSeleccionada === opcionActual) {
      return respuesta.answer ? "boton-correcto" : "boton-incorrecto";
    }
    return "";
  };

  const deshabilitarBotones = respuesta !== null;

  return (
    <div className="modal-opciones">
      <h1 className="pregunta">{pregunta.question}</h1>
      <div className="opciones-preguntas">
        <button
          onClick={() => onAnswer(pregunta.id, "option1")}
          className={`boton-pregunta ${obtenerClase("option1")}`}
          disabled={deshabilitarBotones}
        >
          <strong>Opción 1:</strong> {pregunta.option1}
        </button>

        <button
          onClick={() => onAnswer(pregunta.id, "option2")}
          className={`boton-pregunta ${obtenerClase("option2")}`}
          disabled={deshabilitarBotones}
        >
          <strong>Opción 2:</strong> {pregunta.option2}
        </button>

        <button
          onClick={() => onAnswer(pregunta.id, "option3")}
          className={`boton-pregunta ${obtenerClase("option3")}`}
          disabled={deshabilitarBotones}
        >
          <strong>Opción 3:</strong> {pregunta.option3}
        </button>

        <button
          onClick={() => onAnswer(pregunta.id, "option4")}
          className={`boton-pregunta ${obtenerClase("option4")}`}
          disabled={deshabilitarBotones}
        >
          <strong>Opción 4:</strong> {pregunta.option4}
        </button>
      </div>
    </div>
  );
}
