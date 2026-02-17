import { useContext } from "react";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import PopupContext from "../../src/contexts/PopupContext";
import { useLocation, useNavigate } from "react-router";
import Login from "../PopupWithForm/Login/Login";

export default function HeaderNav() {
  const { isLoggedIn, userData, handleLogout } = useContext(CurrentUserContext);
  const { onOpenPopup } = useContext(PopupContext);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const showOnSaved = path === "/saved-news";
  const showOnMain = path === "/";

  return (
    <nav className="header_nav">
      {!isLoggedIn && (
        <>
          <li
            className={`header_nav__button ${showOnMain ? "header_nav__button-main" : ""}`}
          >
            Inicio
          </li>

          <li
            className="header_nav__button"
            onClick={() => {
              onOpenPopup({ title: "Iniciar sesión", children: <Login /> });
            }}
          >
            <div className="button button__text"></div>
            Iniciar sesión
          </li>
        </>
      )}
      {isLoggedIn && (
        <>
          <li
            className={`header_nav__button ${showOnMain ? "header_nav__button-main" : ""}`}
            onClick={() => {
              navigate("/");
            }}
          >
            Inicio
          </li>
          <li
            className={`header_nav__button ${showOnSaved ? "header_nav__button-main" : ""}`}
            onClick={() => {
              navigate("/saved-news");
            }}
          >
            Artículos guardados
          </li>
          <li className="header_nav__button" onClick={handleLogout}>
            <div className="button"></div>
            {userData.name}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fillRule="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z"
                fill={showOnSaved ? "black" : "white"}
              />
            </svg>
          </li>
        </>
      )}
    </nav>
  );
}
