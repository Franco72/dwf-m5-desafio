export function btnDefaultCustom() {
  customElements.define(
    "btn-default-custom",
    class extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
        .btn-default {
          font-family: inherit;
          font-weight: 400;
          font-size: 45px;
          border: 10px solid var(--btn-blue-color-focus);
          border-radius: 10px;
          padding: 7px 6px;
          background-color: var(--btn-blue-color);
          color: #FFF;
          width: 100%;
        }
        .btn-default:hover {
          cursor: pointer;
          background-color: #0f74f8;
        }
        `;
        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        // Creo un botón que va a vivir dentro de este sub-dom
        const btnDefault = document.createElement("button");
        btnDefault.classList.add("btn-default");
        // Le pongo como texto el texto que me escriban normalmente en la etiqueta
        btnDefault.textContent = this.textContent;
        this.shadow.appendChild(btnDefault);
      }
    }
  );
}
