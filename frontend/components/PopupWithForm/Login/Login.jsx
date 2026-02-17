import "./login.css";
import Signup from "../Signup/Signup";
import { useContext, useEffect } from "react";
import PopupContext from "../../../src/contexts/PopupContext";
import CurrentUserContext from "../../../src/contexts/CurrentUserContext";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";

export default function Login() {
  const { onOpenPopup } = useContext(PopupContext);
  const { handleLogin } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit} noValidate>
        <fieldset className="form__fieldset">
          <div className="form_input-group">
            <label className="form_label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email || ""}
              onChange={handleChange}
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
              type="password"
              name="password"
              id="password"
              value={values.password || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Introduce tu contraseña"
              required
            />
            <span className="form__span form__span_type_error">
              {errors.password}
            </span>
          </div>
        </fieldset>
        <button type="submit" className="form__button" disabled={!isValid}>
          Iniciar sesión
        </button>
        <p className="form__text">
          o{" "}
          <span
            className="form__text-link"
            onClick={() => {
              onOpenPopup({ title: "Inscribirse", children: <Signup /> });
            }}
          >
            inscribirse
          </span>
        </p>
      </form>
    </>
  );
}
