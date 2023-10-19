const express = require("express");
const Router = express.Router();
const { GetJobs, AddJobs } = require("../controllers/jobs");

//get routes for my portfolio api!!!
//get routes for my portfolio api!!!
//get routes for my portfolio api!!!
Router.route("/api/v1/getJobs").get(GetJobs);
Router.route("/api/v1/addJobs").post(AddJobs);

module.exports = Router;
