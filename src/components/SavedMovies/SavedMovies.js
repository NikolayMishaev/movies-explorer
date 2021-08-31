import React from "react";
import "./SavedMovies.css";
// импорт компонентов
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchMessage from "../SearchMessage/SearchMessage";

export default function SavedMovies({
  checkboxOn,
  handleMovieCheckbox,
  openPopupError,
  preloaderVisible,
  cardMovieDelete,
  savedMoviesCards,
  onCardLike,
  onCardDelete,
  onSearchSavedMovies,
  searchMessageSavedMovies
}) {
  return (
    <>
      <SearchForm
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
        onSearchMovies={onSearchSavedMovies}
      />
      {preloaderVisible ? (
        <Preloader />
      ) : searchMessageSavedMovies ? (
        <SearchMessage searchMessage={searchMessageSavedMovies} />
      ) : (
        <MoviesCardList
          moviesCards={savedMoviesCards}
          cardMovieDelete={cardMovieDelete}
          openPopupError={openPopupError}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          savedMoviesCards={savedMoviesCards}
        />
      )}
    </>
  );
}
