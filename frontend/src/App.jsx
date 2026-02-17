import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import SavedNews from "../components/SavedNews/SavedNews";
import { useState, useEffect } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { authorize, register, validate } from "../utils/auth";
import { getToken, setToken, removeToken } from "../utils/token";
import PopupContext from "./contexts/PopupContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/PopupWithForm/Login/Login";
import api from "../utils/api";

function App() {
  const [popup, setPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    validate(jwt)
      .then((data) => {
        setUserData(data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  function handleLogout() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setUserData({});
    setNews([]);
  }

  function onOpenPopup(popup) {
    setFormErrorMessage("");
    setPopup(popup);
  }

  function handleRegistration(email, password, name) {
    register(email, password, name)
      .then(() => {
        setPopup({
          title: "¡El registro se ha completado con éxito!",
        });
      })
      .catch((err) => {
        setFormErrorMessage(
          err.message || "Error en el registro. Inténtalo de nuevo.",
        );
        console.error(err);
      });
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    authorize(email, password)
      .then((res) => {
        setUserData({ email });
        setPopup(null);
        setNews([]);
        setToken(res.token);
        setIsLoggedIn(true);
        navigate("/saved-news");
      })
      .catch((err) => {
        setFormErrorMessage(
          "El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
        );
        console.error(err);
      });
  }

  function handleRemoveCard(data) {
    api
      .deleteNews(data._id)
      .then(() => {
        setUserData((prev) => ({
          ...prev,
          news: (prev.news || []).filter((c) => c._id !== data._id),
        }));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          isLoggedIn,
          handleRemoveCard,
          handleRegistration,
          handleLogin,
          setIsLoading,
          setSearched,
          isLoading,
          handleLogout,
          setUserData,
          userData,
          searched,
          setNews,
          news,
          Login,
          query,
          setQuery,
        }}
      >
        <PopupContext.Provider
          value={{ popup, onOpenPopup, setPopup, formErrorMessage }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <SavedNews />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Main />} />
          </Routes>
          <Footer />
        </PopupContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
