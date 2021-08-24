import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ checkboxOn, handleMovieCheckbox }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__checkbox"
        type="checkbox"
        checked={checkboxOn}
      ></input>
      <span
        className={` filter-checkbox__visible-checkbox ${
          checkboxOn ? "filter-checkbox__visible-checkbox_active" : ""
        }`}
        onClick={handleMovieCheckbox}
      ></span>
      <p className="filter-checkbox__checkbox-name">Короткометражки</p>
    </div>
  );
}
