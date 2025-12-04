import React from "react";

const useWindowSize = () => {
  // Inicializa con el tamaño actual de la ventana
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Configura el listener de eventos
    window.addEventListener("resize", handleResize);

    // Llama handleResize una vez al inicio para capturar el tamaño inicial
    handleResize();

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;
