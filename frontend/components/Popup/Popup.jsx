import esc from "../../images/close.svg";
import "./popup.css";
import "../PopupWithForm/form.css";
import { useContext } from "react";
import PopupContext from "../../src/contexts/PopupContext";

export default function Popup({}) {
  const { setPopup, popup } = useContext(PopupContext);

  function handleClosePopup() {
    setPopup(null);
  }
  return (
    <div className="popup popup_opened">
      <div className="popup__overlay" onClick={handleClosePopup}></div>
      <div className="popup__content">
        <img
          src={esc}
          alt="close icon"
          className="popup__close-button popup__close-button_profile"
          onClick={handleClosePopup}
        />
        <div className="popup__body">
          <h1 className="popup__title">{popup.title}</h1>
          {popup.children}
        </div>
      </div>
    </div>
  );
}
