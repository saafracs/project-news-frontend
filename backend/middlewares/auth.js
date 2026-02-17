const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({ message: "Se requiere Authorization" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, "nextSection1");
  } catch (err) {
    res.status(401).send({ message: "Se requiere Authorization" });
  }
  req.user = payload;

  next();
};
