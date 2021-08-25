import React from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Register() {
  const history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    history.push("/sign-in");
  }
  return (
    <section className="entry">
      <Navigation place="entry" />
      <h2 className="entry__title">Добро пожаловать!</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <label className="entry__field">
          Имя
          <input
            id="entry-input-name"
            required
            name="name"
            minLength="5"
            maxLength="40"
            className={` entry__input `}
            type="text"
            defaultValue="Виталий"
          />
          <span className="entry__input-error entry-input-name-error"></span>
        </label>
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
            className={` entry__input entry__input_type_error`}
            type="password"
            defaultValue="11111111111111"
          />
          <span className="entry__input-error entry-input-password-error">
            Что-то пошло не так...
          </span>
        </label>
        <button
          aria-label="submit form"
          className={` entry__button-submit  `}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="entry__text">
          Уже зарегистрированы?{" "}
          <Link className="entry__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}
