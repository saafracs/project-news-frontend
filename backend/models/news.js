const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  urlToImage: {
    type: String,
    match: [/^(ftp|http|https):\/\/[^ "]+$/],
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sourceName: {
    type: String,
  },
  image: {
    type: String,
    required: true,
    match: [
      /(http:\/\/|https:\/\/)(www\.)??[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+#??/g,
      "Verifique que el dato proporcionado sea un enlace válido.",
    ],
  },
  keyword: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("News", newsSchema);
