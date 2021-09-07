import React from "react";
import "./MoviesCard.css";
import { convertMinutesToHours } from "../../utils/utils";

export default function MoviesCard({
  card,
  locationSavedMovies,
  openPopupError,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
  statusLikeDislikeMovieCard,
}) {
  const isLiked = savedMoviesCards.some((i) => i.movieId === card.id);
  function handleLikeClick(e) {
    isLiked ? handleDeleteCard() : onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }
  return (
    <>
      <li
        className={` movies-card ${
          locationSavedMovies ? "movies-card_place_saved-movies" : ""
        }`}
      >
        <a
          className="movies-card__link"
          href={locationSavedMovies ? card.trailer : card.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movies-card__wallpaper"
            src={`${
              typeof card.image === "object"
                ? `https://api.nomoreparties.co/${card.image.url.slice(1)}`
                : card.image
            }`}
            alt={card.nameRU}
          />
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          <button
            disabled={statusLikeDislikeMovieCard}
            className={`movies-card__like ${
              isLiked ? "movies-card__like_active" : ""
            } ${
              locationSavedMovies ? "movies-card__like_type_saved-movies" : ""
            }
          `}
            type="button"
            onClick={locationSavedMovies ? handleDeleteCard : handleLikeClick}
          >
            {statusLikeDislikeMovieCard}
          </button>
          <p className="movies-card__duration">
            {card.duration
              ? convertMinutesToHours(card.duration)
              : "нет данных"}
          </p>
        </div>
      </li>
    </>
  );
}
