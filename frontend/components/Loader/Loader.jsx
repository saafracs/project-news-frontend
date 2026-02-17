import "./loader.css";

export default function Loader() {
  return (
    <div className="preloader">
      <div className="preloader__circle"></div>
      <div className="preloader__text">Cargando...</div>
    </div>
  );
}
