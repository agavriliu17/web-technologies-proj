const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const apiURL = "http://localhost:3010/api/v1/services";

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

getServices = async () => {
  const container = document.querySelector(".cards-container");
  const data = await fetch(apiURL).then((res) => res.json());

  let serviceCards = "";

  data.forEach((service) => {
    serviceCards += `<service-card 
                      serviceName="${service.name}"
                      serviceDescription="${service.description}"
                      servicePrice="${service.price} €"
                      image="${service.image}"
                      identifier="${service.id}"
                      ></service-card>`;
  });

  container.innerHTML = serviceCards;
};

getServices();

// SIDEBAR ROUTING

const SIDEBAR_ROUTES = [
  "/frontend/pages/admin/dashboard",
  "/frontend/pages/admin/customers",
  "/frontend/pages/admin/orders",
  "/frontend/pages/admin/services",
  "/frontend/pages/admin/analytics",
  "/frontend/pages/admin/settings",
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
  window.location.href = "/frontend/pages/login";
});
