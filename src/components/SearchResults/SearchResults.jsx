import React from "react";
import "./SearchResults.css";
import ItemCard from "../ItemCard/ItemCard";
import { useState } from "react";

function SearchResults({
  articles,
  handleSaveArticle,
  handleDeleteArticle,
  savedArticles = [],
  isLoggedIn,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="search">
      <div className="search__container">
        <h1 className="search__title">Search Results</h1>

        <div className="search__cards-list">
          {articles.slice(0, visibleCount).map((article, index) => (
            <ItemCard
              key={index}
              article={article}
              handleSaveClick={handleSaveArticle}
              handleDeleteArticle={handleDeleteArticle}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        {visibleCount < articles.length && (
          <button
            className={`search__button ${
              isLoggedIn
                ? "search__button_logged-in"
                : "search__button_logged-out"
            }`}
            onClick={() => setVisibleCount(visibleCount + 3)}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
