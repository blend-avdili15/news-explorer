const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true, unique: true },
  urlToImage: { type: String },
  source: {
    name: { type: String },
  },
  keyword: { type: String },
  publishedAt: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // ✅ Reference to the user who saved the article
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
