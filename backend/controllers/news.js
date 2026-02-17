const News = require("../models/news");

module.exports.createNews = (req, res, next) => {
  const { title, source, link, image, description, date, keyword } = req.body;
  console.log(req.user);
  News.create({
    title,
    source,
    link,
    image,
    description,
    date,
    keyword,
    owner: req.user._id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.deleteNews = (req, res, next) => {
  News.findById(req.params.id)
    .orFail()
    .then((news) => {
      const ownerid = news.owner;
      if (!ownerid.equals(req.user._id)) {
        return res.status(403).send({
          message: "Solo el que ha guardado la noicia la puede eliminar",
        });
      }
      return News.findByIdAndDelete(req.params.id).then(() =>
        res.send({ message: "Noticia eliminada con éxito" }),
      );
    })
    .catch(next);
};

module.exports.getNews;
