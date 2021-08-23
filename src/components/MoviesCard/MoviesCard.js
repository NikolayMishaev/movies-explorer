import React, { useState } from "react";
import "./MoviesCard.css";

export default function MoviesCard({ card, cardMovieDelete }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function handleDeleteCard() {
  }

  return (
    <>
      <li className="movies-card">
        <img
          className="movies-card__wallpaper"
          src={card.link}
          alt={card.title}
        />
        <div className="movies-card__description">
        <h2 className="movies-card__title">{card.title}</h2>
        <button
          className={`movies-card__like ${
            isLiked ? "movies-card__like_active" : ""
          } ${
            cardMovieDelete ? "movies-card__like_type_saved-movies" : ""
          }`}
          type="button"
          onClick={cardMovieDelete? handleDeleteCard : handleLikeClick}
        ></button>
        <p className="movies-card__duration">1ч 42м</p>
        </div>
      </li>
    </>
  );
}
