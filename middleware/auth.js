const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ msg: "authentication Invalid" });
    return;
  }
  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, userName: payload.userName };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unathorized!" });
  }
};

module.exports = auth;
