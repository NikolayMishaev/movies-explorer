import React from "react";
import "./Movies.css";

export default function Movies({ checkboxOn, handleMovieCheckbox }) {
  return (
    <form className="movies">
      <div className="movies__search">
        <input
          className="movies__input"
          type="text"
          placeholder="Фильм"
        ></input>
        <button className="movies__button-submit" type="submit">
          Найти
        </button>
      </div>
      <div className="movies__filter">
        <input className="movies__checkbox" type="checkbox"></input>
        <span
          className={` movies__visible-checkbox ${
            checkboxOn ? "movies__visible-checkbox_active" : ""
          }`}
          onClick={handleMovieCheckbox}
        ></span>
        <p className="movies__checkbox-name">Короткометражки</p>
      </div>
    </form>
  );
}
