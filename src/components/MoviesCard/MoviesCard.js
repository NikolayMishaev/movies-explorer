import React from "react";
import "./MoviesCard.css";
import { convertMinutesToHours } from "../../utils/utils";

export default function MoviesCard({
  card,
  locationSavedMovies,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
  statusLikeDislikeMovieCard,
  moviesCardTitle,
}) {
  const isLiked = savedMoviesCards.some((i) => i.movieId === card.id);
  const duration = card.duration
    ? convertMinutesToHours(card.duration)
    : "нет данных";

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
          <div className="card-overlay">
            <h2 className="card-overlay__title">
              {moviesCardTitle === "RU"
                ? card.nameRU || card.nameEN || "нет данных"
                : card.nameEN || card.nameRU || "нет данных"}
            </h2>
            <p className="card-overlay__year">
              Год: {card.year || "нет данных"}
            </p>
            <p className="card-overlay__country">
              Страна: {card.country || "нет данных"}
            </p>
            <p className="card-overlay__director">
              Режиссер: {card.director || "нет данных"}
            </p>
            <p className="card-overlay__duration">
              Продолжительность: {duration}
            </p>
            <p className="card-overlay__description">
              {card.description || "нет данных"}
            </p>
          </div>
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">
            {moviesCardTitle === "RU"
              ? card.nameRU || card.nameEN || "нет данных"
              : card.nameEN || card.nameRU || "нет данных"}
          </h2>
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
          ></button>
          <p className="movies-card__duration">{duration}</p>
        </div>
      </li>
    </>
  );
}
