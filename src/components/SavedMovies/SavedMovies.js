import React, {useState} from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { movieCardsLike } from "../../utils/constants";

export default function SavedMovies({ checkboxOn, handleMovieCheckbox, cardMovieDelete }) {
  const [showPreloader, setShowPreloader] = useState(false);

  function handlePreloader () {
    setShowPreloader(!showPreloader);
    setTimeout(()=>setShowPreloader(false),1500);
  }

  return (
    <>
      <SearchForm
      handlePreloader={handlePreloader}
        checkboxOn={checkboxOn}
        handleMovieCheckbox={handleMovieCheckbox}
      />
      {showPreloader ? <Preloader/> : <MoviesCardList movieCards={movieCardsLike} cardMovieDelete={cardMovieDelete}/>}
      </>
  );
}
