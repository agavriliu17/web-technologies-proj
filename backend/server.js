const { ROUTES, HEADERS } = require("./resources/constants");
const http = require("http");
const {
  getUsers,
  getUserByNickname,
  getUserById,
  getUserByEmail,
  registerUser,
  loginUser,
  updateUserById,
  updateUserByNickname,
  updateUserByEmail,
  deleteUserById,
  deleteUserByNickname,
  deleteUserByEmail,
} = require("./controllers/userController");
const {
  getServices, 
  addService,
  getServiceById,
  getServicesByName,
  updateService,
  deleteService,
} = require("./controllers/serviceController");
const {
  getOrders, 
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersForUser,
} = require("./controllers/ordersController");
const { buildRss } = require("./RSSFeed/rssApp")

const server = http.createServer((req, res) => {
  if (req.url === ROUTES.welcome) {
    res.writeHead(200, HEADERS);
    res.end(JSON.stringify({ message: "Welcome" }));
  }

  //Get all users, path: /api/v1/users
  else if (req.url === ROUTES.getUsers && req.method === "GET") {
    getUsers(req, res);
  }

  //Create user, path: /api/v1/register
  else if (req.url === ROUTES.registerUser && req.method === "POST") {
    registerUser(req, res);
  }

  //Login user
  else if (req.url === ROUTES.loginUser && req.method === "POST") {
    loginUser(req, res);
  }

  //Process user by id, path: /api/v1/users/id={id}
  else if (req.url.match(ROUTES.getUserById)) {
    const info = req.url.split("/")[4];
    const id = info.split('=')[1];
    processIdRequest(req, res, id);
  }

  //Process user by nickname, path: /api/v1/users/nickname={nickname}
  else if (req.url.match(ROUTES.getUserByNickname)) {
    const info = req.url.split("/")[4];
    const nickname = info.split("=")[1];
    processNicknameRequest(req, res, nickname);
  }

  //Process user by email, path: /api/v1/users/email={email}
  else if (req.url.match(ROUTES.getUserByEmail)) {
    const info = req.url.split("/")[4];
    const email = info.split("=")[1];
    processEmailRequest(req, res, email);
  } 
  //Services:
  //Get all services, path: /api/v1/services
  else if(req.url === ROUTES.getServices && req.method === 'GET'){
    getServices(req, res);
  }
  //Add new service, path: /api/v1/add-service
  else if(req.url === ROUTES.addService && req.method === 'POST'){
    addService(req, res);
  }
  //Get a service by it's id, path: /api/v1/services/id={id}
  else if(req.url.match(ROUTES.findServiceById) && req.method === 'GET'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    getServiceById(req, res, id);
  }
  //Get all services that have the name provided or a similar name, path: /api/v1/services/name={name}
  else if(req.url.match(ROUTES.findServicesByName) && req.method === 'GET'){
    const info = req.url.split("/")[4];
    const name = info.split("=")[1];
    getServicesByName(req, res, name);
  }
  //Update service info by id, path: /api/v1/services/id={id}
  else if(req.url.match(ROUTES.findServiceById) && req.method == 'PUT'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    updateService(req, res, id);
  }
  //Delete service by id, path: /api/v1/services/id={id}
  else if(req.url.match(ROUTES.findServiceById) && req.method == 'DELETE'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    deleteService(req, res, id);
  }
  //Orders:
  //Get all orders, path: /api/v1/orders
  else if(req.url === ROUTES.getOrders && req.method == 'GET'){
    getOrders(req, res);
  }
  //Add new order, path: /api/v1/add-order
  else if(req.url === ROUTES.addOrder && req.method == 'POST'){
    addOrder(req, res);
  }
  //Get order by id, path: /api/v1/orders/id={id}
  else if(req.url.match(ROUTES.getOrderById) && req.method == 'GET'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    getOrderById(req, res, id);
  }
  //Get orders made by a specific user, path: /api/v1/orders/user={id}
  else if(req.url.match(ROUTES.getUsersOrders) && req.method == 'GET'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    getOrdersForUser(req, res, id);
  }
  //Update order by id, path: /api/v1/orders/id={id}
  else if(req.url.match(ROUTES.getOrderById) && req.method == 'PUT'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    updateOrder(req, res, id);
  }
  //Delete order by id, path: /api/v1/orders/id={id}
  else if(req.url.match(ROUTES.getOrderById) && req.method == 'DELETE'){
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    deleteOrder(req, res, id);
  }
  //Get RSS feed of all available services
  else if(req.url === ROUTES.getRSS){
    buildRss(res);
  }
  //CORS
  else if(req.method === 'OPTIONS'){
    res.writeHead(200, HEADERS);
    res.end();
  }
  else {
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

//Start:
const PORT = process.env.PORT || 3010;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//User request handlers
function processIdRequest(req, res, id){
  if(req.method === 'GET'){
    getUserById(req, res, id);
  }
  else if(req.method === 'PUT'){
    updateUserById(req, res, id);
  }
  else if(req.method === 'DELETE'){
    deleteUserById(req, res, id);
  }
  else{
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

function processEmailRequest(req, res, email){
  if(req.method === 'GET'){
    getUserByEmail(req, res, email);
  }
  else if(req.method === 'PUT'){
    updateUserByEmail(req, res, email);
  }
  else if(req.method === 'DELETE'){
    deleteUserByEmail(req, res, email);
  }
  else{
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

function processNicknameRequest(req, res, nickname){
  if(req.method === 'GET'){
    getUserByNickname(req, res, nickname);
  }
  else if(req.method === 'PUT'){
    updateUserByNickname(req, res, nickname);
  }
  else if(req.method === 'DELETE'){
    deleteUserByNickname(req, res, nickname);
  }
  else{
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}