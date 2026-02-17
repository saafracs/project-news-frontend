const express = require("express");
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./errorHandler/errorHandler");

const routeUsers = require(path.join(__dirname, "routes", "users.js"));
const routeNews = require(path.join(__dirname, "routes", "news.js"));

const app = express();

mongoose.connect("mongodb://localhost:27017/news");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/users", routeUsers);
app.use("/news", routeNews);

app.all("/:noValid", (req, res) =>
  res.status(400).send({ message: "Recurso solicitado no encontrado" }),
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App activa usando puerto ${PORT}`);
});
