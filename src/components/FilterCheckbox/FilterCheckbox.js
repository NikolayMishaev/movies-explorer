import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ checkboxOn, handleMovieCheckbox }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__field">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          checked={checkboxOn}
          onChange={handleMovieCheckbox}
        ></input>
        <span className="filter-checkbox__visible-checkbox"></span>
      </label>
      <p className="filter-checkbox__checkbox-name">Короткометражки</p>
    </div>
  );
}
