import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({
  title,
  checkboxOn,
  handleMovieCheckbox,
  className,
  checkbox,
}) {
  function handleOnChange() {
    handleMovieCheckbox(checkbox);
  }
  return (
    <li className={` filter-checkbox  `}>
      <label className="filter-checkbox__field">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          checked={checkboxOn}
          onChange={handleOnChange}
        ></input>
        <span
          className={` filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_${className} `}
        ></span>
      </label>
      <p className="filter-checkbox__checkbox-name">{title}</p>
    </li>
  );
}
