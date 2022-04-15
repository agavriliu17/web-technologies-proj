var hamburgerMenu;
var mainWrapper;

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

//TODO: Implement for all sections
const scrollInto = () => {
  var scrollDiv = document
    .getElementById("about-section")
    .getBoundingClientRect();

  window.scrollTo({ top: scrollDiv.top, behavior: "smooth" });

  // document.getElementById("footer").scrollIntoView(true);
};

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });

  document.getElementById("about-us").addEventListener("click", scrollInto);
}

events();
