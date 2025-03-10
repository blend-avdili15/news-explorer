import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
import { signIn, signUp, checkToken } from "../../utils/auth";
import { updateUser, getItems } from "../../utils/api";

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
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(""); // State to store backend response

  const handleRegisterClick = () => setActiveModal("register");
  const switchToRegister = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const switchToLogin = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const navigate = useNavigate();

  const handleSignUp = ({ email, password, username }) => {
    return signUp({ email, password, username })
      .then(() => {
        handleSignIn({ email, password, username });
      })
      .then(() => {
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Sign in error:", err);
        throw err;
      });
  };

  const handleSignIn = ({ email, password }) => {
    return signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return checkToken(data.token);
      })
      .then((user) => {
        console.log(user);
        setCurrentUser(user);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  // const handleUpdateUser = ({ name, avatar }) => {
  //   const token = localStorage.getItem("jwt");

  //   return updateUser({ name, username }, token)
  //     .then((updatedUser) => {
  //       setCurrentUser(updatedUser);
  //       closeActiveModal();
  //     })
  //     .catch(console.error);
  // };

  // useEffects

  // useEffect(() => {
  //   getItems()
  //     .then((data) => setMessage(data))
  //     .catch((err) => console.error("Error fetching:", err));
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          console.error("Invalid token, logging out...");
          handleSignOut();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <div className="page__main-slide">
            <Header
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
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
        onSignUp={handleSignUp}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        handleLoginClick={handleLoginClick}
        onSignIn={handleSignIn}
        onSwitchToRegister={switchToRegister}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
