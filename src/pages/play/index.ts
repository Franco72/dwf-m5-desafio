import { state } from "../../state";
//* (Paso 3, ver primero los otros)
function viewMove(playerMoveContainer, machineMoveContainer) {
  // Creo 2 componentes a-move (muestran una jugada)
  const playerMoveChosen = document.createElement("a-move");
  const machineMoveChosen = document.createElement("a-move");
  // Busco la jugada actual (devuelve un objeto)
  const currentPlay = state.getCurrentPlay();
  // Les paso el atributo typemove según sea el caso
  playerMoveChosen.setAttribute("typemove", currentPlay.playerMove);
  machineMoveChosen.setAttribute("typemove", currentPlay.machineMove);
  //! Ver las dimensiones del componente, capaz sirve agrandar/achicar un poco según el dispositivo
  // Los añado en los contenedores que me enviaron como parámetros
  playerMoveContainer.appendChild(playerMoveChosen);
  machineMoveContainer.appendChild(machineMoveChosen);
}

export function initPlayPage(params) {
  const div = document.createElement("div");
  div.innerHTML = `<section class="play">
  <div class="play-content">
    <div class="spinner"></div>
    <h2 variant="title" class="spinner__text"></h2>
    <div class="hands-container">
     <a-move typemove="tijera" class="move-icon"></a-move>
     <a-move typemove="piedra" class="move-icon"></a-move>
     <a-move typemove="papel" class="move-icon"></a-move>
    </div>
    </div>
    <div class="move-player-container"></div>
    <div class="move-machine-container"></div>
</section>`;
  //? Paso 1: Escuchar si el usuario elige un movimiento
  // Busco todos los elementos que expresan un movimiento del usuario
  const moveIconList = div.querySelectorAll(".move-icon") as any;
  // Inicializo una variable playerMove para, si le hacen click a algún ícono cambiar esta variable al valor del elementos clickeado
  // En caso de que no haga click en ninguno redirijo a instructions, pero eso no pasa acá
  let playerMove = null;
  for (const i of moveIconList) {
    // Recorro el array con todos los elementos y escucho de cada uno el custom event typemove, que devuelve el tipo de movimiento que hizo el usuario según el elemento que clickea: piedra - papel - tijera
    i.addEventListener("typemove", (e: any) => {
      // A todos elementos cada vez que el usuario haga click (o se ejecute el typemove, que es lo mismo) les remuevo las clases (si es que las tienen) set-opacity y shrink-icon, esto para que tengan el comportamiento por defecto cada vez que se clickee en alguno y luego agregar la lógica de "opacar" los elementos no clickeados (es como hacer un reset de estos "efectos" cada vez que se haga click en alguna mano)
      i.classList.remove("set-opacity");
      i.classList.remove("shrink-icon");
      //Cada vez que alguien hace click en un elemento recorro el array que tiene todos los elementos "elegibles" y comparo, si el atributo typemove es diferente al movimiento que nos devuelve el custom event, les doy las clases set-opacity y shrink-icon, es decir, todos los elementos que no sean clickeados van a tener estas propiedades (como sé cuales son los elementos que tengo creados, por ejemplo el elemento con el typemove piedra, si es igual a lo que me devuelve el custom event, quiere decir que se clickeó a ese elemento, entonces, a los demás les aplico las clases para opacarlos )
      for (const icon of moveIconList) {
        if (icon.getAttribute("typemove") != e.detail.move) {
          icon.classList.add("set-opacity");
          icon.classList.add("shrink-icon");
        }
      }
      // Finalmente a playerMove le doy el valor que me devuelva el custom event, osea va a tener el tipo de movimiento que eligió el usuario
      playerMove = e.detail.move;
    });
  }
  //? Paso 2: Acá se va a generar la cuenta regresiva, una vez que llegue a -2 (en pantalla se verá hasta 0) va a parar de ejecutarse y, en caso de que playerMove sea diferente a null (o sea, si el usuario clickeó alguna jugada) se va a llamar al state para crear una nueva jugada pasandole el movimiento que eligió el usuario (sigue en viewMove), en caso contrario, redireccionaremos el sitio a la escena instrucciones
  let counter = 3;
  const countdownNumberEl = div.querySelector(".spinner__text") as any;
  const generateCountdown = () => {
    countdownNumberEl.innerHTML = `${counter}`;
    counter--;
    if (counter == -2) {
      clearInterval(interval); // Paro de ejecutar el setInterval
      const playContent = div.querySelector(".play-content") as any;
      playContent.style.display = "none"; // Oculto todo el contenedor de elección de la jugada y el spinner, para dar paso a mostrar otros elementos en pantalla
      if (playerMove != null) {
        state.setMove(playerMove);
        const movePlayerContainer = div.querySelector(".move-player-container");
        const moveMachineContainer = div.querySelector(
          ".move-machine-container"
        );
        viewMove(movePlayerContainer, moveMachineContainer); //? Paso 3
        // 3 segundos después de que se muestre la jugada entre el usuario y la máquina, se va a ejecutar la función viewResult, llamando al componente view-result y metiéndolo en el div de esta escena
        const viewResult = () => {
          const resultScene = document.createElement("view-result");
          resultScene.classList.add("set-font-family");
          resultScene.setAttribute("result", state.getCurrentWhoWins()); //Obtengo el último resultado guardado en el state y lo paso como parámetro al componente
          resultScene.setAttribute(
            "player-points",
            JSON.stringify(state.getHistoryOfPoints().playerPoints) //getHistoryOfPoints devuelve un objeto
          ); //Obtengo los puntos de todas las jugadas, y le paso los del usuario
          resultScene.setAttribute(
            "Machine-points",
            JSON.stringify(state.getHistoryOfPoints().machinePoints)
          ); //Obtengo los puntos de todas las jugadas, y le paso los de la máquina
          // Escucho el evento newgame (nuevo juego), que es cuando el usuario hace click en volver a jugar, y redirecciono el sitio a la escena play
          resultScene.addEventListener("newgame", () => {
            params.goTo("/play");
          });
          div.appendChild(resultScene);
        };
        setTimeout(viewResult, 3000);
      } else {
        params.goTo("/instructions");
      }
    }
  };
  const interval = setInterval(generateCountdown, 1000);
  return div;
}

// comentar el paso 3
