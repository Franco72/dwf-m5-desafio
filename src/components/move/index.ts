const imgPiedra = require("url:../../img/piedra-for-component.png");
const imgPapel = require("url:../../img/papel-for-component.png");
const imgTijera = require("url:../../img/tijera-for-component.png");

export function moveComponent() {
  customElements.define(
    "a-move",
    class extends HTMLElement {
      shadow: ShadowRoot;
      typemove: string;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        this.typemove = this.getAttribute("typemove").toLowerCase();
        const style = document.createElement("style");
        style.textContent = `
        .icon {
          cursor: pointer;
        }
        @media (max-width:769px) {
          .icon{
            width: 90px;
            height: 170px;
          }
        }
        `;
        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        const div = document.createElement("div");
        div.innerHTML = `<img src ="${this.findIconImageUrl()}" class="icon"></img>`;
        div.querySelector(".icon").addEventListener("click", () => {
          const MessageEvent = new CustomEvent("typemove", {
            detail: {
              move: this.typemove,
            },
          });
          this.dispatchEvent(MessageEvent);
        });
        this.shadow.appendChild(div);
      }
      findIconImageUrl() {
        if (this.typemove == "piedra") {
          return imgPiedra;
        } else if (this.typemove == "papel") {
          return imgPapel;
        } else if (this.typemove == "tijera") {
          return imgTijera;
        }
      }
    }
  );
}
