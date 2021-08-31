import React from "react";
import "./SearchForm.css";
import useFormValidator from "../../hooks/useFormValidator";
// импорт компонентов
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  checkboxOn,
  handleMovieCheckbox,
  handleSearchValue,
  onSearchMovies
}) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies(handleFormatInputValue());
  }

  // function handleMovieCheckboxClick() {
  //   handleMovieCheckbox(handleFormatInputValue());
  // }

  function handleFormatInputValue() {
    return currentFormValidator.isValid
      ? currentFormValidator.values.movie.trim().toLowerCase()
      : "";
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
          ></input>
          <button
            className="search-form__button-submit"
            type="submit"
            // выключить кнопку, если введенные данные невалидны.
            disabled={!currentFormValidator.isValid}
          >
            Найти
          </button>
          <span
            className={` search-form__input-error ${
              // если после события onChange поля инпута есть ошибка валидации, отобразить блок с кастомной ошибкой.
              currentFormValidator.errors.movie
                ? "search-form__input-error_active"
                : ""
            }`}
          >
            Нужно ввести ключевое слово
          </span>
        </div>
        <FilterCheckbox
          checkboxOn={checkboxOn}
          handleMovieCheckbox={handleMovieCheckbox}
        />
      </form>
    </section>
  );
}
