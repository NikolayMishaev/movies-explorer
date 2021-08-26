import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import useFormValidator from "../../hooks/useFormValidator";

export default function Profile({ signOut, editProfile }) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    editProfile(
      currentFormValidator.values.name,
      currentFormValidator.values.email
    );
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
              className={` entry__input entry__input_type_profile ${
                currentFormValidator.errors.name
                  ? "entry__input_type_error"
                  : ""
              }`}
              type="text"
              value={currentFormValidator.values.name || ""}
              onChange={currentFormValidator.handleChange}
            />
            <span className="entry__input-error entry__input-error_type_profile entry-input-name-error">
              {currentFormValidator.errors.name}
            </span>
          </label>
          <label className="entry__field entry__field_type_profile">
            E-mail
            <input
              id="entry-input-email"
              required
              name="email"
              minLength="5"
              maxLength="40"
              className={` entry__input entry__input_type_profile ${
                currentFormValidator.errors.email
                  ? "entry__input_type_error"
                  : ""
              }`}
              type="email"
              value={currentFormValidator.values.email || ""}
              onChange={currentFormValidator.handleChange}
            />
            <span className="entry__input-error entry__input-error_type_profile entry-input-email-error">
              {currentFormValidator.errors.email}
            </span>
          </label>
          <button
            aria-label="submit form"
            className={` entry__button-submit entry__button-submit_type_profile ${
              !currentFormValidator.isValid ? "entry__button-submit_disabled" : ""
            } `}
            type="submit"
            disabled={!currentFormValidator.isValid}
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
