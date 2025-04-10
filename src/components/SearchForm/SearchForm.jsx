import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a keyword");
      return;
    }
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
