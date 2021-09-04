import React from "react";
import "./MoviesCard.css";
import { convertMinutesToHours } from "../../utils/utils";

export default function MoviesCard({
  card,
  cardMovieDelete,
  openPopupError,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
}) {
  const isLiked = savedMoviesCards.some((i) => i.movieId === card.id);

  function handleLikeClick() {
    isLiked ? handleDeleteCard() : onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }
  return (
    <>
      <li
        className={` movies-card ${
          cardMovieDelete ? "movies-card_place_saved-movies" : ""
        }`}
      >
        <a
          className="movies-card__link"
          href={cardMovieDelete ? card.trailer : card.trailerLink}
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
            className={`movies-card__like ${
              isLiked ? "movies-card__like_active" : ""
            } ${cardMovieDelete ? "movies-card__like_type_saved-movies" : ""}`}
            type="button"
            onClick={cardMovieDelete ? handleDeleteCard : handleLikeClick}
          ></button>
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
