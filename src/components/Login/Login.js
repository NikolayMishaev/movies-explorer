import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Login({ onLogin }) {
  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
    history.push("/");
  }
  return (
    <section className="entry">
      <Navigation place="entry" />
      <h2 className="entry__title">Рады видеть!</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <label className="entry__field">
          E-mail
          <input
            id="entry-input-email"
            required
            name="email"
            minLength="5"
            maxLength="40"
            className={` entry__input `}
            type="email"
            defaultValue="pochta@yandex.ru"
          />
          <span className="entry__input-error entry-input-email-error"></span>
        </label>
        <label className="entry__field">
          Пароль
          <input
            id="entry-input-password"
            required
            name="password"
            minLength="5"
            maxLength="40"
            className={` entry__input`}
            type="password"
            defaultValue="11111111111111"
          />
          <span className="entry__input-error entry-input-password-error"></span>
        </label>
        <button
          aria-label="submit form"
          className={` entry__button-submit entry__button-submit_type_sign-in `}
          type="submit"
        >
          Войти
        </button>
        <p className="entry__text">
          Ещё не зарегистрированы?{" "}
          <Link className="entry__link" to="/sign-up">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}
