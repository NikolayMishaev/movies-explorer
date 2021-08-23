import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
return (
<section className="entry">
<h2 className="entry__title">Регистрация</h2>
      <form
        className="entry__form"
      >
        <label className="entry__field">
          <input
            id="entry-input-email"
            required
            name="email"
            minLength="5"
            maxLength="40"
            placeholder="Email"
            className={` entry__input `}
            type="email"
          />
          <span className="entry__input-error entry-input-email-error">
          </span>
        </label>
        <label className="entry__field">
          <input
            id="entry-input-password"
            required
            name="password"
            minLength="5"
            maxLength="40"
            placeholder="Пароль"
            className={` entry__input `}
            type="password"
          />
          <span className="entry__input-error entry-input-email-error">
          </span>
        </label>
        <button
          aria-label="submit form"
          className={` entry__button-submit `}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <Link className="entry__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
</section>
);
}