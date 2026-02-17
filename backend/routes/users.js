const { createUser, login, getUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

// const auth = require("../middlewares/auth");
const routeUsers = require("express").Router();

routeUsers.post("/register", createUser);
routeUsers.post("/login", login);

routeUsers.get("/me", auth, getUser);

module.exports = routeUsers;
