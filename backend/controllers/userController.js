const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HEADERS } = require("../resources/constants");

const User = require("../models/userModel");
const { getPostData } = require("../utils");

async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, HEADERS);
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function postUser(req, res) {
  try {
    let body = await getPostData(req);
    let { name, nickname, password, email, isAdmin } = JSON.parse(body);
    if (typeof isAdmin === "undefined") {
      isAdmin = false;
    }
    const user = {
      name,
      nickname,
      password,
      email,
      isAdmin,
    };
    let newUser = await User.insertUser(user);
    if (newUser === "invalid data") {
      res.writeHead(409, HEADERS);
      return res.end(
        JSON.stringify({ message: "User with this data already exists" })
      );
    }
    if (newUser === null) {
      res.writeHead(400, HEADERS);
      return res.end(
        JSON.stringify({ message: "Something went wrong: User not added" })
      );
    }
    res.writeHead(201, HEADERS);
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserByNickname(req, res, nickname) {
  try {
    const user = await User.findUserByNickname(nickname);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, HEADERS);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserById(req, res, id) {
  try {
    const user = await User.findUserById(id);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (user == "invalid format") {
      res.writeHead(400, HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      res.writeHead(200, HEADERS);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserByEmail(req, res, email) {
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, HEADERS);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

//Auth routes
async function registerUser(req, res) {
  try {
    const body = await getPostData(req);
    let { name, nickname, password, email, role } = JSON.parse(body);
    if (typeof role === "undefined") {
      role = "client"; //default user role
    }
    const user = {
      name,
      nickname,
      password,
      email,
      role,
    };

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.insertUser({
      ...user,
      password: encryptedPassword,
    });

    if (newUser === "invalid data") {
      res.writeHead(409, HEADERS);
      return res.end(
        JSON.stringify({ message: "User with this data already exists" })
      );
    }
    if (newUser === null) {
      res.writeHead(400, HEADERS);
      return res.end(
        JSON.stringify({ message: "Something went wrong: User not added" })
      );
    }
    res.writeHead(201, HEADERS);
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function loginUser(req, res) {
  try {
    const body = await getPostData(req);
    const { email, password } = JSON.parse(body);
    console.log(email, password);

    const user = await User.findUserByEmail(email);

    if (!user) {
      res.writeHead(401, HEADERS);
      return res.end(JSON.stringify({ message: "User not found!" }));
    }

    const valid = await bcrypt.compare(password, user?.password);

    if (!valid) {
      res.writeHead(401, HEADERS);
      return res.end(
        JSON.stringify({ message: "Provided password is invalid!" })
      );
    }

    //TODO: Move secret key in env
    const token = jwt.sign({ userId: user.id }, "supersecretkey", {
      expiresIn: "2h",
    });

    res.writeHead(200, HEADERS);
    return res.end(JSON.stringify({token:token, role:user.role}));
  } catch (e) {
    console.log(e);
    res.writeHead(500, HEADERS);
    return res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

//Update routes

async function updateUserById(req, res, id) {
  try {
    const user = await User.findUserById(id);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (user === "invalid format") {
      res.writeHead(400, HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      performUpdate(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function updateUserByNickname(req, res, nickname) {
  try {
    const user = await User.findUserByNickname(nickname);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      performUpdate(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function updateUserByEmail(req, res, email) {
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      performUpdate(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

//Delete routes

async function deleteUserById(req, res, id) {
  try {
    const user = await User.findUserById(id);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (user === "invalid format") {
      res.writeHead(400, HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      performDelete(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function deleteUserByNickname(req, res, nickname) {
  try {
    const user = await User.findUserByNickname(nickname);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      performDelete(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function deleteUserByEmail(req, res, email) {
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      res.writeHead(404, HEADERS);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      performDelete(req, res, user);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

//Update information for user
async function performUpdate(req, res, user) {
  const body = await getPostData(req);
  let { name, nickname, password, email, role } = JSON.parse(body);
  if (typeof role === "undefined") {
    role = "client"; //Default role
  }

  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const userInfo = {
    name: name || user.name,
    nickname: nickname || user.nickname,
    password: encryptedPassword || user.password,
    email: email || user.email,
    role: role || user.role,
  };

  const updatedUser = await User.updateUser(userInfo, user.id);

  if (updatedUser === null) {
    res.writeHead(400, HEADERS);
    res.end(
      JSON.stringify({ message: "User not updated: something went wrong!" })
    );
  } else if (updatedUser === "duplicated value") {
    res.writeHead(400, HEADERS);
    res.end(
      JSON.stringify({ message: "User not updated: credentials not unique!" })
    );
  } else {
    res.writeHead(200, HEADERS);
    res.end(JSON.stringify(updatedUser));
  }
}

//Delete user
async function performDelete(req, res, user) {
  const deleteResult = User.deleteUser(user.id);
  if (deleteResult === null) {
    res.writeHead(400, HEADERS);
    res.end(
      JSON.stringify({ message: "User not deleted: something went wrong!" })
    );
  } else {
    res.writeHead(200, HEADERS);
    res.end(JSON.stringify({ message: `User ${user.nickname} deleted!` }));
  }
}

module.exports = {
  getUsers,
  postUser,
  getUserByNickname,
  getUserById,
  getUserByEmail,
  registerUser,
  loginUser,
  updateUserById,
  updateUserByNickname,
  updateUserByEmail,
  deleteUserByEmail,
  deleteUserByNickname,
  deleteUserById,
};
