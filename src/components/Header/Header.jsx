import "./Header.css";
import React, { useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__nav-item ${
                isSavedNews ? "header__nav-item_black" : ""
              } ${
                isActive
                  ? isSavedNews
                    ? "header__nav-item_active_black"
                    : "header__nav-item_active"
                  : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/savednews"
            className={({ isActive }) =>
              `header__nav-item ${
                isSavedNews ? "header__nav-item_black" : ""
              } ${
                isActive
                  ? isSavedNews
                    ? "header__nav-item_active_black"
                    : "header__nav-item_active"
                  : ""
              }`
            }
          >
            Saved articles
          </NavLink>

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
        </div>
      ) : (
        <div className="header__container">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__nav-item ${isActive ? "header__nav-item_active" : ""}`
            }
          >
            Home
          </NavLink>

          <button onClick={handleRegisterClick} className="header__register">
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
