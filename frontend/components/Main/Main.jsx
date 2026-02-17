import { useContext, useEffect } from "react";
import Author from "../Author/Author";
import Header from "../Header/Header";
import NewsCardList from "../NewsCardList/NewsCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";
import Popup from "../Popup/Popup";
import Loader from "../loader/loader";
import NotFound from "../NotFound/NotFound";
import PopupContext from "../../src/contexts/PopupContext";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import api_news from "../../utils/api_news";
import api from "../../utils/api";

function Main() {
  const {
    isLoading,
    setIsLoading,
    searched,
    news,
    setSearched,
    setNews,
    userData,
    setUserData,
  } = useContext(CurrentUserContext);
  const { popup } = useContext(PopupContext);

  function saveCard(image, date, title, text, source, keyword) {
    const data = { image, date, title, text, source, keyword };
    api.saveNews(data).then((res) => {
      console.log(res);
      setUserData({
        ...userData,
        news: [...(userData?.news || []), res],
      });
      console.log(userData);
    });
  }

  function handleSearch(query) {
    setIsLoading(true);
    setSearched(true);
    setNews(null);

    api_news
      .searchNews(query)
      .then((data) => {
        const results = data?.results ?? [];
        setNews(results);
      })
      .catch((err) => console.error("Search failed:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {popup && <Popup />}
      <Header />
      <SearchForm handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {!isLoading && searched && (!news || news.length === 0) && <NotFound />}
      {!isLoading && !userData && (!news || news.length === 0) && <></>}
      {!isLoading && searched && news && news.length > 0 && (
        <NewsCardList
          sectionTitle="Resultados de la búsqueda"
          saveCard={saveCard}
        />
      )}
      <Author />
    </>
  );
}

export default Main;
