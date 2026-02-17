import "./Author.css";

function Author() {
  return (
    <div className="author">
      <div className="author_image"></div>
      <div className="author_about">
        <h2 className="author_about__name">Andres Rivas</h2>
        <p className="author_about__text">
          Este bloque describe al autor del proyecto. Aquí debe indicar tu
          nombre, a qué te dedicas y qué tecnologías de desarrollo conoces.
          También puedes hablar de tu experiencia con Practicum, de lo que
          aprendiste allí y de cómo puedes ayudar a los clientes potenciales.
        </p>
      </div>
    </div>
  );
}

export default Author;
