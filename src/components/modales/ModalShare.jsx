import "../../style/ModalShare.css";
import { IoClose } from "react-icons/io5";

export default function ModalShare({
  cantidadDePreguntasCorrectas,
  cantidadDePreguntasIncorrectas,
  onClose,
}) {
  const getShareLinks = () => {
    const total = cantidadDePreguntasCorrectas + cantidadDePreguntasIncorrectas;
    const scoreText = `I scored ${cantidadDePreguntasCorrectas}/${total} correct answers in Trivia Game!`;

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=https://yourgame.com&quote=${encodeURIComponent(
        scoreText
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        scoreText
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(scoreText)}`,
    };
  };

  return (
    <div className="share-contenedor">
      <div className="share-menu">
        <div className="contenedor-share-icono">
        <button className="share-close-btn" onClick={onClose}>
          <IoClose className="icono-share"/>
        </button>
        </div>
        <a href={getShareLinks().facebook} target="_blank">
          Facebook
        </a>
        <a href={getShareLinks().twitter} target="_blank">
          Twitter / X
        </a>
        <a href={getShareLinks().whatsapp} target="_blank">
          WhatsApp Web
        </a>
      </div>
    </div>
  );
}
