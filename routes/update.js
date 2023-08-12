const auth = require("../middleware/auth");
const { UpdateUser } = require("../controllers/index");
const express = require("express");
const Router = express.Router();

Router.route("/api/v1/update").patch(auth, UpdateUser);

module.exports = Router;
