import React from "react";
import "./SavedNews.css";
import ItemCard from "../ItemCard/ItemCard";

function SavedNews({}) {
  return (
    <div className="saved__news">
      <div className="saved__content">
        <p className="saved__header">Saved articls</p>
        <h2 className="saved__title">Blend, you have 5 saved articles</h2>
        <p className="saved__keywords">
          By keywords: Nature, Yellowstone, and 2 other
        </p>
      </div>

      <section className="saved__cards">
        <ItemCard />
      </section>
    </div>
  );
}

export default SavedNews;
