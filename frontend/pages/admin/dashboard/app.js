const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

//modal actions
const modal = document.querySelector("custom-modal");
const addProduct = document.getElementsByClassName("item add-product");
const closeModalBtn = document.querySelector("#close-modal");
const addServiceSidebar = document.querySelector("#open-modal");

addProduct[0].addEventListener("click", () => {
  modal.open();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

addServiceSidebar.addEventListener("click", () => {
  modal.open();
});
