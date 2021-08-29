import React from "react";
import "./SearchForm.css";
import useFormValidator from "../../hooks/useFormValidator";
// импорт компонентов
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  checkboxOn,
  handleMovieCheckbox,
  handleSearchValue,
}) {
  const currentFormValidator = useFormValidator();

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchValue(handleFormatInputValue());
  }

  // function handleMovieCheckboxClick() {
  //   handleMovieCheckbox();
  //   handleSearchValue(handleFormatInputValue())
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
          <span
            className={` ${
              // если после события onChange поля инпута есть ошибка валидации, отобразить блок с кастомной ошибкой.
              currentFormValidator.errors.movie
                ? "search-form__input-error"
                : "display-none"
            } `}
          >
            Нужно ввести ключевое слово
          </span>
          <button
            className="search-form__button-submit"
            type="submit"
            // выключить кнопку, если введенные данные невалидны.
            disabled={!currentFormValidator.isValid}
          >
            Найти
          </button>
        </div>
        <FilterCheckbox
          checkboxOn={checkboxOn}
          handleMovieCheckbox={handleMovieCheckbox}
        />
      </form>
    </section>
  );
}
