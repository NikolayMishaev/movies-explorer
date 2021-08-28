import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { movieCardsLike } from "../../utils/constants";

export default function SavedMovies({
  checkboxOn,
  handleMovieCheckbox,
  openPopupError,
  preloaderVisible,
  cardMovieDelete,
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
          movieCards={movieCardsLike}
          cardMovieDelete={cardMovieDelete}
          openPopupError={openPopupError}
        />
      )}
    </>
  );
}
