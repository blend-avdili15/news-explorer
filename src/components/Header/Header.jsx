import "./Header.css";
import React, { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import arrowWhite from "../../images/arrow-white.svg";
import arrowBlack from "../../images/arrow-black.svg";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function Header({ isLoggedIn, handleRegisterClick, handleSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSavedNews = location.pathname === "/savednews";

  return (
    <header className="header">
      <h2
        className={`header__title ${isSavedNews ? "header__title_black" : ""}`}
      >
        NewsExplorer
      </h2>

      {isLoggedIn ? (
        <div className="header__logged-in">
          <Link to="/" className="header__nav-item">
            <p
              className={`header__home ${
                isSavedNews ? "header__home_black" : ""
              }`}
            >
              Home
            </p>
          </Link>
          <Link to="/savednews" className="header__nav-item">
            <p
              className={`header__articles ${
                isSavedNews ? "header__articles_black" : ""
              }`}
            >
              Saved articles
            </p>
          </Link>
          <div
            className={`header__profile ${
              isSavedNews ? "header__profile_black" : ""
            }`}
          >
            <button
              onClick={handleSignOutClick}
              className={`header__profile-button ${
                isSavedNews ? "header__profile-button_black" : ""
              }`}
            >
              {currentUser?.username || "User"}
            </button>
            <img
              className="header__arrow"
              src={isSavedNews ? arrowBlack : arrowWhite}
              alt="header-arrow"
            />
          </div>
          {/* <div className="header__profile">
            <button
              onClick={handleSignOutClick}
              className={`header__profile-button ${
                isSavedNews ? "header__profile-button_black" : ""
              }`}
            >
              {currentUser?.username || "User"}
            </button>
            <img className="header__arrow" src={arrow} alt="header-arrow" />
          </div> */}
        </div>
      ) : (
        <div className="header__container">
          <Link to="/" className="header__nav-item">
            <p className="header__home">Home</p>
          </Link>
          <button onClick={handleRegisterClick} className="header__register">
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

// const isSavedNews
// {`header__title ${isSavedNews ? "header__title_white" : ""}`}
