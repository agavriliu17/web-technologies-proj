const { ROUTES, HEADERS } = require("./resources/constants");
const http = require("http");
const jwt = require("jsonwebtoken");
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
const {
  topRegionsByOrder,
  topServicesByOrder,
  topServicesPerRegion,
  topUsersByOrder,
  totalOrders,
  totalUsers,
  ordersPerMonthForService,
  servicesFromRegion,
  getAllRegions,
} = require("./controllers/statisticsController");
const { buildRss } = require("./RSSFeed/rssApp");

const server = http.createServer((req, res) => {
  if (req.url === ROUTES.welcome) {
    res.writeHead(200, HEADERS);
    res.end(JSON.stringify({ message: "Welcome" }));
  }

  //Get all users, path: /api/v1/users
  else if (req.url === ROUTES.getUsers && req.method === "GET") {
    if (verifyToken(req, res)) {
      console.log("Passed");
      getUsers(req, res);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }

  //Create user, path: /api/v1/register
  else if (req.url === ROUTES.registerUser && req.method === "POST") {
    registerUser(req, res);
  }

  //Login user, path: /api/v1/users/login
  else if (req.url === ROUTES.loginUser && req.method === "POST") {
    loginUser(req, res);
  }

  //Update user by id with POST request to bypass CORS error, path: /api/v1/users/update-id={id}
  else if (req.url.match(ROUTES.updateUserPOST) && req.method === "POST") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      updateUserById(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }

  //Delete user by id with GET request to bypass CORS error, path: /api/v1/users/delete-id={id}
  else if (req.url.match(ROUTES.deleteUserGET) && req.method === "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      deleteUserById(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }

  //Process user by id, path: /api/v1/users/id={id}
  else if (req.url.match(ROUTES.getUserById)) {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      processIdRequest(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }

  //Process user by nickname, path: /api/v1/users/nickname={nickname}
  else if (req.url.match(ROUTES.getUserByNickname)) {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const nickname = info.split("=")[1];
      processNicknameRequest(req, res, nickname);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }

  //Process user by email, path: /api/v1/users/email={email}
  else if (req.url.match(ROUTES.getUserByEmail)) {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const email = info.split("=")[1];
      processEmailRequest(req, res, email);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Services:
  //Get all services, path: /api/v1/services
  else if (req.url === ROUTES.getServices && req.method === "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      getServices(req, res);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Add new service, path: /api/v1/add-service
  else if (req.url === ROUTES.addService && req.method === "POST") {
    if (verifyToken(req, res)) {
      // Call controller:
      addService(req, res);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Get a service by it's id, path: /api/v1/services/id={id}
  else if (req.url.match(ROUTES.findServiceById) && req.method === "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      getServiceById(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Get all services that have the name provided or a similar name, path: /api/v1/services/name={name}
  else if (req.url.match(ROUTES.findServicesByName) && req.method === "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const name = info.split("=")[1];
      getServicesByName(req, res, name);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Update service info by id, path: /api/v1/services/id={id}
  else if (req.url.match(ROUTES.findServiceById) && req.method == "POST") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      updateService(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Delete service by id, path: /api/v1/services/delete-id={id}
  else if (req.url.match(ROUTES.deleteServiceById) && req.method == "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      deleteService(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Orders:
  //Get all orders, path: /api/v1/orders
  else if (req.url === ROUTES.getOrders && req.method == "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      getOrders(req, res);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Add new order, path: /api/v1/add-order
  else if (req.url === ROUTES.addOrder && req.method == "POST") {
    if (verifyToken(req, res)) {
      // Call controller:
      addOrder(req, res);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Get order by id, path: /api/v1/orders/id={id}
  else if (req.url.match(ROUTES.getOrderById) && req.method == "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      getOrderById(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Get orders made by a specific user, path: /api/v1/orders/user={id}
  else if (req.url.match(ROUTES.getUsersOrders) && req.method == "GET") {
    if (verifyToken(req, res)) {
      // Call controller:
      const info = req.url.split("/")[4];
      const id = info.split("=")[1];
      getOrdersForUser(req, res, id);
    } else {
      res.writeHead(403, HEADERS);
      res.end();
    }
  }
  //Update order by id, path: /api/v1/orders/id={id}
  else if (req.url.match(ROUTES.getOrderById) && req.method == "PUT") {
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    updateOrder(req, res, id);
  }
  //Delete order by id, path: /api/v1/orders/id={id}
  else if (req.url.match(ROUTES.getOrderById) && req.method == "DELETE") {
    const info = req.url.split("/")[4];
    const id = info.split("=")[1];
    deleteOrder(req, res, id);
  }
  //Get RSS feed of all available services
  else if (req.url === ROUTES.getRSS) {
    buildRss(res);
  }
  //Regions sorted by number of orders (Max -> Min)  /api/v1/stats/top-regions-by-order
  else if (req.url == ROUTES.topRegionsByOrder && req.method === "GET") {
    topRegionsByOrder(req, res);
  }
  //Services sorted by number of orders (Max -> Min)  /api/v1/stats/top-services-by-order
  else if (req.url == ROUTES.topServicesByOrder && req.method === "GET") {
    topServicesByOrder(req, res);
  }
  //Top ordered service for each region  /api/v1/stats/top-services-per-region
  else if (req.url == ROUTES.topServicesPerRegion && req.method === "GET") {
    topServicesPerRegion(req, res);
  }
  //Users sorted by number of orders placed (Max -> Min)  /api/v1/stats/top-users-by-order
  else if (req.url == ROUTES.topUsersByOrder && req.method === "GET") {
    topUsersByOrder(req, res);
  }
  //Total orders  /api/v1/stats/total-orders
  else if (req.url == ROUTES.totalOrders && req.method === "GET") {
    totalOrders(req, res);
  }
  //Total users  /api/v1/stats/total-users
  else if (req.url == ROUTES.totalUsers && req.method === "GET") {
    totalUsers(req, res);
  }
  //Number of orders for a service in a month  /api/v1/stats/num-service-month
  else if (
    req.url == ROUTES.numberOfOrdersPerMonthForService &&
    req.method === "POST"
  ) {
    ordersPerMonthForService(req, res);
  }
  //Get all services from a specified region /api/v1/stats/all-services-region
  else if (req.url == ROUTES.allServicesFromRegion && req.method === "POST") {
    servicesFromRegion(req, res);
  }
  //Get all service regions /api/v1/stats/all-regions
  else if (req.url == ROUTES.allRegions && req.method === "GET") {
    getAllRegions(req, res);
  }

  //CORS
  else if (req.method === "OPTIONS") {
    if (
      req.rawHeaders.indexOf("GET") !== -1 ||
      req.rawHeaders.indexOf("PUT") !== -1 ||
      req.rawHeaders.indexOf("POST") !== -1 ||
      req.rawHeaders.indexOf("DELETE") !== -1 ||
      req.rawHeaders.indexOf("PATCH") !== -1
    ) {
      res.writeHead(200, HEADERS);
      res.end();
    } else {
      res.writeHead(401, HEADERS);
      res.end();
    }
  }

  //Unknown Request
  else {
    console.log(req.url);
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

//Start:
const PORT = process.env.PORT || 3010;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//User request handlers
function processIdRequest(req, res, id) {
  if (req.method === "GET") {
    getUserById(req, res, id);
  } else if (req.method === "PUT") {
    updateUserById(req, res, id);
  } else if (req.method === "DELETE") {
    deleteUserById(req, res, id);
  } else {
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

function processEmailRequest(req, res, email) {
  if (req.method === "GET") {
    getUserByEmail(req, res, email);
  } else if (req.method === "PUT") {
    updateUserByEmail(req, res, email);
  } else if (req.method === "DELETE") {
    deleteUserByEmail(req, res, email);
  } else {
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

function processNicknameRequest(req, res, nickname) {
  if (req.method === "GET") {
    getUserByNickname(req, res, nickname);
  } else if (req.method === "PUT") {
    updateUserByNickname(req, res, nickname);
  } else if (req.method === "DELETE") {
    deleteUserByNickname(req, res, nickname);
  } else {
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

//Token validation
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    return false;
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  var valid = false;
  jwt.verify(bearerToken, "supersecretkey", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      valid = true;
    }
  });
  return valid;
}
