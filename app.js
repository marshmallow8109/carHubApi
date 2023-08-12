const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./connectDB/index");

//import routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const updateRoute = require("./routes/update");
const notFound = require("./middleware/not-found");

//static middlewates
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", updateRoute);
app.use(notFound);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(`could not spin up server error: ${error}`);
  }
};

start();
