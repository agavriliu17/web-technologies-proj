var hamburgerMenu;
var mainWrapper;

const header = document.querySelector("header");

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

//Sticky Navbar
const stickyNavbar = () => {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
};

window.addEventListener("scroll", stickyNavbar);
stickyNavbar();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const logo = document.getElementsByClassName("logo");
logo[0].addEventListener("click", scrollToTop);

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });
}

events();
