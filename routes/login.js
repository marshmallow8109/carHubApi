const auth = require("../middleware/auth");

const { Login, Register } = require("../controllers/index");
const express = require("express");
const Router = express.Router();

Router.route("/api/v1/login").post(Login);

module.exports = Router;
