const router = require("express").Router();
const auth = require("../middlewares/auth"); // ✅ Middleware for authentication
const { saveArticle, deleteArticle } = require("../controllers/articles");

// Save an article (POST /articles)
router.post("/", auth, saveArticle);

// Delete a saved article (DELETE /articles/:articleId)
router.delete("/:articleId", auth, deleteArticle);

module.exports = router;
