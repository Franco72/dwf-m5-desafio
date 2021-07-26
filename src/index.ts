import { state } from "./state";
import { initRouter } from "./router";
//? COMPONENTS
import { initTextCustom } from "./components/text-custom";
import { btnDefaultCustom } from "./components/btn-default-custom";
import { moveComponent } from "./components/move";
import { handsComponent } from "./components/hands-component";
import { resultSceneComponent } from "./pages/result";

(function initComponents() {
  initTextCustom();
  btnDefaultCustom();
  moveComponent();
  resultSceneComponent();
  handsComponent();
})();
//? =========
const root = document.getElementById("root");
initRouter(root);
//Inicializamos el state cada vez que se recargue la página, esto va a hacer que cargue los datos del localStorage siempre que se recargue la página o se entre por primera vez
state.init();
