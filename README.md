# Trivia Game 🎮

Trabajo práctico final de la materia **Interfaces de Usuario** en la Universidad Nacional de Quilmes (UNQ), inspirado en el juego _Preguntados_.  
Es una aplicación web de trivia donde podés elegir una dificultad, responder preguntas y ver tu puntaje final.  

---

## <img src="https://www.svgrepo.com/show/327408/logo-vercel.svg" width="25" /> Vercel
-La página fue subida a Vercel para una experiencia más completa en cuanto a lo relacionado a desarrollo y producción, a continuación el link para acceder:
https://unq-ui-nicole-soares-trabajo-final.vercel.app/

<img width="1913" height="951" alt="image" src="https://github.com/user-attachments/assets/14f1d450-f743-4f61-b0bb-416f3f54b3d2" />

(no es necesario nada más, para correrlo localmente más abajo encontraran las indicaciones)

---

## 🧩 Funcionalidades principales

- **Selección de dificultad**: `easy`, `normal`, `hard`, `extreme`.
- **Pantalla de preguntas**:
  - Muestra una pregunta a la vez.
  - Feedback visual inmediato: botón verde si acertás, rojo si fallás.
  - Avanza automáticamente despues de 10seg a la siguiente pregunta.
- **Contador de progreso**: cuántas preguntas respondiste sobre el total.
- **Pantalla de resultados**: cantidad de respuestas correctas e incorrectas.
- **Modo claro / modo oscuro**:
  - Botón con ícono de sol/luna en la esquina superior derecha.
  - Cambia fondos y estilos según el tema.
- **Loader inicial**: pantalla de carga breve mientras se obtienen los datos.

---

## 🛠️ Tecnologías usadas

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- Context + hooks personalizados:
- CSS puro para estilos y animaciones.
- Fetch API para consumir el backend de preguntas.

---

## 🚀 Cómo ejecutar el proyecto

Pasos para poder ejecutar el proyecto localmente

### 1. Requisitos previos

- [Node.js](https://nodejs.org/) (versión recomendada 18+)
- npm o yarn (cualquiera de los dos)
- Git

### 2. Clonar el repositorio

Abrir la terminal, posicionarse en la carpeta donde se quiera clonar el repo
```bash
git clone https://github.com/Nicole-Soares/unq-ui-nicole-soares-trabajo-final.git
```

### 3. Instalar dependencias

Posicionarse en el repo clonado en el paso anterior con:

cd al repo clonado

Instalar lo necesario para su funcionamiento con:

```bash
npm install
```

### 4. Ejecutar localmente

Posicionado en el repo, lo levantamos con:

```bash
npm run dev
```
Mayormente se levanta en http://localhost:5173/, copiar y pegar esa url en el navegador o ctrl + click te direcciona al navegador

