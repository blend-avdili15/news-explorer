import React from "react";
import "./SearchResults.css";
import ItemCard from "../ItemCard/ItemCard";
import { useState } from "react";

function SearchResults({ articles, handleSaveArticle, savedArticles = [] }) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="search__results">
      <div className="search__results-container">
        <h2 className="search__results-title">Search Results</h2>

        <div className="cards__list">
          {articles.slice(0, visibleCount).map((article, index) => (
            <ItemCard
              key={index}
              article={article}
              handleSaveClick={handleSaveArticle}
              saved={savedArticles.some(
                (savedArticle) => savedArticle.url === article.url
              )} // ✅ Now works safely
            />
          ))}
        </div>

        {visibleCount < articles.length && (
          <button
            className="search__results-button"
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
