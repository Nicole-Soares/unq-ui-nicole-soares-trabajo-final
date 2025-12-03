import React from 'react';

// Es buena práctica importar useState y useEffect explícitamente si vas a usar React.useState/React.useEffect
// Si ya estás usando 'React', puedes dejarlo así:
// import React from 'react';

const useWindowSize = () => {
  // Inicializa con el tamaño actual de la ventana
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Configura el listener de eventos
    window.addEventListener("resize", handleResize);
    
    // Llama handleResize una vez al inicio para capturar el tamaño inicial
    // (Esto resuelve un pequeño problema de que el tamaño inicial sea {width: 0, height: 0})
    handleResize(); 

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // El array de dependencias vacío [] asegura que solo se ejecute al montar.
  
  return size;
};

// 💡 Exporta la función para que otros componentes puedan usarla
export default useWindowSize;