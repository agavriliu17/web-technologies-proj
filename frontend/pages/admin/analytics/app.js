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
const closeModalBtn = document.querySelector("#close-modal");
const addServiceSidebar = document.querySelector("#open-modal");

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

addServiceSidebar.addEventListener("click", () => {
  modal.open();
});
