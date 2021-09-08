import React, { useState } from "react";
import "./SearchForm.css";
import useFormValidator from "../../hooks/useFormValidator";
// импорт компонентов
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  searchValueCheckboxes,
  sortingCheckboxes,
  onSearchMovies,
  previousValueSearchForm,
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
          {searchValueCheckboxes.map((checkbox, i) => (
            <FilterCheckbox
              key={i}
              checkboxOn={checkbox.state}
              handleMovieCheckbox={checkbox.handler}
              title={checkbox.title}
            />
          ))}
        </fieldset>
        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Сортировка</legend>
          {sortingCheckboxes.map((checkbox, i) => (
            <FilterCheckbox
              key={i}
              checkboxOn={checkbox.state}
              handleMovieCheckbox={checkbox.handler}
              title={checkbox.title}
            />
          ))}
        </fieldset>
      </form>
    </section>
  );
}
