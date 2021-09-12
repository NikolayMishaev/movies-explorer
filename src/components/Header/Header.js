import React from "react";
import "./Header.css";
// импорт компонентов
import Navigation from "../Navigation/Navigation";

export default function Header({ mainStyleHeader, loggedIn, visibleHeader }) {
  return (
    <>
      <header
        className={` ${
          // отображать Header в зависимости от стейт-переменной и состояния авторизации,
          // т.к. если пользователь авторизован, отобразить Header на странице профиля
          visibleHeader ? "header" : "display-none"
        } ${mainStyleHeader ? "" : "header_style_movie"} `}
      >
        <Navigation loggedIn={loggedIn} place="header" />
      </header>
    </>
  );
}
