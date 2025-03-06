import React, { useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import "./App.css";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeModal, setActiveModal] = useState("");

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
    <div className="page">
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
        />
        {/* <Routes>
          <Route />
          <Route />
        </Routes> */}
        <Footer />
      </div>
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        handleRegisterClick={handleRegisterClick}
        onSignUp={handleRegister}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        handleLoginClick={handleLoginClick}
        onSignIn={handleLogIn}
        onSwitchToRegister={switchToRegister}
      />
    </div>
  );
}

export default App;
