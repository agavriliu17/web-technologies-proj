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
  else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

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
    res.writeHead(400, { "Content-Type": "application/json" });
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
    res.writeHead(400, { "Content-Type": "application/json" });
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
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

const PORT = process.env.PORT || 3010;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
