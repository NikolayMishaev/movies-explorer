import React from "react";
import "./Header.css";
// импорт компонентов
import Navigation from "../Navigation/Navigation";

export default function Header({ headerStyleMain, loggedIn, entryLocation }) {
  return (
    <>
      <header
        className={` ${
          // отображать Header в зависимости от стейт-переменной и состояния авторизации,
          // т.к. если пользователь авторизован, отобразить Header на странице профиля
          entryLocation && !loggedIn ? "display-none" : "header"
        } ${headerStyleMain ? "" : "header_style_movie"} `}
      >
        <Navigation loggedIn={loggedIn} place="header" />
      </header>
    </>
  );
}
