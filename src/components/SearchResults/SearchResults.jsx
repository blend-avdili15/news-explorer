import React from "react";
import "./SearchResults.css";
import ItemCard from "../ItemCard/ItemCard";

function SearchResults({}) {
  return (
    <div className="search__results">
      <div className="search__results-container">
        <h2 className="search__results-title">Search Results</h2>

        <div className="cards__list">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>

        <button className="search__results-button">Show more</button>
      </div>
    </div>
  );
}

export default SearchResults;
