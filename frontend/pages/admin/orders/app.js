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
const doneButton = document.querySelector("#add-service");

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

addServiceSidebar.addEventListener("click", () => {
  modal.open();
});

doneButton.addEventListener("click", () => {
  modal.addService();
});

// SIDEBAR ROUTING

const SIDEBAR_ROUTES = [
  "../dashboard/index.html",
  "../customers/index.html",
  "../orders/index.html",
  "../services/index.html",
  "../analytics/index.html",
  "../settings/index.html",
];

const sidebar = document.querySelectorAll("aside a");

sidebar.forEach((option, index) => {
  if (index < 5)
    option.addEventListener("click", () => {
      window.location.href = SIDEBAR_ROUTES[index];
    });
});

//logout button
const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../login";
});
