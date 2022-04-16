var hamburgerMenu;
var mainWrapper;

const main = document.querySelector("main");
const icon = document.querySelector('.search-icon');
const search = document.querySelector('.search-bar');

const item_list = document.querySelector(".item-list");
const grid_btn = document.getElementById("show-grid");
const list_btn = document.getElementById("show-details");

grid_btn.classList.add('active-btn');

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });

  grid_btn.addEventListener("click", () => {
  	grid_btn.classList.add("active-btn");
  	list_btn.classList.remove('active-btn');
  	item_list.classList.remove('list-view');
  })

  list_btn.addEventListener("click", () => {
  	list_btn.classList.add("active-btn");
  	grid_btn.classList.remove('active-btn');
  	item_list.classList.add('list-view');
  })
}


declare();
icon.onclick = function(){
	search.classList.toggle('active');
}
events();

