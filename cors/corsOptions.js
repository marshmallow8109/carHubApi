const whiteList = [
  "https://augustrush.netlify.app.",
  "http://augustrush.netlify.app.",
];

//cors options
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed Blocked!!!"));
    }
  },
  optionSuccessStatus: 200,
  preflightContinue: true,
};

module.exports = corsOptions;
