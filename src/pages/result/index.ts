const winIcon = require("url:../../img/ganaste-icon.png");
const loseIcon = require("url:../../img/perdiste-icon.png");
const tieIcon = require("url:../../img/empate-icon.png");

export function resultSceneComponent() {
  customElements.define(
    "view-result",
    class extends HTMLElement {
      shadow: ShadowRoot;
      result: number;
      playerPoints: number;
      machinePoints: number;
      iconImgUrl: any;
      bgColor: string;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        // Busco el atributo result: (1 gana el usuario, -1 gana la máquina, 0 es empate)
        this.result = JSON.parse(this.getAttribute("result"));
        this.playerPoints = JSON.parse(this.getAttribute("player-points"));
        this.machinePoints = JSON.parse(this.getAttribute("machine-points"));
        const style = document.createElement("style");
        style.textContent = `
        .background-setter {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.7;
        }
        .result {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
        }
        .result-content {
          height: 100%;
          display: grid;
          justify-content: center;
          align-items: center;
          gap: 21px;
        }
        .container__star{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .score {
          width: 259px;
          border: 10px solid black;
          border-radius: 10px;
          background-color: #fff;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content:center;
          gap: 25px;
          padding: 20px 10px 20px 10px;
          text-align: center;
        }
        .score__text{
          text-align: right;
        }
        `;
        this.shadow.appendChild(style);
        // Antes de ejecutar render seteo los colores y el texto que voy a mostrar, internamente esta función pregunta si el usuario ganó, si la máquina ganó o si es empate, y en los distintos casos muestra un color y una estrella diferente
        this.setBgColorAndIconUrl();
        this.render();
      }
      render() {
        const div = document.createElement("div");
        div.innerHTML = `<div class="background-setter"></div>
        <section class="result">
          <div class="result-content">
            <div class="container__star">
              <img src ="${this.iconImgUrl}" alt="${this.result + "icon"}">
            </div>
            <div class="score">
              <div class="score__title">
                <text-custom variant="subtitle">Score</text-custom>
              </div>
              <div class="score__text">
                <text-custom variant="big-text">Vos: ${
                  this.playerPoints
                }</text-custom>
                <text-custom variant="big-text">Máquina: ${
                  this.machinePoints
                }</text-custom>
              </div>
            </div>
            <btn-default-custom class="result__btn"
              >Volver a Jugar</btn-default-custom
            >
          </div>
        </section>`;
        //Creo un custom event para que se pueda escuchar cuando le hacen click al botón volver a jugar desde fuera del componente
        div.querySelector(".result__btn").addEventListener("click", () => {
          const MessageEvent = new CustomEvent("newgame");
          this.dispatchEvent(MessageEvent);
        });
        const bgPage = div.querySelector(".background-setter") as any;
        bgPage.style.backgroundColor = this.bgColor;
        this.shadow.appendChild(div);
      }
      setBgColorAndIconUrl() {
        if (this.result == 1) {
          this.bgColor = "#888949E5";
          this.iconImgUrl = winIcon;
        } else if (this.result == -1) {
          this.bgColor = "#894949e5";
          this.iconImgUrl = loseIcon;
        } else if (this.result == 0) {
          this.bgColor = "#495f89e5";
          this.iconImgUrl = tieIcon;
        }
      }
    }
  );
}
