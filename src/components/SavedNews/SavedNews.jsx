import React from "react";
import "./SavedNews.css";
import ItemCard from "../ItemCard/ItemCard";

function SavedNews({ handleDeleteClick }) {
  return (
    <div className="saved__news">
      <div className="saved__content">
        <p className="saved__header">Saved articles</p>
        <h2 className="saved__title">
          Blend, you have 5 saved{" "}
          <span className="saved__title-span">articles</span>
        </h2>
        <p className="saved__keywords">
          By keywords:
          <span className="saved__keywords-span">
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </div>

      <section className="saved__cards">
        <div className="saved__cards-container">
          <div className="cards__list">
            <ItemCard handleDeleteClick={handleDeleteClick} />
            <ItemCard handleDeleteClick={handleDeleteClick} />
            <ItemCard handleDeleteClick={handleDeleteClick} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SavedNews;
