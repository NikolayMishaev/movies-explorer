import React, {useState} from "react";
import "./MoviesCard.css";


export default function MoviesCard({card}) {
    const [isLiked, setIsLiked] = useState(false);

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }
  return (
    <>
      <li className="movies-card">
        < img className="movies-card__wallpaper" src={card.link} alt={card.title}/>
        <h2 className="movies-card__title">{card.title}</h2>
        <button className={`movies-card__like ${isLiked? "movies-card__like_active" : ""}`} type="button" onClick={handleLikeClick}></button>
        <p className="movies-card__duration">1ч 42м</p>
      </li>
    </>
  );
}
