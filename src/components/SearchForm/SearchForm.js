import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidator from "../../hooks/useFormValidator";

export default function SearchForm({
  checkboxOn,
  handleMovieCheckbox,
  getMoviesCards,
}) {
  const currentFormValidator = useFormValidator();
  function handleSubmit(e) {
    e.preventDefault();
    getMoviesCards();
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
              currentFormValidator.errors.movie
                ? // если после события onChange поля инпута есть ошибка валидации, отобразить блок с кастомной ошибкой.
                  "search-form__input-error"
                : "display-none"
            } `}
          >
            Нужно ввести ключевое слово
          </span>
          <button
            className="search-form__button-submit"
            type="submit"
            disabled={!currentFormValidator.isValid}
            // выключить кнопку, если введенные данные невалидны.
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
