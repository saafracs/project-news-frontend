const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const News = require("../models/news");

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email y Contraseña son requeridos" });
    }
    const passHashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: passHashed, name });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).send(userObj);
  } catch (err) {
    if (
      (err.name === "MongoServerError" || err.name === "MongoError") &&
      err.code === 11000
    ) {
      return res.status(409).send({ message: "Este email ya está registrado" });
    }
    return next(err);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send({ message: "Email o contraseña incorrectos" });
  }
  User.findOne({ email })
    .select("+password")
    .then((data) => {
      if (!data) {
        return res
          .status(401)
          .send({ message: "Email o contraseña incorrectos" });
      }
      return bcrypt.compare(password, data.password || "").then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Email o contraseña incorrectos" });
        }
        const token = jwt.sign({ _id: data._id }, "nextSection1", {
          expiresIn: "1w",
        });
        return res.send({ token });
      });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .select("-_id")
    .then((user) => {
      return News.find({ owner: req.user._id })

        .then((news) => {
          res.send({ ...user.toObject(), news });
        });
    })
    .catch(next);
};
