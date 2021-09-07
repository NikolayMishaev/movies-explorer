import React from "react";
import "./MoviesCardList.css";
// импорт компонентов
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  locationSavedMovies,
  openPopupError,
  moviesCards,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
  filteredMoviesCards = [],
  onAddMoreCard,
  statusLikeDislikeMovieCard,
}) {
  return (
    <section
      className={` movies-card-list ${
        locationSavedMovies ? "movies-card-list_place_saved-movies" : ""
      } `}
    >
      <ul className={"movies-card-list__container"}>
        {moviesCards.map((card) => (
          <MoviesCard
            card={card}
            key={card._id || card.id}
            locationSavedMovies={locationSavedMovies}
            openPopupError={openPopupError}
            onCardLike={onCardLike}
            savedMoviesCards={savedMoviesCards}
            onCardDelete={onCardDelete}
            statusLikeDislikeMovieCard={statusLikeDislikeMovieCard}
          />
        ))}
      </ul>
      <button
        className={` ${
          locationSavedMovies ||
          moviesCards.length === filteredMoviesCards.length
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
