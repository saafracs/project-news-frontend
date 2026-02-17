import { useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import { useLocation } from "react-router";

function NewsCardList({ sectionTitle, saveCard }) {
  const { news, query, userData, handleRemoveCard } =
    useContext(CurrentUserContext);

  const location = useLocation();
  const path = location.pathname;

  const showOnMain = path === "/";
  const showOnSaved = path === "/saved-news";

  function handleSaveCard(image, date, title, text, source, keyword) {
    saveCard(image, date, title, text, source, keyword);
  }

  return (
    <div className="elements">
      <h2 className="elements_title">{sectionTitle}</h2>
      <div className="cards">
        {news &&
          showOnMain &&
          news.map((item) => (
            <NewsCard
              key={item.article_id}
              date={item.pubDate}
              title={item.title}
              text={item.description}
              source={item.source_name}
              image={item.image_url}
              keyword={query}
              onCardLike={() => {
                handleSaveCard(
                  item.image_url,
                  item.pubDate,
                  item.title,
                  item.description,
                  item.source_name,
                  query,
                );
              }}
            />
          ))}

        {userData?.news &&
          showOnSaved &&
          userData.news.map((item) => (
            <NewsCard
              key={item._id}
              date={item.publishedAt}
              title={item.title}
              text={item.description}
              source={item.source}
              image={item.image}
              keyword={query}
              onCardRemove={() => {
                handleRemoveCard(item);
              }}
            />
          ))}
      </div>
      <button disabled="disabled" className="elements_button">
        Ver más
      </button>
    </div>
  );
}

export default NewsCardList;
