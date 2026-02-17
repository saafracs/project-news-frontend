import "./Footer.css";
import githubIcon from "../../images/github.svg";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import PopupContext from "../../src/contexts/PopupContext";
import Login from "../PopupWithForm/Login/Login";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function Footer() {
  const navigate = useNavigate();
  const { onOpenPopup } = useContext(PopupContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const path = location.pathname;
  const showOnMain = path === "/";

  return (
    <div className="footer">
      <p className="footer_text">© 2025 Supersite, Powered by News API</p>
      <div className="footer_nav">
        <div className="footer_nav__content">
          {!showOnMain && (
            <li
              className="footer_nav__text"
              onClick={() => {
                navigate("/");
              }}
            >
              Inicio
            </li>
          )}
          {showOnMain && !isLoggedIn && (
            <li
              className="footer_nav__text"
              onClick={() => {
                onOpenPopup({ title: "Iniciar sesión", children: <Login /> });
              }}
            >
              Iniciar sesión
            </li>
          )}
        </div>
        <div className="footer_nav__social">
          <li>
            <a href="https://github.com/saafracs" target="_blank">
              <img src={githubIcon} alt="Github Logo" />
            </a>
          </li>
          <li></li>
        </div>
      </div>
    </div>
  );
}

export default Footer;
