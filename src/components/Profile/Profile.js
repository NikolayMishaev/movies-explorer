import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile({ signOut, openPopupError }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <section className="entry entry_type_profile">
        <h2 className="entry__title entry__title_type_profile">
          Привет, Виталий!
        </h2>
        <form className="entry__form" onSubmit={handleSubmit}>
          <label className="entry__field entry__field_type_profile">
            Имя
            <input
              id="entry-input-name"
              required
              name="name"
              minLength="5"
              maxLength="40"
              className={` entry__input entry__input_type_profile `}
              type="text"
              defaultValue="Виталий"
            />
            <span className="entry__input-error entry-input-name-error"></span>
          </label>
          <label className="entry__field entry__field_type_profile">
            E-mail
            <input
              id="entry-input-email"
              required
              name="email"
              minLength="5"
              maxLength="40"
              className={` entry__input entry__input_type_profile`}
              type="email"
              defaultValue="pochta@yandex.ru"
            />
            <span className="entry__input-error entry-input-email-error"></span>
          </label>
          <button
            aria-label="submit form"
            className={` entry__button-submit entry__button-submit_type_profile `}
            type="submit"
            onClick={() =>
              openPopupError(
                "Данный функционал еще не реализован. Демонстрация работы попапа для отображения ошибок при работе с API."
              )
            }
          >
            Редактировать
          </button>
          <Link
            className="entry__link entry__link_type_profile"
            to="/"
            onClick={signOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  );
}
