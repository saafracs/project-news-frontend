const { createNews, deleteNews } = require("../controllers/news");

const routeNews = require("express").Router();
const { auth } = require("../middlewares/auth");

routeNews.post("/save", auth, createNews);

routeNews.delete("/:id/remove", auth, deleteNews);

module.exports = routeNews;
