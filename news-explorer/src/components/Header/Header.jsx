import "./Header.css";
import React from "react";
import arrow from "../../images/arrow-white.svg";

function Header({ isLoggedIn, handleRegisterClick }) {
  return (
    <header className="header">
      <div className="header__title">NewsExplorer</div>

      {isLoggedIn ? (
        <div className="header__logged-in">
          <button className="header__home">Home</button>
          <button className="header__articles">Saved articles</button>
          <div className="header__profile">
            <button className="header__profile-button">Blend</button>
            <img className="header__arrow" src={arrow} alt="header-arrow" />
          </div>
        </div>
      ) : (
        <div className="header__container">
          <button className="header__home">Home</button>
          <button onClick={handleRegisterClick} className="header__register">
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
