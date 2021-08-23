import React, {useState} from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({ checkboxOn, handleMovieCheckbox }) {
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
      {showPreloader ? <Preloader/> : <MoviesCardList/>}
      <button className={` ${showPreloader? "display-none" : "movies__button-add-more-cards"} `} type="button" >
        Ещё
      </button>
      </>
  );
}
