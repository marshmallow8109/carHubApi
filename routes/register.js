const { Login, Register } = require("../controllers/index");

const express = require("express");
const Router = express.Router();
Router.route("/api/v1/register").post(Register);

module.exports = Router;
