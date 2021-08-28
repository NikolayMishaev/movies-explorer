import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidator from "../../hooks/useFormValidator";

export default function SearchForm({
  checkboxOn,
  handleMovieCheckbox,
  showMoviesCards,
}) {
  const currentFormValidator = useFormValidator();
  function handleSubmit(e) {
    e.preventDefault();
    showMoviesCards();
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
