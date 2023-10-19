const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Jobs = require("../Model/jobs");

const GetJobs = async (req, res) => {
  try {
    const job = await Jobs.find();
    res.status(StatusCodes.OK).json(job);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

const AddJobs = async (req, res) => {
  try {
    const data = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { GetJobs, AddJobs };
