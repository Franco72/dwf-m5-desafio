import { initHomePage } from "./pages/home";
import { initInstructionsPage } from "./pages/instructions";
import { initPlayPage } from "./pages/play";

const routes = [
  {
    path: /\/home$/,
    component: initHomePage,
  },
  {
    path: /\/instructions$/,
    component: initInstructionsPage,
  },
  {
    path: /\/play$/,
    component: initPlayPage,
  },
];

export function initRouter(container: Element) {
  function goTo(pathname) {
    history.pushState({}, "", pathname);
    handleRoute(location.pathname.replace("/dwf-m5-desafio", ""));
  }
  function handleRoute(path) {
    // Recorremos las rutas predefinidas y si alguna coincide (haciendo test con RegEx) ejecutamos la función component que va a devolver una "página" o "escena" para meterla al container, a este container le sacamos el elemento anterior si es que lo tiene
    for (const r of routes) {
      if (r.path.test(path)) {
        // A cada componente (páginas ahora) le pasamos la función goTo en caso de que la quiera usar internamente para redirigir toda la página a alguna otra ruta predefinida
        const componentToLoad = r.component({ goTo: goTo });
        if (container.firstChild) {
          container.firstChild.remove();
        }
        // Metemos esta escena o página en el contenedor (que es un div con un id #root)
        container.appendChild(componentToLoad);
      }
    }
  }
  // Esto va a ser lo que se ejecute cuando llamamos al init router, en caso de que el pathname sea "/", llamamos a goTo y redireccionamos todo a /welcome (ejecutaríamos el handleRoute finalmente lo mismo, en la función goTo)
  if (location.pathname == "/dwf-m5-desafio/") {
    goTo("/home");
  } else {
    // En caso que no sea "/" que siga su flujo normal, el redireccionamiento lo hacemos para que la ruta de entrada por defecto de esta página sea /welcome
    handleRoute(location.pathname.replace("/dwf-m5-desafio", ""));
  }
  // Esto lo que  va a hacer es escuchar el evento cuando el usuario clickee en las flechas (de volver para atrás o adelante de las páginas), entonces, contemplando esto ejecutamos handleRoute con el pathname de la página a la que vuelva, porque sin esto estamos contemplando solamente cuando el usuario entra haciendo reload, y no contemplaríamos que use estas flechitas
  window.onpopstate = () => {
    handleRoute(location.pathname.replace("/dwf-m5-desafio", ""));
  };
}
