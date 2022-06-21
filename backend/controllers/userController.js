const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { getPostData } = require("../utils");

// @desc Get all users
// @route GET api/v1/users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function postUser(req, res) {
  try {
    let body = await getPostData(req);
    const { name, nickname, password, email } = JSON.parse(body);
    const user = {
      name,
      nickname,
      password,
      email,
    };
    let newUser = await User.insertUser(user);
    if (newUser === "invalid data") {
      res.writeHead(409, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "User with this data already exists" })
      );
    }
    if (newUser === null) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Something went wrong: User not added" })
      );
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserByNickname(req, res, nickname) {
  try {
    const user = await User.findUserByNickname(nickname);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserById(req, res, id) {
  try {
    const user = await User.findUserById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else if (user == "invalid format") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getUserByEmail(req, res, email) {
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

//Auth routes
async function registerUser(req, res) {
  try {
    const body = await getPostData(req);
    const { name, nickname, password, email } = JSON.parse(body);
    const user = {
      name,
      nickname,
      password,
      email,
    };

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.insertUser({
      ...user,
      password: encryptedPassword,
    });

    if (newUser === "invalid data") {
      res.writeHead(409, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "User with this data already exists" })
      );
    }
    if (newUser === null) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Something went wrong: User not added" })
      );
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function loginUser(req, res) {
  try {
    const body = await getPostData(req);
    const { email, password } = JSON.parse(body);

    const user = await User.findUserByEmail(email);

    if (!user) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found!" }));
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Provided password is invalid!" }));
    }

    //TODO: Move secret key in env
    const token = jwt.sign({ userId: user.id }, "supersecretkey", {
      expiresIn: "2h",
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(token));
  } catch (e) {
    console.log(e);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Something went wrong" }));
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
};
