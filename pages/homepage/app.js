var hamburgerMenu;
var mainWrapper;

const main = document.querySelector("main");
const icon = document.querySelector('.search-icon');
const search = document.querySelector('.search-bar');

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });
}


declare();
icon.onclick = function(){
	search.classList.toggle('active');
}
events();

