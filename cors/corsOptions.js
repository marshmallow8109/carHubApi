const express = require("express");
const cors = require("cors");

const whitelist = ["https://augustrush.netlify.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
};

module.exports = corsOptions;
