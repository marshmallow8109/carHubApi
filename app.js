const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./connectDB/index");
const corsOptions = require("./cors/corsOptions");

//import routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const updateRoute = require("./routes/update");
const jobRoutes = require("./routes/jobs");
const notFound = require("./middleware/not-found");

//static middlewates
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

//routes
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", updateRoute);

//get routes for portfolio api not part of project
app.use("/", jobRoutes);

//mailing route
app.post("/portfolio/mail", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let mailOption = {
    from: req.body.email,
    to: process.env.MY_EMAIL,
    subject: "Contact Portfolio",
    text: req.body.messageData,
  };

  transporter.sendMail(mailOption, function (err, data) {
    if (err) {
      res.status(500).send("something went wrong, try agian!");
    } else {
      res.status(200).send("Email sent!");
    }
  });
});

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
