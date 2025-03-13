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
    <form className="main__search" onSubmit={handleSubmit}>
      <div className="main__search-container">
        <input
          type="text"
          className="main__search-input"
          placeholder="Enter topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="main__search-button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
