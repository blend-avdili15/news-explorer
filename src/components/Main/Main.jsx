import React from "react";
import "./Main.css";
import About from "../About/About";
import SearchResults from "../SearchResults/SearchResults";
import SearchForm from "../SearchForm/SearchForm";
import { fetchNews } from "../../utils/newsApi";
import { useState } from "react";

function Main({ handleSaveArticle, savedArticles }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const newsArticles = await fetchNews(query);
      if (newsArticles.length === 0) {
        setError("Nothing Found");
      }
      setArticles(newsArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="main__content">
        <div className="main__heading">
          <h2 className="main__title">
            What's going on in
            <span className="main__title-span">the world?</span>
          </h2>
          <p className="main__subtitle">
            Find the lastest news on any topic and save them in your personal
            account.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} />
      </section>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <SearchResults
        articles={articles}
        handleSaveArticle={handleSaveArticle}
        savedArticles={savedArticles}
      />

      <About />
    </main>
  );
}

export default Main;
