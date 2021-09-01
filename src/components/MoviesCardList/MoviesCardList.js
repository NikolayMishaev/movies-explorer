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
}) {
  return (
    <section
      className={` movies-card-list ${
        cardMovieDelete ? "movies-card-list_place_saved-movies" : ""
      } `}
    >
      <ul
        className={` movies-card-list__container ${
          // если количество карточек меньше четырех применить класс, чтобы ограничить размер в колонках grid-сетки.
          moviesCards.length < 4
            ? "movies-card-list__container_type_less-four-cards"
            : ""
        } `}
      >
        {moviesCards.map((card) => (
          <MoviesCard
            card={card}
            key={card.id}
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
          cardMovieDelete
            ? "display-none"
            : "movies-card-list__button-add-more-cards"
        } `}
        type="button"
        onClick={() =>
          openPopupError(
            "Данный функционал еще не реализован. Демонстрация работы попапа для отображения ошибок при работе с API."
          )
        }
      >
        Ещё
      </button>
    </section>
  );
}
