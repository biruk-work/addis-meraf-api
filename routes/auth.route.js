const route = require("express").Router();

const AuthController = require("../controller/auth.controller");

route.post("/register", AuthController.Register);

route.post("/login", AuthController.Login);

route.post("/change-password", AuthController.ChangePassword);

route.post("/edit-profile", AuthController.EditProfile);

module.exports = route;
