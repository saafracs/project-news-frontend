import { useContext, useState } from "react";
import "./SearchForm.css";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";

function SearchForm({ handleSearch }) {
  const { query, setQuery } = useContext(CurrentUserContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };
  return (
    <>
      <div className="search">
        <div className="search_image"></div>
        <h1 className="search_title">¿Qué está pasando en el mundo?</h1>
        <p className="search_text">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
        </p>
        <div className="search_box">
          <form className="search_form" onSubmit={handleOnSubmit}>
            <fieldset className="search_form__fieldset">
              <input
                type="text"
                name="tema"
                id="tema"
                className="search_form__input"
                placeholder="Introduce un tema"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </fieldset>
            <button className="search_form__button" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
