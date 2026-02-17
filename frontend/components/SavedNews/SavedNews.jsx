import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../Header/SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";
import { useContext } from "react";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function SavedNews() {
  const { userData } = useContext(CurrentUserContext);

  const name = userData?.name || " ";
  const cards = userData?.news || [];
  const savedCount = cards.length;

  console.log(cards);
  return (
    <>
      <SavedNewsHeader />
      <div className="forhead">
        <p className="forhead_subtitle">Artículos guardados</p>
        <h1 className="forhead_title">
          {name}, tienes {savedCount}{" "}
          {savedCount === 1 ? "artículo guardado" : "artículos guardados"}
        </h1>
        <p className="forhead_description">
          Por palabras clave: Naturaleza, Yellowstone, y 2 más
        </p>
      </div>
      <NewsCardList />
    </>
  );
}

export default SavedNews;
