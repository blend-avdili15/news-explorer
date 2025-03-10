import React from "react";
import "./Main.css";
import About from "../About/About";

function Main({}) {
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

        <form className="main__search">
          <div className="main__search-container">
            <input
              type="text"
              className="main__search-input"
              placeholder="Enter topic"
            />
            <button type="submit" className="main__search-button">
              Search
            </button>
          </div>
        </form>
      </section>

      <About />
    </main>
  );
}

export default Main;
