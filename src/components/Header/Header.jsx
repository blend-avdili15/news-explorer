import "./Header.css";
import React, { useContext, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import arrowWhite from "../../images/arrow-white.svg";
import arrowBlack from "../../images/arrow-black.svg";
import menuWhite from "../../images/menu-white.svg";
import menuBlack from "../../images/menu-black.svg";
import closeIcon from "../../images/close.svg";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";

function Header({
  isLoggedIn,
  handleRegisterClick,
  handleSignOutClick,
  isModalOpen,
}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSavedNews = location.pathname === "/savednews";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`header ${isMobileMenuOpen ? "header_open-mobile" : ""}`}
    >
      <h2
        className={`header__title ${
          isMobileMenuOpen
            ? "header__title_white"
            : isSavedNews
            ? "header__title_black"
            : ""
        }`}
      >
        NewsExplorer
      </h2>

      {!isModalOpen && (
        <button className="header__menu-button" onClick={toggleMobileMenu}>
          <img
            src={
              isMobileMenuOpen ? closeIcon : isSavedNews ? menuBlack : menuWhite
            }
            alt="menu"
            className="header__menu-icon"
          />
        </button>
      )}

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

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button
            className="menu__home-link"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate("/");
            }}
          >
            Home
          </button>

          {isLoggedIn ? (
            <>
              <button
                className="menu__saved-link"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/savednews");
                }}
              >
                Saved articles
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOutClick();
                }}
                className="menu-out__button"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleRegisterClick();
              }}
              className="menu-register__button"
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
