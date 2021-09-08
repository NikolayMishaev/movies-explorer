import React from "react";
import "./Movies.css";
// импорт компонентов
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchMessage from "../SearchMessage/SearchMessage";

export default function Movies({
  moviesSearchValueCheckboxes,
  moviesSortingCheckboxes,
  handleSearchValue,
  openPopupError,
  visiblePreloader,
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
  statusLikeDislikeMovieCard,
}) {
  return (
    <>
      <SearchForm
        moviesSearchValueCheckboxes={moviesSearchValueCheckboxes}
        moviesSortingCheckboxes={moviesSortingCheckboxes}
        handleMoviesCards={handleMoviesCards}
        handleSearchValue={handleSearchValue}
        onSearchMovies={onSearchMovies}
        previousValueSearchForm={previousValueSearchForm}
      />
      {visiblePreloader ? (
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
          statusLikeDislikeMovieCard={statusLikeDislikeMovieCard}
        />
      )}
    </>
  );
}
