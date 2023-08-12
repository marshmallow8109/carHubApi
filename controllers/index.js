const Car = require("../Model/index");
const bcrypt = require("bcryptjs");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide email and password" });
    return;
  }
  let user = await Car.findOne({ email });
  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No user Found! please create an account" });
    return;
  }

  const passwordCheck = await user.comparePassword(password);
  if (!passwordCheck) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "inavlid credentials" });
    return;
  }

  try {
    const token = user.createJWT();
    user = user.toObject();
    delete user.password;
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "someting went wrong try agian later" });
  }
};

const Register = async (req, res) => {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    res.status(400).json({ msg: "please provide name, email and password" });
    return;
  }
  const duplicate = await Car.findOne({ email });
  if (duplicate) {
    res.status(401).json({ msg: "user with email already exsist!" });
    return;
  }
  try {
    let user = await Car.create({ ...req.body });
    const token = user.createJWT();
    user = user.toObject();
    delete user.password;
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "someting went wrong try agian later", error });
  }
};

const UpdateUser = async (req, res) => {
  const { userName, email, _id } = req.body;
  const data = { userName, email };

  if (!userName || !email) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide userName and Password" });
    return;
  }

  try {
    let user = await Car.findByIdAndUpdate({ _id }, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "No user found, enter your registed email" });
      return;
    }

    const token = user.createJWT();
    user = user.toObject();
    delete user.password;
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: `error: ${error}` });
  }
};

module.exports = { Login, Register, UpdateUser };
