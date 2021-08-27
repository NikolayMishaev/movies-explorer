import React, { useEffect, useContext } from "react";
import "./Profile.css";
import useFormValidator from "../../hooks/useFormValidator";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  signOut,
  onEditProfile,
  formSubmitSendingStatus,
  formSubmitStatus,
}) {
  const currentFormValidator = useFormValidator();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name) {
      currentFormValidator.resetForm();
      currentFormValidator.setValues({
        ...currentFormValidator.values,
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(
      currentFormValidator.values.name,
      currentFormValidator.values.email
    );
  }

  // если имя или email пользователя не меняются после ввода в поля формы, то кнопка "Редактировать" выключена
  function handleChangeInput(e) {
    currentFormValidator.handleChange(e);
    if (
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
      // выключить кнопку сабмита формы, если введенные данные равны данным текущего пользователя.
    ) {
      currentFormValidator.setIsValid(false);
    }
  }

  return (
    <>
      <section className="entry entry_type_profile">
        <h2 className="entry__title entry__title_type_profile">
          Привет, {currentUser.name}!
        </h2>
        <form className="entry__form" onSubmit={handleSubmit}>
          <label className="entry__field entry__field_type_profile">
            Имя
            <input
              disabled={formSubmitSendingStatus}
              // выключить поле, если отправляется запрос.
              id="entry-input-name"
              required
              name="name"
              minLength="5"
              maxLength="40"
              pattern="[a-zA-Zа-яА-Я -]*"
              title="Имя должно содержать только латиницу, кириллицу, пробел или дефис"
              className={` entry__input entry__input_type_profile ${
                currentFormValidator.errors.name
                  ? "entry__input_type_error"
                  : ""
              }`}
              type="text"
              value={currentFormValidator.values.name || ""}
              onChange={handleChangeInput}
            />
            <span className="entry__input-error entry__input-error_type_profile entry-input-name-error">
              {currentFormValidator.errors.name}
            </span>
          </label>
          <label className="entry__field entry__field_type_profile">
            E-mail
            <input
              disabled={formSubmitSendingStatus}
              // выключить поле, если отправляется запрос.
              id="entry-input-email"
              required
              name="email"
              minLength="5"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}"
              title="введен некорректный адрес электронной почты"
              className={` entry__input entry__input_type_profile ${
                currentFormValidator.errors.email
                  ? "entry__input_type_error"
                  : ""
              }`}
              type="email"
              value={currentFormValidator.values.email || ""}
              onChange={handleChangeInput}
            />
            <span className="entry__input-error entry__input-error_type_profile entry-input-email-error">
              {currentFormValidator.errors.email}
            </span>
          </label>
          <span
            className={` entry__submit-message ${
              formSubmitStatus ? "entry__submit-message_active" : ""
            } `}
          >
            {formSubmitStatus}
          </span>
          <button
            aria-label="submit form"
            className={` entry__button-submit entry__button-submit_type_profile ${
              !currentFormValidator.isValid
                ? "entry__button-submit_disabled"
                : ""
            }`}
            type="submit"
            disabled={formSubmitSendingStatus || !currentFormValidator.isValid}
            // выключить кнопку, если отправляется запрос или введенные данные невалидны.
          >
            {formSubmitSendingStatus || "Редактировать"}
          </button>
          <button
            disabled={formSubmitSendingStatus}
            // выключить кнопку, если отправляется запрос.
            aria-label="sign out page"
            className="entry__button-sign-out"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}
