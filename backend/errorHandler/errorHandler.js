const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (
    error.name === "ValidationError" ||
    error.name === "CastError" ||
    error.name === "SyntaxError"
  ) {
    return res.status(400).send({ message: error.message });
  }

  return res.status(500).send({ message: "Error interno" });
};

module.exports = errorHandler;
