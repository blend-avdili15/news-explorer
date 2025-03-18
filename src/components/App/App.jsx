import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/Contexts/CurrentUserContext";
import { signIn, signUp, checkToken } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";

import "./App.css";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import SignOutModal from "../SignOutModal/SignOutModal";

function App() {
  // State Variables /////////////////

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal Handlers /////////////////

  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleSignOutClick = () => setActiveModal("signout");
  const switchToRegister = () => setActiveModal("register");
  const switchToLogin = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  // User Authentication Functions ///////////////////

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
    setSavedArticles([]);
    navigate("/", { replace: true });
    closeActiveModal();
  };

  // Deleting Articles //////////////////

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles((prev) => {
      const updatedArticles = prev.filter(
        (article) => article.url !== articleToDelete.url
      );
      localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
      return updatedArticles;
    });
  };

  // Saving Articles ////////////////////

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setSavedArticles((prev) => {
      const isAlreadySaved = prev.some((saved) => saved.url === article.url);
      if (!isAlreadySaved) {
        const updatedArticles = [...prev, article];
        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
        return updatedArticles;
      }
      return prev;
    });
  };

  /////// UseEffect ////////////////////////

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

    // Load saved articles from localStorage
    const savedData = localStorage.getItem("savedArticles");
    if (savedData) {
      setSavedArticles(JSON.parse(savedData));
    }

    // Get the last visited page from localStorage
    const lastVisitedPage = localStorage.getItem("lastPage");

    // Restore the last visited page ONLY on reload (not on navigation clicks)
    if (lastVisitedPage && lastVisitedPage !== window.location.pathname) {
      navigate(lastVisitedPage, { replace: true });
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      localStorage.setItem("lastPage", window.location.pathname);
    };

    // Listen for changes in URL (React Router navigation)
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("beforeunload", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            isLoggedIn={isLoggedIn}
            handleSignOutClick={handleSignOutClick}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleSaveArticle={handleSaveArticle}
                  savedArticles={savedArticles}
                  handleDeleteArticle={handleDeleteArticle}
                />
              }
            />
            <Route
              path="/savednews"
              element={
                isLoggedIn ? (
                  <SavedNews
                    savedArticles={savedArticles || []}
                    handleDeleteArticle={handleDeleteArticle}
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
        onClose={closeActiveModal}
        onSignUp={handleSignUp}
        onSwitchToLogin={switchToLogin}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        onSignIn={handleSignIn}
        onSwitchToRegister={switchToRegister}
      />
      <SignOutModal
        isOpen={activeModal === "signout"}
        onClose={closeActiveModal}
        onSignOut={handleSignOut}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
