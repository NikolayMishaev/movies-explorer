import React, { useState } from "react";
import "./SearchForm.css";
import useFormValidator from "../../hooks/useFormValidator";
// импорт компонентов
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  searchValueCheckboxes,
  sortingCheckboxes,
  settingsButtons,
  onSearchMovies,
  previousValueSearchForm,
  locationSavedMovies,
}) {
  const currentFormValidator = useFormValidator();
  // стейт, для проверки данных в поле инпута, т.к. при вставке в поле инпута значения из localStorage, событие onChange еще не сработало
  const [inputValue, setInputValue] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(formatInputValue());
  }
  function formatInputValue() {
    const inputValue = currentFormValidator.isValid
      ? currentFormValidator.values.movie
      : previousValueSearchForm;
    return inputValue.toLowerCase();
  }

  function handleInputValue(e) {
    setInputValue(e.target.value === "");
  }
  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__search">
          <input
            name="movie"
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            minLength="1"
            required
            onChange={currentFormValidator.handleChange}
            onInput={handleInputValue}
            defaultValue={previousValueSearchForm}
          ></input>
          <button
            className="search-form__button-submit"
            type="submit"
            // если нет значения поиска и в поле ничего не введено, выключить кнопку сабмита, иначе включить, если поле валидно и есть значение в поле
            // здесь отслеживается событие onInput, т.к. при вставке в поле инпута значения из localStorage, событие onChange еще не сработало
            disabled={
              !previousValueSearchForm && !currentFormValidator.values.movie
                ? true
                : !currentFormValidator.isValid && inputValue
            }
            // disabled={!currentFormValidator.isValid}
          >
            Найти
          </button>
          <span
            className={` search-form__input-error ${
              // если после события onChange поля инпута есть ошибка валидации, отобразить блок с кастомной ошибкой.
              currentFormValidator.errors.movie || inputValue
                ? "search-form__input-error_active"
                : ""
            }`}
          >
            Нужно ввести ключевое слово
          </span>
        </div>
        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Критерии поиска</legend>
          <ul className="search-form__list">
            {searchValueCheckboxes.map((checkbox, i) => (
              <FilterCheckbox
                key={i}
                checkbox={checkbox}
                checkboxOn={checkbox.state}
                handleMovieCheckbox={checkbox.handler}
                title={checkbox.title}
              />
            ))}
          </ul>
          <div
            className={`search-form__overlay ${
              previousValueSearchForm || currentFormValidator.values.movie
                ? ""
                : "search-form__overlay_active"
            }`}
          ></div>
        </fieldset>
        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Сортировка</legend>
          <ul className="search-form__list">
            {sortingCheckboxes.map((checkbox, i) => (
              <FilterCheckbox
                key={i}
                checkboxOn={checkbox.state}
                handleMovieCheckbox={checkbox.handler}
                title={checkbox.title}
              />
            ))}
          </ul>
          {!locationSavedMovies && (
            <div
              className={`search-form__overlay ${
                previousValueSearchForm || currentFormValidator.values.movie
                  ? ""
                  : "search-form__overlay_active"
              }`}
            ></div>
          )}
        </fieldset>
        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Настройки</legend>
          <ul className="search-form__list">
            {settingsButtons.map((button, i) =>
              button.type === "button" ? (
                <li className="search-form__item" key={i}>
                  <button
                    className={`search-form__button-setup search-form__button-setup_type_${button.className}`}
                    type="button"
                    onClick={button.handler}
                  >
                    {button.title}
                  </button>
                </li>
              ) : (
                <FilterCheckbox
                  key={i}
                  checkboxOn={button.state}
                  handleMovieCheckbox={button.handler}
                  title={button.title}
                  className={button.className}
                />
              )
            )}
          </ul>
          <div
            className={`search-form__overlay ${
              previousValueSearchForm || currentFormValidator.values.movie
                ? ""
                : "search-form__overlay_active"
            }`}
          ></div>
        </fieldset>
      </form>
    </section>
  );
}
