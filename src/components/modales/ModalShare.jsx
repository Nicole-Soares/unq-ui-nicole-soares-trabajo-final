import "./ModalShare.css";
import { IoClose } from "react-icons/io5";

export default function ModalShare({
  cantidadDePreguntasCorrectas,
  cantidadDePreguntasIncorrectas,
  onClose,
}) {
  const total = cantidadDePreguntasCorrectas + cantidadDePreguntasIncorrectas;

  const scoreText = `I scored ${cantidadDePreguntasCorrectas}/${total} correct answers in Trivia Game!`;

  const DOMAIN = "https://unq-ui-nicole-soares-trabajo-final.vercel.app/";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      DOMAIN
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      scoreText
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(scoreText)}`,
  };

  return (
    <div className="share-contenedor">
      <div className="share-menu">
        <div className="contenedor-share-icono">
          <button className="share-close-btn" onClick={onClose}>
            <IoClose className="icono-share" />
          </button>
        </div>

        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>

        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          Twitter / X
        </a>

        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp Web
        </a>
      </div>
    </div>
  );
}
