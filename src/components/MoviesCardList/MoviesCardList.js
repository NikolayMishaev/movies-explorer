import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"; // временные захардкоженные карточки

export default function MoviesCardList({
  movieCards,
  cardMovieDelete,
  openPopupError,
}) {
  return (
    <section
      className={` movies-card-list ${
        cardMovieDelete ? "movies-card-list_place_saved-movies" : ""
      } `}
    >
      <ul className="movies-card-list__container">
        {movieCards.map((card, i) => (
          <MoviesCard
            card={card}
            key={i}
            cardMovieDelete={cardMovieDelete}
            openPopupError={openPopupError}
          />
        ))}
      </ul>
    </section>
  );
}
