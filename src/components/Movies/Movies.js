import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { movieCards } from "../../utils/constants";

export default function Movies({
  checkboxOn,
  handleMovieCheckbox,
  openPopupError,
}) {
  const [showPreloader, setShowPreloader] = useState(false);

  function handlePreloader() {
    setShowPreloader(!showPreloader);
    setTimeout(() => setShowPreloader(false), 1500); // временный таймер для демонстрации работы прелоадера
  }

  return (
    <>
      <SearchForm
        handlePreloader={handlePreloader}
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
      />
      {showPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movieCards={movieCards}
          openPopupError={openPopupError}
        />
      )}
    </>
  );
}
