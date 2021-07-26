const imgTijera = require("url:../../img/tijera.png");
const imgPiedra = require("url:../../img/piedra.png");
const imgPapel = require("url:../../img/papel.png");

export function handsComponent() {
  customElements.define(
    "hands-component",
    class extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
        .hands-container {
            width: 100vw;
            display: grid;
            grid-template-columns: repeat(3, auto);
            justify-content: center;
            gap: 46.71px;
          }
          @media (min-width: 769px) {
            .hands-container {
              gap: 65px;
            }
          }
          .hand-icon {
            width: 70px;
            height: 120px;
          }
          @media (min-width: 769px) {
            .hand-icon {
              width: 79px;
              height: 141px;
            }
          }
          `;
        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        const div = document.createElement("div");
        div.innerHTML = `  <div class="hands-container">
          <img class="hand-icon" src="${imgTijera}" alt="" />
          <img class="hand-icon" src="${imgPiedra}" alt="" />
          <img class="hand-icon" src="${imgPapel}" alt="" />
        </div>`;
        this.shadow.appendChild(div);
      }
    }
  );
}
