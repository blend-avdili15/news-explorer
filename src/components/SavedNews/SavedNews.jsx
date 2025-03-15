import React, { useContext } from "react";
import "./SavedNews.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function SavedNews({ savedArticles, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword || "General")),
  ];
  const keywordDisplay =
    keywords.length > 2
      ? `${keywords.slice(0, 2).join(", ")}, and ${keywords.length - 2} other${
          keywords.length > 3 ? "s" : ""
        }`
      : keywords.join(", ");

  return (
    <div className="saved__news">
      <div className="saved__content">
        <p className="saved__header">Saved articles</p>
        <h2 className="saved__title">
          {currentUser?.username || "User"}, you have {savedArticles.length}{" "}
          saved <span className="saved__title-span">articles</span>
        </h2>
        <p className="saved__keywords">
          By keywords:
          <span className="saved__keywords-span">{keywordDisplay}</span>
        </p>
      </div>

      <section className="saved__cards">
        <div className="saved__cards-container">
          {savedArticles.length > 0 ? (
            <div className="cards__list">
              {savedArticles.map((article, index) => (
                <ItemCard
                  key={index}
                  article={article}
                  handleDeleteClick={handleDeleteClick}
                  savedArticles={savedArticles}
                />
              ))}
            </div>
          ) : (
            <p className="saved__no-articles">No saved articles yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default SavedNews;
