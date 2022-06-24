const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const apiURL = 'http://localhost:3010/api/v1/users';


function formatRole(role, cell){
  switch(role.toLowerCase()){
    case 'client':
      var roleCell = document.createTextNode('Client');
      cell.classList.add('warning');
      cell.appendChild(roleCell);
      break;
    case 'super admin':
      var roleCell = document.createTextNode('Super Admin');
      cell.classList.add('success');
      cell.appendChild(roleCell);
      break;
    case 'admin':
      var roleCell = document.createTextNode('Admin');
      cell.classList.add('success');
      cell.appendChild(roleCell);
      break;
    case 'guest':
      var roleCell = document.createTextNode('Guest');
      cell.classList.add('primary');
      cell.appendChild(roleCell);
      break;
    default:
      var roleCell = document.createTextNode('Unknown');
      cell.classList.add('danger');
      cell.appendChild(roleCell);
      break;
  }
}

function generateTable(users, tableId){
  const table = document.getElementById(tableId);
  for(user of users){
    const row = document.createElement('tr');

    const nameColumn = document.createElement('td');
    const name = document.createTextNode(user.name);
    nameColumn.appendChild(name);
    row.appendChild(nameColumn);

    const nicknameColumn = document.createElement('td');
    const nickname = document.createTextNode(user.nickname);
    nicknameColumn.appendChild(nickname);
    row.appendChild(nicknameColumn);

    const emailColumn = document.createElement('td');
    const email = document.createTextNode(user.email);
    emailColumn.appendChild(email);
    row.appendChild(emailColumn);

    const roleColumn = document.createElement('td');
    formatRole(user.role, roleColumn)
    row.appendChild(roleColumn);

    const detailsColumn = document.createElement('td');
    const details = document.createTextNode('Details');
    detailsColumn.classList.add('primary');
    detailsColumn.setAttribute('id', user.id);
    detailsColumn.appendChild(details);
    row.appendChild(detailsColumn);

    table.appendChild(row);
  }
}

function getAllUsers(){
  var users;
  fetch(apiURL)
  .then(res => res.json())
  .then(data => users = data)
  .then(() => generateTable(users, 'content-table'));
}

getAllUsers();

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