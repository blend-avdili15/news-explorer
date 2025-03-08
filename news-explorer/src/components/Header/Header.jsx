import "./Header.css";
import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import arrow from "../../images/arrow-white.svg";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function Header({ isLoggedIn, handleRegisterClick }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__title">NewsExplorer</div>

      {isLoggedIn ? (
        <div className="header__logged-in">
          <Link to="/" className="header__nav-item">
            <p className="header__home">Home</p>
          </Link>
          <Link to="/savedNews" className="header__nav-item">
            <p className="header__articles">Saved articles</p>
          </Link>
          <div className="header__profile">
            <button className="header__profile-button">Blend</button>
            <img className="header__arrow" src={arrow} alt="header-arrow" />
          </div>
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
