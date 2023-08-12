const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Car = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "must provide name"],
      max: 60,
    },

    email: {
      type: String,
      required: [true, "please provide email"],
      max: 50,
    },

    password: {
      type: String,
      required: [true, "please provide password"],
    },
  },
  { timestamps: true }
);

Car.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

Car.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.userName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

Car.methods.comparePassword = async function (userPassword) {
  const isMatch = bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("car", Car);
