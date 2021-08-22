import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movieCards } from "../../utils/constants";

export default function MoviesCardList() {
  return (
    <ul className="movies-card-list">
      {movieCards.map((card, i) => (
        <MoviesCard card={card} key={i} />
      ))}
    </ul>
  );
}
