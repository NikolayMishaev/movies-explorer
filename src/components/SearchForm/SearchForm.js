import React from "react";
import "./SearchForm.css";

export default function SearchForm({ checkboxOn, handleMovieCheckbox }) {
  return (
    <form className="search-form">
      <div className="search-form__search">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
        ></input>
        <button className="search-form__button-submit" type="submit">
          Найти
        </button>
      </div>
      <div className="search-form__filter">
        <input className="search-form__checkbox" type="checkbox"></input>
        <span
          className={` search-form__visible-checkbox ${
            checkboxOn ? "search-form__visible-checkbox_active" : ""
          }`}
          onClick={handleMovieCheckbox}
        ></span>
        <p className="search-form__checkbox-name">Короткометражки</p>
      </div>
    </form>
  );
}
