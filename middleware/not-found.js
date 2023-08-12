const notFound = (req, res) => {
  res.status(404).send("the route could not be found");
};

module.exports = notFound;
