import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import About from "../About/About";
import SavedNews from "../SavedNews/SavedNews";

import "./App.css";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegisterClick = () => setActiveModal("register");
  const switchToRegister = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const switchToLogin = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const handleRegister = ({ email, password, username }) => {
    return Register({ email, password, username })
      .then(() => {
        handlerRegister({ email, password, username });
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Sign in error:", err);
        throw err;
      });
  };

  const handleLogIn = ({ email, password }) => {
    return logIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return checkToken(data.token);
      })
      .then((user) => {
        console.log(user);
        setCurrentUser(user);
      })
      .then((items) => {
        console.log(items);
        closeActiveModal();
        //navigate("/profile");
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <div className="page__main-slide">
            <Header
              isLoggedIn={isLoggedIn}
              handleRegisterClick={() => setActiveModal("register")}
              handleLoginClick={() => setActiveModal("login")}
            />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/savedNews"
                element={isLoggedIn ? <SavedNews /> : <Navigate to="/" />}
              />
            </Routes>
          </div>

          <About />
          <Footer />
        </div>
      </div>

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("")}
        handleRegisterClick={handleRegisterClick}
        onSignUp={handleRegister}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        handleLoginClick={handleLoginClick}
        onSignIn={handleLogIn}
        onSwitchToRegister={switchToRegister}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
