export function initTextCustom() {
  customElements.define(
    "text-custom",
    class extends HTMLElement {
      shadow: ShadowRoot;
      variant: string;
      strike: boolean;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        //? Busco el atributo variant que es en el cual se define que tipo de texto quiere el usuario de nuestro componente (si es que existe) y busco el atributo strike (también es opcional)
        this.variant = this.getAttribute("variant");
        this.strike = JSON.parse(this.getAttribute("strike"));
        const style = document.createElement("style");
        style.textContent = `
        .set-margin-to-zero{
          margin: 0;
                  }
                  .title{
                    font-weight: 700;
                    font-size: 80px;
                  }
                  .subtitle{
                    font-weight: 400;
                    font-size: 55px;
                  }
                  .big-text{
                    font-weight: 400;
                    font-size: 45px;
                  }
                  .small-text {
                    font-weight: 600;
                    font-size: 40px;
                  }
                  .strike {
                    text-decoration:line-through;
                  }
                  .set-line-height{
                    line-height: 92.1%;
                  }
                  `;
        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        //* Creo un conjunto de tipos de textos predefinidos que nos pueden enviar, con la clase que le vamos a asignar y con el tipo de elemento que vamos a crear
        const textsTypes = [
          { name: "title", class: "title", elementType: "h1" },
          { name: "subtitle", class: "subtitle", elementType: "h2" },
          { name: "small-text", class: "small-text", elementType: "p" },
          { name: "big-text", class: "big-text", elementType: "p" },
        ];
        //? Acá pregunto si la propiedad variant (que es un atributo del customElement) existe, en caso de que exista recorro este array de tipos de textos posibles y añado las clases correspondientes, en caso de que no me pasen un atributo variant, voy a crear un elemento por defecto del tipo small-text
        if (this.variant) {
          for (const t of textsTypes) {
            if (t.name == this.variant) {
              const textEl = document.createElement(t.elementType);
              textEl.classList.add(t.class);
              textEl.classList.add("set-margin-to-zero");
              textEl.classList.add("set-line-height");
              if (this.strike == true) {
                textEl.classList.add("strike");
              }
              textEl.textContent = this.textContent;
              this.shadow.appendChild(textEl);
            }
          }
        } else {
          const textEl = document.createElement("p");
          textEl.classList.add("small-text");
          textEl.classList.add("set-margin-to-zero");
          textEl.classList.add("set-line-height");
          if (this.strike == true) {
            textEl.classList.add("strike");
          }
          textEl.textContent = this.textContent;
          this.shadow.appendChild(textEl);
        }
      }
    }
  );
}
