import React from "react";
import "./MoviesCardList.css";
// импорт компонентов
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  cardMovieDelete,
  openPopupError,
  moviesCards,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
  filteredMoviesCards = [],
  onAddMoreCard,
}) {
  return (
    <section
      className={` movies-card-list ${
        cardMovieDelete ? "movies-card-list_place_saved-movies" : ""
      } `}
    >
      <ul className={"movies-card-list__container"}>
        {moviesCards.map((card) => (
          <MoviesCard
            card={card}
            key={card._id || card.id}
            cardMovieDelete={cardMovieDelete}
            openPopupError={openPopupError}
            onCardLike={onCardLike}
            savedMoviesCards={savedMoviesCards}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
      <button
        className={` ${
          cardMovieDelete || moviesCards.length === filteredMoviesCards.length
            ? "display-none"
            : "movies-card-list__button-add-more-cards"
        } `}
        type="button"
        onClick={onAddMoreCard}
      >
        Ещё
      </button>
    </section>
  );
}
