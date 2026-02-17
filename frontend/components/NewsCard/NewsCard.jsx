import testImage from "../../images/test_image.png";
import bookmark from "../../images/bookmark.svg";
import trash from "../../images/trash.svg";
import "./NewsCard.css";
import { useLocation } from "react-router";
import { useContext, useState } from "react";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import api from "../../utils/api";

function NewsCard({
  image,
  date,
  title,
  text,
  source,
  keyWord,
  onCardLike,
  onCardRemove,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const savedPage = pathname === "/saved-news";
  const mainPage = pathname === "/";

  const { isLoggedIn } = useContext(CurrentUserContext);

  const formatDate = (originalDate) => {
    if (!originalDate) return "Fecha no disponible";

    const date = new Date(originalDate);

    if (isNaN(date.getTime())) return "Fecha no disponible";

    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="card">
      <div className="card_buttons">
        {savedPage && (
          <div className="card_button">
            <div className="card_button_box card_button_box__keyword">
              <p className="card_button__text">{keyWord}</p>
            </div>
            <div className="card_button_box">
              <img
                className="card_button__icon"
                onClick={onCardRemove}
                src={trash}
                alt="delete"
              />
            </div>
          </div>
        )}
        {mainPage && (
          <div className="card_button_box">
            {!isLoggedIn && isHovered && (
              <div className="card_button_text">
                Inicia sesión para guardar artículos
              </div>
            )}
            <img
              className="card_button__icon"
              src={bookmark}
              alt="bookmark"
              onClick={onCardLike}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        )}
      </div>
      <img src={image || testImage} alt="news image" className="card_image" />
      <div className="card_info">
        <p className="card_info__date">{formatDate(date)}</p>
        <h3 className="card_info__title">{title}</h3>
        <p className="card_info__text">{text}</p>
        <p className="card_info__source">{source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
