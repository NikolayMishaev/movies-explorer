import React from "react";
import "./Movies.css";
// импорт компонентов
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchMessage from "../SearchMessage/SearchMessage";

export default function Movies({
  checkboxOn,
  handleMovieCheckbox,
  handleSearchValue,
  openPopupError,
  preloaderVisible,
  handleMoviesCards,
  moviesCards,
  searchMessageMovies,
  onCardLike,
  savedMoviesCards,
  onSearchMovies,
  onCardDelete,
  previousValueSearchForm,
  filteredMoviesCards,
  onAddMoreCard,
}) {
  return (
    <>
      <SearchForm
        handleMoviesCards={handleMoviesCards}
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
        handleSearchValue={handleSearchValue}
        onSearchMovies={onSearchMovies}
        previousValueSearchForm={previousValueSearchForm}
      />
      {preloaderVisible ? (
        <Preloader />
      ) : searchMessageMovies ? (
        <SearchMessage searchMessage={searchMessageMovies} />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          openPopupError={openPopupError}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          savedMoviesCards={savedMoviesCards}
          filteredMoviesCards={filteredMoviesCards}
          onAddMoreCard={onAddMoreCard}
        />
      )}
    </>
  );
}
