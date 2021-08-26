import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import useFormValidator from "../../hooks/useFormValidator";

export default function Register({ onRegister }) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(
      currentFormValidator.values.name,
      currentFormValidator.values.email,
      currentFormValidator.values.password
    );
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
            pattern="[a-zA-Zа-яА-Я -]*"
            className={` entry__input ${
              currentFormValidator.errors.name ? "entry__input_type_error" : ""
            }`}
            type="text"
            value={currentFormValidator.values.name || ""}
            onChange={currentFormValidator.handleChange}
          />
          <span className="entry__input-error entry-input-name-error">
            {currentFormValidator.errors.name}
          </span>
        </label>
        <label className="entry__field">
          E-mail
          <input
            id="entry-input-email"
            required
            name="email"
            minLength="5"
            maxLength="40"
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
            id="entry-input-password"
            required
            name="password"
            minLength="5"
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
        <button
          aria-label="submit form"
          className={` entry__button-submit ${
            !currentFormValidator.isValid ? "entry__button-submit_disabled" : ""
          } `}
          type="submit"
          disabled={!currentFormValidator.isValid}
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
