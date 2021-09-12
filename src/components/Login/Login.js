import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import useFormValidator from "../../hooks/useFormValidator";
// импорт компонентов
import Navigation from "../Navigation/Navigation";

export default function Login({
  onLogin,
  formSubmitSendingStatus,
  messageWithResultSubmit,
}) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(
      currentFormValidator.values.email,
      currentFormValidator.values.password
    );
  }

  return (
    <section className="entry">
      <Navigation place="entry" />
      <h2 className="entry__title">Рады видеть!</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <label className="entry__field">
          E-mail
          <input
            // выключить поле, если отправляется запрос.
            disabled={formSubmitSendingStatus}
            id="entry-input-email"
            required
            name="email"
            minLength="5"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}"
            title="введен некорректный адрес электронной почты"
            className={` entry__input ${
              currentFormValidator.errors.email ? "entry__input_type_error" : ""
            }`}
            type="email"
            value={currentFormValidator.values.email || ""}
            onChange={currentFormValidator.handleChange}
          />
          <span className="entry__input-error entry-input-email-error">
            {currentFormValidator.errors.email}
          </span>
        </label>
        <label className="entry__field">
          Пароль
          <input
            // выключить поле, если отправляется запрос.
            disabled={formSubmitSendingStatus}
            id="entry-input-password"
            required
            name="password"
            minLength="8"
            maxLength="40"
            className={` entry__input ${
              currentFormValidator.errors.password
                ? "entry__input_type_error"
                : ""
            }`}
            type="password"
            value={currentFormValidator.values.password || ""}
            onChange={currentFormValidator.handleChange}
          />
          <span className="entry__input-error entry-input-password-error">
            {currentFormValidator.errors.password}
          </span>
        </label>
        <span
          className={` entry__submit-message ${
            messageWithResultSubmit ? "entry__submit-message_active" : ""
          } 
          ${
            messageWithResultSubmit.includes("ошибка")
              ? "entry__submit-message_type_error"
              : ""
          }
          `}
        >
          {messageWithResultSubmit}
        </span>
        <button
          aria-label="submit form"
          className={` entry__button-submit entry__button-submit_type_sign-in ${
            !currentFormValidator.isValid
              ? "entry__button-submit_type_disabled"
              : ""
          } `}
          type="submit"
          // выключить кнопку, если отправляется запрос или введенные данные невалидны.
          disabled={formSubmitSendingStatus || !currentFormValidator.isValid}
        >
          {formSubmitSendingStatus || "Войти"}
        </button>
        <p className="entry__text">
          Ещё не зарегистрированы?
          <Link className="entry__link" to="/sign-up">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}
