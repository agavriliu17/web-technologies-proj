const { ROUTES } = require("./resources/constants");
const http = require("http");
const {
  getUsers,
  getUserByNickname,
  getUserById,
  getUserByEmail,
  registerUser,
  loginUser,
} = require("./controllers/userController");

const server = http.createServer((req, res) => {
  if (req.url === ROUTES.welcome) {
    res.writeHead(200, { "Content-Type": "application/json" });
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

  //Get user by id, path: /api/v1/users/{id}
  else if (
    req.url.match(/\/api\/v1\/users\/([0-9a-f\-]+$)/) &&
    req.method === "GET"
  ) {
    let id = req.url.split("/")[4];
    getUserById(req, res, id);
  }

  //Get user by nickname, path: /api/v1/users/nickname={nickname}
  else if (
    req.url.match(/\/api\/v1\/users\/nickname=([a-zA-Z0-9_.\(\)]+$)/) &&
    req.method === "GET"
  ) {
    let info = req.url.split("/")[4];
    let nickname = info.split("=")[1];
    getUserByNickname(req, res, nickname);
  }

  //Get user by email, path: /api/v1/users/email={email}
  else if (
    req.url.match(
      /\/api\/v1\/users\/email=(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) &&
    req.method === "GET"
  ) {
    let info = req.url.split("/")[4];
    let email = info.split("=")[1];
    getUserByEmail(req, res, email);
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

const PORT = process.env.PORT || 3010;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
