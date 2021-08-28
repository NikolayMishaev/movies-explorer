import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({
  checkboxOn,
  handleMovieCheckbox,
  openPopupError,
  preloaderVisible,
  showMoviesCards,
  moviesCards,
}) {
  return (
    <>
      <SearchForm
        showMoviesCards={showMoviesCards}
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
      />
      {preloaderVisible ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          openPopupError={openPopupError}
        />
      )}
    </>
  );
}
