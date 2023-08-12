const mongoose = require("mongoose");

const connectDB = (url) => {
  //added mongose.set() to supress deprication from console warning
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};

module.exports = connectDB;
