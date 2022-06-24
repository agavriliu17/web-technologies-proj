var hamburgerMenu;
var mainWrapper;
var currentUser = "010b0f3d-9ffc-4a88-abc8-f686d1949646";

const header = document.querySelector("header");
const main = document.querySelector("main");
const icon = document.querySelector(".search-icon");
const search = document.querySelector(".search-bar");
const apiURL = 'http://localhost:3010/api/v1/services';

const item_list = document.querySelector(".item-list");
const grid_btn = document.getElementById("show-grid");
const list_btn = document.getElementById("show-details");

grid_btn.classList.add("active-btn");

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
icon.onclick = function () {
  search.classList.toggle("active");
};
grid_btn.addEventListener("click", () => {
    grid_btn.classList.add("active-btn");
    list_btn.classList.remove("active-btn");
    item_list.classList.remove("list-view");
  });

  list_btn.addEventListener("click", () => {
    list_btn.classList.add("active-btn");
    grid_btn.classList.remove("active-btn");
    item_list.classList.add("list-view");
  });
events();

function redirectToOrders(){
  window.open('../Orders/index.html?user=' + currentUser, '_self');
}

function processOrder(element){
  const notification = document.getElementById('order-notification');
  
  body = {
    id_user : currentUser,
    id_service : element.id,
    date : new Date(),
    status : "pending"
  }
  console.log(body);
  const newOrderURL = "http://localhost:3010/api/v1/add-order";
  fetch(newOrderURL, {
    method : 'POST',
    headers : {
      "Content-Type": "application/json",
    },
    body : JSON.stringify(body),
  })
    .then((res) => {
      console.log(res.json());
      notification.style.left = '0';
      setTimeout(()=>{notification.style.left = '-15em'},1200);
    });
}

//API Fetch

function generateList(services, listId){
  const list = document.getElementById(listId);
  for(service of services){
    console.log(service);

    const item = document.createElement('div');
    item.classList.add('item');

    //Item image
    const itemImg = document.createElement('div');
    itemImg.classList.add('item-img');

    const image = document.createElement('img');
    if(typeof service.image === 'undefined' || service.image === null){
      image.setAttribute('src', '../../../resources/images/services/service.jpg');
    }
    else{
      image.setAttribute('src', service.image);
    }

    const iconList = document.createElement('div');
    iconList.classList.add('icon-list');

    const searchButton = document.createElement('button');
    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fas');
    searchIcon.classList.add('fa-search');

    searchButton.appendChild(searchIcon);

    const starButton = document.createElement('button');
    const starIcon = document.createElement('i');
    starIcon.classList.add('far');
    starIcon.classList.add('fa-star');
    starButton.appendChild(starIcon);

    const creditButton = document.createElement('button');
    const creditIcon = document.createElement('i');
    creditIcon.classList.add('far');
    creditIcon.classList.add('fa-credit-card');
    creditButton.appendChild(creditIcon);
    
    iconList.appendChild(searchButton);
    iconList.appendChild(starButton);
    iconList.appendChild(creditButton);

    itemImg.appendChild(image);
    itemImg.appendChild(iconList);
    item.appendChild(itemImg);
    //Item image

    //Item detail
    const itemDetail = document.createElement('div');
    itemDetail.classList.add('item-detail');

    const itemName = document.createElement('a');
    itemName.classList.add('item-name');
    const name = document.createTextNode(service.name);
    itemName.appendChild(name);
    itemDetail.appendChild(itemName);

    const itemPrice = document.createElement('span');
    itemPrice.classList.add('new-price');
    const price = document.createTextNode(service.price);
    itemPrice.appendChild(price);
    itemDetail.appendChild(itemPrice);

    const itemDescription = document.createElement('p');
    const description = document.createTextNode(service.description);
    itemDescription.appendChild(description);
    itemDetail.appendChild(itemDescription);

    const orderButton = document.createElement('button');
    const order = document.createTextNode('Order');
    orderButton.appendChild(order);
    orderButton.classList.add('add-btn');
    orderButton.setAttribute('type', 'button');
    orderButton.setAttribute('id', service.id);
    orderButton.setAttribute('onclick', 'processOrder(this);')
    itemDetail.appendChild(orderButton);

    item.appendChild(itemDetail);
    //Item detail
    list.appendChild(item);
  }
}

function getAllServices(){
  var services;
  fetch(apiURL)
  .then(res => res.json())
  .then(data => services = data)
  .then(() => generateList(services, 'content-list'));
}

getAllServices();