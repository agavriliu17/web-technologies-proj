var hamburgerMenu;
var mainWrapper;

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });
}

events();
