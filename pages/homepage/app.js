const icon = document.querySelector('.search-icon');
const search = document.querySelector('.search-bar');

icon.onclick = function(){
	search.classList.toggle('active');
}

function declare(){
	var hamburgerMenu = document.querySelector(".hamburger-menu");
	var mainWrapper = document.querySelector(".main-wrapper");
}

declare();

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("responsive");
  });
}

events();