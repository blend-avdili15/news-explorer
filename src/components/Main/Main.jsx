import React, { useState, useEffect } from "react";
import "./Main.css";
import About from "../About/About";
import SearchResults from "../SearchResults/SearchResults";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import { fetchNews } from "../../utils/newsApi";

function Main({ handleSaveArticle, savedArticles }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError("");
    setArticles([]);
    setNoResults(false);

    try {
      const newsArticles = await fetchNews(searchQuery);
      if (newsArticles.length === 0) {
        setNoResults(true);
      } else {
        localStorage.setItem("searchResults", JSON.stringify(newsArticles));
      }
      setArticles(newsArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedResults = localStorage.getItem("searchResults");
    if (savedResults) {
      setArticles(JSON.parse(savedResults));
    }
  }, []);

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

      {loading && <Preloader isLoading={loading} />}
      {noResults && !loading && <NothingFound />}
      {error && <p className="error-message">{error}</p>}
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
