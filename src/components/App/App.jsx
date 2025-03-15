import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";
import { signIn, signUp, checkToken } from "../../utils/auth";
import { updateUser, getItems } from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";

import "./App.css";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import SignOutModal from "../SignOutModal/SignOutModal";
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]); // Store saved articles
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleSignOutClick = () => setActiveModal("signout");
  const handleDeleteClick = () => setActiveModal("delete");
  const switchToRegister = () => setActiveModal("register");
  const switchToLogin = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const navigate = useNavigate();

  const handleSignUp = ({ email, password, username }) => {
    return signUp({ email, password, username })
      .then(() => handleSignIn({ email, password }))
      .then(() => setActiveModal(""))
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
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setActiveModal("");
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
    setSavedArticles([]);
    navigate("/", { replace: true });
    setActiveModal("");
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");

    deleteItem(selectedCard._id, token)
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setSavedArticles((prev) => {
      const isAlreadySaved = prev.some((saved) => saved.url === article.url);
      if (!isAlreadySaved) {
        const updatedArticles = [...prev, article];
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles)); // ✅ Save to localStorage
        return updatedArticles;
      }
      return prev;
    });
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prev) => {
      const updatedArticles = prev.filter(
        (article) => article.url !== articleToDelete.url
      );
      localStorage.setItem("savedArticles", JSON.stringify(updatedArticles)); // ✅ Update localStorage
      return updatedArticles;
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

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
          <Header
            isLoggedIn={isLoggedIn}
            handleSignOutClick={() => setActiveModal("signout")}
            handleRegisterClick={() => setActiveModal("register")}
            handleLoginClick={() => setActiveModal("login")}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleSaveArticle={handleSaveArticle}
                  savedArticles={savedArticles}
                  handleDeleteClick={handleDeleteArticle}
                />
              }
            />
            <Route
              path="/savednews"
              element={
                isLoggedIn ? (
                  <SavedNews
                    savedArticles={savedArticles || []}
                    //handleDeleteClick={() => setActiveModal("delete")}
                    handleDeleteClick={handleDeleteArticle}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>

          <Footer />
        </div>
      </div>

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={() => setActiveModal("")}
        // handleRegisterClick={handleRegisterClick}
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setActiveModal("login")}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal("")}
        // handleLoginClick={handleLoginClick}
        onSignIn={handleSignIn}
        onSwitchToRegister={() => setActiveModal("register")}
      />
      <SignOutModal
        isOpen={activeModal === "signout"}
        onClose={() => setActiveModal("")}
        onSignOut={handleSignOut}
      />
      <DeleteCardModal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal("")}
        // onDelete={handleDeleteCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
