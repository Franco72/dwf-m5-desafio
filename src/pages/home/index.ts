export function initHomePage(params) {
  const div = document.createElement("div");
  div.innerHTML = `<section class="home">
  <div class="home-content">
    <text-custom variant="title" class="home__title"
      >Piedra Papel ó Tijera</text-custom
    >
    <btn-default-custom class="home__btn">Empezar</btn-default-custom>
  </div>
  <div class="home-hands-container">
  <hands-component></hands-component>
  </div>
</section>`;
  const btn = div.querySelector(".home__btn");
  btn.addEventListener("click", () => {
    params.goTo("/instructions");
  });

  return div;
}
