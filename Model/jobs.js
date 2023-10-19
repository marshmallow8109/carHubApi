const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    number: {
      type: String,
    },
    duration: {
      type: String,
    },
    duties: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobsSchema);
