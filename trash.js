// .then((res) => res.json())
//       .then((articles) => {
//         setSavedArticles(articles);
//         localStorage.setItem("savedArticles", JSON.stringify(articles));
//       })

// const deleteArticle = (req, res, next) => {
//     User.findByIdAndUpdate(
//       req.user._id,
//       { $pull: { savedArticles: req.params.articleId } }, // ✅ Remove only from user's list
//       { new: true }
//     )
//       .then((user) => {
//         if (!user) {
//           return next(new NotFoundError("User not found"));
//         }
//         res.send({ message: "Article removed from saved list" });
//       })
//       .catch(next);
//   };
