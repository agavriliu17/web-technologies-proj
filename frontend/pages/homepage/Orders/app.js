var hamburgerMenu;
var mainWrapper;

const header = document.querySelector("header");
const main = document.querySelector("main");
const apiURL = "http://localhost:3010/api/v1/orders/";

const item_list = document.querySelector(".item-list");
const grid_btn = document.getElementById("show-grid");
const list_btn = document.getElementById("show-details");

function declare() {
  mainWrapper = document.querySelector(".main-wrapper");
  hamburgerMenu = document.querySelector(".hamburger-menu");
}

function events() {
  hamburgerMenu.addEventListener("click", () => {
    mainWrapper.classList.toggle("active");
  });
}

//Sticky Navbar
const stickyNavbar = () => {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
};

window.addEventListener("scroll", stickyNavbar);
stickyNavbar();
declare();

function redirectToServices() {
  window.open("../Services/index.html", "_self");
}

//API Fetch
function reformatDate(date) {
  return date.split("T")[0];
}

function generateList(orders, listId) {
  const list = document.getElementById("content-list");
  for (order of orders) {
    const row = document.createElement("tr");

    const userCell = document.createElement("td");
    const user = document.createTextNode(order.name);
    userCell.appendChild(user);
    row.appendChild(userCell);

    const serviceCell = document.createElement("td");
    const service = document.createTextNode(order.servicename);
    serviceCell.appendChild(service);
    row.appendChild(serviceCell);

    const dateCell = document.createElement("td");
    const date = document.createTextNode(reformatDate(order.date));
    dateCell.appendChild(date);
    row.appendChild(dateCell);

    const statusCell = document.createElement("td");
    const status = document.createTextNode(order.status);
    statusCell.appendChild(status);
    row.appendChild(statusCell);

    list.appendChild(row);
  }
}

function getAllOrders() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  var requestURL = apiURL + "user=" + urlParams.get("user");
  var orders;
  fetch(requestURL)
    .then((res) => res.json())
    .then((data) => (orders = data))
    .then(() => generateList(orders, "content-list"));
}

getAllOrders();

//logout button
const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/pages/login";
});
