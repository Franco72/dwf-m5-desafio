export function initInstructionsPage(params) {
  const div = document.createElement("div");
  div.innerHTML = `<section class="instructions">
  <div class="instructions-content">
    <text-custom class="instructions__title">
      Presioná jugar y elegí: piedra, papel o tijera antes de que pasen
      los 3 segundos.
    </text-custom>
    <btn-default-custom class="instructions__btn"
      >¡Jugar!</btn-default-custom
    >
  </div>
  <div class="ins-hands-container">
  <hands-component></hands-component>
  </div>
</section>`;
  const btn = div.querySelector(".instructions__btn");
  btn.addEventListener("click", () => {
    params.goTo("/play");
  });
  return div;
}
