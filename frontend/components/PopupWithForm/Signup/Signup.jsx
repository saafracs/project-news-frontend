import { useContext, useEffect } from "react";
import PopupContext from "../../../src/contexts/PopupContext";
import CurrentUserContext from "../../../src/contexts/CurrentUserContext";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import Login from "../Login/Login";

export default function Signup() {
  const { onOpenPopup } = useContext(PopupContext);
  const { handleRegistration } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  function handleOnSubmit(e) {
    e.preventDefault();
    handleRegistration(values.email, values.password, values.username);
  }

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit} noValidate>
        <fieldset className="form__fieldset">
          <div className="form_input-group">
            <label className="form_label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              value={values.email || ""}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="form__input"
              placeholder="Introduce tu correo electrónico"
              required
            />
            <span className="form__span form__span_type_error">
              {errors.email}
            </span>
          </div>
          <div className="form_input-group">
            <label className="form_label" htmlFor="password">
              Contraseña{" "}
            </label>
            <input
              value={values.password || ""}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              className="form__input"
              required
              minLength="4"
              placeholder="Introduce tu contraseña"
            />
            <span className="form__span form__span_type_error">
              {errors.password}
            </span>
          </div>
          <div className="form_input-group">
            <label className="form_label" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              value={values.username || ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="form__input"
              placeholder="Introduce tu nombre de usuario"
              required
              minLength="2"
            />
            <span className="form__span form__span_type_error">
              {errors.username}
            </span>
          </div>
        </fieldset>
        <button className="form__button" type="submit" disabled={!isValid}>
          Inscribirme
        </button>
        <p className="form__text">
          o{" "}
          <span
            className="form__text-link"
            onClick={() => {
              onOpenPopup({ title: "Iniciar sesión", children: <Login /> });
            }}
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </>
  );
}
