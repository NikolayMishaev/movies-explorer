import React from "react";
import "./SavedMovies.css";
// импорт компонентов
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  checkboxOn,
  handleMovieCheckbox,
  openPopupError,
  preloaderVisible,
  cardMovieDelete,
  moviesCards,
}) {
  return (
    <>
      <SearchForm
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
      />
      {preloaderVisible ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movieCards={moviesCards}
          cardMovieDelete={cardMovieDelete}
          openPopupError={openPopupError}
        />
      )}
    </>
  );
}
