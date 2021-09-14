import React, { useEffect, useContext } from "react";
import "./Profile.css";
import useFormValidator from "../../hooks/useFormValidator";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  signOut,
  onEditProfile,
  formSubmitSendingStatus,
  messageWithResultSubmit,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(
      currentFormValidator.values.name,
      currentFormValidator.values.email
    );
  }

  function handleChangeInput(e) {
    currentFormValidator.handleChange(e);
    if (
      // если введенные данные в поля формы равны данным текущего пользователя, выключить кнопку сабмита формы,
      e.target.value === currentUser.name ||
      e.target.value === currentUser.email
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
              // выключить поле, если отправляется запрос.
              disabled={formSubmitSendingStatus}
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
              // выключить поле, если отправляется запрос.
              disabled={formSubmitSendingStatus}
              id="entry-input-email"
              required
              name="email"
              minLength="5"
              pattern="([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}"
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
            className={` entry__button-submit entry__button-submit_type_profile ${
              !currentFormValidator.isValid
                ? "entry__button-submit_type_profile-disabled"
                : ""
            }`}
            type="submit"
            // выключить кнопку, если отправляется запрос или введенные данные невалидны.
            disabled={formSubmitSendingStatus || !currentFormValidator.isValid}
          >
            {formSubmitSendingStatus || "Редактировать"}
          </button>
        </form>
        <button
          // выключить кнопку, если отправляется запрос.
          disabled={formSubmitSendingStatus}
          aria-label="sign out page"
          className="entry__button-sign-out"
          onClick={signOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}
