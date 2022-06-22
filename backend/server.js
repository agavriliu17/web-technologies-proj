const { ROUTES } = require("./resources/constants");
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

  //Get user by id, path: /api/v1/users/id={id}
  else if (
    req.url.match(ROUTES.getUserById) &&
    req.method === "GET"
  ) {
    const info = req.url.split("/")[4];
    const id = info.split('=')[1]
    getUserById(req, res, id);
  }

  //Get user by nickname, path: /api/v1/users/nickname={nickname}
  else if (
    req.url.match(ROUTES.getUserByNickname) &&
    req.method === "GET"
  ) {
    const info = req.url.split("/")[4];
    const nickname = info.split("=")[1];
    getUserByNickname(req, res, nickname);
  }

  //Get user by email, path: /api/v1/users/email={email}
  else if (
    req.url.match(ROUTES.getUserByEmail) &&
    req.method === "GET"
  ) {
    const info = req.url.split("/")[4];
    const email = info.split("=")[1];
    getUserByEmail(req, res, email);
  } 
  //Update user by id, path: /api/v1/users/id={id}
  else if (
    req.url.match(ROUTES.getUserById) &&
    req.method === "PUT"
  ) {
    const info = req.url.split("/")[4];
    const id = info.split('=')[1]
    updateUserById(req, res, id);
  }
  //Update user by nickname, path: /api/v1/users/nickname={nickname}
  else if (
    req.url.match(ROUTES.getUserByNickname) &&
    req.method === "PUT"
  ) {
    const info = req.url.split("/")[4];
    const nickname = info.split("=")[1];
    updateUserByNickname(req, res, nickname);
  }
  //Update user by email, path: /api/v1/users/email={email}
  else if (
    req.url.match(ROUTES.getUserByEmail) &&
    req.method === "PUT"
  ) {
    const info = req.url.split("/")[4];
    const email = info.split("=")[1];
    updateUserByEmail(req, res, email);
  }
  //Delete user by id, path: /api/v1/users/id={id}
  else if (
    req.url.match(ROUTES.getUserById) &&
    req.method === "DELETE"
  ) {
    const info = req.url.split("/")[4];
    const id = info.split('=')[1]
    deleteUserById(req, res, id);
  }
  //Delete user by nickname, path: /api/v1/users/nickname={nickname}
  else if (
    req.url.match(ROUTES.getUserByNickname) &&
    req.method === "DELETE"
  ) {
    const info = req.url.split("/")[4];
    const nickname = info.split("=")[1];
    deleteUserByNickname(req, res, nickname);
  }
  //Delete user by email, path: /api/v1/users/email={email}
  else if (
    req.url.match(ROUTES.getUserByEmail) &&
    req.method === "DELETE"
  ) {
    const info = req.url.split("/")[4];
    const email = info.split("=")[1];
    deleteUserByEmail(req, res, email);
  } 
  else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

const PORT = process.env.PORT || 3010;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
