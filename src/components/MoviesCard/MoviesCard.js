import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  card,
  cardMovieDelete,
  openPopupError,
  onCardLike,
  savedMoviesCards,
  onCardDelete,
}) {
  
  const isLiked = savedMoviesCards.some(i=> i.id===card.id)

  function handleLikeClick() {
    isLiked? handleDeleteCard() : onCardLike(card);
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
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movies-card__wallpaper"
            src={`https://api.nomoreparties.co${card.image.url}`}
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
            onClick={handleLikeClick}
          ></button>
          <p className="movies-card__duration">{`${(
            card.duration / 60
          ).toFixed()}ч ${card.duration % 60}м`}</p>
        </div>
      </li>
    </>
  );
}
